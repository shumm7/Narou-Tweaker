import {replaceUrl} from "../../utils/text.js"
import {getUserInfo} from "../../utils/api.js"

chrome.storage.sync.get(null, (options) => {
    var path = location.pathname;
    
    var enable_blog_autourl = options.enable_mypage_blog_autourl;
    if(enable_blog_autourl==undefined) {enable_blog_autourl = true}
    var enable_blog_comment_autourl = options.enable_mypage_blogcomment_autourl;
    if(enable_blog_comment_autourl==undefined) {enable_blog_comment_autourl = false}
    var enable_profile_detail = options.enable_profile_detail;
    if(enable_profile_detail==undefined) {enable_profile_detail = true}
    var enable_profile_autourl = options.enable_profile_autourl;
    if(enable_profile_autourl==undefined) {enable_profile_autourl = true}

    /* Blog Page */
    if(path.match('/mypageblog/view/userid/.*/blogkey/.*/')!=null){
        /* Blog Auto Url */
        if(enable_blog_autourl){
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
        if(enable_blog_comment_autourl){
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

    /* User Profile */
    else if(path.match('/mypage/profile/userid/.*/')!=null){
        /* User Detail */
        if(enable_profile_detail){
            getUserInfo(location.pathname.match('/mypage/profile/userid/(.*)/')[1])
            chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
                if(response.success){
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
            });
        }

        /* Auto Url */
        if(enable_profile_autourl){
            $('.c-panel__item').each(function(_) {
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
}); 