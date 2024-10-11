import { optionCategoryList, optionList } from "./optionUI.js";
import { novelIconList, workspaceIconList, workspaceMenuIconList } from "../../utils/header.js"
import { defaultGlobalOption, defaultOption } from "../../utils/option.js";


/* Option Category */
export function getOptionPageFromId(id){
    var ret = undefined
    optionCategoryList.forEach(function(v){
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
    optionList.forEach(function(v){
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

export function getOptionParentFromId(id){
    return getOptionParent(getOptionFromId(id))
}

export function getOptionChildsFromId(id){
    var ret = []

    if(parent){
        $.each(optionList, function(_, v){
            if(v.location){
                if(v.location.hasParent && v.location.parent === id){
                    ret.push(v)
                }
            }
        })
    }
    return ret
}


/* favorite */
export function appendFavoriteOption(id){
    chrome.storage.local.get("extFavoriteOptions", function(data){
        var list = data.extFavoriteOptions
        if(!Array.isArray(list)){
            list = []
        }

        var opt = getOptionFromId(id)
        var targetIdx = 0
        var objectIds = []
        if(opt){
            objectIds.push(opt.id)

            // idが子で親が存在しないときは一番若い子の直前に親を配置する
            var parent =  getOptionFromId(getOptionParent(opt))
            if(parent){
                if(!list.includes(parent.id)){
                    var childs = getOptionChildsFromId(parent.id)
                    if(childs.length>0){
                        $.each(childs, function(_, child){
                            var idx = list.indexOf(child.id)
                            if(idx>=0){
                                targetIdx = Math.min(targetIdx, idx)
                            }
                        })
                        objectIds.splice(0, 0, parent.id)
                    }
                }
            }

            // idが親だった場合、一番若い子の直前に親を配置する
            var childs = getOptionChildsFromId(opt.id)
            if(childs.length>0){
                $.each(childs, function(_, child){
                    var idx = list.indexOf(child.id)
                    if(idx>=0){
                        targetIdx = Math.min(targetIdx, idx)
                    }
                })
                $.each(childs, function(_, child){
                    list = list.filter((v)=>v !== child.id)
                    if(!objectIds.includes(child.id)){
                        objectIds.push(child.id)
                    }
                })
            }

            $.each(objectIds, function(_, p){
                if(list.includes(p)){
                    list = list.filter((v)=>v !==p)
                }
            })
            list.splice(targetIdx, 0, ...objectIds)
            chrome.storage.local.set({extFavoriteOptions: list})
        }
    })
}

export function removeFavoriteOption(id){
    chrome.storage.local.get("extFavoriteOptions", function(data){
        var list = data.extFavoriteOptions
        if(!Array.isArray(list)){
            list = []
        }

        var opt = getOptionFromId(id)
        if(opt){
            //リストからidを削除
            list = list.filter((v)=>v !== opt.id)

            // idが親だった場合、子のidをすべて削除
            var childs = getOptionChildsFromId(opt.id)
            $.each(childs, function(_, child){
                if(list.includes(child.id)){
                    list = list.filter((v)=>v !== child.id)
                }
            })

            // idが子で、その兄弟がゼロであったときに親を削除する
            var parent = getOptionFromId(getOptionParent(opt))
            if(parent){
                var childs = getOptionChildsFromId(parent.id)
                var flag = false
                $.each(childs, function(_, child){
                    if(list.includes(child.id)){
                        flag = true
                        return false
                    }
                })
                if(!flag){
                    list = list.filter((v)=>v !== parent.id)
                }
            }

            chrome.storage.local.set({extFavoriteOptions: list})
        }
    })
}

export function moveFavoriteOption(id, pos){
    chrome.storage.local.get("extFavoriteOptions", function(data){
        var list = data.extFavoriteOptions
        if(!Array.isArray(list)){
            list = []
        }
        if(!list.includes(id)){
            return false
        }

        /* リストにある要素が親 -> 子を別のリストに分離 */
        var childsList = {}
        $.each(list, function(_, parentId){
            var childs = getOptionChildsFromId(parentId)
            $.each(childs, function(_, child){
                if(list.includes(child.id)){
                    if(Array.isArray(childsList[parentId])){
                        childsList[parentId].push(child.id)
                    }else{
                        childsList[parentId] = [child.id]
                    }
                    list = list.filter((v)=>v!==child.id)
                }
            })
        })

        /* リストにある要素が子 */
        $.each(list, function(_, childId){
            var parentId = getOptionParentFromId(childId)
            if(list.includes(parentId)){
                if(Array.isArray(childsList[parentId])){
                    childsList[parentId].push(childId)
                }else{
                    childsList[parentId] = [childId]
                }
                if(childId===id){
                    id = parentId
                }
                list = list.filter((v)=>v!==childId)
            }
        })

        /* リストの要素を移動 */
        var current = list.indexOf(id)
        if(current >= 0){
            var target = current + pos
            if(target < 0){
                target = 0
            }
            if(target > list.length){
                target = list.length
            }
            if(target === current){
                return false
            }

            var tail = list.slice(current + 1)
            list.splice(current)
            Array.prototype.push.apply(list, tail);
            list.splice(target, 0, id);

            $.each(list, function(_, id){
                if(id in childsList){
                    list.splice(list.indexOf(id) + 1, 0, ...childsList[id])
                }
            })

            chrome.storage.local.set({extFavoriteOptions: list})
        }


    })
}


/* format */
export function formatOption(data){
    function update(data){
        var o = defaultOption
        Object.keys(o).forEach(function(key){
            if(checkOptionValue(key, data[key])){
                o[key] = data[key]
            }
        })
        return exceptionProcess_local(data, o)
    }

    if(data){
        return update(data)
    }
}

function exceptionProcess_local(oldDict, newDict){
    
    // novelCustomHeader -> novelCustomHeaderType
    if(oldDict.novelCustomHeader === true){
        console.log(`Converted value: { novelCustomHeader: true } -> { novelCustomHeaderType: "2" } `)
        newDict.novelCustomHeaderType = "2"
    }else if(oldDict.novelCustomHeader === false){
        console.log(`Converted value: { novelCustomHeader: false } -> { novelCustomHeaderType: "1" } `)
        newDict.novelCustomHeaderType = "1"
    }

    // novelCustomHeaderLeft / novelCustomHeaderRight
    Array("novelCustomHeaderLeft", "novelCustomHeaderRight").forEach(function(key){
        if(key in newDict){
            if(Array.isArray(newDict[key])){
                var array = []
                for(var i = 0; i < newDict[key].length; i++){
                    if(newDict[key][i] in novelIconList){
                        array.push(newDict[key][i])
                    }
                }
                newDict[key] = array
            }else{
                newDict[key] = defaultOption[key]
            }
        }
    })

    // workspaceCustomHeader
    Array("workspaceCustomHeader").forEach(function(key){
        if(key in newDict){
            if(Array.isArray(newDict[key])){
                var array = []
                for(var i = 0; i < newDict[key].length; i++){
                    if(newDict[key][i] in workspaceIconList){
                        array.push(newDict[key][i])
                    }
                }
                newDict[key] = array
            }else{
                newDict[key] = defaultOption[key]
            }
        }
    })
    
    // workspaceCustomMenu_Left / workspaceCustomMenu_Middle / workspaceCustomMenu_Right
    Array("workspaceCustomMenu_Left", "workspaceCustomMenu_Middle", "workspaceCustomMenu_Right").forEach(function(key){
        if(key in newDict){
            if(Array.isArray(newDict[key])){
                var array = []
                for(var i = 0; i < newDict[key].length; i++){
                    if(newDict[key][i] in workspaceMenuIconList){
                        array.push(newDict[key][i])
                    }
                }
                newDict[key] = array
            }else{
                newDict[key] = defaultOption[key]
            }
        }
    })

    if("extFavoriteOptions" in newDict){
        if(Array.isArray(newDict.extFavoriteOptions)){
            var list = []
            newDict.extFavoriteOptions.forEach(function(option){
                var optionData = getOptionFromId(option)
                if(optionData){
                    if(optionData.value){
                        if(optionData.value.buttons){
                            if(optionData.value.buttons.favorite){
                                list.push(optionData.id)
                            }
                        }
                    }
                }
            })
            var listNoDuplicate = list.filter((e, i) => {
                return list.indexOf(e) == i;
            }) 
            newDict.extFavoriteOptions = listNoDuplicate
        }else{
            newDict.extFavoriteOptions = defaultOption.extFavoriteOptions
        }
    }

    if("extPopupDefaultPage" in newDict){
        var pageId = newDict.extPopupDefaultPage

        if(pageId!=="__auto__"){
            var page = getOptionPageFromId(pageId)
            if(page){
                if(page.popup){
                    if(!(page.popup.defaultPage && page.title && page.id)){
                        newDict.extPopupDefaultPage = "__auto__"
                    }
                }else{
                    newDict.extPopupDefaultPage = "__auto__"
                }
            }else{
                newDict.extPopupDefaultPage = "__auto__"
            }
        }
    }

    return newDict
}

export function fixOption(local, sync){
    if(local){
        chrome.storage.local.get(null, (data)=>{
            chrome.storage.local.clear(()=>{
                var o = defaultOption
                Object.keys(o).forEach(function(key){
                    if(checkOptionValue(key, data[key])){
                        o[key] = data[key]
                    }
                })

                chrome.storage.local.set(exceptionProcess_local(data, o), function(){
                    console.log("Fixed option data (local).")
                })
            })
        })
    }
    
    if(sync){
        chrome.storage.sync.get(null, (data)=>{
            chrome.storage.sync.clear(()=>{
                var o = defaultGlobalOption
                Object.keys(o).forEach(function(key){
                    if(data[key]!=undefined){
                        if( typeof(o[key]) == typeof(data[key])){
                            o[key] = data[key]
                        }
                    }
                })

                chrome.storage.sync.set(o, function(){
                    console.log("Fixed option data (sync).")
                })
            })
        })
    }
}   

function checkOptionValue(key, value){
    /* falseで値を更新する */
    /* trueで更新しない */

    //強制的に値を変更する
    if(key === "extOptionsVersion"){
        return false
    }

    if(typeof(defaultOption[key]) === typeof(value) && value!==undefined){
        if(key==="kasasagiGraphType_GeneralDay"
            || key==="kasasagiGraphType_GeneralTotal"
            || key==="kasasagiGraphType_ChapterUnique"
            || key==="kasasagiGraphType_DayPV"
            || key==="kasasagiGraphType_DayUnique"
            || key==="kasasagiGraphType_MonthPV"
            || key==="kasasagiGraphType_MonthUnique"
        ){
            if(value!=="bar" && value!=="line"){
                return false
            }else{
                return true
            }
        }
        else if(key==="novelCustomHeaderMode" || key==="workspaceCustomHeaderMode"){
            if(value!=="absolute" || value!=="fixed" || value!=="scroll"){
                return false
            }else{
                return true
            }
        }
        else if(key==="correctionNumberShort" || key==="correctionNumberLong" || key==="correctionNumberSymbol"){
            if(value!=="default" || value!=="half" || value!=="full" || value!=="kanji"){
                return false
            }else{
                return true
            }
        }
        else{
            return true
        }
    }else if(key==="novelCustomHeaderLeft"||
        key==="novelCustomHeaderRight" ||
        key==="workspaceCustomHeader" ||
        key==="workspaceCustomMenu_Left" ||
        key==="workspaceCustomMenu_Middle" ||
        key==="workspaceCustomMenu_Right"
    ){
        if(!Array.isArray(value)){
            return false
        }
    }else{
        return false
    }

}