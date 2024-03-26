import {check, defaultValue, saveJson} from "../../utils/misc.js"
import { defaultOption, updateOption } from "../../utils/option.js";
import { debug_log, debug_logObject, debug } from "../../utils/debug.js";
import { restoreSkins, addSkinEditButtonEvent, addFontEditButtonEvent, restoreFont } from "./skins.js";
import { getDateString } from "../../utils/text.js";
import { restoreHeaderIconList, setSortable } from "../../utils/header.js";
import { addReplacePatternEditButtonEvent, restoreReplacePattern } from "./novel/correction.js";

/* Remove Warning Message */
$('#js-failed').remove();
if(!debug){$('#debug').remove()}
if(!debug){$('#general').remove()}

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
/* On Click Elements */
$("details.options").on("toggle", function(){
  const name = $(this).prop("name")
  const tagName = $(this).prop("tagName").toLowerCase()
  const type = $(this).prop("type")

  var value = {}
  if(tagName=="details"){
    console.log(value[name] = $(this).prop("open"))
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