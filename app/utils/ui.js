/* Info Icon*/
function balloonGeneral(html, icon){
    var object = $('<span class="ui-balloon ui-information-balloon"><i class="fa-solid '+icon+' ui-balloon--icon"></i><p class="ui-balloon--text disabled">' + html + '</p></span>')
    object.hover(
        function() {
            var offset = $(this).offset();
            var height = $(this).height();
            var width = $(this).children(".ui-balloon--text").width();
            $(this).children(".ui-balloon--text").css({
                top: (offset.top + height + 10) + "px",
                left: (offset.left - width/2 - 1.5) + "px"
            })
            $(this).children('.ui-balloon--text').removeClass("disabled");
        },
        function(){
            $(this).children('.ui-balloon--text').addClass("disabled");
        }
    );
    return object;
}

export function addInfoIconBalloon(html){
    return balloonGeneral(html, "fa-circle-info")
}

export function addQuestionIconBalloon(html){
    return balloonGeneral(html, "fa-circle-question")
}

export function addExclamationIconBalloon(html){
    return balloonGeneral(html, "fa-circle-exclamation")
}