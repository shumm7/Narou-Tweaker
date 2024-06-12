import { _blog } from "./_blog.js";
import { _general } from "./_general.js";
import { _novel } from "./_novellist.js";
import { _profile } from "./_profile.js";

var path = location.pathname;
if($(".p-userheader__tab").length){
    /* General */
    _general()

    /* Blog Page */
    if(path.match(/\/mypageblog\/view\/userid\/.*\/blogkey\/.*\/*/)!=null){
        _blog()
    }
    
    /* User Profile */
    else if(path.match(/\/mypage\/profile\/userid\/.*\/*/)!=null){
        _profile()
    }

    /* User Novel List */
    _novel()
}