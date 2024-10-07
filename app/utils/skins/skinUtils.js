import { defaultOption } from "../option.js"
import { formatSkinDataV2, localNovelSkinV2, maxLocalSkins, maxSyncSkins } from "./skin_v2.js"

// todo 拡張機能のアップデート時にスキンが自動削除されないようにする
// 拡張機能のアップデート時に自動的にv1スキンをv2スキンへ変換するようにする

/* 使用可能なスキンの個数を取得 */
export function skinsCount(storage_local){
    try{
        return storage_local.activeNovelSkins.length
    }catch{
        return 0
    }
}

/* 指定したストレージのスキンデータを取得 */
export function getSkin(src, key, storage_local, storage_sync){
    try{
        var list = storage_local.activeNovelSkins
        if(list.length > skinIndex && skinIndex >= 0){
            if(src == "internal"){
                var key = Number(data.key)
                if(!isNaN(key)){
                    if(key>=0 && localNovelSkinV2.length>key){
                        return localNovelSkinV2[data.key]
                    }
                }
            }else if(src == "local"){
                var indexData = storage_local.novelSkinIndex
                var key = Number(data.key)
                if(Array.isArray(indexData) && !isNaN(key)){
                    if(indexData.includes(key) && storage_local[`novelSkin_${key}`]){
                        return storage_local[`novelSkin_${key}`]
                    }
                }
            }else if(src == "sync"){
                var indexData = storage_sync.novelSkinIndex
                var key = Number(data.key)
                if(Array.isArray(indexData) && !isNaN(key)){
                    if(indexData.includes(key) && storage_sync[`novelSkin_${key}`]){
                        return storage_sync[`novelSkin_${key}`]
                    }
                }
            }
        }
    }catch{
        return
    }
}

/* 指定したindexのスキンのデータを取得 */
export function getSkinByIndex(skinIndex, storage_local, storage_sync){
    try{
        if(Array.isArray(storage_local.activeNovelSkins)){
            var list = storage_local.activeNovelSkins
            if(list.length > skinIndex && skinIndex >= 0){
                var data = list[skinIndex]

                if(data.src == "internal"){
                    var key = Number(data.key)
                    if(!isNaN(key)){
                        if(key>=0 && localNovelSkinV2.length>key){
                            return localNovelSkinV2[data.key]
                        }
                    }
                }else if(data.src == "local"){
                    var indexData = storage_local.novelSkinIndex
                    var key = Number(data.key)
                    if(Array.isArray(indexData) && !isNaN(key)){
                        if(indexData.includes(key) && storage_local[`novelSkin_${key}`]){
                            return storage_local[`novelSkin_${key}`]
                        }
                    }
                }else if(data.src == "sync"){
                    var indexData = storage_sync.novelSkinIndex
                    var key = Number(data.key)
                    if(Array.isArray(indexData) && !isNaN(key)){
                        if(indexData.includes(key) && storage_sync[`novelSkin_${key}`]){
                            return storage_sync[`novelSkin_${key}`]
                        }
                    }
                }
            }
        }
    }catch{
        return
    }
}

/* 表示中のスキンの情報を一覧で取得 */
export function getActiveSkins(storage_local, storage_sync){
    /* 使用可能なスキン一覧を取得 */
    var index
    if(Array.isArray(storage.activeNovelSkins)){
        index = storage.activeNovelSkins
    }else{
        index = defaultOption.activeNovelSkins
    }

    var ret = []
    for (let i = 0; i < index.length; i++) {
        ret.push(getSkin(i, storage_local, storage_sync))
    }
    return ret
}

/* 新しいスキンを追加（show=trueで使用可能なスキン一覧にも追加する / indexは省略可） */
export function insertSkin(skinIndex, skin, src, show){
    try{
        if(src!=="local" && src!=="sync"){
            src = "local"
        }
        skin = formatSkinDataV2(skin)

        if(src=="local"){
            chrome.storage.local.get(null, function(storage){
                /* 使用可能なスキン一覧を取得 */
                var index
                if(Array.isArray(storage.activeNovelSkins)){
                    index = storage.activeNovelSkins
                }else{
                    index = defaultOption.activeNovelSkins
                }

                /* storage.local上のスキン一覧を取得 */
                var skinList
                if(Array.isArray(storage.novelSkinIndex)){
                    skinList = storage.novelSkinIndex
                }else{
                    skinList = defaultOption.novelSkinIndex
                }
                if(skinList.length>=maxLocalSkins){
                    return false
                }

                /* 登録時のキーを設定 */
                var key = 0
                index.forEach(function(data){
                    if(data.src === "local" && data.key===key){
                        key += 1
                    }
                })

                /* データを設定 */
                var dict = {}
                dict[`novelSkin_${key}`] = skin

                if(!skinList.includes(key)){
                    skinList.push(key)
                    dict["novelSkinIndex"] = skinList
                }

                if(show){
                    if(skinIndex===undefined){
                        dict["activeNovelSkins"] = index.splice(skinIndex, index.length, {src: "local", key: key, show: show})
                    }else{
                        dict["activeNovelSkins"] = index.splice(skinIndex, 0, {src: "local", key: key, show: show})
                    }
                }

                /* データを反映 */
                chrome.storage.local.set(dict, function(){})
            })

        }else if(src=="sync"){
            chrome.storage.local.get(null, function(local_storage){
            chrome.storage.sync.get(null, function(storage){
                /* 使用可能なスキン一覧を取得 */
                var index
                if(Array.isArray(local_storage.activeNovelSkins)){
                    index = local_storage.activeNovelSkins
                }else{
                    index = defaultOption.activeNovelSkins
                }

                /* storage.sync上のスキン一覧を取得 */
                var skinList
                if(Array.isArray(storage.novelSkinIndex)){
                    skinList = storage.novelSkinIndex
                }else{
                    skinList = defaultOption.novelSkinIndex
                }
                if(skinList.length>=maxSyncSkins){
                    return false
                }

                /* 登録時のキーを設定 */
                var key = 0
                index.forEach(function(data){
                    if(data.src === "sync" && data.key===key){
                        key += 1
                    }
                })

                /* データを設定 */
                var dict = {}
                dict[`novelSkin_${key}`] = skin

                if(!skinList.includes(key)){
                    skinList.push(key)
                    dict["novelSkinIndex"] = skinList
                }

                if(show){
                    if(skinIndex===undefined){
                        dict["activeNovelSkins"] = index.splice(skinIndex, index.length, {src: "sync", key: key, show: show})
                    }else{
                        dict["activeNovelSkins"] = index.splice(skinIndex, 0, {src: "sync", key: key, show: show})
                    }
                }

                /* データを反映 */
                chrome.storage.sync.set(dict, function(){
                    if(show){
                        chrome.storage.local.set({activeNovelSkins: index})
                    }
                })
            })
            })

        }
    }catch{

    }
}

/* 新しいスキンを末尾に追加（show=trueで使用可能なスキン一覧にも追加する / indexは省略可） */
export function appendSkin(skin, src, show){
    return insertSkin(undefined, skin, src, show)
}

/* storage上からスキンを削除 */
export function removeSkin(src, key){
    try{
        chrome.storage.local.get(null, function(local_storage){

            /* 使用可能なスキン一覧を取得 */
            var index
            if(Array.isArray(local_storage.activeNovelSkins)){
                index = local_storage.activeNovelSkins
            }else{
                index = defaultOption.activeNovelSkins
            }

            /* 選択中のスキンを取得 */
            var currentSelectedSkin = Number(local_storage.novelSkinSelected)
            if(isNaN(currentSelectedSkin)){
                currentSelectedSkin = 0
            }else{
                if(currentSelectedSkin<0){
                    currentSelectedSkin = 0
                }else if(currentSelectedSkin>=index.length){
                    currentSelectedSkin = index.length
                }
            }

            /* 場所に応じて削除処理 */
            if(src === "local"){
                /* storage.local上のスキン一覧を取得 */
                var skinList
                if(Array.isArray(local_storage.novelSkinIndex)){
                    skinList = local_storage.novelSkinIndex
                }else{
                    skinList = defaultOption.novelSkinIndex
                }
                if(skinList.length>=maxSyncSkins){
                    return false
                }

                /* 削除を実行 */
                var l = index.filter((w)=>w.src!==src || w.key!==key)
                currentSelectedSkin =- index.length - l.length
                if(currentSelectedSkin<0){
                    currentSelectedSkin = 0
                }

                chrome.storage.local.remove(`novelSkin_${key}`, function(){
                    chrome.storage.local.set({novelSkinIndex: skinList.filter((w)=>w!==key)}, function(){
                        chrome.storage.local.set({activeNovelSkins: l, novelSkinSelected: currentSelectedSkin}, function(){})
                    })
                })


            }else if(src === "sync"){
                chrome.storage.sync.get(null, function(sync_storage){
                    /* storage.sync上のスキン一覧を取得 */
                    var skinList
                    if(Array.isArray(sync_storage.novelSkinIndex)){
                        skinList = sync_storage.novelSkinIndex
                    }else{
                        skinList = defaultOption.novelSkinIndex
                    }
                    if(skinList.length>=maxSyncSkins){
                        return false
                    }

                    /* 削除を実行 */
                    var l = index.filter((w)=>w.src!==src || w.key!==key)
                    currentSelectedSkin =- index.length - l.length
                    if(currentSelectedSkin<0){
                        currentSelectedSkin = 0
                    }

                    chrome.storage.sync.remove(`novelSkin_${key}`, function(){
                        chrome.storage.sync.set({novelSkinIndex: skinList.filter((w)=>w!==key)}, function(){
                            chrome.storage.local.set({activeNovelSkins: index.filter((w)=>w.src!==src || w.key!==key), novelSkinSelected: currentSelectedSkin}, function(){})
                        })
                    })
                })
            }
        })
    }catch{

    }
}

/* 使用可能なスキン一覧に含まれるスキンを完全に削除（indexは省略可） */
export function removeSkinByIndex(skinIndex){
    try{
        chrome.storage.local.get(null, function(local_storage){

            /* 使用可能なスキン一覧を取得 */
            var index
            if(Array.isArray(local_storage.activeNovelSkins)){
                index = local_storage.activeNovelSkins
            }else{
                index = defaultOption.activeNovelSkins
            }

            /* 選択中のスキンを取得 */
            var currentSelectedSkin = Number(local_storage.novelSkinSelected)
            if(isNaN(currentSelectedSkin)){
                currentSelectedSkin = 0
            }else{
                if(currentSelectedSkin<0){
                    currentSelectedSkin = 0
                }else if(currentSelectedSkin>=index.length){
                    currentSelectedSkin = index.length
                }
            }

            /* スキンインデックスが未指定の場合 */
            if(skinIndex===undefined){
                skinIndex = currentSelectedSkin
            }

            /* 指定されたインデックスのデータを取得 */
            var skinData = index[skinIndex]
            const key = skinData.key

            /* 場所に応じて削除処理 */
            if(skinData.src === "local"){
                /* storage.local上のスキン一覧を取得 */
                var skinList
                if(Array.isArray(local_storage.novelSkinIndex)){
                    skinList = local_storage.novelSkinIndex
                }else{
                    skinList = defaultOption.novelSkinIndex
                }
                if(skinList.length>=maxSyncSkins){
                    return false
                }

                /* 削除を実行 */
                var l = index.filter((w)=>w.src!==skinData.src || w.key!==key)
                currentSelectedSkin =- index.length - l.length
                if(currentSelectedSkin<0){
                    currentSelectedSkin = 0
                }

                chrome.storage.local.remove(`novelSkin_${key}`, function(){
                    chrome.storage.local.set({novelSkinIndex: skinList.filter((w)=>w!==key)}, function(){
                        chrome.storage.local.set({activeNovelSkins: l, novelSkinSelected: currentSelectedSkin}, function(){})
                    })
                })


            }else if(skinData.src === "sync"){
                chrome.storage.sync.get(null, function(sync_storage){
                    /* storage.sync上のスキン一覧を取得 */
                    var skinList
                    if(Array.isArray(sync_storage.novelSkinIndex)){
                        skinList = sync_storage.novelSkinIndex
                    }else{
                        skinList = defaultOption.novelSkinIndex
                    }
                    if(skinList.length>=maxSyncSkins){
                        return false
                    }

                    /* 削除を実行 */
                    var l = index.filter((w)=>w.src!==skinData.src || w.key!==key)
                    currentSelectedSkin =- index.length - l.length
                    if(currentSelectedSkin<0){
                        currentSelectedSkin = 0
                    }

                    chrome.storage.sync.remove(`novelSkin_${key}`, function(){
                        chrome.storage.sync.set({novelSkinIndex: skinList.filter((w)=>w!==key)}, function(){
                            chrome.storage.local.set({activeNovelSkins: l, novelSkinSelected: currentSelectedSkin}, function(){})
                        })
                    })
                })
            }
        })
    }catch{

    }
}

/* 使用可能なスキン一覧からスキンを削除 */
export function inactivateSkin(skinIndex){
    try{
        chrome.storage.local.get(null, function(local_storage){
            /* 使用可能なスキン一覧を取得 */
            var index
            if(Array.isArray(local_storage.activeNovelSkins)){
                index = local_storage.activeNovelSkins
            }else{
                index = defaultOption.activeNovelSkins
            }

            /* 選択中のスキンを取得 */
            var currentSelectedSkin = Number(local_storage.novelSkinSelected)
            if(isNaN(currentSelectedSkin)){
                currentSelectedSkin = 0
            }else{
                if(currentSelectedSkin<0){
                    currentSelectedSkin = 0
                }else if(currentSelectedSkin>=index.length){
                    currentSelectedSkin = index.length
                }
            }

            var l = index.splice(skinIndex, 1)
            currentSelectedSkin =- index.length - l.length
            if(currentSelectedSkin<0){
                currentSelectedSkin = 0
            }

            skinIndex = Number(skinIndex)
            if(!isNaN(skinIndex)){
                if(skinIndex>=0 && skinIndex < index){
                    chrome.storage.local.set({activeNovelSkins: l, novelSkinSelected: currentSelectedSkin}, function(){})
                }
            }
        })
    }catch{

    }
}

/* 使用可能なスキン一覧にスキンを追加（indexは省略可） */
export function activateSkin(skinIndex, src, key){
    try{
        chrome.storage.local.get(null, function(local_storage){
            /* 使用可能なスキン一覧を取得 */
            var index
            if(Array.isArray(local_storage.activeNovelSkins)){
                index = local_storage.activeNovelSkins
            }else{
                index = defaultOption.activeNovelSkins
            }

            /* 選択中のスキンを取得 */
            var currentSelectedSkin = Number(local_storage.novelSkinSelected)
            if(isNaN(currentSelectedSkin)){
                currentSelectedSkin = 0
            }else{
                if(currentSelectedSkin<0){
                    currentSelectedSkin = 0
                }else if(currentSelectedSkin>=index.length){
                    currentSelectedSkin = index.length
                }
            }
            /* 挿入場所を決定 */
            if(skinIndex===undefined){
                skinIndex = index.length
            }
            skinIndex = Number(skinIndex)
            if(!isNaN(skinIndex)){
                if(currentSelectedSkin>=skinIndex){
                    currentSelectedSkin += 1
                }
                if(currentSelectedSkin > index.length){
                    currentSelectedSkin = index.length
                }

            /* スキンを追加 */
            if(src==="internal"){
                if(localNovelSkinV2.length > key && 0<=key ){
                    chrome.storage.local.set({activeNovelSkins: index.splice(skinIndex, 0, {src: src, key: key}), novelSkinSelected: currentSelectedSkin}, function(){})
                }
            }else if(src==="local"){
                /* storage.local上のスキン一覧を取得 */
                var skinList
                if(Array.isArray(local_storage.novelSkinIndex)){
                    skinList = local_storage.novelSkinIndex
                }else{
                    skinList = defaultOption.novelSkinIndex
                }

                if(skinList.includes(key)){
                    chrome.storage.local.set({activeNovelSkins: index.splice(skinIndex, 0, {src: src, key: key}), novelSkinSelected: currentSelectedSkin}, function(){})
                }
            }else if(src==="sync"){
                chrome.storage.sync.get(null, function(sync_storage){
                    var skinList
                    if(Array.isArray(sync_storage.novelSkinIndex)){
                        skinList = sync_storage.novelSkinIndex
                    }else{
                        skinList = defaultOption.novelSkinIndex
                    }

                    if(skinList.includes(key)){
                        chrome.storage.local.set({activeNovelSkins: index.splice(skinIndex, 0, {src: src, key: key}), novelSkinSelected: currentSelectedSkin}, function(){})
                    }
                })
            }
            }
        })
    }catch{

    }
}