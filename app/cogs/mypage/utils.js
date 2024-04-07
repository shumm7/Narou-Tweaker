export function checkXmypage(){
    if(location.hostname == "mypage.syosetu.com"){
        return false
    }else if(location.hostname == "xmypage.syosetu.com"){
        return true
    }
}