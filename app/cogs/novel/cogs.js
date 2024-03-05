export function changeHeaderScrollMode(header_mode){
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
        if($(this).scrollTop() < pos ){
            $('#novel_header.header-mode--scroll').removeClass('hide'); /* Scroll Up */
        }else{
            $('#novel_header.header-mode--scroll').addClass('hide'); /* Scroll Down */
        }
        pos = $(this).scrollTop();
    });
}