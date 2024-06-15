import { defaultValue, getExtensionVersion } from "/utils/misc.js";
import { defaultOption, fixOption } from "/utils/option.js";
import { restoreOptions, setupDOM } from "../general.js";
import { buttonHide, optionHide, syntaxHighlight } from "../utils.js";
import { escapeHtml } from "../../../utils/text.js";

setupDOM()
buttonHide()
optionHide()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()
    showPatchnotes()

    exportOptionText()
    exportSyncOptionText()
    removeOptionData()
    fixOptionData()
    syntaxHighlight()
})


/* 設定データを閲覧 */
function exportOptionText() {
    function change(){
        chrome.storage.local.get(null, (data)=>{
            try{
                const ignores = data.extIgnoreOptionIndex.split(/\s/)
                $.each(ignores, function(_, elm){
                    if(elm in data){
                        delete data[elm]
                    }
                })

                var text = JSON.stringify(data, null, 4)
                var field = $("#exportOptionText_Output")
                field.text(text)
                field.trigger("input")
            }catch(e){
                
            }
        })
    }
    change()
    chrome.storage.local.onChanged.addListener(function(changes){
        change()
    })
}

function exportSyncOptionText() {
    function change(){
        chrome.storage.local.get(null, (local)=>{
            chrome.storage.sync.get(null, (data)=>{
                try{
                    const ignores = local.extIgnoreSyncOptionIndex.split(/\s/)
                    $.each(ignores, function(_, elm){
                        if(elm in data){
                            delete data[elm]
                        }
                    })

                    var text = JSON.stringify(data, null, 4)
                    var field = $("#exportSyncOptionText_Output")
                    field.text(text)
                    field.trigger("input")
                }catch(e){
                    console.warn(e)
                }
            })
        })
    }
    change()
    chrome.storage.sync.onChanged.addListener(function(changes){
        change()
    })
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.extIgnoreSyncOptionIndex!=undefined){
            change()
        }
    })
}

function removeOptionData(){
    $("#removeOptionData").on("click", function(){
        if(window.confirm('スキンを含む、保存されているデータが全てリセットされます。')){
            chrome.storage.local.clear(()=>{
                chrome.storage.local.set(defaultOption)
                console.log("Reset all options.")
            })
        }
    })
}

function fixOptionData(){
    $("#fixOptionData").on("click", function(){
        if(window.confirm('この操作を行うと、異なるバージョンのNarou Tweakerを利用しているブラウザで不具合が発生する可能性があります。最新版に更新した上で実行してください。')){
            fixOption(true, true)
        }
    })
}

/* パッチノート */
function showPatchnotes(){

    fetch('https://raw.githubusercontent.com/shumm7/Narou-Tweaker/main/patchnote.json').then(response => response.json())
    .then(res => {
        var outer = $(".contents-container[name='version']")

        $.each(res.data, function(_, data){
            const lang = "ja"

            var box = $(`
                <div class="contents-wide">
                    <div class="contents-option">
                        <div class="contents-option-head">
                            <div class="contents-item--heading"></div>
                            <div class="contents-item--description">
                                <span class="release-icons"></span>
                            </div>
                        </div>

                        <div class="contents-option-content">
                            <div class="version">
                            </div>
                        </div>
                    </div>
                </div>
            `)

            const currentVersion = getExtensionVersion()
            const version = escapeHtml(data.version)
            const date = escapeHtml(defaultValue(data.date, ""))
            const url = escapeHtml(defaultValue(data.url, `https://github.com/shumm7/Narou-Tweaker/releases/tag/${version}`))
            const release = escapeHtml(data.release)
            const patchnote = data.patchnote[lang]
            const headerList = {
                ja: {
                    novel: "📗 小説ページ",
                    workspace: "🖊️ ユーザホーム",
                    mypage: "👤 ユーザページ",
                    yomou: "🔍️ 小説を読もう！",
                    mitemin: "🎨 みてみん",
                    kasasagi: "📊 KASASAGI",
                    general: "⚒️ 全般"
                }
            }

            box.find(".contents-item--heading").append(`<a href="${url}">${version}</a>`)
            box.find(".contents-item--description").prepend(`<span class="release-date">${date}</span>`)

            if(version == currentVersion){
                box.find(".contents-item--heading").append(`<span class="current-version">使用中</span>`)
            }

            if(release.chrome){
                box.find(".contents-item--description .release-icons").append(`<i class="fa-brands fa-chrome"></i>`)
            }
            if(release.gecko){
                box.find(".contents-item--description .release-icons").append(`<i class="fa-brands fa-firefox-browser"></i>`)
            }

            $.each(headerList[lang], function(key, header){
                if(patchnote[key]!=undefined){
                    var list = $(`<ul></ul>`)
                    $.each(patchnote[key], function(_, text){
                        var item = $(`<li></li>`)
                        item.text(text)
                        list.append(item)
                    })

                    var row = $(`
                        <p>
                            <b>${header}</b>
                        </p>
                    `)
                    row.append(list)
                    box.find(".version").append(row)
                }

            })
            outer.append(box)

            if(getExtensionVersion() == version){
                $(".extension-version").append(`<a href="${url}">${version}</version>`)
            }
        })
    }).catch(error => {
        $("#footer").append(`
            <div id="js-failed">
                Failed to load patchnote.json: ${error}
            </div>
        `)
    });
}