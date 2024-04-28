import { escapeHtml } from "/utils/text.js"

export function _editor(){
    changeEditorPageLikePreview()
}

function changeEditorPageLikePreview(){
    const title = $(".l-container .c-up-title-area__title").text()
    $("body").addClass("narou-tweaker-custom-editor")

    var form = $(".l-container form").clone(true).empty()
    form.addClass("nt-container")

    var elm = $(`
        <div class="contents1">
            <div class="novel-titles">
                <a href="javascript:void(0);">${title}</a>
            </div>
        </div>
        <div id="novel_contents" class="customlayout1">
            <div id="novel_color" class="customlayout1">
                <div id="novel_no">${""}</div>
                <div class="novel_subtitle"></div>
                <div id="novel_p" class="novel_view"></div>
                <div id="novel_honbun" class="novel_view"></div>
                <div id="novel_a" class="novel_view"></div>
            </div>
        </div>
    `)

    elm.find(".novel_subtitle").append($(".l-container .c-form__input-text[name='subtitle']").attr("placeholder", "エピソードタイトルを入力…"))
    elm.find("#novel_honbun").append($(".l-container .c-form__textarea[name='novel']").attr("placeholder", "エピソード本文を入力…"))
    elm.find("#novel_p").append($(".l-container .c-form__textarea[name='preface']").attr("placeholder", "前書きを入力…")).css("display", "none")
    elm.find("#novel_a").append($(".l-container .c-form__textarea[name='postscript']").attr("placeholder", "後書きを入力…")).css("display", "none")

    elm.find("textarea").each(function(){
        var elm = $(this)
        elm.attr("rows", 1)
        const ch = elm.height()
        
        elm.on(".c-form__textarea", function(){
            elm.height(ch)
            const sh = elm.get(0).scrollHeight
            elm.height(sh)
        })
    })

    elm.find("#novel_p").before($(`<a><div class="show-button show-button--novel_p"><span class="show-button--text">前書きを入力…</span></div></a>`).on("click", function(){
        $(this).css("display", "none")
        elm.find("#novel_p").css("display", "block")
    }))
    elm.find("#novel_a").before($(`<a><div class="show-button show-button--novel_a"><span class="show-button--text">後書きを入力…</span></div></a>`).on("click", function(){
        $(this).css("display", "none")
        elm.find("#novel_a").css("display", "block")
    }))

    form.append(elm)
    form.append($(".l-container .c-button-box-center:has(.js-previewButton)"))

    $(".l-container").after(form)
    $(".l-container").remove()
}