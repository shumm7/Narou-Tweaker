import { _blog } from "./_blog.js";
import { _general } from "./_general.js";
import { _favuser } from "./_misc.js";
import { _profile } from "./_profile.js";

var path = location.pathname;
if($(".p-userheader__tab").length){
    /* General */
    _general()

    if(path.match(/^\/mypageblog\/view\/userid\/\d+\/blogkey\/\d+\/*$/) || path.match(/^\/mypageblog\/view\/xid\/x\d+[a-z]+\/blogkey\/\d+\/*$/)){
        /* Blog Page */
        _blog()
    }
    else if(path.match(/^\/mypage\/profile\/userid\/\d+\/*$/) || path.match(/^\/mypage\/profile\/xid\/x\d+[a-z]+\/*$/)){
        /* User Profile */
        _profile()
    }
    else if(path.match(/^\/mypagefavuser\/list\/userid\/\d+\/*$/) || path.match(/^\/mypagefavuser18\/list\/xid\/x\d+[a-z]+\/*$/)){
        /* Favorite Users */
        _favuser()
    }
}