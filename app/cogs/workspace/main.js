import { _bookmark } from "./social.js"

const path = location.pathname

if(path.match(/^\/favnovelmain\/.*/) || path.match(/^\/favnovelmain18\/.*/)){
    _bookmark()
}