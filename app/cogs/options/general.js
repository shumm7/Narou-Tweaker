import { check, defaultValue, getExtensionVersion } from "../../utils/misc.js"
import { defaultOption, updateOption } from "../../utils/option.js"

export function setupDOM(){
    $('#js-failed').remove();

    var sidebar = $(`
        <div id="sidebar-inner">
            <div id="sidebar-header">
                <div class="sidebar-icon" id="sidebar-icon--help">
                    <!--<a href="/cogs/options/help/index.html"><i class="fa-solid fa-circle-question"></i></a>-->
                </div>
            </div>
            <div id="sidebar-items">
                <div class="sidebar-item" name="general">
                    <a href="/cogs/options/general/index.html" target="_self">
                        <i class="fa-solid fa-gear"></i>
                        <span class="sidebar-item--title">全般</span>
                    </a>
                </div>
                <div class="sidebar-item" name="novel">
                    <a href="/cogs/options/novel/index.html" target="_self">
                        <i class="fa-solid fa-book"></i>
                        <span class="sidebar-item--title">小説ページ</span>
                    </a>
                </div>
                <div class="sidebar-item" name="novel">
                    <a href="/cogs/options/yomou/index.html" target="_self">
                    <i class="fa-solid fa-magnifying-glass"></i>
                        <span class="sidebar-item--title">小説を読もう！</span>
                    </a>
                </div>
                <div class="sidebar-item" name="workspace">
                    <a href="/cogs/options/workspace/index.html" target="_self">
                        <i class="fa-solid fa-pen-nib"></i>
                        <span class="sidebar-item--title">ユーザホーム</span>
                    </a>
                </div>
                <div class="sidebar-item" name="mypage">
                    <a href="/cogs/options/mypage/index.html" target="_self">
                        <i class="fa-solid fa-user"></i>
                        <span class="sidebar-item--title">マイページ</span>
                    </a>
                </div>
                <div class="sidebar-item" name="kasasagi">
                    <a href="/cogs/options/kasasagi/index.html" target="_self">
                        <i class="fa-solid fa-chart-line"></i>
                        <span class="sidebar-item--title">KASASAGI</span>
                    </a>
                </div>
            </div>
            <div id="sidebar-bottom">
                <div id="sidebar-version">build. ${getExtensionVersion()}</div>
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

    const manifest = chrome.runtime.getManifest()
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

    /* Events */
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
        else if(tagName=="select" || tagName=="textarea"){ // DropDown / TextArea
          elm.val(defaultValue(value, defaultOption[name]))
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
}