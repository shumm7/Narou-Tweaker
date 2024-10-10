import { defaultOption } from "../option.js"
import { formatSkinDataV2, localNovelSkinV2, maxLocalSkins, maxSyncSkins } from "./skin_v2.js"

// todo 拡張機能のアップデート時にスキンが自動削除されないようにする
// 拡張機能のアップデート時に自動的にv1スキンをv2スキンへ変換するようにする
// これらの関数のテスト

// 選択可能なスキン：ドロップダウンに表示されるスキン

export const skinIndex = (key) => `novelSkin_${key}`

/* 指定したストレージのスキンデータを取得 */
export function getSkin(src, key, storage_local, storage_sync){
    try{
        if(src == "internal"){
            var key = Number(key)
            if(!isNaN(key)){
                if(key>=0 && localNovelSkinV2.length>key){
                    return localNovelSkinV2[key]
                }
            }
        }else if(src == "local"){
            var indexData = storage_local.novelSkinIndex
            var key = Number(key)
            if(Array.isArray(indexData) && !isNaN(key)){
                if(indexData.includes(key) && skinIndex(key) in storage_local){
                    return storage_local[skinIndex(key)]
                }
            }
        }else if(src == "sync"){
            var indexData = storage_sync.novelSkinIndex
            var key = Number(key)
            if(Array.isArray(indexData) && !isNaN(key)){
                if(indexData.includes(key) && skinIndex(key) in storage_sync){
                    return storage_sync[skinIndex(key)]
                }
            }
        }
    }catch(e){
        console.warn(e)
    }
}

/* 指定したストレージのスキンの情報を一覧で取得 */
export function getSkinList(src, storage_local, storage_sync){
    var ret = []
    try{
        if(src=="internal"){
            if(Array.isArray(localNovelSkinV2)){
                localNovelSkinV2.forEach(function(data, i){
                    ret.push({src: src, key: i})
                })
            }
        }else if(src=="local"){
            if(Array.isArray(storage_local.novelSkinIndex)){
                storage_local.novelSkinIndex.forEach(function(key){
                    if(skinIndex(key) in storage_local){
                        var data = storage_local[skinIndex(key)]
                        ret.push({src: src, key: key})
                    }
                })
            }
        }else if(src=="sync"){
            if(Array.isArray(storage_sync.novelSkinIndex)){
                storage_sync.novelSkinIndex.forEach(function(key){
                    if(skinIndex(key) in storage_sync){
                        ret.push({src: src, key: key})
                    }
                })
            }
        }
        
        return ret
    }catch(e){
        console.warn(e)
    }
}

/* 指定したindexのスキンのデータを取得 */
export function getSkinFromAvailable(i, storage_local, storage_sync){
    try{
        var data = getAvailableSkinIndex(i, storage_local)
        return getSkin(data.src, data.key, storage_local, storage_sync)
    }catch(e){
        console.warn(e)
    }
}

/* 現在選択中のスキンデータを取得 */
export function getSelectedSkin(storage_local, storage_sync){
    try{
        var i = getSelectedSkinIndex(storage_local)
        return getSkinFromAvailable(i, storage_local, storage_sync)
    }catch(e){
        console.warn(e)
    }
}


/* 選択可能なスキンの個数を取得 */
export function getAvailableSkinCount(storage_local){
    try{
        return storage_local.novelSkinsAvailable.length
    }catch(e){
        console.warn(e)
    }
}

/* 選択中のスキン番号を取得 */
export function getSelectedSkinIndex(storage_local){
    try{
        var novelSkinsAvailable = storage_local.novelSkinsAvailable
        var novelSkinSelected = Number(storage_local.novelSkinSelected)

        if(isNaN(novelSkinSelected)){
            novelSkinSelected = 0
        }else{
            if(novelSkinSelected<0){
                novelSkinSelected = 0
            }else if(novelSkinSelected>=novelSkinsAvailable.length){
                novelSkinSelected = novelSkinsAvailable.length - 1
            }
        }
        return novelSkinSelected
    }catch(e){
        return
    }
}


/* novelSkinsAvailableから特定のインデックスの要素を取得 */
function getAvailableSkinIndex(i, storage_local){
    if(Array.isArray(storage_local.novelSkinsAvailable)){
        var novelSkinsAvailable = storage_local.novelSkinsAvailable
        if(novelSkinsAvailable.length > i && i >= 0){
            return novelSkinsAvailable[i]
        }
    }
}

/* 表示中のスキンの情報を一覧で取得 */
export function getAvailableSkinList(storage_local){
    /* 使用可能なスキン一覧を取得 */
    try{
        if(Array.isArray(storage_local.novelSkinsAvailable)){
            return storage_local.novelSkinsAvailable
        }
    }catch(e){
        console.warn(e)
    }
}

/* 表示中でないスキンの情報を一覧で取得 */
export function getUnavailableSkinList(storage_local, storage_sync){
    /* 使用可能なスキン一覧を取得 */
    try{
        var availableSkinList = getAvailableSkinList(storage_local)
        
        if(Array.isArray(availableSkinList)){
            var allSkinList = []
            var ret = []

            Array("internal", "local", "sync").forEach(function(src){
                allSkinList = getSkinList(src, storage_local, storage_sync)

                if(Array.isArray(allSkinList)){
                    allSkinList.forEach(function(allSkinInfo){
                        var exist = false
                        availableSkinList.forEach(function(skinInfo){
                            if(skinInfo.src === allSkinInfo.src && skinInfo.key === allSkinInfo.key){
                                exist = true
                            }
                        })

                        if(!exist){
                            ret.push(allSkinInfo)
                        }
                    })
                }
            })
            return ret
        }

    }catch(e){
        console.warn(e)
    }
}




/* 新しくスキンをストレージに追加 */
export function newSkin(skin, src, storage_local, storage_sync){
    try{
        skin = formatSkinDataV2(skin)

        if(src=="local"){
            /* storage.local上のスキン一覧を取得 */
            var skinList
            if(Array.isArray(storage_local.novelSkinIndex)){
                skinList = storage_local.novelSkinIndex
            }else{
                skinList = []
            }

            /* スキンがこれ以上追加できない場合 */
            if(skinList.length>=maxLocalSkins){
                return
            }

            /* 登録時のキーを作成 */
            var key = 0
            for(var i=1; i < skinList.length; i++){
                if(skinList.includes(key)){
                    key++
                }
            }

            /* データを設定 */
            var dict = {}
            dict.novelSkinIndex = skinList
            dict[skinIndex(key)] = skin
            chrome.storage.local.set(dict, function(){})
            return key

        }else if(src=="sync"){
            /* storage.local上のスキン一覧を取得 */
            var skinList
            if(Array.isArray(storage_sync.novelSkinIndex)){
                skinList = storage_sync.novelSkinIndex
            }else{
                skinList = []
            }

            /* スキンがこれ以上追加できない場合 */
            if(skinList.length>=maxLocalSkins){
                return
            }

            /* 登録時のキーを作成 */
            var key = 0
            for(var i=1; i < skinList.length; i++){
                if(skinList.includes(key)){
                    key++
                }
            }

            /* データを設定 */
            var dict = {}
            dict.novelSkinIndex = skinList
            dict[skinIndex(key)] = skin
            chrome.storage.sync.set(dict, function(){})
            return key
        }
    }catch(e){
        console.warn(e)
    }
}

/* スキンをストレージ上から削除 */
export function removeSkin(src, key, storage_local, storage_sync){
    try{
        /* 場所に応じて削除処理 */
        if(src === "local"){
            if(Array.isArray(storage_local.novelSkinIndex)){
                /* 値を設定 */
                chrome.storage.local.remove(skinIndex(key), function(){
                    chrome.storage.local.set({novelSkinIndex: storage_local.novelSkinIndex.filter((w)=>w!==key)}, function(){
                        inactivateSkin(src, key, storage_local, storage_sync)
                    })
                })
            }

        }else if(src === "sync"){
            if(Array.isArray(storage_sync.novelSkinIndex)){
                /* 値を設定 */
                chrome.storage.sync.remove(skinIndex(key), function(){
                    chrome.storage.sync.set({novelSkinIndex: storage_sync.novelSkinIndex.filter((w)=>w!==key)}, function(){
                        inactivateSkin(src, key, storage_sync, storage_sync)
                    })
                })
            }
        }
    }catch(e){
        console.warn(e)
    }
}

/* 使用可能なスキン一覧に含まれるスキンを完全に削除 */
export function removeFromAvailableSkin(i, storage_local, storage_sync){
    try{
        var data = getAvailableSkinIndex(i, storage_local)
        removeSkin(data.src, data.key, storage_local, storage_sync)
    }catch(e){
        console.warn(e)
    }
}


/* 使用可能なスキン一覧からスキンを削除 */
export function inactivateSkin(src, key, storage_local){
    try{
        /* 使用可能なスキン一覧を取得 */
        var novelSkinsAvailable
        if(Array.isArray(storage_local.novelSkinsAvailable)){
            novelSkinsAvailable = storage_local.novelSkinsAvailable
        }else{
            return
        }

        /* 選択中のスキンを取得 */
        var novelSkinSelected = getSelectedSkinIndex(storage_local)

        /* リストから削除 */
        var novelSkinsAvailable_removed = []

        novelSkinsAvailable.forEach(function(data, i){
            if(data.src === src && data.key === key){
                if(i < novelSkinSelected){
                    novelSkinSelected -= 1
                }
            }else{
                novelSkinsAvailable_removed.push(data)
            }
        })
        if(novelSkinSelected < 0){
            novelSkinSelected = 0
        }

        chrome.storage.local.set({novelSkinsAvailable: novelSkinsAvailable_removed, novelSkinSelected: novelSkinSelected}, function(){})

    }catch(e){
        console.warn(e)
    }
}

export function inactivateSkinByIndex(i, storage_local){
    try{
        var data = getAvailableSkinIndex(i, storage_local)
        inactivateSkin(data.src, data.key, storage_local)
    }catch(e){
        console.warn(e)
    }
}


/* 使用可能なスキン一覧にスキンを追加（iは省略可） */
export function activateSkin(src, key, storage_local, storage_sync, i){
    try{
        var data = getSkin(src, key, storage_local, storage_sync)
        if(data){
            /* 使用可能なスキン一覧を取得 */
            var novelSkinsAvailable
            if(Array.isArray(storage_local.novelSkinsAvailable)){
                novelSkinsAvailable = storage_local.novelSkinsAvailable
            }else{
                novelSkinsAvailable = defaultOption.novelSkinsAvailable
            }

            /* 選択中のスキンを取得 */
            var novelSkinSelected = getSelectedSkinIndex(storage_local)

            /* 辞書データを設定 */
            var ret = {
                src: src,
                key: key,
            }

            /* リストに値を追加 */
            if(i!==undefined){
                i = Number(i)
                if(isNaN(i)){
                    i = undefined
                }
                if(i<0){
                    i = undefined
                }
                if(i >= novelSkinsAvailable.length){
                    i = undefined
                }
            }

            if(i===undefined){
                novelSkinsAvailable = novelSkinsAvailable.splice(novelSkinsAvailable.length, 0, ret)
            }else{
                novelSkinsAvailable = novelSkinsAvailable.splice(i, 0, ret)
                if(novelSkinSelected >= i){
                    novelSkinSelected += 1
                }
                if(novelSkinSelected >= novelSkinsAvailable.length){
                    novelSkinSelected = novelSkinsAvailable.length - 1
                }
            }
            chrome.storage.local.set({novelSkinSelected: novelSkinSelected, novelSkinsAvailable: novelSkinsAvailable}, function(){})
        }
    }catch(e){
        console.warn(e)
    }
}

/* 使用可能なスキンを指定回数だけ移動 */
export function moveSkin(i, count, storage_local){
    try{
        /* 移動量が0 / 不正な数字 の場合処理を終了 */
        count = Number(count)
        if(isNaN(count)){
            return
        }
        if(count == 0){
            return
        }

        /* 使用可能なスキン一覧を取得 */
        var novelSkinsAvailable
        if(Array.isArray(storage_local.novelSkinsAvailable)){
            novelSkinsAvailable = storage_local.novelSkinsAvailable
        }else{
            return
        }

        /* 選択中のスキンを取得 */
        var novelSkinSelected = getSelectedSkinIndex(storage_local)

        if(i >= 0 && i < novelSkinsAvailable.length){
            var data = novelSkinsAvailable[i]

            /* 指定位置からデータを一時的に削除 */
            var l = novelSkinsAvailable.splice(i, 1)

            // 移動場所を計算
            var toIndex = i + count
            if(toIndex < 0){
                toIndex = 0
            }
            if(toIndex > novelSkinsAvailable.length){
                toIndex = novelSkinsAvailable.length
            }

            // 移動
            l = l.splice(toIndex, 0, data)

            // 選択中のスキンが移動するため補正
            if(novelSkinSelected===i){
                novelSkinSelected = toIndex
            }else{
                if(toIndex > i){ //配列の後方へ移動
                    if(i < novelSkinSelected && toIndex > novelSkinSelected) {
                        novelSkinSelected--
                    }
                }else{ //配列の前方へ移動
                    if(i > novelSkinSelected && toIndex <= novelSkinSelected) {
                        novelSkinSelected++
                    }
                }
            }

            // 不正な番号になっていないかチェック
            if(novelSkinSelected<0){
                novelSkinSelected = 0
            }else if(novelSkinSelected>=l.length){
                novelSkinSelected = l.length
            }

            chrome.storage.set({novelSkinSelected: novelSkinSelected, activeNovelSkin: l}, function(){})
        }
    }catch(e){
        console.warn(e)
    }
}

/* 使用可能なスキンを指定した位置へ移動 */
export function moveSkinTo(i, toIndex, storage_local){
    try{
        
    }catch(e){
        console.warn(e)
    }
}