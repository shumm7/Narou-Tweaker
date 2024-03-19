import {replaceUrl} from "../../utils/text.js"
import { defaultValue } from "../../utils/misc.js";

var path = location.pathname;

var option

chrome.storage.local.get(null, (data) => {
    option = data

    if($(".p-userheader__tab").length){
        /* General */
        _general()

        /* Blog Page */
        if(path.match('/mypageblog/view/userid/.*/blogkey/.*/')!=null){
            _blog()
        }

        /* User Profile */
        else if(path.match('/mypage/profile/userid/.*/')!=null){
            _profile()
        }
    }
}); 

function _general(){
    if (option.mypageShowUserId){
        var userid = $(".p-userheader__tab .p-userheader__tab-list-item:nth-child(1) a").attr("href").match("https://mypage.syosetu.com/(.*)/")[1].trim()
        if(userid!=undefined){
            $(".p-userheader .p-userheader__inner .p-userheader__username").after("<div class='p-userheader__userid'>" + userid + "</div>")
        }
    }
}

function _blog(){
    /* Blog Auto Url */
    if(option.mypageBlogAutoURL){
        var header = $('.p-blogview__info')[0].outerHTML;
        $('.p-blogview__info').remove()
        var lines = $('.c-panel__item').html().split(/<br\s*\/?>/i);

        $('.c-panel__item').empty();
        $('.c-panel__item').append($.parseHTML(header));
        $.each(lines, function(idx, line) {
            $('.c-panel__item').append("<p>"+line + "</p>");
        });

        $('.c-panel__item p').each(function (idx, elem) {
            let str = $(elem).html();
            replaceUrl(elem)
        });
    }

    /* Blog Comment Auto Url */
    if(option.mypageBlogCommentAutoURL){
        $('.p-blogview__comment-main').each(function(_) {
            var comment = $(this)
            lines = comment.html().split(/<br\s*\/?>/i);
    
            comment.empty();
            $.each(lines, function(idx, line) {
                comment.append("<p>" + line + "</p>");
            });
            
            comment.children("p").each(function (idx, elem) {
                let str = $(elem).html();
                replaceUrl(elem)
            });
        });
    }
}

function _profile(){
    $(".l-main .c-panel").attr("id", "introduction")

    /* User Detail */
    if(option.mypageProfileStatics){
        var userid = location.pathname.match('/mypage/profile/userid/(.*)/')[1]
        chrome.runtime.sendMessage({action: "fetch", format: "json", data: {url: "https://api.syosetu.com/userapi/api/?out=json&libtype=2&userid=" + userid, options: {'method': 'GET'}}}, function(response) {
        if(response){
            if(response.success && response.format=="json"){
                var d = response.result[1]
                if(d!=undefined){
                    $(".c-panel__headline").attr("id", "user-detail")
                    $(".c-side-list").attr("id", "user-detail")
                    $(".c-side-list#user-detail").prepend('<div class="c-side-list__item"><dl><dt>ヨミガナ</dt><dd>'+d.yomikata+'</dd></dl></div>')
                    $(".c-side-list#user-detail").prepend('<div class="c-side-list__item"><dl><dt>ユーザ名</dt><dd>'+d.name+'</dd></dl></div>')
                    
                    $(".c-side-list#user-detail").after("<div class='c-panel__headline' id='user-stats'>ユーザ統計</div>")
                    $(".c-panel__headline#user-stats").after("<div class='c-side-list' id='user-stats'></div>")
                    $(".c-side-list#user-stats").append('<div class="c-side-list__item"><dl><dt>作品数</dt><dd>'+d.novel_cnt.toLocaleString()+'</dd></dl></div>')
                    $(".c-side-list#user-stats").append('<div class="c-side-list__item"><dl><dt>レビュー数</dt><dd>'+d.review_cnt.toLocaleString()+'</dd></dl></div>')
                    $(".c-side-list#user-stats").append('<div class="c-side-list__item"><dl><dt>総文字数</dt><dd>'+d.novel_length.toLocaleString()+'</dd></dl></div>')
                    $(".c-side-list#user-stats").append('<div class="c-side-list__item"><dl><dt>総獲得pt</dt><dd>'+d.sum_global_point.toLocaleString()+'</dd></dl></div>')
                }
            }
            return true;
        }
        });
    }

    /* Auto Url */
    if(option.mypageProfileAutoURL){
        $('.c-panel__item').each(function(_) {
            var comment = $(this)
            var lines = comment.html().split(/<br\s*\/?>/i);
    
            comment.empty();
            $.each(lines, function(idx, line) {
                comment.append("<p>" + line + "</p>");
            });
            
            comment.children("p").each(function (idx, elem) {
                let str = $(elem).html();
                replaceUrl(elem)
            });
        });
    }

    /* Book List */
    if(option.mypageProfileBooklist){
        const max_amount = 5
        var userid = location.pathname.match('/mypage/profile/userid/(.*)/')[1]
        
        chrome.runtime.sendMessage ({action: "fetch", format: "text", data: {url: "https://syosetu.com/syuppan/list/?word=" + userid, options: {'method': 'GET'}}}, function(response) {
        if(response){   
            if(response.success && response.format=="text"){
                var list = []
                var body = $($.parseHTML(response.result))
                body.find(".p-syuppan-list").each((idx, value)=>{
                    if(max_amount<=idx){
                        return false;
                    }

                    if($(value).find(".p-syuppan-list__spec-item:nth-child(1) a").prop("href")=="https://mypage.syosetu.com/"+userid+"/"){
                        var title = $(value).find("a.p-syuppan-list__title").text()
                        var link = $(value).find("a.p-syuppan-list__title").prop("href")
                        var author = $(value).find(".p-syuppan-list__writer").text()

                        var publisher
                        var label
                        var date
                        $(value).find(".p-syuppan-list__spec-item").each((_, l)=>{
                            var text = $(l).find("span.c-label").text().trim()
                            if(text=="出版社"){
                                $(l).find("span.c-label").remove()
                                publisher = $(l).text().trim()
                            }
                            else if(text=="レーベル"){
                                $(l).find("span.c-label").remove()
                                label = $(l).text().trim()
                            }
                            else if(text=="発売日"){
                                $(l).find("span.c-label").remove()
                                date = $(l).text().trim()
                            }
                        })
                        list.push({
                            userid: userid,
                            author: author,
                            title: title,
                            link: link.replace("https://mypage.syosetu.com/", "https://syosetu.com/"),
                            publisher: publisher,
                            label: label,
                            date: date
                        })
                    }
                })

                if(list.length>0){
                    $(".c-panel#introduction").after(`
                        <div class="c-panel" id="books">
                            <div class="c-panel__headline" id="book-list">書籍リスト</div>
                            <div class="c-panel__body">
                                <div class="c-panel__item">
                                    <p><a href="https://syosetu.com/syuppan/list/">書報</a>に掲載された作品を最大`+max_amount+`件まで自動的に取得しています。</p>
                                    <div class='p-syuppan-lists'></div>
                                </div>
                            </div>
                        </div>
                    `)
                    $.each(list, (_, book)=>{
                        var ls = ""
                        if(book.publisher){
                            ls += `<div class="p-syuppan-list__spec-item">
                                <span class="c-label">出版社</span>`+book.publisher+`
                            </div>`
                        }
                        if(book.label){
                            ls += `<div class="p-syuppan-list__spec-item">
                                <span class="c-label">レーベル</span>`+book.label+`
                            </div>`
                        }
                        if(book.date){
                            ls += `<div class="p-syuppan-list__spec-item">
                                <span class="c-label">発売日</span>`+book.date+`
                            </div>`
                        }
                        $(".p-syuppan-lists").append(`
                        <div class='c-card p-syuppan-list'>
                            <div class="p-syuppan-list__head">
                                <a class="p-syuppan-list__title" href="`+book.link+`">`+book.title+`</a>
                                <div class="p-syuppan-list__writer">`+book.author+`</div>
                            </div>
                            <div class="p-syuppan-list__spec">
                            `+ls+`
                            </div>
                        </div>`)
                    })
                    $(".c-panel#books .c-panel__item .p-syuppan-lists").after('<div class="p-syuppan-list__more"><a href="https://syosetu.com/syuppan/list/?word='+userid+'">もっと見る</a></div>')
                }
            }
            return true;
        }
        });
    }
}