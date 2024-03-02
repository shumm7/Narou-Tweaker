/* Info Icon*/
export function addInfoIcon(html){
    var object = $();
    object.add('<span class="ui-information"><i class="fa-solid fa-circle-info ui-information--icon"></i><p class="ui-information--text disabled">' + html + '</p></span>')
    object.hover(
        function() {
            $(this).children('.ui-information--text').removeClass("disabled");
        },
        function(){
            $(this).children('.ui-information--text').addClass("disabled");
        }
    );
    return object;
}