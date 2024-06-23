import { getIcode } from "./utils.js"

export function _image(){
    chrome.storage.local.get(null, function(data){
        // iコードを取得
        if(data.miteminShowIcodeField){
            var info = $(".image_infomation, .ximage_infomation")
            if(info.length){
                var img = getIcode()
                if(img.icode && img.userid)
                info.find("tr:last td:last center").prepend(`
                    ▽この画像のiコード<br>
                    <input type="text" name="url" size="30" style="width:300px;" value="<${img.icode}|${img.userid}>" readonly="readonly" onfocus="this.select();"><br>
                    <br>
                `)
            }
        }
    })
}