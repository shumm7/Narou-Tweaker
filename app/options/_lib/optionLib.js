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
        var targetIdx = list.length
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