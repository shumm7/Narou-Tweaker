import { optionCategoryList, optionList } from "./optionUI.js";


/* Option Category */
export function getOptionPageFromId(id){
    var ret = undefined
    $.each(optionCategoryList, function(_, v){
        if(v.id === id){
            ret = v
            return true
        }
    })
    return ret
}

export function getOptionCategoryFromId(id, categoryId){
    var ret = undefined
    var option = getOptionPageFromId(id)

    if(option){
        $.each(option.categories, function(_, v){
            if(v.id===categoryId){
                ret = v
                return true
            }
        })
    }
    return ret
}

export function getOptionCategory(category, categoryId){
    var ret = undefined

    if(category){
        $.each(category.categories, function(_, v){
            if(v.id===categoryId){
                ret = v
            }
        })
    }
    return ret
}

/* Option Data */
export function getOptionFromId(id){
    var ret = undefined
    $.each(optionList, function(_, v){
        if(v.id === id){
            ret = v
            return true
        }
    })
    return ret
}

export function getOptionParent(option){
    if(typeof option === "object"){
        if(option.location){
            if(option.location.hasParent){
                return option.location.parent
            }
        }
    }
    return undefined
}