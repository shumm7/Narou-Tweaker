
export function _misc(){
    deleteConfirm()
    deleteConfirmUserblog()
    pointAverage()
}

function deleteConfirm(){

    if(location.hostname=="syosetu.com" && location.pathname.match(/^\/usernovel\/deleteconfirm\/ncode\/\d+\/*$/)){
        chrome.storage.local.get(null, function(data){
            if(data.workspaceNovelmanageDeleteConfirm){
                $("#noveldelete").attr("type", "button")
                $("#noveldelete").prop("disabled", true)

                let novelTitle = null
                $(".c-form__group").each(function(){
                    if($(this).find(".c-form__label").text().trim()=="作品タイトル"){
                        novelTitle = $(this).find(".c-form__plaintext").text().trim()
                    }
                })

                $(".c-button-box-center").before(`
                    <div class="c-up-panel__text" style="margin-top: 20px;">
                        削除するには作品タイトルを入力してください。
                    </div>
                    <div class="c-form__group">
                        <input class="c-form__input-text" type="text" name="novel_title" value="" data-name="作品タイトル" data-minlength="1" data-maxlength="100">
                    </div>
                `)
                $("input[name='novel_title']").on("input", function(){
                    const title = $(this).val().trim()
                    if(title==novelTitle){
                        $("#noveldelete").prop("disabled", false)
                    }else{
                        $("#noveldelete").prop("disabled", true)
                    }
                })

                $("#noveldelete").on("click", function(){
                    const title = $("input[name='novel_title']").val().trim()
                    if(title==novelTitle){
                        var confirmed = confirm('この作品を削除します。よろしいですか？\n（この操作は取り消すことはできません）');
                        if(confirmed) {
                            $(".c-form").trigger("submit")
                        }
                    }else{
                        $("#noveldelete").prop("disabled", true)
                    }
                    
                })
            }
        })
    }
        
}

function deleteConfirmUserblog(){

    if(location.hostname=="syosetu.com" && (location.pathname.match(/^\/userblogmanage\/deleteconfirm\/blogkey\/\d+\/*$/) || location.pathname.match(/^\/userxblogmanage\/deleteconfirm\/blogkey\/\d+\/*$/))){
        chrome.storage.local.get(null, function(data){
            if(data.workspaceUserblogmanageDeleteConfirm){
                $("#blogdelete").attr("type", "button")
                $("#blogdelete").prop("disabled", true)

                let blogTitle = null
                $(".c-form__group").each(function(){
                    if($(this).find(".c-form__label").text().trim()=="タイトル"){
                        blogTitle = $(this).find(".c-form__plaintext").text().trim()
                    }
                })

                $(".c-button-box-center").before(`
                    <div class="c-up-panel__text" style="margin-top: 20px;">
                        削除するにはタイトルを入力してください。
                    </div>
                    <div class="c-form__group">
                        <input class="c-form__input-text" type="text" name="blog_title" value="" data-name="タイトル" data-minlength="1" data-maxlength="100">
                    </div>
                `)
                $("input[name='blog_title']").on("input", function(){
                    const title = $(this).val().trim()
                    if(title==blogTitle){
                        $("#blogdelete").prop("disabled", false)
                    }else{
                        $("#blogdelete").prop("disabled", true)
                    }
                })

                $("#blogdelete").on("click", function(){
                    const title = $("input[name='blog_title']").val().trim()
                    if(title==blogTitle){
                        var confirmed = confirm('この活動報告を削除します。よろしいですか？\n（この操作は取り消すことはできません）');
                        if(confirmed) {
                            $(".c-form").trigger("submit")
                        }
                    }else{
                        $("#noveldelete").prop("disabled", true)
                    }
                    
                })
            }
        })
    }
        
}

function pointAverage(){
    if(location.hostname=="syosetu.com" && location.pathname.match(/^\/usernovelmanage\/top\/ncode\/\d+\/*$/)){
        chrome.storage.local.get(null, function(data){
            if(data.workspaceNovelmanageShowPointAverage){
                if($(".p-up-novelinfo__reaction").length){
                    var point = $(".p-up-novelinfo__reaction .js-hyokapointavg")
                    const pointAvg = point.find("input[name='score']").attr("value")
                    point.find(".p-up-novelinfo__point-star").before(`<span style="margin-right: 3px;">${pointAvg}</span>`)
                }
            }
        })
    }
}