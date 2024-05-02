import { convertRubyTags, convertSasieTags } from "../../utils/text.js"
import { _toolCovertKakuyomuRubyDot, _toolIndent, _toolRuby, _toolRubyDot, _toolSasie, _toolSearch } from "./_editorTools.js"
import { escapeHtml, countCharacters, indexToNcode } from "/utils/text.js"

let isEventLocked = false

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
                            <div id="nt-editor--panel-undoredo">
                                <button type="button" id="nt-editor--panel-undo" class="nt-button nt-editor--panel-undoredo-button" title="戻す">
                                    <i class="fa-solid fa-angle-left"></i>
                                </button>
                                <button type="button" id="nt-editor--panel-redo" class="nt-button nt-editor--panel-undoredo-button" title="やり直す">
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
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
                        <span class="nt-panel--tab-item" data="3">
                            <button type="button" class="nt-panel--tab-button">フリーメモ</button>
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
                        <div id="nt-panel--tab-content--tools-format">
                            <h4 class="underline">記法挿入</h4>
                            <button type="button" class="nt-button nt-notation-button" id="nt-tools--ruby">
                                <span class="nt-notation-button--label">ルビ</span>
                                <span class="nt-notation-button--sample">
                                    <span class="nt-notation--sample-row nt-notation--sample-parsed"><ruby>加茂川<rp>(</rp><rt>かもがわ</rt><rp>)</rp></ruby>の水</span>
                                    <span class="nt-notation--sample-row nt-notation--sample-code"><span class="code">｜加茂川《かもがわ》の水</span></span>
                                </span>
                            </button>
                            <button type="button" class="nt-button nt-notation-button" id="nt-tools--rubydot">
                                <span class="nt-notation-button--label">傍点</span>
                                <span class="nt-notation-button--sample">
                                    <span class="nt-notation--sample-row nt-notation--sample-parsed"><ruby>絵<rp>(</rp><rt>・</rt><rp>)</rp></ruby><ruby>画<rp>(</rp><rt>・</rt><rp>)</rp></ruby>の鑑賞</span>
                                    <span class="nt-notation--sample-row nt-notation--sample-code"><span class="code">｜絵《・》｜画《・》の鑑賞</span></span>
                                </span>
                            </button>
                            <button type="button" class="nt-button nt-notation-button" id="nt-tools--sasie">
                                <span class="nt-notation-button--label">挿絵</span>
                                <span class="nt-notation-button--sample">
                                    <span class="nt-notation--sample-row">みてみんの画像を挿入</span>
                                    <span class="nt-notation--sample-row nt-notation--sample-code"><span class="code">&lt;iコード|ユーザID&gt;</span></span>
                                </span>
                            </button>
                        </div>

                        <div id="nt-panel--tab-content--tools-replace">
                            <h4 class="underline">一括変更</h4>
                            <!--
                            <button type="button" class="nt-button nt-notation-button" id="nt-tools--replace">
                                <i class="fa-solid fa-asterisk"></i>置換
                            </button>
                            -->
                            <button type="button" class="nt-button nt-notation-button" id="nt-tools--indent">
                                <i class="fa-solid fa-indent"></i>段落の先頭を字下げ
                            </button>
                            <button type="button" class="nt-button nt-notation-button" id="nt-tools--kakuyomu-rubydot">
                                <span class="nt-notation-button--sample">
                                    <span class="nt-notation--sample-row">カクヨム記法の傍点を修正</span>
                                    <span class="nt-notation--sample-row nt-notation--sample-code"><span class="code">《《絵画》》</span> <i class="fa-solid fa-arrow-right"></i> <span class="code">｜絵《・》｜画《・》</span></span>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div class="nt-panel--tab-content" id="nt-panel--tab-freememo" data="3">
                        <div id="nt-panel--tab-content--freememo">
                            <h4 class="underline">フリーメモ</h4>
                            <div id="nt-panel--tab-freememo-box"></div>
                        </div>
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
    elm.find(".nt-editor--main-title").append(container.find("input[name='subtitle']").clone(true).attr("placeholder", "エピソードタイトルを入力…").addClass("nt-check-state"))
    elm.find(".nt-editor--main-novel").append(container.find("textarea[name='novel']").clone(true).attr("placeholder", "本文を入力…").addClass("nt-check-state"))
    elm.find(".nt-editor--preface").append(container.find("textarea[name='preface']").clone(true).attr("placeholder", "前書きを入力…").addClass("nt-check-state"))
    elm.find(".nt-editor--postscript").append(container.find("textarea[name='postscript']").clone(true).attr("placeholder", "後書きを入力…").addClass("nt-check-state"))
    elm.find(".nt-editor--freememo").append(container.find("textarea[name='freememo']").clone(true).attr("placeholder", "フリーメモを入力…").addClass("nt-check-state"))
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

    // Alerts
    container.find(".c-alert").each(function(){
        console.log($(this).text())
        elm.find(".nt-editor--body").prepend(
            $(this).addClass(["nt-editor--body-content-banner", "nt-editor--body-content-baner-removable", "nt-editor--footer-tab-content"]).attr("data", 0)
        )
    })

    // Utilities
    /* Unload Warnings */
    let isChanged = false
    elm.find("input,textarea").on("input", function(){
        if(!isChanged){
            $(window).on('beforeunload', function (event) {
                event.preventDefault()
            })
            isChanged = true
        }
    })
    container.find("form.c-form").on("submit", function(e){
        if(isChanged){
            $(window).off('beforeunload')
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
            isEventLocked = true
            $("textarea[name='novel']").trigger("input")
            isEventLocked = false
        }else if(index=="1"){
            novelPadding("textarea[name='preface']")
            isEventLocked = true
            $("textarea[name='preface']").trigger("input")
            isEventLocked = false
        }else if(index=="2"){
            novelPadding("textarea[name='postscript']")
            isEventLocked = true
            $("textarea[name='postscript']").trigger("input")
            isEventLocked = false
        }else if(index=="3"){
            novelPadding("textarea[name='freememo']")
            isEventLocked = true
            $("textarea[name='freememo']").trigger("input")
            isEventLocked = false
        }else if(index=="4"){
            showPreview()
        }

        // Reset Scrolls
        $(".nt-editor--body").scrollTop($(".nt-editor--body").get(0).scrollHeight)
    }
    elm.find(".nt-editor--footer-tab-item").on("click", function(){
        const idx = $(this).attr("data")
        selectFooterTab(idx)
    })

    /* Banner (Removable) */
    elm.find(".nt-editor--body-content-banner.nt-editor--body-content-baner-removable").each(function(){
        $(this).append($(`
            <div class="nt-editor--body-content-banner--remove-button">
                <i class="fa-solid fa-xmark"></i>
            </div>
            `).on("click", function(){
                $(this).parent().remove()
            })
        )
    })

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
    textCount()
    insertUtilities()
    stateCheck()
    freememo()
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

function textCount(){
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
    $("textarea[name='novel']").on("input", countText)
    countText()
}

export function getSelectedContent(){
    const idx = parseInt($(`input[name="nt-editor--selected-content"]`).val())
    if(isNaN(idx)){
        return null
    }else{
        return idx
    }
}

/*
    elm.find(".nt-editor--main-title").append(container.find("input[name='subtitle']").clone(true).attr("placeholder", "エピソードタイトルを入力…"))
    elm.find(".nt-editor--main-novel").append(container.find("textarea[name='novel']").clone(true).attr("placeholder", "本文を入力…"))
    elm.find(".nt-editor--preface").append(container.find("textarea[name='preface']").clone(true).attr("placeholder", "前書きを入力…"))
    elm.find(".nt-editor--postscript").append(container.find("textarea[name='postscript']").clone(true).attr("placeholder", "後書きを入力…"))
    elm.find(".nt-editor--freememo").append(container.find("textarea[name='freememo']").clone(true).attr("placeholder", "フリーメモを入力…"))
*/
function stateCheck(){
    const state = []
    const maxState = 1000
    let currentState = 0
    const firstState = {}
    let isTrashedState = false

    function pushState(value, name, caret){
        if(state.length-1 != currentState){
            state.splice(0, currentState)
            currentState = 0
        }
        state.unshift([value, name, caret])
        if(state.length > maxState){
            state.pop()
            isTrashedState = true
        }
        buttonState()
        
    }

    function restoreState(isFirst){
        var value, name, caret
        if(isFirst){
            const lastStateName = state[state.length-1][1]

            value = firstState[lastStateName][0]
            name = firstState[lastStateName][1]
            caret = firstState[lastStateName][2]
            $(`.nt-check-state[name='${name}']`).val(value)
            isEventLocked = true
            $(`.nt-check-state[name='${name}']`).trigger("input")
            isEventLocked = false
            $(`.nt-check-state[name='${name}']`).selection("setPos", caret)
        }else{
            if(state.length>0){
                const appliedState = state[currentState]
                value = appliedState[0]
                name = appliedState[1]
                caret = appliedState[2]

                $(`.nt-check-state[name='${name}']`).val(value)
                isEventLocked = true
                $(`.nt-check-state[name='${name}']`).trigger("input")
                isEventLocked = false
                $(`.nt-check-state[name='${name}']`).selection("setPos", caret)
            }
        }
        buttonState()
    }

    function buttonState(){
        if(state.length>0){
            if(currentState==0){
                $("#nt-editor--panel-redo").prop("disabled", true)
            }else{
                $("#nt-editor--panel-redo").prop("disabled", false)
            }
            if(isTrashedState){
                if(currentState>=state.length-1){
                    $("#nt-editor--panel-undo").prop("disabled", true)
                }else{
                    $("#nt-editor--panel-undo").prop("disabled", false)
                }
            }
            else{
                if(currentState>state.length-1){
                    $("#nt-editor--panel-undo").prop("disabled", true)
                }else{
                    $("#nt-editor--panel-undo").prop("disabled", false)
                }
            }
        }else{
            $("#nt-editor--panel-undo, #nt-editor--panel-redo").prop("disabled", true)
        }
    }

    /* buttons */
    function undoClicked(){
        if(!isTrashedState && state.length==currentState+1){
            currentState += 1
            restoreState(true)
        }else if(state.length > 0 && currentState+1 <= state.length){
            currentState += 1
            restoreState()
        }
    }
    function redoClicked(){
        if(state.length > 0 && currentState-1 >= 0){
            currentState -= 1
            restoreState()
        }
    }
    $("#nt-editor--panel-undo").on("click", function(){
        undoClicked()
    })
    $("#nt-editor--panel-redo").on("click", function(){
        redoClicked()
    })
    $("body").keydown(function(e){
        if ((e.ctrlKey || e.metaKey) && e.key == 'z') {
            e.preventDefault();
            undoClicked()
        }
        else if((e.ctrlKey || e.metaKey) && e.key == 'y') {
            e.preventDefault();
            redoClicked()
        }
    });
    buttonState()

    /* changes */
    $(".nt-check-state").on("compositionstart", function(){
        isEventLocked = true
    })
    $(".nt-check-state").on("compositionend", function(){
        isEventLocked = false
        pushState($(this).val(), $(this).attr("name"), $(this).selection("getPos"))
    })
    $(".nt-check-state").on("input", function(){
        if(!isEventLocked){
            pushState($(this).val(), $(this).attr("name"), $(this).selection("getPos"))
        }
    })

    /* initial state */
    $(".nt-check-state").each(function(){
        firstState[$(this).attr("name")] = [$(this).val(), $(this).attr("name"), $(this).selection("getPos")]
    })
}

function freememo(){
    function resetFreememo(){
        var text = $("textarea[name='freememo']").val().replace(/\r\n|\r/g, '\n');
        $("#nt-panel--tab-freememo-box").empty()
        $.each(text.split(/\n/), function(_, line){
            var p = $("<p></p>").addClass("content")
            p.text(line)
            if(line.match(/^ *$/)){
                p.append("<br/>")
            }
            $("#nt-panel--tab-freememo-box").append(p)
        })
    }

    $("textarea[name='freememo']").on("input", function(){
        resetFreememo()
    })
    //resetFreememo()
}

function insertUtilities(){
    _toolRuby()
    _toolRubyDot()
    _toolSasie()

    _toolSearch()
    _toolIndent()
    _toolCovertKakuyomuRubyDot()
}