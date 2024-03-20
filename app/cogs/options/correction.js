const replacePattern = {
    pattern: "",
    replacement: "",
    regex: false,
    active: true
}

export function restoreReplacePattern(){
    chrome.storage.local.get(["correctionReplacePatterns"], function(data){
        console.log(data)
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

export function addReplacePatternEditButtonEvent(){
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
}