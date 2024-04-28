import { replaceUrl, getDatetimeStringWithoutSecond } from "/utils/text.js"
import { getNcode, getEpisode, checkNovelPageDetail } from "./utils.js"

export function _novel(){
    chrome.storage.local.get(null, (data) => {
        const pageDetail = checkNovelPageDetail()
        if(data.novelCustomStyle){
            $("body").addClass("narou-tweaker")
            $("#footer").remove()

            if(pageDetail=="novel"){
                _novelPage()
            }
        }
        if(pageDetail=="novel"){
            if(data.novelVertical){
                _tategaki()
            }
            _autoURL()
            _saveHistory()
        }else if(pageDetail=="top"){
            _novelTop()
            _saveHistory()
            _history()
        }else if(pageDetail=="series"){
            $("body").addClass("narou-tweaker--series")
        }

    })
}

function _novelTop(){
    chrome.storage.local.get(null, (data) => {
        if(data.novelShowAllExtext){
            var Extext = $("#novel_ex")
            var hiddenText = $("#novel_ex .hidden")
            if(hiddenText.length && Extext.length){
                var text = hiddenText[0].innerHTML
                $("#novel_ex .more").remove()
                $("#novel_ex .hidden").remove()
                $("#novel_ex span").remove()
                Extext[0].innerHTML += text
            }
        }
    })
}

function _novelPage(){
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

function _tategaki(){
    $("#novel_honbun").wrap(`<div id="novel_vertical_wrapper" style="position: relative;"><div id="novel_vertical_items">`)
    $("body").addClass("narou-tweaker-vertical")
    var items = $("#novel_vertical_items")

    // Elements (Prepend)
    $("#novel_p").prependTo(items)
    $(".novel_subtitle").prependTo(items)
    $(".novel-chapter").prependTo(items)
    $("#novel_no").prependTo(items)
    $(".novel_bn:first-child()").prependTo(items)
    $(".contents1").prependTo(items)

    // Elements (Append)
    $("#novel_a").appendTo(items)
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

function _autoURL(){
    /* Auto Url */
    chrome.storage.local.get(null, (data) => {
        if(data.novelPrefaceAutoURL){
            $('#novel_p p').each(function (idx, elem) {
                replaceUrl(elem, false)
            });
        }
        
        if(data.novelAfterwordAutoURL){
            $('#novel_a p').each(function (idx, elem) {
                replaceUrl(elem, false)
            });
        }
    })
}

function _history(){
    const ncode = getNcode()

    if(ncode){
        if($(".novelview_pager-box").length){
            chrome.storage.sync.get(["history_data"], function(data){
                const history = data.history_data[ncode]
                if(history){
                    const episode = history[0]
                    const date = history[1]
                    const episode_name = history[2]
                    if(episode){
                        $(".novelview_pager-box").after(`
                            <div id="novel_history">
                                最後に読んだエピソード：<a href="https://ncode.syosetu.com/${ncode}/${episode}/">${episode_name}（ep.${episode}） ${getDatetimeStringWithoutSecond(new Date(date))}</a>
                            </div>
                        `)
                    }
                }
            })
        }
    }
}

function _saveHistory(){
    const ncode = getNcode()
    const episode = getEpisode()

    if(ncode){
        chrome.storage.sync.get(["history", "history_data"], function(data){
            var history = data.history
            var history_data = data.history_data
            if(typeof history != typeof []){
                history = []
            }
            if(typeof history_data != typeof {}){
                history_data = {}
            }


            var new_history = history.filter(n => n != ncode);
            new_history.unshift(ncode)
            if(new_history.length > 300){
                const key = new_history.pop()
                delete history_data[key]
            }
            if(episode){
                var episode_name = $(".novel_subtitle").text()
                if(episode_name.length>20){
                    episode_name = episode_name.substr(0, 20) + "…"
                }
                history_data[ncode] = [episode, Date.now(), episode_name]
            }

            chrome.storage.sync.set({
                history: new_history,
                history_data: history_data
            })
        })
    }
}