import { _bookmark } from "./_bookmark.js"
import { _header } from "./_header.js"

const path = location.pathname

//ヘッダ
if($(".p-up-header-pc").length){
    _header()
}

//ブックマーク画面
if(path.match(/^\/favnovelmain\/.*/) || path.match(/^\/favnovelmain18\/.*/)){
    _bookmark()
}
