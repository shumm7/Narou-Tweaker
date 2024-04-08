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

