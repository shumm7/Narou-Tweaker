import { convertRubyTags, convertSasieTags } from "../../utils/text.js"
import { _toolCovertKakuyomuRubyDot, _toolRuby, _toolRubyDot, _toolSasie } from "./_editorTools.js"
import { escapeHtml, countCharacters, indexToNcode } from "/utils/text.js"

export function _editor(){
    changeEditorPageLikePreview()
}

function changeEditorPageLikePreview(){
    $("body").addClass("narou-tweaker-custom-editor")

    var container = $(".l-container")
    const title = container.find(".c-up-title-area__title").text()
    const header = "新規エピソード作成"
    const curmbs = $(".l-breadcrumb .c-up-breadcrumb__item:has(a):last a").attr("href")
    const ncode = indexToNcode($(".js-novel_backup_info").attr("data-ncode"))
    const userid = $(".js-novel_backup_info").attr("data-userid")

    $(".l-header").remove()
    $(".l-breadcrumb").remove()
    $(".l-footer").remove()

    // box
    var elm = $(`
        <div class="nt-container nt-panel-show">
            <div class="nt-editor">
                <div class="nt-editor--outer">
                    <div class="nt-editor--header">
                        <div class="nt-editor--header-items nt-editor-header-left">
                            <button type="button" class="nt-button" id="nt-editor--panel-toggle" title="サイドパネルを開閉">
                                <i class="fa-solid fa-table-columns"></i>
                            </button>
                            <div class="nt-editor--panel-vertical-devide"></div>
                        </div>
                        <div class="nt-editor--header-items nt-editor-header-middle">
                            ${header}
                        </div>
                        <div class="nt-editor--header-items nt-editor-header-right" id="nt-editor--save-button">
                            <a type="button" class="nt-button" id="nt-editor--panel-close" title="編集画面を閉じる">
                                <i class="fa-solid fa-xmark"></i>
                            </a>
                        </div>
                    </div>
                    <div class="nt-editor--body">
                        <!-- バナー -->
                        <div class="nt-editor--body-content-banner nt-editor--footer-tab-content nt-content-hidden" data="1">
                            <span style="text-decoration: underline; font-weight: bold;">前書き</span>&nbsp;を編集しています。
                        </div>
                        <div class="nt-editor--body-content-banner nt-editor--footer-tab-content nt-content-hidden" data="2">
                            <span style="text-decoration: underline; font-weight: bold;">後書き</span>&nbsp;を編集しています。
                        </div>
                        <div class="nt-editor--body-content-banner nt-editor--footer-tab-content nt-content-hidden" data="3">
                            <span style="text-decoration: underline; font-weight: bold;">フリーメモ</span>&nbsp;を編集しています。<br>
                            エピソードと一緒に保存しておけるメモです。書いたメモは他のユーザには公開されません。詳細は<a href="https://syosetu.com/helpcenter/helppage/helppageid/36/" target="_blank">ヘルプセンター</a>をご確認ください。
                        </div>
                        <div class="nt-editor--body-content-banner nt-editor--footer-tab-content nt-content-hidden" data="4">
                            <span style="text-decoration: underline; font-weight: bold;">プレビュー</span>&nbsp;を表示中（このエピソードの文字数：<span class="nt-editor--textcount" data="0"></span> 字）<br>
                            実際の表示と異なる可能性があります。
                        </div>

                        <!-- コンテンツ -->
                        <input type="hidden" name="nt-editor--selected-content" value="0">
                        <div class="nt-editor--body-content nt-editor--footer-tab-content nt-content-hidden" id="nt-editor--main" data="0">
                            <div class="nt-editor--main-items">
                                <div class="nt-editor--main-title">
                                    <span class="nt-editor--main-title-novel">${title}</span>
                                </div>
                                <div class="nt-editor--main-novel"></div>
                            </div>
                        </div>
                        <div class="nt-editor--body-content nt-editor--footer-tab-content nt-content-hidden" id="nt-editor--preface" data="1">
                            <div class="nt-editor--preface"></div>
                        </div>
                        <div class="nt-editor--body-content nt-editor--footer-tab-content nt-content-hidden" id="nt-editor--postscript" data="2">
                            <div class="nt-editor--postscript"></div>
                        </div>
                        <div class="nt-editor--body-content nt-editor--footer-tab-content nt-content-hidden" id="nt-editor--freememo" data="3">
                            <div class="nt-editor--freememo"></div>
                        </div>
                        <div class="nt-editor--body-content nt-editor--footer-tab-content nt-content-hidden" id="nt-editor--preview" data="4">
                            <div class="nt-editor--preview-items">
                                <div id="nt-preview--novel_subtitle"></div>
                                <div class="nt-editor--preview-contents">
                                    <div id="nt-preview--novel_p" class="novel-view"></div>
                                    <div id="nt-preview--novel_honbun" class="novel-view"></div>
                                    <div id="nt-preview--novel_a" class="novel-view"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nt-editor--footer">
                        <div class="nt-editor--footer-items nt-editor-footer-left">
                            <div class="nt-editor--footer-tab">
                                <span class="nt-editor--footer-tab-item" data="3">
                                    <button type="button" class="nt-editor--footer-tab-button"><i class="fa-regular fa-note-sticky"></i>フリーメモ</button>
                                </span>
                                <span class="nt-editor--footer-tab-item" data="4">
                                    <button type="button" class="nt-editor--footer-tab-button"><i class="fa-solid fa-align-left"></i>プレビュー</button>
                                </span>
                            </div>
                        </div>
                        <div class="nt-editor--footer-items nt-editor-footer-middle">
                            <div class="nt-editor--footer-tab">
                                <span class="nt-editor--footer-tab-item" data="1">
                                    <button type="button" class="nt-editor--footer-tab-button">前書き</button>
                                </span>
                                <span class="nt-editor--footer-tab-item nt-selected" data="0">
                                    <button type="button" class="nt-editor--footer-tab-button">本文</button>
                                </span>
                                <span class="nt-editor--footer-tab-item" data="2">
                                    <button type="button" class="nt-editor--footer-tab-button">後書き</button>
                                </span>
                            </div>
                        </div>
                        <div class="nt-editor--footer-items nt-editor-footer-right">
                            <div class="nt-editor--footer-textcount nt-editor--footer-tab-content" data="0">
                                <div class="nt-editor--textcount nt-editor--footer-textcount-number" data="1"></div>
                                <div class="nt-editor--footer-textcount-unit">文字</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <aside class="nt-panel">
                <div class="nt-panel--header">
                    <div class="nt-panel--tab">
                        <span class="nt-panel--tab-item" data="0">
                            <button type="button" class="nt-panel--tab-button">統計</button>
                        </span>
                        <span class="nt-panel--tab-item" data="1">
                            <button type="button" class="nt-panel--tab-button">表示</button>
                        </span>
                        <span class="nt-panel--tab-item" data="2">
                            <button type="button" class="nt-panel--tab-button">ツール</button>
                        </span>

                    </div>
                </div>
                <div class="nt-panel--content">
                    <div class="nt-panel--tab-content" id="nt-panel--tab-stats" data="0">
                        <!--文字数-->
                        <div id="nt-panel--tab-content--textcount">
                            <h4 class="underline">文字数</h4>
                            <p>エピソード本文の文字数を表示しています。</p>
                            <div class="box">
                                <p class="content">
                                    空白・改行含む：<span class="nt-editor--textcount" data="0"></span> 字<br>
                                    空白・改行含まない：<span class="nt-editor--textcount" data="1"></span> 字
                                </p>
                            </div>
                        </div>

                        <!--作品情報-->
                        <div id="nt-panel--tab-content--info" style="display: none;">
                            <h4 class="underline">作品情報</h4>
                            <p><a id="narou-api-fetch-url">なろうAPI</a>を用いて作品の詳細情報を表示しています。</p>
                            <div class="box">
                                <p class="content">
                                    <span style="font-weight: bold" id="novel-title"></span>
                                </p>
                                <div class="border"></div>
                                <p>
                                    文字数：<span id="novel-length"></span> 字<br>
                                    会話率：<span id="novel-kaiwaritu"></span>%<br>
                                    挿絵数：<span id="novel-sasie"></span><br>
                                    話数：<span id="novel-episode-count"></span>
                                </p>
                                <div class="border"></div>
                                <p>
                                    ブックマーク：<span id="novel-bookmark"></span> 人<br>
                                    評価：<span id="novel-hyoka"></span> pt / <span id="novel-hyoka-count"></span> 人<br>
                                    感想数：<span id="novel-impression"></span><br>
                                    レビュー数：<span id="novel-review"></span><br>
                                    総合評価：<span id="novel-global-point"></span> pt
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="nt-panel--tab-content" id="nt-panel--tab-display" data="1">
                        <h4 class="underline">執筆時の表示設定</h4>
                        <p>閲覧画面には影響しません。</p>
                    </div>  
                    <div class="nt-panel--tab-content" id="nt-panel--tab-tools" data="2">
                        <button type="button" id="nt-tools--ruby">ルビ</button>
                        <button type="button" id="nt-tools--rubydot">傍点</button>
                        <button type="button" id="nt-tools--kakuyomu-rubydot">カクヨムの傍点</button>
                        <button type="button" id="nt-tools--sasie">挿絵</button>
                    </div>
                </div>
            </aside>
        </div>
    `)

    // editor
    elm.find("#nt-editor--panel-toggle").on("click", function(){
        if($(".nt-container").hasClass("nt-panel-show")){
            $(".nt-container").removeClass("nt-panel-show")
        }else{
            $(".nt-container").addClass("nt-panel-show")
        }
    })

    // buttons
    elm.find("#nt-editor--save-button").append(container.find(".c-button-box-center:has(.js-previewButton)"))
    elm.find(".nt-editor-footer-right").prepend(container.find(".p-up-novel-input__upload").addClass("nt-editor--footer-tab-content").attr("data", 0))
    elm.find(".p-up-novel-input__upload button").text("ファイルから読込（txt）")
    elm.find(".nt-editor-footer-right").prepend(container.find(".js-read_preface_template").addClass("nt-editor--footer-tab-content").attr("data", 1))
    elm.find(".nt-editor-footer-right").prepend(container.find(".js-read_postscript_template").addClass("nt-editor--footer-tab-content").attr("data", 2))
    elm.find("#nt-editor--panel-close").attr("href", curmbs)

    elm.find(".p-up-novel-input__upload input[name='novel-file']").remove()
    elm.find(".p-up-novel-input__upload").append($(`<input type="file" name="novel-file" hidden="">`).on("change", function(){
        const MAX_FILE_SIZE = $(this).parent().find(`input[name="MAX_FILE_SIZE"]`).attr("value")
        var textfile = $(this).prop('files')[0];
		if(textfile.size > MAX_FILE_SIZE){
			alert('ファイルが大きすぎます。1MB以下のファイルを指定してください。');
			$(this).val('');
			$('.js-upload_file_name').text('');
			return;
		}

		if(textfile.type != 'text/plain'){
			alert('テキストファイル以外は利用できません。');
			$(this).val('');
			$('.js-upload_file_name').text('');
			return;
		}

		var reader = new FileReader();
		reader.addEventListener('loadend', function(){
			if(reader.error){
				alert('ファイルの読み込みに失敗しました。');
				$('input[name="novel-file"]').val('');
				return;
			}

			if(!reader.result.byteLength){
				alert('ファイルの中身が空です。');
				$('input[name="novel-file"]').val('');
				return;
			}

			var codeArray = new Uint8Array(reader.result);
			var encodingType = Encoding.detect(codeArray);

			var text = Encoding.convert(codeArray,{
				to: 'UNICODE',
				from: encodingType,
				type: 'string',
			});

			$('textarea[name="novel"]').val(text);
            $('textarea[name="novel"]').trigger("input")
		});
		reader.readAsArrayBuffer(textfile);
    }))

    // inputs
    elm.find(".nt-editor--main-title").append(container.find("input[name='subtitle']").clone(true).attr("placeholder", "エピソードタイトルを入力…"))
    elm.find(".nt-editor--main-novel").append(container.find("textarea[name='novel']").clone(true).attr("placeholder", "本文を入力…"))
    elm.find(".nt-editor--preface").append(container.find("textarea[name='preface']").clone(true).attr("placeholder", "前書きを入力…"))
    elm.find(".nt-editor--postscript").append(container.find("textarea[name='postscript']").clone(true).attr("placeholder", "後書きを入力…"))
    elm.find(".nt-editor--freememo").append(container.find("textarea[name='freememo']").clone(true).attr("placeholder", "フリーメモを入力…"))
    elm.find(".c-form__textarea").each(function(){
        var elm = $(this)
        elm.attr("rows", 1)
        const ch = elm.height()
        
        elm.on("input", function(){
            $(this).css("padding-bottom", 0)
            const scroll = $(".nt-editor--body").scrollTop()
            const height = $(".nt-editor--body").get(0).scrollHeight
            elm.height(ch)
            const sh = elm.get(0).scrollHeight
            elm.height(sh)
            if(sh!=ch){
                $(".nt-editor--body").scrollTop(scroll + $(".nt-editor--body").get(0).scrollHeight - height)
            }
            novelPadding(this)
        })
    })
    var novelPadding = function(elm){
        const top = $(elm).position().top
        const vh = $("body").height()
        const height = $(elm).height()
        const diffs = vh - (top + height) - 60 - 90
        if(diffs>0){
            $(elm).css("padding-bottom", diffs)
        }else{
            $(elm).css("padding-bottom", 50)
        }
    }

    // Utilities
    /* Unload Warnings */
    let isChanged = false
    elm.find("input,textarea").on("input", function(){
        if(!isChanged){
            window.addEventListener('beforeunload', function (event) {
                event.preventDefault()
            })
            isChanged = true
        }
    })

    /* Sidepanel Tabs */
    var selectPanelTab = function(index){
        $(".nt-panel--tab-item").removeClass("nt-selected")
        $(".nt-panel--tab-content").addClass("nt-content-hidden")
        $(`.nt-panel--tab-item[data='${index}']`).addClass("nt-selected")
        $(`.nt-panel--tab-content[data='${index}']`).removeClass("nt-content-hidden")
    }
    elm.find(".nt-panel--tab-item").on("click", function(){
        const idx = $(this).attr("data")
        selectPanelTab(idx)
    })

    /* Footer Tabs */
    var selectFooterTab = function(index){
        $(".nt-editor--footer-tab-item").removeClass("nt-selected")
        $(".nt-editor--footer-tab-content").addClass("nt-content-hidden")
        $(`.nt-editor--footer-tab-item[data='${index}']`).addClass("nt-selected")
        $(`.nt-editor--footer-tab-content[data='${index}']`).removeClass("nt-content-hidden")
        $(`input[name="nt-editor--selected-content"]`).val(index)

        // Specific Field
        index = `${index}`
        if(index=="0"){
            novelPadding("textarea[name='novel']")
        }else if(index=="1"){
            novelPadding("textarea[name='preface']")
        }else if(index=="2"){
            novelPadding("textarea[name='postscript']")
        }else if(index=="3"){
            novelPadding("textarea[name='freememo']")
        }else if(index=="4"){
            showPreview()
        }
    }
    elm.find(".nt-editor--footer-tab-item").on("click", function(){
        const idx = $(this).attr("data")
        selectFooterTab(idx)
    })

    /* Text count */
    var countText = function(){
        var text = $("textarea[name='novel']").val()

        $(".nt-editor--textcount").each(function(){
            const mode = $(this).attr("data")
            var number
            if(mode=="1"){
                number = countCharacters(text, false, false, false);
            }else{
                number = countCharacters(text, true, true, true);
            }
            number = parseInt(number)
            if(isNaN(number)){
                $(this).text(0)
            }else{
                $(this).text(number.toLocaleString())
            }
        })
    }
    elm.find("textarea[name='novel']").on("input", countText)

    /* API */
    var url = "https://api.syosetu.com/novelapi/api/?out=json&libtype=2&ncode=" + ncode
    /*if(r18){
        url = "https://api.syosetu.com/novel18api/api/?out=json&libtype=2&ncode=" + ncode
    }*/

    chrome.runtime.sendMessage({action: "fetch", format: "json", data: {url: url, options: {'method': 'GET'}}}, function(response){
    const box = $("#nt-panel--tab-content--info")
    if(response){
        if(response.success && response.action=="fetch"){
            var data = response.result[1]
            if(data!=undefined){
                box.find("#novel-title").text(data.title)
                box.find("#novel-length").text(data.length.toLocaleString())
                box.find("#novel-episode-count").text(data.general_all_no.toLocaleString())
                box.find("#novel-sasie").text(data.sasie_cnt.toLocaleString())
                box.find("#novel-kaiwaritu").text(data.kaiwaritu)
                box.find("#novel-global-point").text(data.global_point.toLocaleString())
                box.find("#novel-hyoka").text(data.all_point.toLocaleString())
                box.find("#novel-hyoka-count").text(data.all_hyoka_cnt.toLocaleString())
                box.find("#novel-bookmark").text(data.fav_novel_cnt.toLocaleString())
                box.find("#novel-impression").text(data.impression_cnt.toLocaleString())
                box.find("#novel-review").text(data.review_cnt.toLocaleString())
                box.css("display", "block")
                $("#narou-api-fetch-url").prop("href", url)
            }
        }
        return true;
    }
    });

    // DOM
    var form = container.find("form.c-form").clone(true).empty().append(elm)

    $("body > div:first-child").after(form)
    $("body").on("scroll", function(e){
        const s = $(this).scrollTop()
        $(".nt-editor--body-content").scrollTop(s)
    })
    $(".l-container").remove()

    // Initialize
    selectFooterTab(0)
    selectPanelTab(0)
    countText()
    insertUtilities()
    stateCheck()
}

function showPreview(){
    function isEmpty(elm){
        if(elm.get(0).innerHTML.match(/^ *$/)){
            elm.append("<br/>")
        }
    }

    // subtitle
    $("#nt-preview--novel_subtitle").empty()
    const subtitle = escapeHtml($(`input[name="subtitle"]`).val())
    if(subtitle.length>0){
        $("#nt-preview--novel_subtitle").text(subtitle)
    }else{
        $("#nt-preview--novel_subtitle").append(`<span class="empty">エピソードタイトルを入力するとここに表示されます。</span>`)
    }

    // preface
    $("#nt-preview--novel_p").empty()
    const preface = escapeHtml($(`textarea[name="preface"]`).val().replace(/\r\n/g, '\n').replace(/\r/g, '\n'))
    if(preface.length>0){
        $.each(preface.split(/\n/), function(i, text){
            var p = $(`<p id="Lp${i+1}">${convertRubyTags(text, true)}</p>`)
            isEmpty(p)
            $("#nt-preview--novel_p").append(p)
        })
    }else{
        $("#nt-preview--novel_p").append(`<span class="empty">前書きを入力するとここに表示されます。</span>`)
    }

    // honbun
    $("#nt-preview--novel_honbun").empty()
    const honbun = escapeHtml($(`textarea[name="novel"]`).val().replace(/\r\n/g, '\n').replace(/\r/g, '\n'))
    if(honbun.length>0){
        $.each(honbun.split(/\n/), function(i, text){
            var p = $(`<p id="L${i+1}">${convertRubyTags(text, true)}</p>`)
            convertSasieTags(p)
            isEmpty(p)
            $("#nt-preview--novel_honbun").append(p)
        })
    }else{
        $("#nt-preview--novel_honbun").append(`<span class="empty">本文を入力するとここに表示されます。</span>`)
    }

    // postscript
    $("#nt-preview--novel_a").empty()
    const postscript = escapeHtml($(`textarea[name="postscript"]`).val().replace(/\r\n/g, '\n').replace(/\r/g, '\n'))
    if(postscript.length>0){
        $.each(postscript.split(/\n/), function(i, text){
            var p = $(`<p id="La${i+1}">${convertRubyTags(text, true)}</p>`)
            isEmpty(p)
            $("#nt-preview--novel_a").append(p)
        })
    }else{
        $("#nt-preview--novel_a").append(`<span class="empty">後書きを入力するとここに表示されます。</span>`)
    }

}

export function getSelectedContent(){
    const idx = parseInt($(`input[name="nt-editor--selected-content"]`).val())
    if(isNaN(idx)){
        return null
    }else{
        return idx
    }
}

function stateCheck(){
    let isIMEActive = false
    const state = []
    const maxState = 100
    let currentStateIndex = 0

    function pushState(value){
        console.log("pushed! -> " + value)
        if(state.length-1 != currentStateIndex){
            state.splice(currentStateIndex)
        }
        state.unshift(value)
        if(state.length > maxState){
            state.pop()
        }
    }

    $("textarea[name='novel']").on("compositionstart", function(){
        isIMEActive = true
    })
    $("textarea[name='novel']").on("compositionend", function(){
        isIMEActive = false
        pushState($(this).val())
    })
    $("textarea[name='novel']").on("input", function(){
        if(!isIMEActive){
            pushState($(this).val())
        }
    })
}

function insertUtilities(){
    _toolRuby()
    _toolRubyDot()
    _toolCovertKakuyomuRubyDot()
    _toolSasie()
}