import { defaultSkins } from "../../utils/data/default_skins.js";
import {check, defaultValue, saveJson} from "../../utils/misc.js"
import { saveOptions, saveSkin, saveSkins } from "../../utils/option.js";
import { debug_log, debug_logObject, debug } from "./debug.js";
import { restoreSkins, restoreSkin, getSkinData, checkSkinNameDuplicate, resetSkins, addSkinEditButtonEvent, addFontEditButtonEvent, restoreFont } from "./skins.js";
import { restoreHeaderIconList, getHeaderIconList } from "./header.js";
import { getDateString } from "../../utils/text.js";
import { defaultFont } from "../../utils/data/default_font.js";

/* Remove Warning Message */
$('#js-failed').remove();
if(!debug){$('#debug').remove()}
if(!debug){$('#general').remove()}


/* Restore Options */
function restoreOptions(){
  chrome.storage.local.get(["options", "skins", "applied_skin", "applied_font"], function(data) {
    var options = defaultValue(data.options, {})

    /* Novel */
    check('#enable_novel_css', options.enable_novel_css, true);
    check('#enable_novel_header', options.enable_novel_header, true);
    check('#enable_novel_header_scroll_hidden', options.enable_novel_header_scroll_hidden, false);
    check('#enable_novel_expand_skin', options.enable_novel_expand_skin, true);
    $("#novel_header_mode").val(defaultValue(options.novel_header_mode, "scroll"));

    /* Header */
    restoreHeaderIconList(defaultValue(options.novel_header_icon_left, ["home", "info", "impression", "review", "pdf", "booklist"]), "left")
    restoreHeaderIconList(defaultValue(options.novel_header_icon_right, ["siori", "option"]), "right")
    restoreHeaderIconList(defaultValue(options.novel_header_icon_disabled, ["author", "kasasagi", "narou-api", "rss", "text"]), "disabled")
    setSortable()

    /* Mypage */
    check('#enable_mypage_profile_userid', options.enable_mypage_profile_userid, true);
    check('#enable_mypage_profile_detail', options.enable_mypage_profile_detail, true);
    check('#enable_mypage_profile_booklist', options.enable_mypage_profile_booklist, true);

    check('#enable_mypage_profile_autourl', options.enable_mypage_profile_autourl, true);
    check('#enable_mypage_blog_autourl', options.enable_mypage_blog_autourl, true);
    check('#enable_mypage_blogcomment_autourl', options.enable_mypage_blogcomment_autourl, false);

    /* Kasasagi */
    check('#enable_kasasagi_css', options.enable_kasasagi_css, true);
    check('#enable_kasasagi_export', options.enable_kasasagi_export, true);
    check('#enable_kasasagi_api_data', options.enable_kasasagi_api_data, true);

    check('#enable_kasasagi_graph_general_day', options.enable_kasasagi_graph_general_day, true);
    check('#enable_kasasagi_graph_general_total', options.enable_kasasagi_graph_general_total, false);
    check('#enable_kasasagi_graph_chapter_unique', options.enable_kasasagi_graph_chapter_unique, true);

    $("#kasasagi_graph_type_general_day").val(defaultValue(options.kasasagi_graph_type_general_day, "bar"))
    $("#kasasagi_graph_type_general_total").val(defaultValue(options.kasasagi_graph_type_general_total, "bar"))
    $("#kasasagi_graph_type_chapter_unique").val(defaultValue(options.kasasagi_graph_type_chapter_unique, "bar"))

    check('#enable_kasasagi_table_general_day', options.enable_kasasagi_table_general_day, true);
    check('#enable_kasasagi_table_chapter_unique', options.enable_kasasagi_table_chapter_unique, true);
    

    /* Skins */
    restoreSkins(defaultValue(data.skins, defaultSkins), defaultValue(data.applied_skin, 0))
    restoreFont(defaultValue(data.applied_font, defaultFont))
  });
}

/* Reset Options */
function resetOptions(){
  saveOptions({});
  restoreOptions();
}

/* Save Options */
function storeOptions(){
  var options = {
    /* Novel */
    enable_novel_css: $("#enable_novel_css").prop('checked'),
    enable_novel_header: $("#enable_novel_header").prop('checked'),
    enable_novel_header_scroll_hidden: $("#enable_novel_header_scroll_hidden").prop('checked'),
    novel_header_mode: $("#novel_header_mode").val(),
    enable_novel_expand_skin: $("#enable_novel_expand_skin").prop('checked'),

    novel_header_icon_left: getHeaderIconList("left"),
    novel_header_icon_right: getHeaderIconList("right"),
    novel_header_icon_disabled: getHeaderIconList("disabled"),

    /* Mypage */
    enable_mypage_profile_userid: $("#enable_mypage_profile_userid").prop('checked'),
    enable_mypage_profile_detail: $("#enable_mypage_profile_detail").prop('checked'),
    enable_mypage_profile_booklist: $("#enable_mypage_profile_booklist").prop('checked'),

    enable_mypage_profile_autourl: $("#enable_mypage_profile_autourl").prop('checked'),
    enable_mypage_blog_autourl: $("#enable_mypage_blog_autourl").prop('checked'),
    enable_mypage_blogcomment_autourl: $("#enable_mypage_blogcomment_autourl").prop('checked'),

    /* Kasasagi */
    enable_kasasagi_css: $("#enable_kasasagi_css").prop('checked'),
    enable_kasasagi_export: $("#enable_kasasagi_export").prop('checked'),
    enable_kasasagi_graph_general_day: $("#enable_kasasagi_graph_general_day").prop('checked'),
    enable_kasasagi_graph_general_total: $("#enable_kasasagi_graph_general_total").prop('checked'),
    enable_kasasagi_graph_chapter_unique: $("#enable_kasasagi_graph_chapter_unique").prop('checked'),
    kasasagi_graph_type_general_day: $("#kasasagi_graph_type_general_day").val(),
    kasasagi_graph_type_general_total: $("#kasasagi_graph_type_general_total").val(),
    kasasagi_graph_type_chapter_unique: $("#kasasagi_graph_type_chapter_unique").val(),
    enable_kasasagi_table_general_day: $("#enable_kasasagi_table_general_day").prop('checked'),
    enable_kasasagi_table_chapter_unique: $("#enable_kasasagi_table_chapter_unique").prop('checked'),
    enable_kasasagi_api_data: $("#enable_kasasagi_api_data").prop('checked'),
  }
  saveOptions(options);
}

/* Import Options */
function importOptions(options){
  if(options){
    if(options.options!=undefined){
      saveOptions(options.options)
    }
    if(options.applied_skin!=undefined){
      saveSkin(options.applied_skin)
    }
    if(options.skins!=undefined){
      saveSkins(options.skins)
    }
    if(options.applied_font!=undefined){
      saveFont(options.applied_font)
    }
    restoreOptions();
    restoreSkins();
  }
}

/* Sync */
function syncSetOptions(){
  chrome.storage.local.get(["options", "skins", "applied_skin", "applied_font"], (data) => {
    chrome.storage.sync.set({
      options: data.options,
      skins: data.skins,
      applied_skin: data.applied_skin,
      applied_font: data.applied_font
    })
  })
}

function syncGetOptions(){
  chrome.storage.sync.get(["options", "skins", "applied_skin", "applied_font"], (data) => {
    chrome.storage.local.set({
      options: data.options,
      skins: data.skins,
      applied_skin: data.applied_skin,
      applied_font: data.applied_font
    })
    restoreOptions();
    restoreSkins();
  })
}


/* Events */
document.addEventListener('DOMContentLoaded', restoreOptions);

$(".options").each(function() {
  $(this).on("click", function(){
    storeOptions();
  });
});

/* Skin Change */
addSkinEditButtonEvent()
addFontEditButtonEvent()
$("#reset-skin").on("click", (e)=>{
  resetSkins();
})
$("#reset-options").on("click", (e)=>{
  resetOptions()
})
$("#sync-set-options").on("click", (e)=>{
  syncSetOptions()
})
$("#sync-get-options").on("click", (e)=>{
  syncGetOptions()
})
$("#export-options").on("click", (e)=>{
  chrome.storage.local.get(["options", "skins", "skin"], function(data) {
    saveJson(data, "narou-tweaker-options-" + getDateString() + ".json")
  })
})
$("#import-options").on("change", (evt)=>{
  var f = evt.target.files[0]
  var reader = new FileReader();
  reader.onload = function(e){
      var data = JSON.parse(e.target.result)
      console.log(data)
      importOptions(data)
  }
  reader.readAsText(f);
})

/* Header */
function setSortable(){
  Sortable.create($(".draggable_area#left")[0], {
      handle: '.icon-element',
      sort: 1,
      group: {
          name: 'header-icon',
          pull: true,
          put: true
      },
      animation: 150,
      onAdd: function (e) {
          storeOptions();
      },
      onChange: function (e) {
        storeOptions();
      },
  });
  Sortable.create($(".draggable_area#right")[0], {
      handle: '.icon-element',
      sort: 1,
      group: {
          name: 'header-icon',
          pull: true,
          put: true
      },
      animation: 150,
      onAdd: function (e) {
          storeOptions();
      },
      onChange: function (e) {
        storeOptions();
      },
  });
  Sortable.create($(".draggable_area#disabled")[0], {
      handle: '.icon-element',
      animation: 150,
      sort: 1,
      group: {
          name: 'header-icon',
          pull: true,
          put: true,
      },
      animation: 150,
      onAdd: function (e) {
        storeOptions();
      },
      onChange: function (e) {
        storeOptions();
      },
      
  });
}