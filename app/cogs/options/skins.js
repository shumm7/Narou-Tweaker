import { defaultValue } from "../../utils/misc.js";
import { defaultSkins } from "../../utils/data/default_skins.js";
import { debug_log, debug_logObject } from "./debug.js";
import { saveSkin, saveSkins } from "../../utils/option.js";

export function resetSkins(){
    saveSkins(defaultSkins)
    saveSkin(0)
}

export function checkSkinNameDuplicate(skins, name){
    var res = false
    $.each(skins, (_, skin)=>{
        console.log(skin.name==name)
        if(skin.name==name){
            res = true;
        }
    })
    return res;
}

export function generateNoDuplicateName(skins, name){
    if(checkSkinNameDuplicate(skins, name)){
        for(var i=1; i<=10000; i++){
            if(!checkSkinNameDuplicate(skins, name + "("+i+")")){
            name = name + "("+i+")"
            break
            }
        }
    }
    return name
}

export function restoreSkins(skins, selected){
    skins = defaultValue(skins, defaultSkins)
    selected = defaultValue(selected, 0)
  
    $("#skin").empty()
    $.each(skins, function(i, skin){
      if(skin.show==true){
        $("#skin").append("<option value='"+i+"'>"+skin.name+"</option>")
      }
    })
    $("#skin").val(String(selected))
    $("#skin-option--editting").text((selected+1)+": " + skins[selected].name)
    restoreSkin(skins[selected])
  }

 export function restoreSkin(skin){
    var style = defaultValue(skin.style, {})
    style.novel = defaultValue(style.novel, {})
    style.link = defaultValue(style.link, {})
    style.sublist = defaultValue(style.sublist, {})
  
    $("#skin-name").val(defaultValue(skin.name, ""))
    $("#skin-description").val(defaultValue(skin.description, ""))
    $("#skin-novel-color").val(defaultValue(style.novel.color, ""))
    $("#skin-novel-background").val(defaultValue(style.novel.background, ""))
    $("#skin-link-color").val(defaultValue(style.link.color_link, ""))
    $("#skin-link-color-visited").val(defaultValue(style.link.color_visited, ""))
    $("#skin-link-color-hover").val(defaultValue(style.link.color_hover, ""))
    $("#skin-sublist-underline").val(defaultValue(style.sublist.color, ""))
    $("#skin-sublist-underline-hover").val(defaultValue(style.sublist.hover, ""))
    
    if(skin.customizable){
      $(".option-skin").prop("disabled", false)
      $("#skin-option--buttons button[name='save']").prop("disabled", false)
      $("#skin-option--buttons button[name='delete']").prop("disabled", false)
    }else{
      $(".option-skin").prop("disabled", true)
      $("#skin-option--buttons button[name='save']").prop("disabled", true)
      $("#skin-option--buttons button[name='delete']").prop("disabled", true)
    }
  }

  export function getSkinData(){
    return {
      name: $("#skin-name").val(),
      description: $("#skin-description").val(),
      show: true,
      customizable: !$(".option-skin").prop("disabled"),
      style: {
        novel: {
          background: $("#skin-novel-background").val(),
          color: $("#skin-novel-color").val()
        },
        link: {
          color_link: $("#skin-link-color").val(),
          color_visited: $("#skin-link-color-visited").val(),
          color_hover: $("#skin-link-color-hover").val()
        },
        sublist: {
          color: $("#skin-sublist-underline").val(),
          hover: $("#skin-sublist-underline-hover").val()
        }
      }
    }
  }
  


export function addSkinEditButtonEvent(){
    $("#skin-selection--buttons button[name='new']").on("click", (e)=>{ /* New Button */
    e.preventDefault()
    chrome.storage.sync.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultSkins)
      var name = generateNoDuplicateName(skins, "新規スキン")
  
      skins.push({
          "name": name,
          "description": "",
          "customizable": true,
          "show": true,
          "style": {
              "novel": {
                  "background": "#fff",
                  "color": "#444"
              },
              "link": {
                  "color_link": "#03c",
                  "color_visited": "#857",
                  "color_hover": "#393"
              },
              "sublist": {
                  "color": "#444",
                  "hover": "#9df"
              }
          }
      })
      saveSkins(skins)
      saveSkin(skins.length-1)
      restoreSkins(skins, skins.length-1)
    });
  })
  
  $("#skin-option--buttons button[name='save']").on("click", (e)=>{ /* Save Button */
    e.preventDefault()
    var skin = getSkinData()
    var selected = parseInt($("#skin").val())
  
    chrome.storage.sync.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultValue)
      if(skins[selected]!=undefined){
        if(skins[selected].customizable){
          skins[selected] = skin
          saveSkins(skins)
          restoreSkins(skins, selected)
        }
      }
    });
  })
  
  $("#skin-option--buttons button[name='copy']").on("click", (e)=>{ /* Copy Button */
    e.preventDefault()
    var skin = getSkinData()
  
    chrome.storage.sync.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultValue)
      skin.customizable = true
      skin.name = generateNoDuplicateName(skins, skin.name + " - コピー")
      skins.push(skin)

      saveSkins(skins)
      saveSkin(skins.length - 1)
      restoreSkins(skins, skins.length - 1)
    });
  })
  
  $("#skin-option--buttons button[name='delete']").on("click", (e)=>{ /* Delete Button */
    e.preventDefault()
    var selected = parseInt($("#skin").val())
  
    chrome.storage.sync.get(["skins"], function(data) {
      var skins = defaultValue(data.skins, defaultSkins)
  
      if(skins[selected].customizable==true){
        skins.splice(selected, 1)
        if(selected>=skins.length){
          selected = skins.length-1
        }
        saveSkins(skins)
        saveSkin(selected)
        restoreSkins(skins, selected)
      }
    });
  })
  }