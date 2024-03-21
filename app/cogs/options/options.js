import {check, defaultValue, saveJson} from "../../utils/misc.js"
import { defaultOption, updateOption } from "../../utils/option.js";
import { debug_log, debug_logObject, debug } from "./debug.js";
import { restoreSkins, addSkinEditButtonEvent, addFontEditButtonEvent, restoreFont } from "./skins.js";
import { getDateString } from "../../utils/text.js";
import { restoreHeaderIconList, setSortable } from "../../utils/header.js";
import { addReplacePatternEditButtonEvent, restoreReplacePattern } from "./correction.js";

/* Remove Warning Message */
$('#js-failed').remove();
if(!debug){$('#debug').remove()}
if(!debug){$('#general').remove()}


/* Restore Options */
function restoreValues(data){
  $.each(data, function(name, value){
    var elm = $(".options[name='"+name+"']")
    if(elm.length){
      const tagName = elm.prop("tagName").toLowerCase()
      const type = elm.prop("type")
      
      if(tagName == "input" && type=="checkbox"){ // Toggle
        check("#" + elm.prop("id"), value, defaultOption[name])
      }
      else if(tagName=="select"){ // DropDown
        elm.val(defaultValue(value, defaultOption[name]))
      }
      else if(tagName=="details"){ // Details
        elm.prop("open", defaultValue(value, defaultOption[name]))
      }
    }
  })
}

function restoreOptions(){
  updateOption()

  chrome.storage.local.onChanged.addListener(function(changes){
    chrome.storage.local.get(null, function(data) {
      restoreValues(data)
    })
  })

  chrome.storage.local.get(null, function(data) {
    restoreValues(data)

    var right_header = defaultValue(data.novelCustomHeaderRight, defaultOption["novelCustomHeaderRight"])
    var left_header = defaultValue(data.novelCustomHeaderLeft, defaultOption["novelCustomHeaderLeft"])
    restoreHeaderIconList(left_header, right_header)
    setSortable()

    /* Skins */
    restoreSkins(data.skins, data.selectedSkin)

    /* Font */
    restoreFont()

    /* Correction */
    restoreReplacePattern()
  });
}

/* Import Options */
function importOptions(options){
  if(typeof({})==typeof(options)){
    chrome.storage.local.set(options, function(){
      updateOption(true)
    })
  }
}

/* Sync */
function syncSetOptions(){
  chrome.storage.local.get(null, (data) => {
    chrome.storage.sync.set(data)
  })
}

function syncGetOptions(){
  chrome.storage.sync.get(null, (data) => {
    chrome.storage.local.set(data, function(){
      updateOption(true)
    })
  })
}

/* Events */
/* First Load */
document.addEventListener('DOMContentLoaded', restoreOptions);

/* Skin Change */
addSkinEditButtonEvent()
addFontEditButtonEvent()
addReplacePatternEditButtonEvent()

/* On Click Elements */
$(".options").on("click", function(){
  const name = $(this).prop("name")
  const tagName = $(this).prop("tagName").toLowerCase()
  const type = $(this).prop("type")

  var value = {}
  if(tagName=="input" && type=="checkbox"){
    value[name] = $(this).prop('checked')
  }else if(tagName=="select"){
    value[name] = $(this).val()
  }

  if(value[name]!=undefined){
    chrome.storage.local.set(value);
  }
});
$("details.options").on("toggle", function(){
  const name = $(this).prop("name")
  const tagName = $(this).prop("tagName").toLowerCase()
  const type = $(this).prop("type")

  var value = {}
  if(tagName=="details"){
    value[name] = $(this).prop("open")
  }

  if(value[name]!=undefined){
    chrome.storage.local.set(value);
  }
});

/* Buttons */
$("#reset-skin").on("click", (e)=>{
  chrome.storage.local.set({selectedSkin: defaultOption.selectedSkin, skins: defaultOption.skins}, function(data) {
    restoreSkins(defaultOption.Skin, defaultOption.selectedSkin)
  })
})
$("#reset-options").on("click", (e)=>{
  chrome.storage.local.set(defaultOption, function(e){
    restoreOptions();
  })
})
$("#sync-set-options").on("click", (e)=>{
  syncSetOptions()
})
$("#sync-get-options").on("click", (e)=>{
  syncGetOptions()
})
$("#export-options").on("click", (e)=>{
  chrome.storage.local.get(null, function(data) {
    saveJson(data, "narou-tweaker-options-" + getDateString() + ".json")
  })
})
$("#import-options").on("change", (evt)=>{
  var f = evt.target.files[0]
  var reader = new FileReader();
  reader.onload = function(e){
      var data = JSON.parse(e.target.result)
      importOptions(data)
  }
  reader.readAsText(f);
})