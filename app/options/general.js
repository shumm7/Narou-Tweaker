import { buttonHide, colorPicker, optionHide, syntaxHighlight } from "./_lib/utils.js";
import { getOptionElement, optionCategoryList, optionList } from "./_lib/optionUI.js";
import { defaultOption } from "../../utils/option.js"
import { check, defaultValue } from "/utils/misc.js"
import { getOptionFromId, getOptionPageFromId } from "./_lib/optionLib.js";

const manifest = chrome.runtime.getManifest()
let currentPage

export function setup(){
    currentPage = $("#option-page-id").val()

    setupDOM()
    setupContents()
    buttonHide()
    optionHide()
    syntaxHighlight()
    restoreOptions()
    urlScheme()
}

function setupDOM(){
    var currentCategory 

    /* Remove JS error message */
    $('#js-failed').remove();

    /* Sidebars */
    var sidebarDOMItems = ""
    $.each(optionCategoryList, function(idx, category){
        if(category.sidebar || category.sidebar===undefined){
            var url = `/options/${category.id}/index.html`

            var elm = $(`
                <div class="sidebar-item" name="${category.id}">
                    <a href="${url}" target="_self">
                        <span class="sidebar-item--title">${category.title}</span>
                    </a>
                </div>
            `)

            if(category.icon){
                elm.find("a").prepend(`<i class="${category.icon}"></i>`)
            }
            sidebarDOMItems += elm[0].outerHTML
        }

        if(category.id===currentPage){
            currentCategory = category
        }
    })

    var sidebar = $(`
        <div id="sidebar-inner">
            <div id="sidebar-header">
                <a href="/options/general/index.html" target="_self"><img class="brand-icon" src="/assets/icons/icon.png" width="30" height="30"/></a>
                <div class="sidebar-icon" id="sidebar-icon--help">
                    <!--<a href="/options/help/index.html"><i class="fa-solid fa-circle-question"></i></a>-->
                </div>
            </div>
            <div id="sidebar-middle">
                <div id="sidebar-search">
                    <input type="text" id="sidebar-search-box" placeholder="検索">
                </div>
                <div id="sidebar-items">
                    ${sidebarDOMItems}
                </div>
            </div>
            <div id="sidebar-bottom">
                <div id="sidebar-toolbox">
                    <div id="sidebar-version">build. ${manifest.version}</div>
                    <div class="sidebar-icon" id="sidebar-icon--hide">
                        <i class="fa-solid fa-angles-left"></i>
                    </div>
                </div>
            </div>
        </div>
        <div id="sidebar-open">
            <div class="sidebar-icon" id="sidebar-icon--show">
                <i class="fa-solid fa-angles-right"></i>
            </div>
        </div>
        `)

    sidebar.find(`.sidebar-item:has(a[href="${location.pathname}"])`).addClass("selected")
    $("#sidebar").append(sidebar)


    /* Sidepanel Events */
    chrome.storage.session.get("extOptionSidePanelShow", function(data){
        _sidepanelHide(data.extOptionSidePanelShow)
    })
    $("#sidebar-icon--hide").on("click", function(){
        chrome.storage.session.set({extOptionSidePanelShow: false}, function(){})
    })
    $("#sidebar-open").on("click", function(){
        chrome.storage.session.set({extOptionSidePanelShow: true}, function(){})
    })
    chrome.storage.session.onChanged.addListener(function(changes){
        if(changes.extOptionSidePanelShow!=undefined){
            _sidepanelHide(changes.extOptionSidePanelShow.newValue)
        }
    })
    function _sidepanelHide(mode){
        if(mode==undefined){mode = true}
        if(mode){
            $("#sidebar").removeClass("hide")
        }else{
            $("#sidebar").addClass("hide")
        }
    }

    /* search event */
    $("#sidebar-search-box").on("input", function(){
        var searchWords = $(this).val()
        if(currentPage!=="search"){
            const words = searchWords.split(/\s/).filter(w => w.trim().length > 0)
        
            const params = new URLSearchParams(location.search)
            params.set("s", words.join(" "))
            window.history.replaceState(null, "", `${location.pathname}?${params.toString()}`)
        }else{
            $("#search-box").val(searchWords)
            $("#search-box").trigger("input")
        }
    })
    $("#sidebar-search-box").on("keydown", function(e){
        if(e.key === "Enter"){
            if(currentPage!=="search"){
                var searchWords = $(this).val()
                const words = searchWords.split(/\s/).filter(w => w.trim().length > 0)
            
                const params = new URLSearchParams(location.search)
                params.set("s", words.join(" "))
                location.replace(`/options/search/index.html?${params.toString()}`)
            }else{
                $("#search-box").focus()
            }
        }
    })


    /* Set Title */
    function getName(id, _pre){
        var cat = getOptionPageFromId(id)
        if(cat===undefined){
            if(_pre){
                return _pre
            }else{
                return "環境設定"
            }
        }
        if(cat.parent === undefined){
            return `${cat.title} < 環境設定`
        }else{
            return `${cat.title} < ${getName(cat.parent, _pre)}`
        }
    }

    $("head title").text(`${getName(currentCategory.id)} ｜ Narou Tweaker`)
    
    
    /* Footer */
    $("#footer").append(`
    <div id="footer-contents">
        <div class="footer-contents--image">
            <a href="https://github.com/shumm7/Narou-Tweaker">
                <img src="/assets/icons/icon.png" width="30" height="30">
            </a>
        </div>
        <div class="footer-contents--text">Narou Tweaker v${manifest.version}</div>
    </div>
    `)

    /* Header Info */
    if(currentCategory.icon){
        $("#header-title--heading").append(`<i class="${currentCategory.icon}"></i>`)
    }
    $("#header-title--heading").append(`<span class="title">${currentCategory.title}</span>`)

    if(currentCategory.targetUrl !== undefined){
        $("#header-title--description").append(`
            <p class="header-title--description-text">
                ${currentCategory.description}<br>
                <span style="font-size:80%;">対象ページ：${currentCategory.targetUrl.join(" / ")}
            </p>
            <div class="header-title--description-search">
                <a href="/options/search/index.html" target="_self"><i class="fa-solid fa-magnifying-glass"></i></a>
            </div>
        `)
    }else{
        $("#header-title--description").append(`
            <p class="header-title--description-text">${currentCategory.description}</p>
            <div class="header-title--description-search">
                <a href="/options/search/index.html" target="_self"><i class="fa-solid fa-magnifying-glass"></i></a>
            </div>
        `)
    }

    /* Header Tab */
    const scrollElement = document.querySelector("#header-menu-left-items");
    if(scrollElement!=null){
        scrollElement.addEventListener("wheel", (e) => {
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
            e.preventDefault();
            scrollElement.scrollLeft += e.deltaY;
        });
    }

    /* Header Tab Items */
    const defaultCategory = currentCategory.defaultCategory
    $.each(currentCategory.categories, function(_, tab){
        $("#main").append(`<div class="contents-container header-menu-target" name="${tab.id}"></div>`)

        if(tab.description){
            var categoryDescription = []
            if(tab.description.text){
                categoryDescription.push(tab.description.text)
            }
            if(tab.description.small){
                categoryDescription.push(`<span style="color: #999; font-size: 80%;">${tab.description.small}</span>`)
            }
            if(tab.description.attention){
                categoryDescription.push(`<span style="color: red; font-weight: bold; font-size: 90%;">${tab.description.attention}</span>`)
            }

            if(categoryDescription.length > 0) {
                $(`.header-menu-target[name="${tab.id}"]`).append(`
                    <div class="contents-wide">
						<p>${categoryDescription.join("<br>")}</p>
					</div>
                `)
            }
        }
        
        if(defaultCategory===tab.id){
            $("#header-menu-left-items").append(`
                <li class="header-menu-item selected" name="${tab.id}">
                    <span class="header-menu-item--title">${tab.title}
                    </span>
                </li>
            `)

            $(`.header-menu-target[name="${tab.id}"]`).addClass("selected")
        }else{
            $("#header-menu-left-items").append(`
                <li class="header-menu-item" name="${tab.id}">
                    <span class="header-menu-item--title">${tab.title}
                    </span>
                </li>
            `)
        }

        if(!currentCategory.tabs && currentCategory.tabs!==undefined){
            $("#header-menu").css("display", "none")
        }
        
    })
        
    $(".header-menu-item").on("click", function(e){
        var name = $(this).attr("name")
        $(`.header-menu-item.selected`).removeClass("selected")
        $(this).addClass("selected")

        $(`.header-menu-target.selected`).removeClass("selected")
        $(`.header-menu-target[name="${name}"]`).addClass("selected")

        const params = new URLSearchParams(location.search)
        params.set("category", name)

        window.history.replaceState(null, "", `/options/${currentPage}/index.html?${params.toString()}`)

        /* popup時に自動でタブをスクロール */
        var outer = document.getElementById( "header-menu-left-items" )
        var button = $(this)[0]
        const scrollWidth = outer.scrollWidth
        const width = outer.clientWidth
        const buttonSize = button.clientWidth
        if(width < scrollWidth){
            const scrollLeft = outer.scrollLeft //スクロール量
            const absoluteLeft = button.offsetLeft - outer.offsetLeft //オブジェクトの通常位置
            const currentLeft = absoluteLeft - scrollLeft //オブジェクトの現在の位置

            const centerLeft = width/2 - buttonSize/2 //目標とする位置
            const target = centerLeft - currentLeft // 必要なスクロール量
            const canMove =  scrollLeft - target >=0 ? scrollLeft - target : 0 //現在のスクロール量からどれだけスクロールさせればいいか
            outer.scrollLeft = canMove
        }
    })
}

function setupContents(){
    $.each(optionList, function(_, option){
        if(option.location){
            if(option.location.page === currentPage){
                if(!option.location.hide){
                    const category = option.location.category
                    const hasParent = option.location.hasParent
                    const parent = option.location.parent

                    var elm = getOptionElement(option)

                    /* Placement */
                    if(hasParent){
                        $(`.contents-container[name="${category}"] .contents-wide[name="${parent}"] .contents-wide-column`).append(elm)
                    }else{
                        $(`.contents-container[name="${category}"]`).append(elm)
                    }
                }
            }
        }
    })
}


/* Restore Options */
function restoreValues(data, ignore){
    $.each(data, function(name, value){
      var elm = $(".options[id='"+name+"']")
      if(elm.length){
        const tagName = elm.prop("tagName").toLowerCase()
        const type = elm.prop("type")
        
        if(tagName == "input" && type=="checkbox"){ // Toggle
          check("#" + elm.prop("id"), value, defaultOption[name])
        }
        else if(tagName == "input" && type=="text" && elm.hasClass("color")){ // Input Text
            elm.val(defaultValue(value, defaultOption[name]))
            document.querySelectorAll('.color').forEach(input => {
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        }
        else if(tagName == "input" && (type=="text" || type=="number")){ // Input Text
            elm.val(defaultValue(value, defaultOption[name]))
        }
        else if(tagName=="select"){ // DropDown
            elm.val(defaultValue(value, defaultOption[name]))
        }
        else if(tagName=="textarea"){ // TextArea
            elm.val(defaultValue(value, defaultOption[name]))
            if(elm.hasClass("syntax-highlight")){
                elm.trigger("input")
            }
        }
      }
    })
  }

export function restoreOptions(){
    chrome.storage.local.onChanged.addListener(function(changes){
      chrome.storage.local.get(null, function(data) {
        restoreValues(data, true)
      })
    })
  
    chrome.storage.local.get(null, function(data) {
       restoreValues(data)
       colorPicker()
    });

    /* On Click Elements */
    $(".options").on("click", function(){
        const name = $(this).prop("id")
        const tagName = $(this).prop("tagName").toLowerCase()
        const type = $(this).prop("type")
    
        var value = {}
        if(tagName=="input" && type=="checkbox"){
            value[name] = $(this).prop('checked')
        }else if(tagName=="select"){
            value[name] = $(this).val()
        }
    
        if(value[name]!=undefined){
            chrome.storage.local.set(value);
        }
    });

    /* On Change Elements */
    $(".options").on("change", function(){
        const name = $(this).prop("id")
        const tagName = $(this).prop("tagName").toLowerCase()
        const type = $(this).prop("type")
    
        var value = {}
        if(tagName=="textarea"){
            value[name] = $(this).val()
        }else if(tagName=="input" && type=="text"){
            value[name] = $(this).val()
        }else if(tagName=="input" && type=="number"){
            var min = parseFloat($(this).prop("min"))
            var max = parseFloat($(this).prop("max"))
            var v = parseFloat($(this).val())
            if(isNaN(v)){
                v = 0
                $(this).val(v)
            }
            if(!isNaN(min)){
                if(min>v){
                    v = min
                    $(this).val(v)
                }
            }
            if(!isNaN(max)){
                if(max<v){
                    v = max
                    $(this).val(v)
                }
            }

            value[name] = v
        }
    
        if(value[name]!=undefined){
            chrome.storage.local.set(value);
        }
    });

    /* Auto Select */
    $(".autoselect").each(function(){
        $(this).on("click", function(){
            $(this).select()
        })
    })
}


/* URL Scheme */
function urlScheme(){
    var params = new URLSearchParams(location.search)
    const p_id = params.get("id")
    const p_category = params.get("category")
    const p_force = params.get("force")
    const p_panel = params.get("panel")
    const p_focus = params.get("focus")

    if(p_id){
        const p_dataOption = getOptionFromId(p_id)
        if(p_dataOption){
            if(p_dataOption.location){
                if(p_dataOption.location.page!==currentPage && p_force==="1"){
                    params.set("category", p_dataOption.location.category)
                    location.replace(`/options/${p_dataOption.location.page}/index.html?${params.toString()}`)
                }else if(p_dataOption.location.page===currentPage){
                    var elm = $(`*[name="${p_id}"]`)
                    if(elm.length){
                        var tab = $(`.header-menu-item[name="${p_dataOption.location.category}"]`)
                        if(tab.length){
                            tab.trigger("click")
                            $(window).scrollTop(elm.offset().top)
                        }
                    }
                }

                if(p_focus==="1"){
                    var elm = $(`*[name="${p_id}"]`)
                    if(elm.length){
                        elm.addClass("search-focused")
                        elm.find(".options").eq(0).focus()
                    }
                }
            }
        }
    }else{
        if(p_category){
            var tab = $(`.header-menu-item[name="${p_category}"]`)
            if(tab.length){
                tab.trigger("click")
            }
        }
    }
    if(p_panel!==null){
        chrome.storage.session.get(["extOptionSidePanelShow"], d =>{
            if(p_panel==="1"){
                if(!d.extOptionSidePanelShow){
                    chrome.storage.local.set({extOptionSidePanelShow: true}, function(){})
                }
            }else if(p_panel==="0"){
                if(d.extOptionSidePanelShow){
                    chrome.storage.local.set({extOptionSidePanelShow: false}, function(){})
                }
            }

        })
    }

    /* search */
    const p_search = params.get("s")
    if(currentPage=="search"){
        if(p_search){
            $("#search-box").val(p_search)
            $("#search-box").trigger("input")
        }
    }
    if(p_search){
        $("#sidebar-search-box").val(p_search)
    }
}