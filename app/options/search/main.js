import { searchCount, stringSimilarity } from "../../utils/text.js";
import { getOptionCategory, getOptionFromId, getOptionPageFromId } from "../_lib/optionLib.js";
import { optionCategoryList, optionList } from "../_lib/optionUI.js";
import { setup } from "../general.js";

setup()
$("#search-box").focus()

if($("#search-box").val().length>0){
    search($("#search-box").val())
}

$("#search-box").on("input", function(e){
    var searchWords = $("#search-box").val()
    $("#sidebar-search-box").val(searchWords)
    search(searchWords)
})

function splitWords(splitWords){
    var list = []
    var word = ""
    var startBracket = false
    var startBracketPos = -1

    var chars = [...splitWords.trim()]
    $.each(chars, function(idx, c){
        if(c.match(/\"/)){
            if(!startBracket && word.length==0){
                startBracket = true //ブラケット開始
                startBracketPos = idx
                word += c
            }else{
                if(idx < chars.length-1){
                    if(chars[idx+1].match(/\s/) && idx - startBracketPos>1){
                        list.push(word + c)
                        word = ""
                        startBracket = false
                        startBracketPos = -1
                    }else{
                        word += c
                    }
                }
                else{
                    list.push(word + c)
                    word = ""
                } 
            }
        }else if(c.match(/\s/) && !startBracket){
            if(word.length>0){
                list.push(word)
                word = ""
            }
        }else{
            word += c
        }
    })
    if(word.length>0){
        list.push(word)
    }
    return list
}

function search(searchWords){
    const words = splitWords(searchWords)
    
    const params = new URLSearchParams(location.search)
    params.set("s", words.join(" "))
    window.history.replaceState(null, "", `${location.pathname}?${params.toString()}`)

    var result = searchOption(words).slice(0, 10)
    var c_result = searchCategory(words)

    $(".search-result-box").remove()
    $(".search-box--suggestion-item").empty()

    /* カテゴリ */
    if(c_result.length > 0){
        var r = c_result[0]
        $(`.search-box--suggestion-item`).append(`関連カテゴリ: <span style="font-weight: bold; margin-left: 5px;"><a href="/options/${r.id}/index.html" target="_self">${r.title}</a></span>`)
    }

    /* オプション */
    if(result.length>0){
        $.each(result, function(_, r){
            var elm = $(`
                <div class="contents-wide search-result-box search-result--option">
                    <div class="contents-option">
                        <div class="contents-option-head">
                            <div class="contents-item--heading"><a href="/options/${r.page}/index.html?id=${r.id}&focus=1" target="_self">${r.title}</a></div>
                        </div>

                        <div class="contents-option-content">
                            <div class="search-result--items">
                                <div class="search-result--items-locate"></div>
                                <div class="search-result--items-id"><span class="search-result--items-id-tag"><a href="/options/${r.page}/index.html?id=${r.id}&focus=1" target="_self">${r.id}</a></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            
            const page = getOptionPageFromId(r.page)
            const category = getOptionCategory(page, r.category)

            if(r.description){
                elm.find(".contents-option-head").append(`<div class="contents-item--description">${r.description}</div>`)
            }

            if(r.parent){
                const parent = getOptionFromId(r.parent)
                if(parent){
                    elm.find(".search-result--items-locate").append(`
                        <a href="/options/${page.id}/index.html" target="_self">${page.title}</a> > <a href="/options/${page.id}/index.html?category=${category.id}" target="_self">${category.title}</a> > <a href="/options/${page.id}/index.html?id=${parent.id}" target="_self">${parent.title}</a>
                    `)
                }else{
                    elm.find(".search-result--items-locate").append(`
                        <a href="/options/${page.id}/index.html" target="_self">${page.title}</a> > <a href="/options/${page.id}/index.html?category=${category.id}" target="_self">${category.title}</a>
                    `)
                }
            }else{
                elm.find(".search-result--items-locate").append(`
                    <a href="/options/${page.id}/index.html" target="_self">${page.title}</a> > <a href="/options/${page.id}/index.html?category=${category.id}" target="_self">${category.title}</a>
                `)
            }

            $(`.contents-container[name="general"]`).append(elm)
        })
    }else{
        if(words.length>0){
            var elm = $(`
                <div class="contents-wide search-result-box search-result--option">
                    <div id="search-result--notfound">一致する項目が見つかりませんでした。</div>
                </div>
            `)

            $(`.contents-container[name="general"]`).append(elm)
        }
    }
}

function searchOption(searchWords){
    /*
    const modeTitle = $(`#search-target--title`).prop('checked')
    const modeDescription = $(`#search-target--description`).prop('checked')
    const modeKeywords = $(`#search-target--keyword`).prop('checked')
    */
    const modeId = true
    const modeTitle = true
    const modeDescription = true
    const modeKeywords = true

    var searchResult = []
    if(modeTitle || modeDescription || modeKeywords){
        $.each(optionList, function(_, v){
            if(v.location){
                if(!v.location.noindex){
                    var exception = false

                    /* 検索対象（全文） */
                    var fullWords = ""
                    if(modeId && v.id){
                        fullWords += v.id
                    }
                    if(modeTitle && v.title){
                        fullWords += v.title
                    }
                    if(modeDescription && v.description){
                        if(v.description.text){
                            fullWords += v.description.text
                        }
                        if(v.description.small){
                            fullWords += v.description.small
                        }
                        if(v.description.attention){
                            fullWords += v.description.attention
                        }
                    }
                    var p_fullWords = fullWords
                    if(modeKeywords && v.description){
                        if(v.description.keywords){
                            fullWords += v.description.keywords.join("")
                        }
                    }

                    /* NOT検索 / 完全一致 */
                    var scoreSum = 0
                    $.each(searchWords, function(_, w){
                        var score = 0
                        if(w.match(/\-.+/s)){
                            w = w.match(/\-(.+)/s)[1]
                            if(p_fullWords.includes(w)){
                                exception = true
                                return true
                            }
                        }else if(w.match(/\".+\"/s)){
                            w = w.match(/\"(.+)\"/s)[1]
                            if(!p_fullWords.includes(w)){
                                exception = true
                                return true
                            }else{
                                if(modeId){
                                    score += (100 * countMult_include(v.id, w, 0)) * (1 + w.length / v.id.length)
                                }
                                if(modeTitle){
                                    score += getSearchScore(v.title, w, 10) * countMult_include(v.title, w, 0.2)
                                }
                                if(modeDescription && v.description){
                                    score += getSearchScore(v.description.text, w, 10) * countMult_include(v.description.text, w, 0.1)
                                    score += getSearchScore(v.description.small, w, 8) * countMult_include(v.description.small, w, 0.08)
                                    score += getSearchScore(v.description.attention, w, 8) * countMult_include(v.description.attention, w, 0.08)
                                    score += getSearchScore(v.description.hidden, w, 10) * countMult_include(v.description.hidden, w, 0.1)
                                }
                                if(modeKeywords && v.description){
                                    if(Array.isArray(v.description.keywords)){
                                        $.each(v.description.keywords, function(_, k){
                                            score += getSearchScore(k, w, 10) * countMult_include(k, w, 0)
                                        })
                                    }
                                }
                                score *= 1.5
                            }
                        }else{
                            if(modeId){
                                score += (100 * countMult_include(v.id, w, 0)) * (1 + w.length / v.id.length)
                            }
                            if(modeTitle){
                                score += getSearchScore(v.title, w, 10) * countMult(v.title, w, 0.2)
                            }
                            if(modeDescription && v.description){
                                score += getSearchScore(v.description.text, w, 10) * countMult(v.description.text, w, 0.1)
                                score += getSearchScore(v.description.small, w, 8) * countMult(v.description.small, w, 0.08)
                                score += getSearchScore(v.description.attention, w, 8) * countMult(v.description.attention, w, 0.08)
                                score += getSearchScore(v.description.hidden, w, 10) * countMult(v.description.hidden, w, 0.1)
                            }
                            if(modeKeywords && v.description){
                                if(Array.isArray(v.description.keywords)){
                                    $.each(v.description.keywords, function(_, k){
                                        score += getSearchScore(k, w, 10) * countMult_include(k, w, 0)
                                    })
                                }
                            }
                        }
                        scoreSum += score
                    })

                    const score = scoreSum / searchWords.length
                    if(score>=20 && !exception){
                        var data = {id: v.id, title: v.title, score: score}
                        if(v.location){
                            data.page = v.location.page
                            data.category = v.location.category
                            if(v.location.hasParent){
                                data.parent = v.location.parent
                            }
                        }
                        if(v.description){
                            if(v.description.text){
                                data.description = v.description.text
                            }
                        }
                        searchResult.push(data)
                    }
                }
            }
        })
        searchResult = searchResult.sort((a,b) => b.score - a.score)
    }

    return searchResult
}

function searchCategory(searchWords){
    var searchResult = []
    $.each(optionCategoryList, function(_, v){
        if(!v.noindex){
            var exception = false

            /* 検索対象（全文） */
            var fullWords = ""
            if(v.title){
                fullWords += v.title
            }
            if(v.description){
                fullWords += v.description
            }

            /* NOT検索 / 完全一致 */
            var scoreSum = 0
            $.each(searchWords.filter(w => w.trim().length > 0), function(_, w){
                var score = 0
                if(w.match(/\-.+/s)){
                    w = w.match(/\-(.+)/s)[1]
                    if(fullWords.includes(w)){
                        exception = true
                        return true
                    }
                }else if(w.match(/\".+\"/s)){
                    w = w.match(/\"(.+)\"/s)[1]
                    if(!fullWords.includes(w)){
                        exception = true
                        return true
                    }else{
                        score += getSearchScore(v.title, w, 10) * countMult_include(v.title, w, 0.2)
                        score += getSearchScore(v.description, w, 10) * countMult_include(v.description, w, 0.1)
                        score *= 1.5
                    }
                }else{
                    score += getSearchScore(v.title, w, 10) * countMult(v.title, w, 0.2)
                    score += getSearchScore(v.description, w, 10) * countMult(v.description, w, 0.1)
                }
                scoreSum += score
            })

            const score = scoreSum / searchWords.length
            if(score>=30 && !exception){
                searchResult.push({id: v.id, title: v.title, score: score})
            }
        }
    })
    searchResult = searchResult.sort((a,b) => b.score - a.score)

    return searchResult
}




/* 得点付け関数 */
function getSearchScore(target, word, mult){
    if(!target){
        return 0
    }
    if(mult===undefined){
        mult = 1  
    }
    return 10 * stringSimilarity(target.toLowerCase(), word.toLowerCase()) * mult
}
function countMult_include(target, searchWord, mult){
    if(!target){
        return 0
    }
    if(mult===undefined){
        mult = 0.1    
    }
    var s = searchCount(target.toLowerCase(), searchWord.toLowerCase())
    if(s <= 0){
        return 0
    }else{
        return 1 + mult * (s - 1)
    }
}
function countMult(target, searchWord, mult){
    if(!target){
        return 0
    }
    if(mult===undefined){
        mult = 0.1    
    }
    var s = searchCount(target.toLowerCase(), searchWord.toLowerCase())
    return 1 + mult * s
}