import { _bookmark } from "./_favorite.js"
import { _header } from "./_header.js"
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

// リアクション
_reaction()