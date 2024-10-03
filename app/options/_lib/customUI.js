export const customUIList = {
    ui_extIntroduction_Image: `
        <div id="intro">
            <img src="/assets/image/wide.png">
            <span class="title">Narou Tweaker</span>
            <div class="subtitle">
                <span class="version extension-version"></span>
            </div>
        </div>
    `,

    ui_extIntroduction_About: `
        <div class="description">
            <p>
                Narou Tweakerは「小説家になろう」のユーザー体験を向上させることを目的に開発された、ブラウザ拡張機能です。
            </p>
            <p>
                幅広い拡張性と高いユーザビリティで、より快適に小説を楽しむことが出来ます。
            </p>
            <div id="downloads">
                <div class="download-item">
                    <a href="https://chromewebstore.google.com/detail/narou-tweaker/ihenjmpgnkmihnoogkokhgboafifphlp">
                        <span class="download-item--icon"><i class="fa-brands fa-chrome"></i></span>
                        <span class="download-item--title">Chrome</span>
                    </a>
                </div>
                <div class="download-item">
                    <a href="https://addons.mozilla.org/ja/firefox/addon/narou-tweaker/">
                        <span class="download-item--icon"><i class="fa-brands fa-firefox-browser"></i></span>
                        <span class="download-item--title">FireFox</span>
                    </a>
                </div>
            </div>
        </div>
    `,

    ui_extIntroduction_Terms: `
        <div class="description">
            <p>
                Narou Tweakerを利用される際には、<a href="https://github.com/shumm7/Narou-Tweaker/blob/main/TERMS.md">利用規約・プライバシーポリシー</a>をご確認ください。
            </p>
            <p>
                ご同意いただけない場合は、本アプリケーションにアクセスしないでください。
            </p>
        </div>
    `,

    ui_extIntroduction_Support: `
        <div class="description">
            <p>
                <span style="color: red; font-weight: bold"><i class="fa-solid fa-triangle-exclamation"></i> これは開発中のバージョンです！ 不具合が発生したり、破壊的な変更が行われる場合があります。</span>
            </p>
            <p>
                不具合が発生した、こんな機能が欲しい、使い方が分からない。<br>
            </p>
            <p>
                このような時は、<a style="font-weight: bold;" href="https://github.com/shumm7/Narou-Tweaker/issues">GitHub</a>もしくは<a style="font-weight: bold;" href="https://novelcom.syosetu.com/impression/list/ncode/2265900/">小説家になろう</a>などからお問い合わせください。
            </p>
        </div>
    `,

    ui_extIntroduction_License: `
        <div class="description">
            <p>
                Narou Tweakerのソースコードは、<a href="https://github.com/shumm7/Narou-Tweaker/blob/main/LICENSE">MIT License</a>で提供されています。
            </p>
            <p>
                詳しくは<a href="https://github.com/shumm7/Narou-Tweaker"><i class="fa-brands fa-github"></i> GitHubリポジトリ</a>をご確認ください。
            </p>
            <p style="margin-top: 10px; font-weight: bold;">
                作者：しゅう<i class="fa-brands fa-square-x-twitter"></i> <a href="https://twitter.com/shulmj_">@shulmj_</a>
            </p>
        </div>
    `,

    ui_extVersion_Patchnotes: `
        <p>
            Narou Tweakerの更新履歴を表示します。<br>
            現在のバージョンは、<span class="extension-version"></span>です。
        </p>
    `,

    ui_extResetButton: `
        <div class="export-option-text">
			<button class="button" id="removeOptionData" type="button">リセット</button>
		</div>
    `,

    ui_extFixButton: `
        <div class="export-option-text">
			<button class="button" id="fixOptionData" type="button">修復</button>
		</div>
    `,

    ui_extOptionList: `
        <div style="flex-shrink: 0; width: 100%;">
            <div class="export-option-text">
                <textarea class="textarea syntax-highlight" id="exportOptionText_Output" readonly data="json"></textarea>
            </div>
            <label for="extIgnoreOptionIndex">無視するインデックス</label>
            <input type="text" class="options" id="extIgnoreOptionIndex" style="width: 100%;" placeholder="スペース区切り">
        </div>
        <div style="flex-shrink: 0; width: 100%; margin-top: 10px;">
            <div class="export-option-text">
                <textarea class="textarea syntax-highlight" id="exportSyncOptionText_Output" readonly data="json"></textarea>
            </div>
            <label for="extIgnoreSyncOptionIndex">無視するインデックス</label>
            <input type="text" class="options" id="extIgnoreSyncOptionIndex" style="width: 100%;" placeholder="スペース区切り">
        </div>
        <div style="flex-shrink: 0; width: 100%; margin-top: 10px;">
            <div class="export-option-text">
                <textarea class="textarea syntax-highlight" id="exportSessionOptionText_Output" readonly data="json"></textarea>
            </div>
            <label for="extIgnoreSessionOptionIndex">無視するインデックス</label>
            <input type="text" class="options" id="extIgnoreSessionOptionIndex" style="width: 100%;" placeholder="スペース区切り">
        </div>
    `,

    ui_novelCustomHeaderDraggable: `
        <div id="novel_header_icon" style="display: flex; flex-flow: row; width: 100%;">
            <div class="draggable_area_outer" style="width: 33%;">
                <div class="title option-hide" data-for="novelCustomHeader" data="true">左</div>
                <div class="title option-hide" data-for="novelCustomHeader" data="false">上部</div>
                <div class="draggable_area" id="left" name="novel-header"></div>
            </div>
            <div class="draggable_area_outer" style="width: 33%;">
                <div class="title option-hide" data-for="novelCustomHeader" data="true">右</div>
                <div class="title option-hide" data-for="novelCustomHeader" data="false">下部</div>
                <div class="draggable_area" id="right" name="novel-header"></div>
            </div>
            <div class="draggable_area_outer" style="width: 33%;">
                <div class="title">非表示</div>
                <div class="draggable_area" id="disabled" name="novel-header"></div>
            </div>
        </div>
    `,

    ui_novelSkinSelect: `
        <div class="contents-option-head">
            <div class="contents-item--heading"></div>
            <div class="skin-option--preview">
                <div class="skin-preview">
                    <p>　この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</p>
                    <p>　Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div style="height: 1em;"></div>
                    <div id="subtitle-dummy">
                        <div id="link">1.目次テスト</div>
                        <div id="link-visited">2.訪問済み</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="contents-option-content">
            <div id="skin-option" class="section" style="padding: 1em; width: 100%;">
                <div id="skin-selection">
                    <div id="skin-selection--dropdown">
                        <div class="dropdown">
                            <select id="skin" name="skin"></select>
                        </div>
                    </div>
                    <div id="skin-selection--buttons" style="margin-left: 2em;">
                        <button name="new" type="button" class="button">＋</button>
                    </div>
                </div>
                <div id="skin-option--buttons">
                    <!--<button name="save" type="button" class="button">保存</button>-->
                    <button name="copy" type="button" class="button">複製</button>
                    <button name="delete" type="button" class="button">削除</button>
                    <span id="skin-option--editting"></span>
                </div>

                <div id="skin-option--options">
                    <div id="skin-option--field">
                        <div style="margin-bottom: 1em;">
                            <div class="textfield">
                                <label for="#skin-name">名前</label>
                                <input name="skin-name" class="option-skin" type="text" id="skin-name">
                                </input>
                            </div>
                            <div class="textfield">
                                <label for="#skin-description">概要</label>
                                <input name="skin-description" class="option-skin" type="text" id="skin-description">
                                </input>
                            </div>
                        </div>
                        <div>
                            <div class="textfield skin-detail">
                                <label for="#skin-novel-color">本文 文字色</label>
                                <div class="skin-color-field">
                                    <input name="skin-novel-color" class="option-skin color" type="text" id="skin-novel-color" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-novel-background">本文 背景色</label>
                                <div class="skin-color-field">
                                    <input name="skin-novel-background" class="option-skin color" type="text" id="skin-novel-background" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-novel-background-second">本文 背景色（サブ）</label>
                                <div class="skin-color-field">
                                    <input name="skin-novel-background-second" class="option-skin color" type="text" id="skin-novel-background-second" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-link-color">リンク色</label>
                                <div class="skin-color-field">
                                    <input name="skin-link-color" class="option-skin color" type="text" id="skin-link-color" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-link-color-visited">リンク色（クリック済み）</label>
                                <div class="skin-color-field">
                                    <input name="skin-link-color-visited" class="option-skin color" type="text" id="skin-link-color-visited" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-link-color-hover">リンク色（ホバー時）</label>
                                <div class="skin-color-field">
                                    <input name="skin-link-color-hover" class="option-skin color" type="text" id="skin-link-color-hover" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-sublist-underline">目次の下線 / ヘッダアイコン</label>
                                <div class="skin-color-field">
                                    <input name="skin-sublist-underline" class="option-skin color" type="text" id="skin-sublist-underline" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-sublist-underline-hover">目次の下線 / ヘッダアイコン（ホバー時）</label>
                                <div class="skin-color-field">
                                    <input name="skin-sublist-underline-hover" class="option-skin color" type="text" id="skin-sublist-underline-hover" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-sublist-underline-visited">目次の下線 / ヘッダアイコン（訪問時）</label>
                                <div class="skin-color-field">
                                    <input name="skin-sublist-underline-visited" class="option-skin color" type="text" id="skin-sublist-underline-visited" data-coloris>
                                    </input>
                                </div>
                            </div>
                            <div class="textfield skin-detail">
                                <label for="#skin-additional-style">追加CSS<span style="font-size: 80%">（ここで設定した内容はプレビューには表示されません）</span></label>
                                <div class="skin-color-field">
                                    <textarea class="option-skin textarea syntax-highlight" id="skin-additional-style" data="css"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    ui_novelSkinExportButtons: `
        <div id="skin-export">
            <div id="skin-export-buttons">
                <button id="skin-export-json" type="button" class="button"><i class="fa-solid fa-download"></i> JSONファイル</button>
                <button id="skin-export-text" type="button" class="button"><i class="fa-solid fa-align-left"></i> テキスト</button>
            </div>
            <div id="skin-export-output" style="display: none;" >
                <textarea class="textarea syntax-highlight autoselect" id="skin-export-output--field" readonly data="json"></textarea>
            </div>
        </div>
    `,

    ui_novelSkinImportButtons: `
        <div id="skin-import">
            <div id="skin-import-buttons">
                <label id="import-options-label">
                    <i class="fa-solid fa-upload"></i> ファイルから読み込む
                    <input id="skin-import-json" type="file" accept="application/json">
                </label>
            </div>
            <div id="skin-import-input">
                <textarea class="textarea syntax-highlight" id="skin-import-input--field" placeholder="ファイルをドロップ" data="json"></textarea>
                <button id="skin-import-input--submit" type="button" class="button"><i class="fa-solid fa-file-import"></i> 取り込む</button>
            </div>
            <div id="skin-import-warnings">
            </div>
        </div>
    `,

    ui_novelAuthorCustomSkinGenerator: `
        <div id="skin-author">
            <div id="skin-author-description">
                <p>
                    このバナーを貼り付けると、作者側で小説のスキンを指定することができます。<br>
                    ただし「作者設定スキン」を有効にしたNarou Tweakerユーザーにしか影響しません。
                </p>
            </div>
            <div id="skin-author-inputs">
                <div class="dropdown">
                    <select id="skin-author-export--type">
                        <option value="tiny-light">極小（ライト）</option>
                        <option value="small-light">小（ライト）</option>
                        <option value="medium-light">中（ライト）</option>
                        <option value="big-light">大（ライト）</option>
                        <option value="tiny-dark">極小（ダーク）</option>
                        <option value="small-dark">小（ダーク）</option>
                        <option value="medium-dark">中（ダーク）</option>
                        <option value="big-dark">大 （ダーク）</option>
                    </select>
                </div>
                <button id="skin-author-export--submit" type="button" class="button">バナーを生成</button>
            </div>
            <div id="skin-author-export">
                <textarea class="textarea syntax-highlight autoselect" id="skin-author-export--field" readonly data="xml"></textarea>
                <p>このコードをランキングタグへコピーしてください。</p>
            </div>
        </div>
    `,

    ui_novelFontSelect: `
        <div class="contents-option-head">
            <div class="contents-item--heading"></div>
            <div class="skin-option--preview">
                <div class="skin-preview">
                    <p>　この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</p>
                    <p>　Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div style="height: 1em;"></div>
                    <div id="subtitle-dummy">
                        <div id="link">1.目次テスト</div>
                        <div id="link-visited">2.訪問済み</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contents-option-content" style="align-items: flex-start;">
            <div id="font-family" class="section" style="padding: 1em; width: 100%;">
                <div id="font-family-selection">
                    <div id="font-family-selection--dropdown">
                        <div class="dropdown">
                            <select id="font-family-dropdown" name="font-family"></select>
                        </div>
                    </div>
                    <div id="font-family-selection--buttons" style="margin-left: 2em;">
                        <button name="new" type="button" class="button">＋</button>
                    </div>
                </div>
                <div id="font-family-option--buttons">
                    <!--<button name="save" type="button" class="button">保存</button>-->
                    <button name="copy" type="button" class="button">複製</button>
                    <button name="delete" type="button" class="button">削除</button>
                    <span id="font-family-option--editting"></span>
                </div>

                <div id="font-family-option--options">
                    <div id="font-family-option--field">
                        <div style="margin-bottom: 1em;">
                            <div class="textfield">
                                <label for="#font-name">名前</label>
                                <input name="font-name" class="option-font" type="text" id="font-name"></input>
                            </div>
                            <div class="textfield">
                                <label for="#font-description">概要</label>
                                <input name="font-description" class="option-font" type="text" id="font-description"></input>
                            </div>
                            <div class="font-detail">
                                <label for="#font-data">フォント設定</label>
                                <textarea class="option-font textarea font-option-field" id="font-data" name="font-data"></textarea>
                            </div>
                            <div class="textfield">
                                <label for="#font-css">追加CSS</label>
                                <textarea class="option-font textarea font-option-field syntax-highlight" id="font-css" name="font-css" style="height: 80px;" disabled data="css"></textarea>
                            </div>
                            <div class="textfield">
                                <label for="#font-license">ライセンス表示</label>
                                <textarea class="option-font textarea font-option-field" id="font-license" name="font-license" style="height: 80px;" disabled></textarea>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,

    ui_novelFontSizeInput: `
        <div id="font-size">
            <div style="margin: 0 .5em;">+</div>
            <div class="font-number-change-button" id="font-size-minus">-</div>
            <input name="fontFontSize" type="text" id="font-size-input">
            <div class="font-number-change-button" id="font-size-plus">+</div>
            <div style="margin: 0 .5em;">%</div>
        </div>
    `,

    ui_novelFontLineHeightInput: `
        <div id="line-height">
            <div style="margin: 0 .5em;">+</div>
            <div class="font-number-change-button" id="line-height-minus">-</div>
            <input name="fontLineHeight" type="text" id="line-height-input">
            <div class="font-number-change-button" id="line-height-plus">+</div>
            <div style="margin: 0 .5em;">%</div>
        </div>
    `,

    ui_novelFontWidthInput: `
        <div id="page-width">
            <div style="margin: 0 .5em;">×</div>
            <div class="font-number-change-button" id="page-width-minus">-</div>
            <input name="fontWidth" type="text" id="page-width-input">
            <div class="font-number-change-button" id="page-width-plus">+</div>
            <div style="margin: 0 .5em;">%</div>
        </div>
    `,

    ui_correctionReplacePatternList: `
        <div class="contents-option-head">
            <div class="contents-item--heading"></div>
            <div class="contents-item--description"></div>
        </div>
        <div class="contents-option-content" style="width: 100%; flex-shrink: 0; align-items: flex-start;">
            <div id="correction-replace--patterns">
                <div id="correction-replace--pattern-box-addition">
                    <i class="fa-solid fa-plus"></i>
                </div>
            </div>
        </div>
    `,

    ui_workspaceCustomHeaderDraggable: `
        <div id="workspace_header_icon" style="display: flex; flex-flow: row;">
            <div class="draggable_area_outer draggable_area_header">
                <div class="title">表示</div>
                <div class="draggable_area" id="active" name="workspace-header"></div>
            </div>
            <div class="draggable_area_outer draggable_area_header">
                <div class="title">非表示</div>
                <div class="draggable_area" id="disabled" name="workspace-header"></div>
            </div>
        </div>
    `,

    ui_workspaceCustomHeaderMenuDraggable: `
        <div id="workspace_menu_icon" style="display: flex; flex-flow: row; flex-wrap: wrap;">
            <div class="draggable_area_outer draggable_area_menu">
                <div class="title">左</div>
                <div class="draggable_area" id="left" name="workspace-header-menu"></div>
            </div>
            <div class="draggable_area_outer draggable_area_menu">
                <div class="title">中</div>
                <div class="draggable_area" id="middle" name="workspace-header-menu"></div>
            </div>
            <div class="draggable_area_outer draggable_area_menu">
                <div class="title">右</div>
                <div class="draggable_area" id="right" name="workspace-header-menu"></div>
            </div>
            <div class="draggable_area_outer draggable_area_menu">
                <div class="title">非表示</div>
                <div class="draggable_area" id="disabled" name="workspace-header-menu"></div>
            </div>
        </div>
    `,
}