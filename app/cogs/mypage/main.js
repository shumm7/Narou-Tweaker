import { _blog } from "./_blog.js";
import { _general } from "./_general.js";
import { _favuser } from "./_misc.js";
import { _profile } from "./_profile.js";

var path = location.pathname;
if($(".p-userheader__tab").length){
    /* General */
    _general()

    if(path.match(/^\/mypageblog\/view\/userid\/.*\/blogkey\/.*\/*$/)){
        /* Blog Page */
        _blog()
    }
    else if(path.match(/^\/mypage\/profile\/userid\/.*\/*$/)){
        /* User Profile */
        _profile()
    }
    else if(path.match(/^\/mypagefavuser\/list\/userid\/.*\/*$/) || path.match(/^\/mypagefavuser18\/list\/xid\/.*\/*$/)){
        /* Favorite Users */
        _favuser()
    }
}