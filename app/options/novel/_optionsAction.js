import { addFontAwesomeOriginaIcons, getExceptedIcon, novelIconList } from "../../utils/header.js"
import { replacePattern } from "../../../utils/option.js"
import { addFontEditButtonEvent, restoreFont } from "./_optionsAction_Font.js"
import { addSkinEditButtonEvent, restoreSkins } from "./_optionsAction_Skin.js"

/* 全般 */
export function novel_customHeaderSortable(){
    addFontAwesomeOriginaIcons()

    /* Novel Header */
    function storeNovelHeader(){
        chrome.storage.local.set(
            {
                novelCustomHeaderLeft: getHeaderIconList("left"),
                novelCustomHeaderRight: getHeaderIconList("right")
            }
        )
    
        function getHeaderIconList(position){
            if(position!="right" && position!="left" && position!="disabled") { return }
        
            var list = []
            $(".draggable_area[name='novel-header']#"+position+" .icon-element").each((_, icon)=>{
                list.push($(icon).attr("id"))
            })
            return list;
        }
    }
    
    if($(".draggable_area[name='novel-header']").length){
        Sortable.create($(".draggable_area[name='novel-header']#left")[0], {
            handle: '.icon-element',
            sort: 1,
            group: {
                name: 'header-icon',
                pull: true,
                put: true
            },
            animation: 150,
            onAdd: function (e) {
                storeNovelHeader();
            },
            onChange: function (e) {
                storeNovelHeader();
            },
        });
        Sortable.create($(".draggable_area[name='novel-header']#right")[0], {
            handle: '.icon-element',
            sort: 1,
            group: {
                name: 'header-icon',
                pull: true,
                put: true
            },
            animation: 150,
            onAdd: function (e) {
            storeNovelHeader();
            },
            onChange: function (e) {
            storeNovelHeader();
            },
        });
        Sortable.create($(".draggable_area[name='novel-header']#disabled")[0], {
            handle: '.icon-element',
            animation: 150,
            sort: 1,
            group: {
                name: 'header-icon',
                pull: true,
                put: true,
            },
            animation: 150,
            onAdd: function (e) {
            storeNovelHeader();
            },
            onChange: function (e) {
            storeNovelHeader();
            },
        });
    }

    /* Novel Header */
    function getNovelHeaderIconElement(id){
        let icon = novelIconList[id]
        var text = icon.text

        return `
        <div id="`+id+`" class="icon-element" draggable="true">
            <i class="`+icon.icon+`"></i>
            <span class="title">`+text+`</span>
        </div>`
    }
    chrome.storage.local.get(["novelCustomHeaderLeft", "novelCustomHeaderRight"], function(data){
        restore(data.novelCustomHeaderLeft, "left")
        restore(data.novelCustomHeaderRight, "right")
        restore(getExceptedIcon([data.novelCustomHeaderLeft, data.novelCustomHeaderRight]), "disabled")

        function restore(data, position){
            $(".draggable_area[name='novel-header']#"+position).empty()
            $.each(data, (_, icon)=>{
                if(icon in novelIconList)
                $(".draggable_area[name='novel-header']#"+position).append(getNovelHeaderIconElement(icon))
            })
        }
    })
}

/* スキン */
export function novel_skinEditor(){
    addSkinEditButtonEvent()
    restoreSkins()
}

/* フォント */
export function novel_fontEditor(){
    addFontEditButtonEvent()
    restoreFont()
}

/* 文章校正 */
export function novel_replacePattern(){
    /* Add Button */
    $("#correction-replace--pattern-box-addition").on("click", function(){
        chrome.storage.local.get(["correctionReplacePatterns"], function(data){
            data.correctionReplacePatterns.push(replacePattern)
            chrome.storage.local.set({correctionReplacePatterns: data.correctionReplacePatterns}, function(){})
        })
    })

    /* Storage Listener */
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.correctionReplacePatterns!=undefined){
            restoreReplacePattern()
        }
    })

    restoreReplacePattern()

    function restoreReplacePattern(){
        chrome.storage.local.get(["correctionReplacePatterns"], function(data){
            var elementsAmount = $(".correction-replace--pattern-box").length
            var listLength = data.correctionReplacePatterns.length
            if(listLength<elementsAmount){
                for(var i=0; i<(elementsAmount-listLength); i++){
                    var idx = listLength + i
                    $(".correction-replace--pattern-box[data-for='"+idx+"']").remove()
                }
            }

            $.each(data.correctionReplacePatterns, function(idx, pattern){
                var box = $(".correction-replace--pattern-box[data-for='"+idx+"']")
                if(!box.length){
                    $("#correction-replace--patterns #correction-replace--pattern-box-addition").before(`
                        <div class="correction-replace--pattern-box" data-for="`+idx+`">
                            <div class="correction-replace--move-buttons">
                                <div class="correction-replace--move-front correction-replace--icons"><i class="fa-solid fa-sort-up"></i></div>
                                <div class="correction-replace--move-back correction-replace--icons"><i class="fa-solid fa-sort-down"></i></div>
                            </div>
                            <div class="correction-replace--active-button correction-replace--icons"><i class="fa-solid fa-circle"></i></div>
                            <div class="correction-replace--fields">
                                <input class="correction-replace--pattern" type="text">
                                <span><i class="fa-solid fa-angles-right"></i></span>
                                <input class="correction-replace--replacement" type="text">
                            </div>
                            <div class="correction-replace--regex-button correction-replace--icons"><i class="fa-solid fa-asterisk"></i></div>
                            <div class="correction-replace--remove-button correction-replace--icons"><i class="fa-solid fa-trash"></i></div>
                        </div>
                    `)
                    box = $(".correction-replace--pattern-box[data-for='"+idx+"']")
                }

                box.find(".correction-replace--pattern").val(pattern.pattern)
                box.find(".correction-replace--replacement").val(pattern.replacement)
                if(pattern.regex){
                    box.find(".correction-replace--regex-button").addClass("enabled")
                }else{
                    box.find(".correction-replace--regex-button").removeClass("enabled")
                }
                if(pattern.active){
                    box.find(".correction-replace--active-button").addClass("enabled")
                }else{
                    box.find(".correction-replace--active-button").removeClass("enabled")
                }
            })

            /* Events */
            $(".correction-replace--pattern-box .correction-replace--move-front").on("click", function(){ // Up Button
                var idx = parseInt($(this).parent().parent().attr("data-for"))
                chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                    var patterns = data.correctionReplacePatterns
                    if(idx>0){
                        [patterns[idx], patterns[idx-1]] = [patterns[idx-1], patterns[idx]]
                        chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})

                    }
                })
            })
            $(".correction-replace--pattern-box .correction-replace--move-back").on("click", function(){ // Down Button
                var idx = parseInt($(this).parent().parent().attr("data-for"))
                chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                    var patterns = data.correctionReplacePatterns
                    if(idx<patterns.length-1){
                        [patterns[idx], patterns[idx+1]] = [patterns[idx+1], patterns[idx]]
                        chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
                    }
                })
            })
            $(".correction-replace--pattern-box .correction-replace--regex-button").on("click", function(){ // Regex Button
                var idx = parseInt($(this).parent().attr("data-for"))
                var elm = $(this)
                chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                    var patterns = data.correctionReplacePatterns
                    if(elm.hasClass("enabled")){
                        patterns[idx].regex = false
                    }else{
                        patterns[idx].regex = true
                    }
                    chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
                })
            })
            $(".correction-replace--pattern-box .correction-replace--active-button").on("click", function(){ // Active Button
                var idx = parseInt($(this).parent().attr("data-for"))
                var elm = $(this)
                chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                    var patterns = data.correctionReplacePatterns
                    if(elm.hasClass("enabled")){
                        patterns[idx].active = false
                    }else{
                        patterns[idx].active = true
                    }
                    chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
                })
            })
            $(".correction-replace--pattern-box .correction-replace--remove-button").on("click", function(){ // Trash Button
                var idx = parseInt($(this).parent().attr("data-for"))
                chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                    var patterns = data.correctionReplacePatterns
                    patterns.splice(idx, 1)
                    chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
                })
            })
            $(".correction-replace--pattern-box .correction-replace--pattern").on("change", function(){ // Pattern Fields
                var idx = parseInt($(this).parent().parent().attr("data-for"))
                var value = $(this).val()
                chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                    var patterns = data.correctionReplacePatterns
                    patterns[idx].pattern = value
                    chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
                })
            })
            $(".correction-replace--pattern-box .correction-replace--replacement").on("change", function(){ // Replacement Fields
                var idx = parseInt($(this).parent().parent().attr("data-for"))
                var value = $(this).val()
                chrome.storage.local.get(["correctionReplacePatterns"], function(data){
                    var patterns = data.correctionReplacePatterns
                    patterns[idx].replacement = value
                    chrome.storage.local.set({correctionReplacePatterns: patterns}, function(){})
                })
            })
        })
    }

}