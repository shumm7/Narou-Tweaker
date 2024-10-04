import { buttonHide, colorPicker, optionHide, syntaxHighlight } from "./_lib/utils.js";
import { customUIList } from "./_lib/customUI.js";
import { optionCategoryList, optionList } from "./_lib/optionUI.js";
import { check, defaultValue, getExtensionVersion } from "/utils/misc.js"
import { defaultOption, updateOption } from "/utils/option.js"
import { getOptionFromId } from "./_lib/optionLib.js";

const manifest = chrome.runtime.getManifest()
var currentPage

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
            var elm = $(`
                <div class="sidebar-item" name="${category.id}">
                    <a href="/options/${category.id}/index.html" target="_self">
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
                <img class="brand-icon" src="/assets/icons/icon.png" width="30" height="30"/>
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
    chrome.storage.local.get("extOptionSidePanelShow", function(data){
        _sidepanelHide(data.extOptionSidePanelShow)
    })
    $("#sidebar-icon--hide").on("click", function(){
        chrome.storage.local.set({extOptionSidePanelShow: false}, function(){})
    })
    $("#sidebar-open").on("click", function(){
        chrome.storage.local.set({extOptionSidePanelShow: true}, function(){})
    })
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.extOptionSidePanelShow!=undefined){
            _sidepanelHide(changes.extOptionSidePanelShow.newValue)
        }
    })
    function _sidepanelHide(mode){
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
    $("head title").text(`環境設定 > ${currentCategory.title} ｜ Narou Tweaker`)
    
    
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
            <p>
                ${currentCategory.description}<br>
                <span style="font-size:80%;">対象ページ：${currentCategory.targetUrl.join(" / ")}
            </p>
        `)
    }else{
        $("#header-title--description").append(`
            <p>${currentCategory.description}</p>
        `)
    }

    /* Header Tabs */
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
    })
}

function setupContents(){
    $.each(optionList, function(idx, option){
        if(option.location.page === currentPage){
            const category = option.location.category
            const id = option.id
            const title = option.title
            const style = option.style
            const elmClass = option.class
            const description = option.description
            const uiType = option.ui.type
            const uiName = option.ui.name
            const uiData = option.ui.data
            const uiStyle = option.ui.style
            const uiClass = option.ui.class
            var uiPrefix = option.ui.prefix
            var uiSuffix = option.ui.suffix
            const hasValue = option.value.hasValue
            const isExperimental = option.value.isExperimental
            const isAdvanced = option.value.isAdvanced
            const hasParent = option.location.hasParent
            const parent = option.location.parent
            const hideSettings = option.hideSettings

            var elm
            
            if(hasParent){
                elm = $(`<div class="contents-option" name="${id}"></div>`)
            }else{
                elm = $(`<div class="contents-wide" name="${id}"><div class="contents-option"></div></div>`)
            }
            
            if(uiType == "parent"){
                elm.append(`
                    <div class="contents-option-head"></div>
                    <div class="contents-wide-column"></div>
                `)
                
            }else{
                if(elm.hasClass("contents-option")){
                    elm.append(`<div class="contents-option-head"></div>`)
                }else{
                    elm.find(".contents-option").append(`<div class="contents-option-head"></div>`)
                }

                if(!uiPrefix){
                    uiPrefix = ""
                }
                if(!uiSuffix){
                    uiSuffix = ""
                }

                /* Contents */
                if(uiType === "toggle"){
                    if(elm.hasClass("contents-option")){
                        elm.append(`<div class="contents-option-content"></div>`)
                    }else{
                        elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
                    }

                    if(uiName==="default" || uiName===undefined){
                        var item = $(`<input type="checkbox" id="${id}" class="options toggle">`)
                        if(uiStyle){
                            item.css(uiStyle)
                        }
                        if(uiClass){
                            item.addClass(uiClass)
                        }

                        var toggleElm = $(`
                            ${uiPrefix}
                            ${item[0].outerHTML}
                            <label for="${id}" class="toggle"></label>
                            ${uiSuffix}
                        `)

                        elm.find(".contents-option-content").append(toggleElm)
                    }
                }
                else if(uiType === "dropdown"){
                    if(elm.hasClass("contents-option")){
                        elm.append(`<div class="contents-option-content"></div>`)
                    }else{
                        elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
                    }

                    if(uiName==="default" || uiName===undefined){
                        var dropdownElm = $(`
                            <div class="dropdown">
                                ${uiPrefix}
                                <select id="${id}" class="options">
                                </select>
                                ${uiSuffix}
                            </div>
                        `)

                        if(uiStyle){
                            dropdownElm.css(uiStyle)
                        }
                        if(uiClass){
                            dropdownElm.addClass(uiClass)
                        }

                        $.each(uiData, function(_, val){
                            var value = ""
                            var title = ""
                            if(val.value){
                                value = val.value
                            }else{
                                return true
                            }
                            if(val.title){
                                title = val.title
                            }else{
                                if(value){
                                    title = value
                                }else{
                                    return true
                                }
                            }

                            dropdownElm.find("select").append(`
                                <option value="${value}">${title}</option>
                            `)
                        })

                        elm.find(".contents-option-content").append(dropdownElm)
                    }
                }
                else if(uiType === "input"){
                    if(elm.hasClass("contents-option")){
                        elm.append(`<div class="contents-option-content"></div>`)
                    }else{
                        elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
                    }

                    if(uiName==="default" || uiName===undefined || uiName==="text" || uiName==="number"){
                        var item = $(`
                            <div class="textfield">
                                ${uiPrefix}<input class="options" type="text" id="${id}">${uiSuffix}
                            </div>
                        `)

                        if(uiStyle){
                            item.css(uiStyle)
                        }
                        if(uiClass){
                            item.addClass(uiClass)
                        }

                        elm.find(".contents-option-content").append(item)
                    }
                    else if(uiName==="integer"){
                        var item = $(`
                            <div class="textfield">
                                <label>${uiPrefix}</label>
                                <input class="options" type="number" id="${id}">
                                <label>${uiSuffix}</label>
                            </div>
                        `)
                        
                        if(uiData){
                            if(uiData.min){
                                item.find("input").attr("min", uiData.min)
                            }
                            if(uiData.max){
                                item.find("input").attr("max", uiData.max)
                            }
                        }

                        if(uiStyle){
                            item.css(uiStyle)
                        }
                        if(uiClass){
                            item.addClass(uiClass)
                        }

                        elm.find(".contents-option-content").append(item)
                    }
                    else if(uiName==="color"){
                        var item = $(`
                            <div class="textfield">
                                <label>${uiPrefix}</label>
                                <input class="options color" type="text" id="${id}" data-coloris>
                                <label>${uiSuffix}</label>
                            </div>
                        `)

                        if(uiStyle){
                            item.css(uiStyle)
                        }
                        if(uiClass){
                            item.addClass(uiClass)
                        }

                        elm.find(".contents-option-content").append(item)
                    }
                }
                else if(uiType === "textarea"){
                    if(elm.hasClass("contents-option")){
                        elm.append(`<div class="contents-option-content"></div>`)
                    }else{
                        elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
                    }

                    if(uiName==="default" || uiName===undefined){
                        var item = $(`
                            <div class="textarea-outer">
                                <label>${uiPrefix}</label>
								<textarea class="textarea options" id="${id}"></textarea>
                                <label>${uiSuffix}</label>
							</div>
                        `)

                        if(uiStyle){
                            item.css(uiStyle)
                        }
                        if(uiClass){
                            item.addClass(uiClass)
                        }

                        elm.find(".contents-option-content").append(item)
                    }else if(uiName === "syntax-highlight"){
                        var item = $(`
                            <div class="textarea-outer">
                                <label>${uiPrefix}</label>
								<textarea class="textarea options syntax-highlight" id="${id}" data="${uiData}"></textarea>
                                <label>${uiSuffix}</label>
							</div>
                        `)

                        if(uiStyle){
                            item.css(uiStyle)
                        }
                        if(uiClass){
                            item.addClass(uiClass)
                        }

                        elm.find(".contents-option-content").append(item)
                    }
                }
                else if(uiType === "custom"){
                    if(elm.hasClass("contents-option")){
                        elm.append(`<div class="contents-option-content"></div>`)
                    }else{
                        elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
                    }
                    
                    if(uiName==="default" || uiName===undefined){
                        if(customUIList[uiData]){
                            elm.find(".contents-option-content").append(customUIList[uiData])
                        }
                    }else if(uiName==="wide"){
                        if(customUIList[uiData]){
                            elm.empty()
                            elm.append(customUIList[uiData])
                        }
                    }
                }
            }

            /* Title / Description */
            if(title || description){
                if(title){
                    if(!elm.find(".contents-item--heading").length){
                        elm.find(".contents-option-head").append(`<div class="contents-item--heading">${title}</div>`)
                    }else{
                        elm.find(".contents-item--heading").empty()
                        elm.find(".contents-item--heading").append(title)
                    }
                }
                if(description){
                    var descriptionText = []
                    if(description.text){
                        descriptionText.push(description.text)
                    }
                    if(description.small){
                        descriptionText.push(`<span style="font-size: 80%;">${description.small}</span>`)
                    }
                    if(description.attention){
                        descriptionText.push(`<span style="color: red; font-weight: bold; font-size: 90%;">${description.attention}</span>`)
                    }

                    if(descriptionText.length > 0){
                        if(!elm.find(".contents-item--description").length){
                            elm.find(".contents-option-head").append(`<div class="contents-item--description">${descriptionText.join("<br>")}</div>`)
                        }else{
                            elm.find(".contents-item--description").empty()
                            elm.find(".contents-item--description").append(descriptionText.join("<br>"))
                        }
                    }
                }
            }

            /* Hide Settings */
            if(hideSettings){
                var hsDataFor = hideSettings.dataFor
                const hsData = hideSettings.data
                const hsMode = hideSettings.mode

                if(typeof hsDataFor === "string"){
                    hsDataFor = [hsDataFor]
                }
                elm.addClass("option-hide")
                elm.attr("data-for", hsDataFor.join(" "))
                if(hsData){
                    elm.attr("data", hsData)
                }
                if(hsMode){
                    elm.attr("mode", hsMode)
                }
            }

            /* Advanced / Experimental settings */
            if(isAdvanced){
                elm.addClass("advanced-hide")
            }
            if(isExperimental){
                elm.addClass("experimental-hide")
            }

            /* Style */
            if(style){
                elm.css(style)
            }

            if(elmClass){
                elm.addClass(elmClass)
            }

            /* Placement */
            if(hasParent){
                $(`.contents-container[name="${category}"] .contents-wide[name="${parent}"] .contents-wide-column`).append(elm)
            }else{
                $(`.contents-container[name="${category}"]`).append(elm)
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
    updateOption()
  
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
        chrome.storage.local.get(["extOptionSidePanelShow"], d =>{
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