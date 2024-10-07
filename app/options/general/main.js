import { defaultValue, getExtensionVersion } from "/utils/misc.js";
import { defaultOption, fixOption } from "/utils/option.js";
import { setup } from "../general.js";
import { escapeHtml, getDatetimeStringForFilename } from "/utils/text.js";
import { getUpdatedOption } from "/utils/option.js";
import { saveJson } from "../../utils/misc.js";
import { updateOption } from "../../utils/option.js";

setup()

document.addEventListener('DOMContentLoaded', function(){
    showPatchnotes()
    exportOptionText()
    exportSyncOptionText()
    exportSessionOptionText()
    removeOptionData()
    fixOptionData()
    exportOptionData()
    importOptionData()
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

function exportSessionOptionText() {
    function change(){
        chrome.storage.local.get(null, (local)=>{
            chrome.storage.session.get(null, (data)=>{
                try{
                    const ignores = local.extIgnoreSessionOptionIndex.split(/\s/)
                    $.each(ignores, function(_, elm){
                        if(elm in data){
                            delete data[elm]
                        }
                    })

                    var text = JSON.stringify(data, null, 4)
                    var field = $("#exportSessionOptionText_Output")
                    field.text(text)
                    field.trigger("input")
                }catch(e){
                    
                }
            })
        })
    }
    change()
    chrome.storage.session.onChanged.addListener(function(changes){
        change()
    })
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.extIgnoreSessionOptionIndex!=undefined){
            change()
        }
    })
}

/* 設定データをリセット/修復 */
function removeOptionData(){
    $("#removeOptionData").on("click", function(){
        if(window.confirm('スキンを含む、保存されているデータが全てリセットされます。\nこの操作は元に戻せません。')){
            chrome.storage.local.clear(()=>{
                chrome.storage.local.set(defaultOption)
                console.log("Reset all options.")

                /* notify */
                chrome.notifications.create(null, {
                    iconUrl: "/assets/icons/icon_48.png",
                    type: "basic",
                    title: "Narou Tweakerがリセットされました",
                    message: ``
                })
            })
        }
    })
}

function fixOptionData(){
    $("#fixOptionData").on("click", function(){
        if(window.confirm('この操作を行うと、異なるバージョンのNarou Tweakerを利用している他のブラウザで不具合が発生する可能性があります。\n最新版に更新した上で実行してください。')){
            fixOption(true, true)

            chrome.notifications.create(null, {
                iconUrl: "/assets/icons/icon_48.png",
                type: "basic",
                title: "Narou Tweakerが修復されました",
                message: `保存されたデータはそのままです。`
            })
        }
    })
}

/* 設定データのエクスポート/インポート */
function exportOptionData(){
    /* Export Button */
    $("#option-export-json").on("click", (e)=>{
        chrome.storage.local.get(null, function(data) {
            var date = getDatetimeStringForFilename()
            console.log(date)
            var d = getUpdatedOption(data)
            console.log(d)
            if(d){
                saveJson(getUpdatedOption(data), `nt-option-${date}.json`)
            }
        });
    })
    $("#option-export-text").on("click", (e)=>{
        $("#option-export-output").css("display", "block")
        chrome.storage.local.get(null, function(data) {
            var field = $("#option-export-output--field")
            var d = getUpdatedOption(data)
            if(d){
                field.val(JSON.stringify(d, null, "\t"))
                field.trigger("input")
            }
        });
    })
}

function importOptionData(){
    $("#option-import-json").on("change", (evt)=>{
        $("#option-import-warnings").empty()

        try{
            var f = evt.target.files[0]
            var reader = new FileReader();
            reader.onload = function(e){
                try{
                    var field = $("#option-import-input--field")
                    field.val(e.target.result)
                    field.trigger("input")
                }catch(e){
                    console.warn(e)
                }
            }
            reader.readAsText(f);
        }catch(e){}
    })
    $('#option-import').on('dragenter', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    });
    $('#option-import').on('dragover', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    });
    $("#option-import").on("drop", (evt)=>{
        evt.stopPropagation();
        evt.preventDefault();
        $("#option-import-warnings").empty()

        try{
            var f = evt.originalEvent.dataTransfer.files[0];
            var reader = new FileReader();
            reader.onload = function(e){
                try{
                    var field = $("#option-import-input--field")
                    field.val(e.target.result)
                    field.trigger("input")
                }catch(e){
                    console.warn(e)
                }
            }
            reader.readAsText(f);
        }catch(e){}
    })

    $("#option-import-input--submit").on("click", (e)=>{
        if(window.confirm('スキンを含む、既存のデータが全て上書きされます。\nこの操作は元に戻せません。')){
            $("#option-import-warnings").empty()
            var raw
            try{
                raw = JSON.parse($("#option-import-input--field").val())
                var option = getUpdatedOption(raw)
                if(option){
                    chrome.storage.local.set(option, function(){
                        var field = $("#option-import-input--field")
                        field.val("")
                        field.trigger("input")

                        /* notify */
                        chrome.notifications.create(null, {
                            iconUrl: "/assets/icons/icon_48.png",
                            type: "basic",
                            title: "Narou Tweakerがアップデートされました",
                            message: `ユーザによるデータインポート`
                        })
                    })
                }

            }catch(e){
                $("#option-import-warnings").append(`<div class="option-import-warning">データの読み取りに失敗しました。</div>`)
                console.warn(e)
                return
            }

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
                    narou: "🏡 小説家になろう",
                    novel: "📗 小説ページ",
                    workspace: "🖊️ ユーザホーム",
                    mypage: "👤 ユーザページ",
                    yomou: "👑 小説を読もう！",
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