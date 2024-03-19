export function getNcode(){
    if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){ /* Story */
        return location.pathname.match(/^\/([n|N]\d{4}[a-zA-Z]{2})\/\d+\/*$/)[1].toLowerCase()
    }
    else if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* Top */
        return location.pathname.match(/^\/([n|N]\d{4}[a-zA-Z]{2})\/*$/)[1].toLowerCase()
    }
    else if (location.pathname.match(/\/novelview\/infotop\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*/)){ /* Novel Info */
        return location.pathname.match(/\/novelview\/infotop\/ncode\/([n|N]\d{4}[a-zA-Z]{2})\/*/)[1].toLowerCase()
    }
}

export function getEpisode(){
    if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){ /* Story */
        return parseInt(location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/(\d+)\/*$/)[1])
    }
    else if (location.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* Top */
        return 0
    }
    else if (location.pathname.match(/\/novelview\/infotop\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*/)){ /* Novel Info */
        return 0
    }
}

export function checkPageDetail(){
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