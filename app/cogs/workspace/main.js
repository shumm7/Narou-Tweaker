import { _editor } from "./_editor.js"
import { _bookmark } from "./_favorite.js"
import { _header } from "./_header.js"
import { _misc } from "./_misc.js"
import { _reaction } from "./_reaction.js"

const path = location.pathname

//ヘッダ
if($(".p-up-header-pc").length){
    _header()
}

//ブックマーク画面
if(path.match(/^\/favnovelmain\/.*/) || path.match(/^\/favnovelmain18\/.*/)){
    _bookmark()
}

//編集画面
_editor()

// リアクション
_reaction()

// その他
_misc()
