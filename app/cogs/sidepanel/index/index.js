import { escapeHtml } from "../../../utils/text.js";

chrome.storage.session.onChanged.addListener((changes) =>{
    if(changes.ncode!=undefined){
        setNovelData()
    }
    else if(changes.episode!=undefined){
        setCurrentEpisode(changes.episode.newValue)
    }
});

var episodes = []
var sections = []
function setNovelData(){
    chrome.storage.session.get(null, (data) => {
        $(".index-items").empty()
        $(".index-title").empty("")
        $(".index-author").empty("")

        if(!data){return}
        if(!data.ncode){return}

        $(".index-title").append(`
            <span class="index-header--title">${escapeHtml(data.title)}</span>
            <input type="text" style="display:none;" value="https://ncode.syosetu.com/${escapeHtml(data.ncode)}/"></input>
        `)
        $(".index-author").append(`
            <span class="index-header--author">${escapeHtml(data.author)}</span>
            <input type="text" style="display:none;" value="https://mypage.syosetu.com/${escapeHtml(data.userid)}/"></input>
        `)

        episodes = []
        sections = []
        if(data.type==1){

            var section_now = 1
            var index = 1
            var section = null
            $.each(data.docs, function(p, doc){
                var body = $($.parseHTML(doc))
                body.find("#novel_contents .index_box > *").each((idx, value)=>{
                    if($(value).hasClass("chapter_title")){
                        /* 章のデータを取得 */
                        //console.log("\t\t"+$(value).text())
                        section = $(value).text()
                        section_now += 1
                    }else if($(value).hasClass("novel_sublist2")){
                        /* エピソードのデータを取得 */
                        //console.log($(value).find(".subtitle a").text())
                        var episode = {
                            title: $(value).find(".subtitle a").text(),
                            index: index,
                            section: section_now
                        }
    
                        /* 章が直前に存在する場合 */
                        if(section!=null){
                            if(sections.length>0){
                                sections[sections.length-1].endIndex = index - 1
                            }
                            sections.push({
                                title: section,
                                startIndex: index
                            })
                            section = null
                        }
                        
                        episodes.push(episode)
                        index += 1
                    }
                })
    
                /* 章が直前に存在する場合 */
                if(section!=null){
                    sections.push({
                        title: section,
                        startIndex: index,
                        endIndex: episodes.length
                    })
                    section = null
                }
    
                /* 最後の章のデータを格納 */
                if(sections.length>0){
                    sections[sections.length-1].endIndex = index - 1
                }
            })
            /* 章が存在しない作品の場合 */
            if(sections.length == 0){
                sections.push({
                    title: "",
                    startIndex: 1,
                    endIndex: episodes.length
                })
                episodes[0].startIndex = 1
            }
        }
    
        $.each(sections, function(num, section){
            var s = ""
            if(section.title!=null){
                s = `
                <div class="index-section">
                    <span class="index-section--title">${escapeHtml(section.title)}</span>
                    <span class="index-section--icon"><i class="fa-solid fa-angle-up"></i></span>
                </div>`
            }

            var n = ""
            for(var i=section.startIndex; i<=section.endIndex; i++){
                n += `
                    <div class="index-novel" id="episode-${i}">
                        <div class="index-novel--episode-title">${escapeHtml(episodes[i-1].title)}</div>
                        <input type="text" style="display:none;" value="https://ncode.syosetu.com/${escapeHtml(data.ncode)}/${i}/">
                    </div>
                `
           }
    
            $(".index-items").append(`
                <div class="index-item hide" id="section-${num+1}" index="${section.startIndex}">
                    ${s}
                    <div class="index-novels">
                    ${n}
                    </div>
                </div>
           `)
        })
        setEventDetails()
        setCurrentEpisode(data.episode)
    })
}

function setCurrentEpisode(episode){
    $(".index-novel").removeClass("active")
    episode = parseInt(episode)

    if(!episode){
        $(".index-item#section-1").removeClass("hide")
    }else if(episode>0 && episodes.length>0){
        var section = episodes[episode-1].section - 1
        $(".index-item#section-"+section).removeClass("hide")
        $(window).scrollTop($(".index-novel#episode-"+episode).position().top - 10);

        $(".index-novel#episode-"+episode).addClass("active")
    }
}

function setEventDetails(){
    /* アコーディオン */
    $(".index-section").on("click", function(e){
        if($(this).parent().hasClass("hide")){
            $(this).parent().removeClass("hide")
        }else{
            $(this).parent().addClass("hide")
        }
    })

    /* 要素クリック（ページ遷移） */
    $(".index-novel, .index-title, .index-author").on("click", function(e){
        const url = $(this).find("input").val()
        chrome.tabs.query({active: true, lastFocusedWindow: true, currentWindow: true},function(tabs){
            if(tabs[0]!=undefined){
                chrome.tabs.update(tabs[0].id, {url: url}, function(){

                })
            }
        })
    })

    /* 操作ボタン */
    $(".index-button--hide-all").on("click", function(e){
        $(".index-item").addClass("hide")
    })
    $(".index-button--show-all").on("click", function(e){
        $(".index-item").removeClass("hide")
    })
    $(".index-button--go-down").on("click", function(e){
        var a = document.documentElement;
        var y = a.scrollHeight - a.clientHeight;
        window.scroll(0, y);
    })
    $(".index-button--go-up").on("click", function(e){
        window.scroll({top: 0});
    })
}