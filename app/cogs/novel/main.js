import { defaultValue } from "../../utils/misc.js";

var header_mode

chrome.storage.sync.get(null, (options) => {
    header_mode = defaultValue(options.novel_header_mode, "scroll");

    /* Header */
    if(header_mode!="default"){
        $("#novelnavi_right .toggle").remove()
        $("#novelnavi_right .toggle_menuclose").remove()
        $("#novelnavi_right .novelview_navi").remove()
    }
    _headerMode()
    
});


function _headerMode(){
    if(header_mode!="default"){
        $("#novel_header").removeClass("header-mode--fixed")
        $("#novel_header").removeClass("header-mode--absolute")
        $("#novel_header").removeClass("header-mode--scroll")

        if(header_mode=="fixed"){
            $("#novel_header").addClass("header-mode--fixed")
        }else if(header_mode=="absolute"){
            $("#novel_header").addClass("header-mode--absolute")
        }else if(header_mode=="scroll"){
            $("#novel_header").addClass("header-mode--scroll")
        }

        var pos = 0;
        $(window).on("scroll", function(){
            var header = $('#novel_header.header-mode--scroll');

            if($(this).scrollTop() < pos ){
                header.removeClass('hide'); /* Scroll Up */
            }else{
                header.addClass('hide'); /* Scroll Down */
            }
            pos = $(this).scrollTop();
        });
    }
}