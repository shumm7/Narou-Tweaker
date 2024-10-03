import { restoreOptions } from "../general.js";
import { buttonHide, optionHide, syntaxHighlight } from "../utils.js";
import { customUIList } from "./customUI.js";
import { optionCategoryList, optionList } from "./optionUI.js";
import { check, defaultValue, getExtensionVersion } from "/utils/misc.js"
import { defaultOption, updateOption } from "/utils/option.js"

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
}

setup()

function setupDOM(){
    var currentCategory 

    /* Remove JS error message */
    $('#js-failed').remove();

    /* Sidebars */
    var sidebarDOMItems = ""
    $.each(optionCategoryList, function(idx, category){
        sidebarDOMItems += `
        <div class="sidebar-item" name="${category.id}">
            <a href="/options/${category.id}/index.html" target="_self">
                <i class="${category.icon}"></i>
                <span class="sidebar-item--title">${category.title}</span>
            </a>
        </div>
        `

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
            <div id="sidebar-items">
                ${sidebarDOMItems}
            </div>
            <div id="sidebar-bottom">
                <div id="sidebar-version">build. ${manifest.version}</div>
                <div class="sidebar-icon" id="sidebar-icon--hide">
                    <i class="fa-solid fa-angles-left"></i>
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
    $("#header-title--heading").append(`
        <i class="${currentCategory.icon}"></i>
		<span class="title">${currentCategory.title}</span>
    `)

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
        
    })
        
    $(".header-menu-item").on("click", function(e){
        var name = $(this).attr("name")
        $(`.header-menu-item.selected`).removeClass("selected")
        $(this).addClass("selected")

        $(`.header-menu-target.selected`).removeClass("selected")
        $(`.header-menu-target[name="${name}"]`).addClass("selected")
        location.replace(`#${name}`)
    })

    const hash = location.hash
    if(hash.length){
        var tag = hash.match(/#(.*)/)[1]
        if(tag){
            var tab = $(`.header-menu-item[name="${tag}"]`)
            if(tab.length){
                tab.trigger("click")
            }
        }
    }
}

function setupContents(){
    $.each(optionList, function(idx, option){
        if(option.location.page === currentPage){
            const category = option.location.category
            const id = option.id
            const title = option.title
            const description = option.description
            const uiType = option.ui.type
            const uiName = option.ui.name
            const uiData = option.ui.data
            const uiStyle = option.ui.style
            const hasValue = option.value.hasValue
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

                /* Contents */
                if(uiType === "toggle"){
                    if(elm.hasClass("contents-option")){
                        elm.append(`<div class="contents-option-content"></div>`)
                    }else{
                        elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
                    }

                    if(uiName==="default" || uiName===undefined){
                        elm.find(".contents-option-content").append(`
                            <input type="checkbox" id="${id}" class="options toggle">
                            <label for="${id}" class="toggle"></label>
                        `)
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
                                <select id="${id}" class="options">
                                </select>
                            </div>
                        `)

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
                else if(uiType === "textarea"){
                    if(elm.hasClass("contents-option")){
                        elm.append(`<div class="contents-option-content"></div>`)
                    }else{
                        elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
                    }

                    if(uiName==="default" || uiName===undefined){
                        elm.find(".contents-option-content").append(`
                            <div class="textarea-outer">
								<textarea class="textarea options" id="${id}"></textarea>
							</div>
                        `)
                    }else if(uiName === "syntax-highlight"){
                        elm.find(".contents-option-content").append(`
                            <div class="textarea-outer">
								<textarea class="textarea options syntax-highlight" id="${id}" data="${uiData}"></textarea>
							</div>
                        `)
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

            /* Style */
            if(uiStyle){
                elm.css(uiStyle)
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