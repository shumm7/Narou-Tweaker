import { replaceUrl, getDatetimeStringWithoutSecond } from "../../utils/text.js"
import { getEpisode, checkNovelPageDetail, isR18 } from "./utils.js"
import { getNcode } from "../../utils/ncode.js";
import { escapeRegex, getNovelSearchURL, getNovelTagURL } from "../../utils/text.js";
import { novelTop } from "./_novelTop.js";

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
        if(data.novelForceMypageLink){
            _authorLink()
        }
        if(pageDetail=="novel"){
            $("body").addClass("narou-tweaker--novel-page")
            if(data.novelVertical){
                _tategaki()
            }
            _autoURL()
            _saveHistory()
            if(data.novelAttentionBanner && getEpisode()==0){
                novelTopAttention()
            }
        }else if(pageDetail=="top"){
            $("body").addClass("narou-tweaker--novel-page")
            novelTop()
            _saveHistory()
            if(data.novelShowHistoryOnSublist){
                _history()
            }
            if(data.novelAttentionBanner){
                novelTopAttention()
            }
        }else if(pageDetail=="series"){
            $("body").addClass("narou-tweaker--series")
        }else{
            $("body").addClass("narou-tweaker--novelcom-page")
        }
        _cursorHide()
    })
}


function _novelPage(){
    const ncode = getNcode()
    const episode = getEpisode()
    var title
    var chapter = undefined
    
    if(episode==0){
        title = $(".p-novel__title")
    }else{
        $(".l-container .l-main .c-announce:has(a[href='/"+ncode+"/'])").addClass("c-announce--novel-detail")
        title = $(".c-announce--novel-detail a[href='/"+ncode+"/']")
        if($(".c-announce--novel-detail span").length){
            $(".c-announce--novel-detail span").addClass("chapter_title")
            var chapter_elm = $(".c-announce--novel-detail span")
            chapter = chapter_elm.text()
            chapter_elm.remove()
        }
    }

    if(episode==0){
        var d_1 = `<div class="novel-title">`+title.text()+`</div>`
        var d_2

        if($(".p-novel__author a").length){
            var author = $(".p-novel__author a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $(".p-novel__author").text().trim().match(/作者：(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }

        $(".l-main > .c-announce-box").append(`
        <div class="c-announce c-announce--novel-detail">
            <div class="novel-titles" id="ep-`+episode+`">
                `+d_1+`
                `+d_2+`
            </div>
        </div>
        `)
        $(".p-novel__title").remove()
        $(".p-novel__author").remove()

    }else{
        title.remove()
        var d = `<div class="novel-titles" id="ep-`+episode+`"></div>`
        var d_1 = `<div class="novel-title"><a href="`+title.prop("href")+`">`+title.text()+`</a></div>`
        var d_2

        if($(".c-announce--novel-detail a").length){
            var author = $(".c-announce--novel-detail a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $(".c-announce--novel-detail").text().trim().match(/作者：\s(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }
        if(chapter){
            $(".p-novel__number").after("<div class='novel-chapter'>"+chapter+"</div>")
        }
        
        $(".c-announce--novel-detail").empty()
        $(".c-announce--novel-detail").append(d)
        $(".c-announce--novel-detail .novel-titles").append(d_1 + d_2)
    }
}

function _tategaki(){
    $(".p-novel__body").wrap(`<div id="novel_vertical_wrapper" style="position: relative;"><div id="novel_vertical_items">`)
    $("body").addClass("narou-tweaker-vertical")
    var items = $("#novel_vertical_items")

    // Elements (Prepend)
    $(".p-novel__text--preface").prependTo(items)
    $(".p-novel__title").prependTo(items)
    $(".novel-chapter").prependTo(items)
    $(".p-novel__number").prependTo(items)
    $(".c-pager:first-child()").prependTo(items)
    $(".c-announce--novel-detail").prependTo(items)
    $(".p-novel__series").prependTo(items)

    // Elements (Append)
    $(".p-novel__text--afterword").appendTo(items)
    $(".c-pager:last-child()").appendTo(items)
    
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
            $('.p-novel__text--preface p').each(function (idx, elem) {
                replaceUrl(elem, false)
            });
        }
        
        if(data.novelAfterwordAutoURL){
            $('.p-novel__text--afterword p').each(function (idx, elem) {
                replaceUrl(elem, false)
            });
        }
    })
}

function _cursorHide(){
    chrome.storage.local.get(null, (data) => {
        if(data.novelCursorHide){
            var resizeTimer = null
            var timeout = parseFloat(data.novelCursorHideTimeout)

            if(!isNaN(timeout) || timeout>0){
                $(window).on('load mousemove', function() {
                    clearTimeout(resizeTimer)
                    $('body').removeClass('narou-tweaker-cursor-hide')
                    resizeTimer = setTimeout(function() {
                        $('body').addClass('narou-tweaker-cursor-hide')
                    }, timeout * 1000)
                });
            }
        }
    })

}

function _history(){
    chrome.storage.local.get(null, function(data){
        const ncode = getNcode()

        if(ncode){
            if($(".p-eplist").length){
                var outer = $(`<div class="novelview_history-box"></div>`)
                var showHistory = false

                if($(".novellingindex_bookmarker_no").length){
                    var elm = $(".novellingindex_bookmarker_no")
                    var link = elm.find("a").prop("href")
                    var text = elm.find("a").text()
                    outer.append(`
                        <div class="novelview_history-item" id="novel_siori">
                            <i class="fa-solid fa-bookmark"></i><a href="${link}">${text}</a>
                        </div>
                    `)
                    showHistory = true

                }else if($("meta[name='siori']").length){
                    var elm = $("meta[name='siori']")
                    var link = elm.attr("content")
                    var text = elm.attr("property")

                    outer.append(`
                        <div class="novelview_history-item" id="novel_siori">
                            <i class="fa-solid fa-bookmark"></i><a href="${link}">${text}</a>
                        </div>
                    `)
                    showHistory = true
                }

                chrome.storage.sync.get(["history_data"], function(h){
                    const history = h.history_data[ncode]
                    if(history){
                        const episode = history[0]
                        const date = getDatetimeStringWithoutSecond(new Date(history[1]))
                        if(episode){
                            outer.append(`
                                <div class="novelview_history-item" id="novel_history">
                                    <i class="fa-solid fa-clock-rotate-left"></i><a href="https://ncode.syosetu.com/${ncode}/${episode}/">エピソード${episode}</a><span style="font-size: 90%">（${date}）</span>
                                </div>
                            `)
                            showHistory = true

                             /* 目次欄にアンダーラインを追加 */
                            var sublist = $(`.index_box .novel_sublist2:has(a[href="/${ncode}/${episode}/"])`)
                            if(sublist.length){
                                sublist.addClass("underline")
                                sublist.find(".subtitle").append(`<span class="history_now" title="${date}"><i class="fa-solid fa-clock-rotate-left"></i></span>`)
                            }
                        }
                    }
                    if(showHistory){
                        $(".p-eplist").before(outer)
                    }
                })
            }
        }
    })
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

function _authorLink(){
    const atom = $("link[href^='https://api.syosetu.com/writernovel/'][title='Atom']")
    const r18 = isR18()
    const ncode = getNcode()
    const pageDetail = checkNovelPageDetail()
    const episode = getEpisode()
    let userid
    if(atom.length){
        if(location.hostname == "ncode.syosetu.com"){
            userid = atom.prop("href").match(/https:\/\/api\.syosetu\.com\/writernovel\/(\d+)\.Atom/)[1]
        }else if(location.hostname == "novel18.syosetu.com"){
            userid = atom.prop("href").match(/https:\/\/api\.syosetu\.com\/writernovel\/(x\d+[a-z]+)\.Atom/)[1]
        }
    }

    if(userid){
        var userid_link
        if(r18){
            userid_link =`https://xmypage.syosetu.com/${userid}/`
        }else{
            userid_link =`https://mypage.syosetu.com/${userid}/`
        }

        if(pageDetail=="top" || (pageDetail=="novel" && episode==0)){
            if($(".p-novel__author").length){
                if(!$(".p-novel__author a").length){
                    var author_text = $(".p-novel__author")
                    var author = author_text.text().match(/作者：(.*)/)[1]
                    author_text.get(0).innerHTML = `作者：<a href="${userid_link}">${author}</a>`
                }
            }
            else if($(".novel_writername").length){
                var author_text = $(".novel_writername")
                if(!author_text.find("a").length){
                    var author = author_text.text().match(/作者：(.*)/)[1]
                    author_text.get(0).innerHTML = `作者：<a href="${userid_link}">${author}</a>`
                }
            }
        }else if(pageDetail=="novel"){
            if($(".novel-author").length){
                if(!$(".novel-author a").length){
                    $(".novel-author").wrapInner(`<a href="${userid_link}">`)
                }
            }else if($(".contents1").length){
                var outer = $(".contents1").clone()
                var elm_atteintion = outer.find(".attention")
                var elm_title = outer.find("a[href='/"+ncode+"/']")
                var elm_chapter = outer.find(".chapter_title")
                var elm_atteintion_c = elm_atteintion.clone()
                var elm_title_c = elm_title.clone()
                var elm_chapter_c = elm_chapter.clone()

                elm_atteintion.remove()
                elm_title.remove()
                elm_chapter.remove()

                if(!outer.find("a").length){
                    var author = $("#container .contents1").text().trim().match(/作者：(.*)/)[1]
                    var outer = $(".contents1")
                    outer.empty()
                    outer.append(elm_atteintion)
                    outer.append(elm_title_c)
                    outer.append(` 作者：<a href="${userid_link}">${author}</a> `)
                    outer.append(elm_chapter_c)
                }
            }
        }else if(pageDetail=="info"){
            $("#noveltable1 tr").each(function(){
                const header = $(this).find("th").text()
                if(header == "作者名"){
                    var elm = $(this).find("td")
                    if(!elm.find("a").length){
                        const author = elm.text()
                        elm.empty()
                        elm.append(`<a href="${userid_link}">${author}</a>`)
                    }
                }
            })
        }
    }
}

function novelTopAttention(){
    var attention = $(".c-announce-box .c-announce:not(.c-announce--note):has(.c-announce__emphasis)")
    if(attention.length){
        attention.empty()
    }else{
        $(".c-announce-box").append(`<div class="c-announce c-announce__attention"></div>`)
        attention = $(".c-announce.c-announce__attention")
    }

    const ncode = getNcode()
    const r18 = isR18()

    var url = "https://api.syosetu.com/novelapi/api/?out=json&libtype=2&ncode=" + ncode
    if(r18){
        var url = "https://api.syosetu.com/novel18api/api/?out=json&libtype=2&ncode=" + ncode
    }

    chrome.runtime.sendMessage({action: "fetch", format: "json", data: {url: url, options: {'method': 'GET'}}}, function(response){
        if(response){
            if(response.success && response.action=="fetch"){
                const data = response.result[1]
                let tags = data.keyword.split(/\s/)
                var site = data.nocgenre

                function removeItem(item){
                    tags = tags.filter(n => n != item)
                }

                /*
                chrome.storage.local.get(["novelOfficialTags"], (data) => {
                    if(data.novelOfficialTags){
                        setTags(data.novelOfficialTags)
                    }else{
                        chrome.runtime.sendMessage({action: "fetch", format: "text", data: {url: "https://yomou.syosetu.com/", options: {'method': 'GET'}}}, function(response){
                            if(response){
                            if(response.success && response.action=="fetch"){
                                var html = $($.parseHTML(response.result))
                                var t = []
                                html.find(".p-search-novel .p-search-novel__keyword .p-search-novel__keyword-item").each(function(){
                                    var tag = $(this).text()
                                    t.push(tag)
                                })
                                chrome.storage.local.set({novelOfficialTags: t})
                                setTags(t)
                            }
                            }
                        })
                    }
                })
                */
                setTags()

                function setTags(officialTagList){
                    if(r18){
                        attention.append(`<span class="nt-novel-attention-label nt-novel-attention-label--rating-r18"><a href="${getNovelSearchURL(site)}">R18</a></span>`)
                    }
                    if(tags.includes("R15")){
                        attention.append(`<span class="nt-novel-attention-label nt-novel-attention-label--rating-r15"><a href="${getNovelSearchURL(site, {isr15: 1})}">R15</a></span>`)
                        removeItem("R15")
                    }
                    
                    if(tags.includes("二次創作")){
                        attention.append(`<span class="nt-novel-attention-label"><a href="${getNovelTagURL("二次創作", site)}"><i class="fa-solid fa-code-merge"></i>二次創作</a></span>`)
                        removeItem("二次創作")
                    }
                    if(data.iszankoku){
                        attention.append(`<span class="nt-novel-attention-label"><a href="${getNovelSearchURL(site, {iszankoku: 1})}"><i class="fa-solid fa-gun"></i>残酷な描写あり</a></span>`)
                        removeItem("残酷な描写あり")
                    }
                    if(data.isbl){
                        attention.append(`<span class="nt-novel-attention-label"><a href="${getNovelSearchURL(site, {isbl: 1})}"><i class="fa-solid fa-mars-double"></i>ボーイズラブ</a></span>`)
                        removeItem("ボーイズラブ")
                    }
                    if(data.isgl){
                        attention.append(`<span class="nt-novel-attention-label"><a href="${getNovelSearchURL(site, {isgl: 1})}?isgl=1"><i class="fa-solid fa-venus-double"></i>ガールズラブ</a></span>`)
                        removeItem("ガールズラブ")
                    }
                    if(data.istensei){
                        attention.append(`<span class="nt-novel-attention-label"><a href="${getNovelSearchURL(site, {istensei: 1})}"><i class="fa-solid fa-earth-americas"></i>異世界転生</a></span>`)
                        removeItem("異世界転生")
                    }
                    if(data.istenni){
                        attention.append(`<span class="nt-novel-attention-label"><a href="${getNovelSearchURL(site, {istenni: 1})}"><i class="fa-solid fa-earth-americas"></i>異世界転移</a></span>`)
                        removeItem("異世界転移")
                    }

                    /*
                    if(!r18){
                        $.each(officialTagList, function(_, tag){
                            if(tags.includes(tag)){
                                attention.append(`<span class="nt-novel-attention-label nt-novel-attention-label--official"><a href="${getNovelTagURL(tag, site)}"><i class="fa-solid fa-flag"></i>${tag}</a></span>`)
                                removeItem("tag")
                            }
                        })
                    }
                    */
                }

            }
        }
    })
}