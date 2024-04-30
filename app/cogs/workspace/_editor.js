import { escapeHtml } from "/utils/text.js"

export function _editor(){
    changeEditorPageLikePreview()
}

function changeEditorPageLikePreview(){
    $("body").addClass("narou-tweaker-custom-editor")

    $(".l-header").remove()
    $(".l-breadcrumb").remove()
    $(".l-footer").remove()
    var container = $(".l-container").clone(true)
    $(".l-container").remove()

    const title = container.find(".c-up-title-area__title").text()
    const header = "新規エピソード作成"

    // box
    var elm = $(`
        <div class="nt-container nt-panel-show">
            <div class="nt-editor">
                
            </div>
            <aside class="nt-panel">
                <div class="nt-panel--header">
                </div>
                <div class="nt-panel--content">
            </aside>
        </div>
    `)

    // form
    var form = container.find("form.c-form").clone(true).addClass("nt-editor--form").empty()
    form.append(`
        <div class="nt-editor--header">
            <div class="nt-editor--header-items nt-editor-header-left">
                <button type="button" class="nt-button" id="nt-editor--panel-toggle" title="サイドパネルを閉じる">
                    <i class="fa-solid fa-table-columns"></i>
                </button>
            </div>
            <div class="nt-editor--header-items nt-editor-header-middle">
                ${header}
            </div>
            <div class="nt-editor--header-items nt-editor-header-right" id="nt-editor--save-button">
                
            </div>
        </div>
        <div class="nt-editor--body">
            <div class="nt-editor--body-content" id="nt-editor--main">
                <div class="nt-editor--main-title">
                    <span class="nt-editor--main-title-novel">${title}</span>
                </div>
                <div class="nt-editor--main-novel"></div>
            </div>
            <div class="nt-editor--body-content nt-content-hidden" id="nt-editor--novelex"></div>
            <div class="nt-editor--body-content nt-content-hidden" id="nt-editor--freememo"></div>
            <div class="nt-editor--body-content nt-content-hidden" id="nt-editor--preview"></div>
        </div>
        <div class="nt-editor--footer">
        </div>
    `)
    form.find("#nt-editor--panel-toggle").on("click", function(){
        if($(".nt-container").hasClass("nt-panel-show")){
            $(".nt-container").removeClass("nt-panel-show")
        }else{
            $(".nt-container").addClass("nt-panel-show")
        }
    })
    // buttons
    form.find("#nt-editor--save-button").append(container.find(".c-up-panel__button.js-previewButton").clone(true))
    form.find("#nt-editor--save-button").append(container.find(".p-progress-button__button.c-up-panel__button--primary").clone(true))

    // inputs
    form.find(".nt-editor--main-title").append(container.find("input[name='subtitle']").clone(true).attr("placeholder", "エピソードタイトルを入力…"))
    form.find(".nt-editor--main-novel").append(container.find("textarea[name='novel']").clone(true).attr("placeholder", "本文を入力…"))
    form.find(".nt-editor--main-novel").append(container.find("textarea[name='preface']").clone(true).attr("placeholder", "前書きを入力…"))
    form.find(".nt-editor--main-novel").append(container.find("textarea[name='postscript']").clone(true).attr("placeholder", "後書きを入力…"))

    elm.find(".nt-editor").append(form)

    $("body > div:first-child").after(elm)
    $("body").on("scroll", function(e){
        const s = $(this).scrollTop()
        $(".nt-editor--body-content").scrollTop(s)
    })
}