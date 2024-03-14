import { defaultSkins } from "../../utils/data/default_skins.js";
import {check, defaultValue, saveJson} from "../../utils/misc.js"
import { saveOptions, saveSkin, saveSkins } from "../../utils/option.js";
import { debug_log, debug_logObject } from "./debug.js";
import { restoreSkins, restoreSkin, getSkinData, checkSkinNameDuplicate, resetSkins, addSkinEditButtonEvent } from "./skins.js";
import { restoreHeaderIconList, getHeaderIconList } from "./header.js";
import { getDateString } from "../../utils/text.js";

/* Remove Warning Message */
$('#js-failed').remove();
if(!debug){$('#debug').remove()}


/* Restore Options */
function restoreOptions(){
  chrome.storage.sync.get(["options", "skins"], function(data) {
    var options = data.options

    /* Novel */
    check('#enable_novel_css', options.enable_novel_css, true);
    check('#enable_novel_expand_skin', options.enable_novel_expand_skin, true);
    $("#novel_header_mode").val(defaultValue(options.novel_header_mode, "scroll"))

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
    restoreSkins(defaultValue(data.skins, defaultSkins), defaultValue(data.options.applied_skin, 0))
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
    enable_novel_expand_skin: $("#enable_novel_expand_skin").prop('checked'),
    novel_header_mode: $("#novel_header_mode").val(),
    applied_skin: parseInt($("#skin").val()),

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

function importOptions(options){
  if(options){
    if(options.options!=undefined){
      saveOptions(options.options)
    }
    if(options.skin!=undefined){
      saveSkin(options.skin)
    }
    if(options.skins!=undefined){
      saveSkins(options.skins)
    }
    restoreOptions();
    restoreSkins();
  }
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
$("#reset-skin").on("click", (e)=>{
  resetSkins();
})
$("#reset-options").on("click", (e)=>{
  resetOptions()
})
$("#export-options").on("click", (e)=>{
  chrome.storage.sync.get(["options", "skins", "skin"], function(data) {
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