import { getNcode } from "/cogs/novel/utils.js";
import { checkRankPageDetail } from "./utils.js";
import { escapeHtml } from "../../utils/text.js";
import { getGenreNumber } from "../../utils/api.js";


export function _rankTop(){
    const pageDetail = checkRankPageDetail()

    chrome.storage.local.get(null, function(data){
        if(pageDetail.site=="yomou"){
            if(pageDetail.detail=="rank" && pageDetail.type == "top"){

                // ランキングトップ（要素追加）
                if(data.yomouRankTop_ShowDescription){
                    $("body").addClass("narou-tweaker--show-story")
                }
                if(data.yomouRankTop_ShowTags){
                    $("body").addClass("narou-tweaker--show-keyword")
                }
                if(data.yomouRankTop_ShowLength){
                    $("body").addClass("narou-tweaker--show-length")
                }
                if(data.yomouRankTop_ShowPoints){
                    $("body").addClass("narou-tweaker--show-points")
                }
                
                showRankTop_NovelDetails()

                chrome.storage.local.onChanged.addListener(function(changes){
                    if(changes.yomouRankTop_ShowDescription!=undefined ||
                        changes.yomouRankTop_ShowTags!=undefined ||
                        changes.yomouRankTop_ShowLength!=undefined ||
                        changes.yomouRankTop_ShowPoints!=undefined
                    ){
                        chrome.storage.local.get(null, function(option){
                            if(option.yomouRankTop_ShowDescription){
                                $("body").addClass("narou-tweaker--show-story")
                                $(".p-ranktop-item__story").css("display", "")
                            }else{
                                $("body").removeClass("narou-tweaker--show-story")
                                $(".p-ranktop-item__story").css("display", "none")
                            }

                            if(option.yomouRankTop_ShowTags){
                                $("body").addClass("narou-tweaker--show-keyword")
                            }else{
                                $("body").removeClass("narou-tweaker--show-keyword")
                            }

                            if(option.yomouRankTop_ShowLength){
                                $("body").addClass("narou-tweaker--show-length")
                            }else{
                                $("body").removeClass("narou-tweaker--show-length")
                            }

                            if(option.yomouRankTop_ShowPoints){
                                $("body").addClass("narou-tweaker--show-points")
                            }else{
                                $("body").removeClass("narou-tweaker--show-points")
                            }
                        })
                    }
                })

            }
        }

    })
}

function showRankTop_NovelDetails(){
    chrome.storage.local.get(null, function(data){
        var i = 1
        $(".p-ranktop-item").each(function(){
            var outer = $(this)

            var header = outer.find(".p-ranktop-item__header").text().trim()
            var rankType
            var rankGenre
            if(header=="日間ランキング"){
                rankType = "daily"
            }else if(header=="週間ランキング"){
                rankType = "weekly"
            }else if(header=="月間ランキング"){
                rankType = "monthly"
            }else if(header=="四半期ランキング"){
                rankType = "quarter"
            }else if(header=="年間ランキング"){
                rankType = "yearly"
            }else if(header=="累計ランキング"){
                rankType = "global"
            }else if(header.match(/^\[日間\]/)){
                rankType = "daily"
                const genre = header.match(/^\[日間\](.*)ランキング/)[1]
                if(genre){
                    rankGenre = getGenreNumber(genre)
                }
            }

            if(rankType){
                outer.attr("ranking-type", rankType)
            }
            if(rankGenre){
                outer.attr("ranking-genre", rankGenre)
            }
            
            outer.find(".p-ranktop-item__item").each(function(){
                var elem = $(this)
                const ncode = getNcode(elem.find(".p-ranktop-item__title a").prop("href"))
                const url = "https://api.syosetu.com/novelapi/api/?out=json&libtype=2&ncode=" + ncode
                const collapsedHeight = 70
                const marginHeight = 16

                if(ncode){
                    chrome.runtime.sendMessage({action: "fetch", format: "json", data: {url: url, options: {'method': 'GET'}}}, function(response){
                        if(response){
                            if(response.success && response.action=="fetch"){
                                var n = response.result[1]

                                // あらすじを表示
                                const j = i
                                var story = n.story
                                story = story.replace(/\r?\n/g, " ")

                                // Set element
                                var story_box = $(`
                                    <div class="p-ranktop-item__story js-readmore-mypage" data-collapsed-height="${collapsedHeight}">
                                        <div class="c-readmore">
                                            <div class="c-readmore__mask js-readmore-mypage__ellipsis" style="max-height: none;" data-readmore aria-expanded="false" id="rmjs-${i}">
                                                ${escapeHtml(story)}
                                            </div>
                                            <a class="c-readmore__button-more" href="javascript:void(0);" data-readmore-toggle="rmjs-${i}" aria-controls="rmjs-${i}">
                                                <span class="p-icon p-icon--plus" aria-label="全て表示"></span>
                                            </a>
                                        </div>
                                    </div>
                                `)
                                elem.find(".p-ranktop-item__title").after(story_box)

                                // Set Event
                                var inner = $(`.js-readmore-mypage__ellipsis#rmjs-${i}`)
                                var height = inner.height()
                                inner.attr("data-height", Math.ceil(height))
                                inner.css("height", collapsedHeight + "px")

                                if(Math.ceil(height) > collapsedHeight){
                                    $(`.c-readmore__button-more[data-readmore-toggle="rmjs-${j}"]`).on("click", function(t){
                                        const tags = $(this).attr("data-readmore-toggle")
                                        var selfHeight = $(this).height()
                                        var ellipsis = $(`.js-readmore-mypage__ellipsis#${tags}`)
                                        var icon = $(this).find(".p-icon")
                    
                                        if(ellipsis.attr("aria-expanded")=="true"){
                                            ellipsis.attr("aria-expanded", "false")
                                            ellipsis.css("height", `${collapsedHeight}px`)
                                            icon.removeClass("p-icon--minus")
                                            icon.addClass("p-icon--plus")
                                        }else{
                                            ellipsis.attr("aria-expanded", "true")
                                            ellipsis.css("height", `${parseInt(ellipsis.attr("data-height")) + selfHeight + marginHeight}px`)
                                            icon.removeClass("p-icon--plus")
                                            icon.addClass("p-icon--minus")
                                        }
                                    })
                                }else{
                                    $(`.c-readmore__button-more[data-readmore-toggle="rmjs-${j}"]`).remove()
                                }

                                if(!data.yomouRankTop_ShowDescription){
                                    story_box.css("display", "none")
                                }

                                i += 1

                                // キーワードを表示
                                elem.find(".p-ranktop-item__infomation").after(`
                                    <div class="p-ranktop-item__keyword">
                                        ${escapeHtml(n.keyword)}
                                    </div>
                                `)

                                // 文字数・長さを表示
                                elem.find(".p-ranktop-item__keyword").after(`
                                    <div class="p-ranktop-item__length">
                                        読了時間：約${escapeHtml(n.time)}分（${escapeHtml(n.length.toLocaleString())}文字）
                                    </div>
                                `)

                                // ポイントを表示
                                if(rankType){
                                    var point = parseInt(n[`${rankType}_point`])
                                    if(!isNaN(point)){
                                        elem.find(".p-ranktop-item__title").after(`
                                            <div class="p-ranktop-item__points">
                                                ${point.toLocaleString()}pt
                                            </div>
                                        `)
                                    }
                                }
                            }
                            return true;
                        }
                    });
                }

            })
        })
    })
}