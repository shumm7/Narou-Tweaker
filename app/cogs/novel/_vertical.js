export function _tategaki(){
    chrome.storage.local.get(null, (data) => {
        if(data.novelVertical){
            $("#novel_honbun").wrap(`<section class="novel_honbun_trigger"><div id="novel_honbun_wrapper" style="position: relative;">`)
            $("body").addClass("narou-tweaker-vertical")
            
            var width = document.querySelector('#novel_honbun').clientWidth
            
            if($('#novel_honbun').length){
                gsap.to('#novel_honbun', {
                    x: () => (width),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#novel_honbun_wrapper',
                        start: () => `top top`,
                        end: () => `+=${width}`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }
        }
    })
}