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
        var elm = $(this)
        var data_for = $(this).attr("data-for")
        var action_value = $(this).attr("data")
        var mode = $(this).attr("mode")

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

        chrome.storage.local.get([data_for], function(data){
            change(data[data_for])
        })

        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes[data_for]!=undefined){
                change(changes[data_for].newValue)
            }
        })
    })

    
    $(".experimental-hide").each(function(){
        var elm = $(this)

        function change(value){
            if(value){
                elm.removeClass("option-hide--hidden")
            }else{
                elm.addClass("option-hide--hidden")
            }
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

        function resizeTextArea() {
            dummy.addClass("resizing");//ありのままの大きさに戻す
            wrapper.css("height", `${dummy.scrollHeight + 20}px`)
            dummy.removeClass("resizing");
        }
    })
}