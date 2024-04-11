import { setOptionContentsDisplay, setOptionContentsCorrection, setOptionContentsAuthorSkin } from "./cogs.js";
import { _header, changeHeaderScrollMode } from "./_header.js";
import { defaultValue } from "../../utils/misc.js";
import { checkNovelPageDetail, getEpisode, getNcode } from "./utils.js";
import { defaultOption } from "../../utils/option.js";
import { _authorSkin } from "./_skin.js";

chrome.storage.local.get(null, (data) => {
    /* Header */
    _header()

    /* Option Menu */
    _optionModal();

    /* Header */
    changeHeaderScrollMode("#novel_header_right");
    changeHeaderScrollMode("#novel_header");

    if(data.novelCustomStyle){
        $("body").addClass("narou-tweaker")
        $("#footer").remove()

        if(checkNovelPageDetail()=="novel"){
            _novelPage()
        }
    }
    
    /* Author Skin */
    _authorSkin()
});

function _optionModal(){
    if(!$("#novel_header").length){return}

    /* Option Modal */
    $("#novel_header").after("<aside id='novel-option'></aside>")
    $("#novel-option").before("<div id='novel-option-background'></div>")
    $("#novel-option").append("<div id='novel-option--header'></div>")
    $("#novel-option").append("<div id='novel-option--contents'></div>")
    
    $("#novel-option-background").on("click", ()=>{
        if($("#novel-option").hasClass("show")){
            $("#novel-option").removeClass("show")
        }else{
            $("#novel-option").addClass("show")
        }
        if($("#novel-option-background").hasClass("show")){
            $("#novel-option-background").removeClass("show")
        }else{
            $("#novel-option-background").addClass("show")
        }
    })

    /* Modal Header */
    $("#novel-option--header").append("<ul></ul>")
    function addTab(index, title){
        $("#novel-option--header ul").append("<li class='novel-option--header-tab novel-option-tab-"+index+"'><button type='button'><span class='novel-option--header-tab'>"+title+"</span></button></li>")
        $("#novel-option--contents").append("<div class='novel-option--content novel-option-tab-"+index+"'></div>")
        $(".novel-option--header-tab.novel-option-tab-"+index+" button").on("click", ()=>{
            chrome.storage.local.set({"novelOptionModalSelected": index}, function(){
                $("#novel-option .novel-option--header-tab").removeClass("active")
                $("#novel-option .novel-option--content").removeClass("active")
                $("#novel-option .novel-option-tab-" + index).addClass("active")
            })
        })
    }

    addTab(0, "表示")
    setOptionContentsDisplay(0)

    addTab(1, "文章校正")
    setOptionContentsCorrection(1)

    //addTab(2, "統計")
    
    if($(".novelrankingtag a:has(img[alt='Narou Tweaker 作者スキン'])").length){
        addTab(99, "作者スキン")
        setOptionContentsAuthorSkin(99)
    }
    
    const scrollElement = document.querySelector("#novel-option--contents");
    if(scrollElement!=null){
        scrollElement.addEventListener("wheel", (e) => {
            e.preventDefault();
            scrollElement.scrollTop += e.deltaY;
        });
    }

    chrome.storage.local.get(["novelOptionModalSelected"], function(data){
        var tab = $("#novel-option .novel-option-tab-"+defaultValue(data.novelOptionModalSelected, defaultOption.novelOptionModalSelected))
        if(tab.length){
            tab.addClass("active")
        }else{
            chrome.storage.local.set({novelOptionModalSelected: 0}, function(){
                $("#novel-option .novel-option-tab-0").addClass("active")
            })
        }
    })

}

function _novelPage(){
    var ncode = getNcode()
    var episode = getEpisode()
    var title
    var chapter = undefined
    
    if(episode==0){
        title = $(".novel_title")
    }else{
        title = $("#container .contents1 a[href='/"+ncode+"/']")
        if($("#container .contents1 .chapter_title").length){
            chapter = $("#container .contents1 .chapter_title").text()
        }

    }

    if(episode==0){
        var d_1 = `<div class="novel-title">`+title.text()+`</div>`
        var d_2

        if($("#novel_contents .novel_writername a").length){
            var author = $("#novel_contents .novel_writername a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $("#novel_contents .novel_writername").text().trim().match(/作者：(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }

        $("#novel_contents").before(`
        <div class="contents1">
            <div class="novel-titles" id="ep-`+episode+`">
                `+d_1+`
                `+d_2+`
            </div>
        </div>
        `)
        $(".novel_title").remove()
        $(".novel_writername").remove()

    }else{
        title.remove()
        var d = `<div class="novel-titles" id="ep-`+episode+`"></div>`
        var d_1 = `<div class="novel-title"><a href="`+title.prop("href")+`">`+title.text()+`</a></div>`
        var d_2

        if($("#container .contents1 a").length){
            var author = $("#container .contents1 a")
            d_2 = `<div class="novel-author"><a href="`+author.prop("href")+`">`+author.text()+`</a></div>`
        }else{
            var author = $("#container .contents1").text().trim().match(/作者：(.*)/)[1]
            d_2 = `<div class="novel-author">`+author+`</div>`
        }
        if(chapter){
            $("#novel_no").after("<div class='novel-chapter'>"+chapter+"</div>")
        }
        
        $("#container .contents1").empty()
        $("#container .contents1").append(d)
        $("#container .contents1 .novel-titles").append(d_1 + d_2)
    }
    


    if(episode==1){
        
    }else if(episode>1){

    }
}