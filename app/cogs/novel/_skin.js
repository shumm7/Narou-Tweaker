import { formatSkinData, makeSkinCSS } from "../../utils/skin.js";

/* Skin */
export function removeDefaultSkinClass(){
    const classList = [
        "customlayout1",
        "customlayout2",
        "customlayout3",
        "customlayout4",
        "customlayout5",
        "customlayout6",
        "customlayout7",
    ]

    $.each(classList, function(_, c){
        $("."+c).each(function(){
            $(this).removeClass(c);
        });
    });

}

/* Author Skin */
export function _authorSkin(){
    changeAuthorSkin()
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.novelAuthorCustomSkin!=undefined || changes.novelAuthorCustomSkinWarning!=undefined){
            changeAuthorSkin()
        }
    })

    function changeAuthorSkin(){
        chrome.storage.local.get(["novelAuthorCustomSkin"], (data)=>{
            if(data.novelAuthorCustomSkin){
                var banner = $(".novelrankingtag a:has(img[alt='Narou Tweaker 作者スキン'])")
                if(banner.length){
                    var span = banner.find("span")
                    if(span.length){
                        try{
                            // Escape HTML Tags
                            var p = $("<p>")
                            p.text(span.get(0).firstChild.nodeValue)
                            var text = p.text()
                            
                            // Parse to Tags
                            var skinData = formatSkinData(JSON.parse(text))
                            chrome.storage.local.get(["novelCustomStyle", "novelAuthorCustomSkinWarning"], (data)=>{
                                const style = makeSkinCSS(skinData, data.novelCustomStyle)
                                $("#narou-tweaker-style--author-css").text(style)
                                if(data.novelAuthorCustomSkinWarning){
                                    userSkinActive(true)
                                }else{
                                    userSkinActive(false)
                                }
                            })

                        }catch(e){
                            console.warn(e)
                            $("#narou-tweaker-style--author-css").text("")
                            userSkinActive(false)
                        }
                    }
                }
            }else{
                $("#narou-tweaker-style--author-css").text("")
                userSkinActive(false)
            }
            
        })
    }

    function userSkinActive(active){
        $("#author-skin-warning").remove()
        if(active){
            $("body").prepend(`
                <div id="author-skin-warning">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    作者スキン有効（小説の作者によってスキンが強制されています）<br>
                    <span style="font-size: 80%;">
                        Narou Tweakerの設定 → [小説ページ] → [スキン] → [作者スキン] から無効化できます。
                    </span>
                </div>
            `)
        }
    }
}