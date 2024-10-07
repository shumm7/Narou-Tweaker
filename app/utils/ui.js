/* Info Icon*/
function balloonGeneral(html, icon, href){
    var object
    if(href==undefined){
        object = $('<span class="ui-balloon ui-information-balloon"><i class="fa-solid '+icon+' ui-balloon--icon"></i><p class="ui-balloon--text disabled">' + html + '</p></span>')
    }else{
        object = $('<span class="ui-balloon ui-information-balloon"><a href="'+href+'"><i class="fa-solid '+icon+' ui-balloon--icon"></i></a><p class="ui-balloon--text disabled">' + html + '</p></span>')
    }
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

export function addInfoIconBalloon(html, href){
    return balloonGeneral(html, "fa-circle-info", href)
}

export function addQuestionIconBalloon(html, href){
    return balloonGeneral(html, "fa-circle-question", href)
}

export function addExclamationIconBalloon(html, href){
    return balloonGeneral(html, "fa-circle-exclamation", href)
}

export function getPageZoom()
{
    //RETURN: 1.0 for 100%, and so on
    var zoom = 1;

    try
    {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('version', '1.1');
        document.body.appendChild(svg);
        zoom = svg.currentScale;
        document.body.removeChild(svg);
    }
    catch(e)
    {
        console.error("Zoom method failed: " + e.message);
    }

    return zoom;
}