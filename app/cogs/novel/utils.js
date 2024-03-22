import { indexToNcode } from "../../utils/text.js"

export function getNcode(){
    if(location.hostname=="ncode.syosetu.com"){
        if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){ /* Story */
            return location.pathname.match(/^\/([n|N]\d{4}[a-zA-Z]{2})\/\d+\/*$/)[1].toLowerCase()
        }
        else if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* Top */
            return location.pathname.match(/^\/([n|N]\d{4}[a-zA-Z]{2})\/*$/)[1].toLowerCase()
        }
        else if (location.pathname.match(/\/novelview\/infotop\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*/)){ /* Novel Info */
            return location.pathname.match(/\/novelview\/infotop\/ncode\/([n|N]\d{4}[a-zA-Z]{2})\/*/)[1].toLowerCase()
        }
        else if(location.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* PDF */
            return location.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/([n|N]\d{4}[a-zA-Z]{2})\/*$/)[1].toLowerCase()
        }
        else if(location.pathname.match(/^\/txtdownload\/top\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* TXT */
            return location.pathname.match(/^\/txtdownload\/top\/ncode\/([n|N]\d{4}[a-zA-Z]{2})\/*$/)[1].toLowerCase()
        }
    }else if(location.hostname=="novelcom.syosetu.com"){
        if (location.pathname.match(/^\/impression\/list\/ncode\/\d+\/*.*$/)){ /* Impression */
            return indexToNcode(location.pathname.match(/^\/impression\/list\/ncode\/(\d+)\/*.*$/)[1])
        }
        else if (location.pathname.match(/^\/novelreview\/list\/ncode\/(\d+)\/*.*$/)){ /* Review */
            return indexToNcode(location.pathname.match(/^\/novelreview\/list\/ncode\/(\d+)\/*.*$/)[1])
        }
    }   
}

export function getEpisode(){
    if(location.hostname=="ncode.syosetu.com"){
        if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){ /* Story */
            return parseInt(location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/(\d+)\/*$/)[1])
        }
    }
    return 0
}

export function checkPageDetail(){
    if(location.hostname=="ncode.syosetu.com"){
        if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){ /* Story */
            return "novel"
        }
        else if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* Top */
            if($("#novel_honbun").length){
                return "novel"
            }else{
                return "top"
            }
        }
        else if (location.pathname.match(/\/novelview\/infotop\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*/)){ /* Novel Info */
            return "info"
        }
        else if(location.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* PDF */
            return "pdf"
        }
        else if(location.pathname.match(/^\/txtdownload\/top\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* TXT */
            return "txt"
        }
    }else if(location.hostname=="novelcom.syosetu.com"){
        if (location.pathname.match(/^\/impression\/list\/ncode\/\d+\/*.*$/)){ /* Impression */
            return "impression"
        }
        else if (location.pathname.match(/^\/novelreview\/list\/ncode\/\d+\/*.*$/)){ /* Review */
            return "review"
        }
    }
}

export function showToast(message){
    var tippy_option ={
        html: false,
        position: 'bottom',
        trigger: 'manual',
        hideOnClick: false,
        delay: 2000,
        hideDelay: 1000,
        theme: '',
        interactive: 'true',
    }

    $('#toaster_success').html('<strong>' + message + '</strong>');
    tippy_option['html'] = '#toaster_success';

    var instance = new Tippy('.toast',tippy_option);
    var popper = instance.getPopperElement(document.querySelector('#'+rand_id));

    // tippy トーストを表示
    tippyShowAndHide(instance,popper);


    function tippyShowAndHide(instance,popper,displayTime){
        if (displayTime == null) {
            displayTime = 2000;
        }
        instance.show(popper);
        tippy_instance = instance;
        tippy_popper = popper;
    
        setTimeout(tippiyjsHide, displayTime,popper,instance);
    }
}