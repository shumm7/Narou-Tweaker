import { replaceUrl } from "../../utils/text.js";

export function _blog(){
    /* Blog Auto Url */
    chrome.storage.local.get(null, (data) => {
        if(data.mypageBlogAutoURL){
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
                replaceUrl(elem, !data.mypageDisableExternalURLWarning)
            });
        }
    })

    /* Blog Comment Auto Url */
    chrome.storage.local.get(null, (data) => {
        if(data.mypageBlogCommentAutoURL){
            $('.p-blogview__comment-main').each(function(_) {
                var comment = $(this)
                lines = comment.html().split(/<br\s*\/?>/i);
        
                comment.empty();
                $.each(lines, function(idx, line) {
                    comment.append("<p>" + line + "</p>");
                });
                
                comment.children("p").each(function (idx, elem) {
                    let str = $(elem).html();
                    replaceUrl(elem, !data.mypageDisableExternalURLWarning)
                });
            });
        }
    })
}