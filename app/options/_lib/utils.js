export function buttonHide(){
    $(".button-hide").each(function(){
        var name = $(this).attr("name")
        var data_for = $(this).attr("data-for")
        var set_class = $(this).attr("data")

        $(this).on("click", function(e){
            if(!$(this).hasClass(set_class)){
                $(`.button-hide.${set_class}[name="${name}"]`).removeClass(set_class)
                $(this).addClass(set_class)

                $(`.button-hide-target[name="${name}"]`).addClass("button-hide--hidden")
                $(`.button-hide-target${data_for}[name="${name}"]`).removeClass("button-hide--hidden")
            }
        })
    })
}

export function optionHide(){
    $(".option-hide").each(function(){
        let elm = $(this)
        const data_for_raw = $(this).attr("data-for")
        const data_for = data_for_raw.split(/ +/)
        const action_value = $(this).attr("data")
        const mode = $(this).attr("mode")

        function change(value){
            if(String(value)==String(action_value)){
                if(mode=="hide"){
                    elm.addClass("option-hide--hidden")
                }
                else if(mode=="inactive"){
                    elm.addClass("option-hide--inactive")
                }
                else if(mode=="active"){
                    elm.removeClass("option-hide--inactive")
                }
                else{ //show
                    elm.removeClass("option-hide--hidden")
                }
            }else{
                if(mode=="hide"){
                    elm.removeClass("option-hide--hidden")
                }
                else if(mode=="inactive"){
                    elm.removeClass("option-hide--inactive")
                }
                else if(mode=="active"){
                    elm.addClass("option-hide--inactive")
                }
                else{ //show
                    elm.addClass("option-hide--hidden")
                }
            }
        }

        chrome.storage.local.get(data_for, function(data){
            $.each(data_for, function(_, key){
                if(key in data){
                    change(data[key])
                }
            })
        })

        chrome.storage.local.onChanged.addListener(function(changes){
            $.each(data_for, function(_, key){
                if(changes[key]){
                    change(changes[key].newValue)
                }
            })
            
        })
    })

    
    $(".experimental-hide").each(function(){
        var elm = $(this)

        function change(value){
            $(".option--experimental-message").empty()
            if(value){
                elm.removeClass("option-hide--experimental")
                $(".option--experimental-message").text("【実験的機能】不具合が発生する可能性があります。ご注意ください。")
            }else{
                elm.addClass("option-hide--experimental")
                $(".option--experimental-message").append("実験的機能が無効のため使用できません。<br><span style='font-size: 80%;'>※ [全般] → [環境設定] → [高度な設定]を有効化 → [実験的機能]を有効化</span>")
            }
        }

        // Elements 
        elm.find(".contents-item--heading").prepend(
            `<i class="fa-solid fa-flask" style="margin-right: 5px;"></i>`
        )
        elm.find(".contents-item--description").prepend(
            `<div class="option--experimental-message"></div>`
        )

            
        chrome.storage.local.get(["extExperimentalFeatures"], function(data){
            change(data.extExperimentalFeatures)
        })

        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.extExperimentalFeatures!=undefined){
                change(changes.extExperimentalFeatures.newValue)
            }
        })
    })

    $(".advanced-hide").each(function(){
        var elm = $(this)

        function change(value){
            $(".option--advanced-message").empty()
            if(value){
                elm.removeClass("option-hide--advanced")
            }else{
                elm.addClass("option-hide--advanced")
            }
        }

        // Elements 
        elm.find(".contents-item--heading").prepend(
            `<i class="fa-solid fa-feather" style="margin-right: 5px;"></i>`
        )

            
        chrome.storage.local.get(["extAdvancedSettings"], function(data){
            change(data.extAdvancedSettings)
        })

        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.extAdvancedSettings!=undefined){
                change(changes.extAdvancedSettings.newValue)
            }
        })
    })
}

export function colorPicker(){
    /* Color Picker */
    Coloris({
        el: '.color',
        theme: 'polaroid',
        formatToggle: true,
        alpha: true,
        closeButton: true,
        clearButton: true,
        clearLabel: 'クリア',
        closeLabel: '閉じる'
    });
    document.querySelectorAll('.color').forEach(input => {
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    $(".color").on("change", function(){
        document.querySelectorAll('.color').forEach(input => {
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
    })
    
}

export function syntaxHighlight(){
    var i = 1
    $(".syntax-highlight").each(function(){
        var textarea = $(this)
        var language = textarea.attr("data")
        textarea.wrap(`<div class="syntax-highlight-wrap" id="highlight-${i}"></div>`)
        textarea.after(`<pre><code class="${language}"></code></pre>`)

        var wrapper = textarea.parent()
        var dummyWrapper = wrapper.find("pre")
        var dummy = dummyWrapper.find("code")

        resizeTextArea()
        var dataset
        textarea.on("input", function(){
            dummy[0].innerHTML = hljs.highlight(textarea.val() + "\u200b", {language: language}).value;
        })
        textarea.on("scroll", function(e){
            dummyWrapper.scrollTop(e.target.scrollTop)
        })

        var resizeInt = null;
        var resizeEvent = function() {
            dummyWrapper.height(textarea.height());
        };
        textarea.on("mousedown", function(e) {
            resizeInt = setInterval(resizeEvent, 1);
        })
        $(window).on("mouseup", function(e) {
            if (resizeInt != null) {
                clearInterval(resizeInt)
            }
        });

        function resizeTextArea() {
            dummy.addClass("resizing");
            wrapper.css("height", `${dummy.scrollHeight + 20}px`)
            dummy.removeClass("resizing");
        }
    })
}