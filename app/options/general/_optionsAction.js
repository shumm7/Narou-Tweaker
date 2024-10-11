
import { defaultOption, fixOption, formatOption } from "../../utils/option.js";
import { getDatetimeStringForFilename, getDatetimeString, escapeHtml } from "../../utils/text.js";
import { saveJson } from "../../utils/misc.js";
import { optionCategoryList } from "../_lib/optionUI.js";
import { getOptionPageFromId } from "../_lib/optionLib.js";

/* 基本設定 */
/* デフォルトページ（ポップアップ時） */
export function general_popupDefaultPage_Dropdown(){
    $("#extPopupDefaultPage_Dropdown").on("change", function(e){
        var pageId = $(this).val()
        if(pageId!=="__auto__"){
            var page = getOptionPageFromId(pageId)
            if((page.tabs===undefined || page.tabs) && !page.separator && page.title && page.id){
                chrome.storage.local.set({extPopupDefaultPage: pageId})
            }else{
                chrome.storage.local.set({extPopupDefaultPage: "__auto__"})
            }
        }else{
            chrome.storage.local.set({extPopupDefaultPage: pageId})
        }
    })

    function restoreDropdown(value){
        var elm = $("#extPopupDefaultPage_Dropdown")
        
        elm.empty()
        elm.append(`<option value="__auto__">自動（閲覧中のページに合わせる）</option>`)
        $.each(optionCategoryList, function(_, page){
            if((page.tabs===undefined || page.tabs) && !page.separator && page.title && page.id){
                elm.append(`<option value="${escapeHtml(page.id)}">ページ「${escapeHtml(page.title)}」</option>`)
            }
        })
        elm.val(value)
    }

    chrome.storage.local.get("extPopupDefaultPage", function(data){
        restoreDropdown(data.extPopupDefaultPage)
    })

    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.extPopupDefaultPage){
            restoreDropdown(changes.extPopupDefaultPage.newValue)
        }
    })
}

/* 設定データ */
/* 設定データをリセット */
export function general_removeOptionData(){
    $("#removeOptionData").on("click", function(){
        if(window.confirm('スキンを含む、保存されているデータが全てリセットされます。\nこの操作は元に戻せません。')){
            chrome.storage.local.clear(()=>{
                console.log("Reset all options.")
                chrome.storage.local.set(defaultOption)
                console.log("Set all options.")

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

/* 設定データを修復 */
export function general_fixOptionData(){
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

/* 設定データのエクスポート */
export function general_exportOptionData(){
    /* Export Button */
    $("#option-export-json").on("click", (e)=>{
        chrome.storage.local.get(null, function(data) {
            var date = getDatetimeStringForFilename()
            console.log(date)
            var d = formatOption(data)
            console.log(d)
            if(d){
                saveJson(formatOption(data), `nt-option-${date}.json`)
            }
        });
    })
    $("#option-export-text").on("click", (e)=>{
        $("#option-export-output").css("display", "block")
        chrome.storage.local.get(null, function(data) {
            var field = $("#option-export-output--field")
            var d = formatOption(data)
            if(d){
                field.val(JSON.stringify(d, null, "\t"))
                field.trigger("input")
            }
        });
    })
}

/* 設定データのインポート */
export function general_importOptionData(){
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
                var option = formatOption(raw)
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


/* デバッグ機能 */
/* 設定データを閲覧 */
export function general_exportOptionText() {
    /* local */
    function changeLocal(){
        chrome.storage.local.get(null, (data)=>{
            try{
                var input = $("#exportLocalOptionText_Input")
                const ignores = input.val().split(/\s/)
                $.each(ignores, function(_, elm){
                    if(elm in data){
                        delete data[elm]
                    }
                })

                var text = JSON.stringify(data, null, 4)
                var field = $("#exportLocalOptionText_Output")
                field.text(text)
                field.trigger("input")
            }catch(e){
            }
        })
    }

    /* sync */
    function changeSync(){
        chrome.storage.sync.get(null, (data)=>{
            try{
                var input = $("#exportSyncOptionText_Input")
                const ignores = input.val().split(/\s/)
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
    }

    /* session */
    function changeSession(){
        chrome.storage.session.get(null, (data)=>{
            try{
                var input = $("#exportSessionOptionText_Input")
                const ignores = input.val().split(/\s/)
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
    }
    
    try{
        changeLocal()
        chrome.storage.local.onChanged.addListener(function(changes){
            changeLocal()
        })
        $("#exportLocalOptionText_Input").on("input", function(e){
            changeLocal()
        })

        changeSync()
        chrome.storage.sync.onChanged.addListener(function(changes){
            changeSync()
        })
        $("#exportSyncOptionText_Input").on("input", function(e){
            changeSync()
        })

        changeSession()
        chrome.storage.session.onChanged.addListener(function(changes){
            changeSession()
        })
        $("#exportSessionOptionText_Input").on("input", function(e){
            changeSession()
        })
    }catch(e){
        console.warn(e)
    }
}

/* 設定データの変更履歴 */
export function general_monitorOptionChanged(){
    try{
        function addText(storageName, changes){
            var field = $("#option-monitor--output")

            var currentLine = ""
            if(!$("#option-monitor--mode-reset").prop('checked')){
                currentLine = field.val()
            }

            var keys = Object.keys(changes)
            if(keys.length>1){
                var addLine = `# [${storageName}] ${getDatetimeString()} @ ${keys.length} values changed\n`
            }else{
                var addLine = `# [${storageName}] ${getDatetimeString()} @ ${keys.length} value changed\n`
            }
            $.each(keys, function(_, key){
                try{
                    addLine += `\t${key}: ` + JSON.stringify(changes[key]) + "\n"
                }catch{

                }
            })
            addLine += "\n"
            field.val(currentLine + addLine)
        }

        $("#option-monitor--clear").on("click", function(e){
            $("#option-monitor--output").val("")
        })
        chrome.storage.local.onChanged.addListener(function(changes){
            if($("#option-monitor--option-local").prop('checked')){
                addText("local", changes)
            }
        })
        chrome.storage.sync.onChanged.addListener(function(changes){
            if($("#option-monitor--option-sync").prop('checked')){
                addText("sync", changes)
            }
        })
        chrome.storage.session.onChanged.addListener(function(changes){
            if($("#option-monitor--option-session").prop('checked')){
                addText("session", changes)
            }
        })
    }catch(e){
        console.warn(e)
    }
}

/* 設定データの直接変更 */
export function general_insertOptionData(){
    try {
        $("#option-insert--button").on("click", function(){
            try {
                $("#option-insert--error").text("")
                const storage = $("#option-insert--storage").val()
                const key = $("#option-insert--key").val().trim()
                const value = $("#option-insert--value").val().trim()
                var json

                if(key.length==0){
                    json = value
                }
                else{
                    json = `{"${key}":${value}}`
                }
                if(value.length==0){
                    if(window.confirm('値が指定されていません。指定されたキーの設定データを削除しますが、よろしいですか？')){
                        if(storage=="local"){
                            chrome.storage.local.remove(key)
                        }else if(storage=="sync"){
                            chrome.storage.sync.remove(key)
                        }else if(storage=="session"){
                            chrome.storage.session.remove(key)
                        }else{
                            $("#option-insert--error").text(`不正なストレージが指定されました: ${key}`)
                            return false
                        }
                    }else{
                        $("#option-insert--error").text(`操作がキャンセルされました`)
                        return false
                    }
                }else{
                    var dict
                    try {
                        dict = JSON.parse(json)
                    }catch(e){
                        $("#option-insert--error").text(`構文の解釈に失敗しました: ${e}`)
                        console.warn(e)
                        return false
                    }

                    if(storage=="local"){
                        chrome.storage.local.set(dict)
                    }else if(storage=="sync"){
                        chrome.storage.sync.set(dict)
                    }else if(storage=="session"){
                        chrome.storage.session.set(dict)
                    }else{
                        $("#option-insert--error").text(`不正なストレージが指定されました: ${key}`)
                        return false
                    }
                }

            }catch(e){
                $("#option-insert--error").text(`操作に失敗しました: ${e}`)
                console.warn(e)
            }
        })
    }catch(e){
        $("#option-insert--error").text(`操作に失敗しました: ${e}`)
        console.warn(e)
    }
}