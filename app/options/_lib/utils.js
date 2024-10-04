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
        var data_for
        var action_value
        var action_mode
        var data_type

        /* data_for (前提となる設定項目のID) */
        if(elm.is("[data-for]")){
            data_for = $(this).attr("data-for").trim().split(/ +/)
        }else{
            return true
        }

        /* data (前提となる設定項目のトリガー値) */
        if(elm.is("[data]")){
            action_value = $(this).attr("data").trim().split(/ +/)
        }else{
            return true
        }

        if(data_for.length > action_value.length){
            var k = action_value.length
            for(var i=0; i < data_for.length-action_value.length; i++){
                action_value.push(action_value[k-1])
            }
        }else if(data_for.length < action_value.length){
            action_value = action_value.slice(0, data_for.length)
        }

        /* mode */
        if(elm.is("[mode]")){
            action_mode = $(this).attr("mode").trim().split(/ +/)
        }else{
            action_mode = new Array(data_for.length).fill("show")
        }

        if(data_for.length > action_mode.length){
            var k = action_mode.length
            for(var i=0; i < data_for.length-action_mode.length; i++){
                action_mode.push(action_mode[k-1])
            }
        }else if(data_for.length < action_value.length){
            action_mode = action_mode.slice(0, data_for.length)
        }

        /* data_type (トリガー値の型) */
        if(elm.is("[data-type]")){
            data_type = $(this).attr("data-type").trim().split(/ +/)
        }else{
            data_type = new Array(data_for.length).fill(undefined)
        }

        if(data_for.length > data_type.length){
            var k = data_type.length
            for(var i=0; i < data_for.length-data_type.length; i++){
                data_type.push(undefined)
            }
        }else if(data_for.length < data_type.length){
            data_type = data_type.slice(0, data_for.length)
        }

        function change(value, action_value, mode, type){

            function compare(source, value, type){
                if(type){
                    if(type==="null"){
                        return source === null
                    }
                    else if(type==="boolean"){
                        return source === (value.toLowerCase() === "true")
                    }
                    else if(type==="string"){
                        return source===value
                    }
                    else if(type==="number"){
                        return source===Number(value)
                    }
                }
                return String(source)===String(value)
            }

            if(compare(value, action_value, type)){
                if(mode==="hide"){
                    elm.addClass("option-hide--hidden")
                }
                else if(mode==="inactive"){
                    elm.addClass("option-hide--inactive")
                }
                else if(mode==="active"){
                    elm.removeClass("option-hide--inactive")
                }
                else{ //show
                    elm.removeClass("option-hide--hidden")
                }
            }else{
                if(mode==="hide"){
                    elm.removeClass("option-hide--hidden")
                }
                else if(mode==="inactive"){
                    elm.removeClass("option-hide--inactive")
                }
                else if(mode==="active"){
                    elm.addClass("option-hide--inactive")
                }
                else{ //show
                    elm.addClass("option-hide--hidden")
                }
            }
        }

        chrome.storage.local.get(data_for, function(data){
            $.each(data_for, function(i, key){
                if(key in data){
                    change(data[key], action_value[i], action_mode[i], data_type[i])
                }
            })
        })

        chrome.storage.local.onChanged.addListener(function(changes){
            $.each(data_for, function(i, key){
                if(changes[key]){
                    change(changes[key].newValue, action_value[i], action_mode[i], data_type[i])
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
                $(".option--experimental-message").append("<a href='/options/general/index.html?id=extExperimentalFeatures&focus=1&category=config' target='_self'>【実験中の機能】不具合が発生する可能性があります。ご注意ください。</a>")
            }else{
                elm.addClass("option-hide--experimental")
                $(".option--experimental-message").append("<a href='/options/general/index.html?id=extExperimentalFeatures&focus=1&category=config' target='_self'>「実験中の機能」が無効のため使用できません。<br><span style='font-size: 80%;'>※ [全般] → [環境設定] → [実験中の機能]を有効化</span></a>")
            }
        }

        // Elements
        if(!elm.hasClass("option-hide--experimental-processed")){
            if(elm.find(".search-result--items-title").length){
                elm.find(".search-result--items-title").prepend(
                    `<i class="fa-solid fa-flask" style="margin-right: 5px;"></i>`
                )
            }else{
                elm.find(".contents-item--heading:first").prepend(
                    `<i class="fa-solid fa-flask" style="margin-right: 5px;"></i>`
                )
            }
            elm.find(".contents-item--description:first").prepend(
                `<div class="option--experimental-message"></div>`
            )
            elm.addClass("option-hide--experimental-processed")
        }

            
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
        if(!elm.hasClass("option-hide--advanced-processed")){
            if(elm.find(".search-result--items-title").length){
                elm.find(".search-result--items-title").prepend(
                    `<i class="fa-solid fa-feather" style="margin-right: 5px;"></i>`
                )
            }else{
                elm.find(".contents-item--heading:first").prepend(
                    `<i class="fa-solid fa-feather" style="margin-right: 5px;"></i>`
                )
            }
            elm.addClass("option-hide--advanced-processed")
        }

            
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