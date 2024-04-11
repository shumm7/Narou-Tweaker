import { getNcode, getEpisode } from "./utils.js"


export function _novel(){
    var ncode = getNcode()
    var episode = getEpisode()
    var title
    var chapter = undefined
    
    if(episode==0){
        title = $(".novel_title")
    }else{
        title = $("#container .contents1 a[href='/"+ncode+"/']")
        if($("#container .contents1 .chapter_title").length){
            chapter = $("#container .contents1 .chapter_title").text()
        }

    }

    if(episode==0){
        var d_1 = `<div class="novel-title">`+title.text()+`</div>`
        var d_2

        if($("#novel_contents .novel_writername a").length){
            var author = $("#novel_contents .novel_writername a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $("#novel_contents .novel_writername").text().trim().match(/作者：(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }

        $("#novel_contents").before(`
        <div class="contents1">
            <div class="novel-titles" id="ep-`+episode+`">
                `+d_1+`
                `+d_2+`
            </div>
        </div>
        `)
        $(".novel_title").remove()
        $(".novel_writername").remove()

    }else{
        title.remove()
        var d = `<div class="novel-titles" id="ep-`+episode+`"></div>`
        var d_1 = `<div class="novel-title"><a href="`+title.prop("href")+`">`+title.text()+`</a></div>`
        var d_2

        if($("#container .contents1 a").length){
            var author = $("#container .contents1 a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $("#container .contents1").text().trim().match(/作者：(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }
        if(chapter){
            $("#novel_no").after("<div class='novel-chapter'>"+chapter+"</div>")
        }
        
        $("#container .contents1").empty()
        $("#container .contents1").append(d)
        $("#container .contents1 .novel-titles").append(d_1 + d_2)
    }
    


    if(episode==1){
        
    }else if(episode>1){

    }
}

export function _tategaki(){
    chrome.storage.local.get(null, (data) => {
        if(data.novelVertical){
            $("#novel_honbun").wrap(`<div id="novel_vertical_wrapper" style="position: relative;"><div id="novel_vertical_items">`)
            $("body").addClass("narou-tweaker-vertical")
            var items = $("#novel_vertical_items")

            // Elements (Prepend)
            $(".novel_subtitle").prependTo(items)
            $(".novel-chapter").prependTo(items)
            $("#novel_no").prependTo(items)
            $(".novel_bn:first-child()").prependTo(items)
            $(".contents1").prependTo(items)

            // Elements (Append)
            $(".novel_bn:last-child()").appendTo(items)
            
            if($('#novel_vertical_items').length){
                var width = $("#novel_vertical_items").width() - 300

                gsap.to('#novel_vertical_items', {
                    x: () => (width),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#novel_vertical_wrapper',
                        start: () => `top top`,
                        end: () => `+=${width}`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }
        }
    })
}