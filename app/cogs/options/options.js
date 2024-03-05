import {check, defaultValue} from "../../utils/misc.js"
import { saveOptions } from "../../utils/option.js";

const debug = false

/* Restore Options */
export function restoreOptions(){
  chrome.storage.sync.get(["options"], function(data) {
    var options = data.options

    /* Novel */
    check('#enable_novel_css', options.enable_novel_css, true);
    $("#novel_header_mode").val(defaultValue(options.novel_header_mode, "scroll"))

    /* Mypage */
    check('#enable_mypage_profile_userid', options.enable_mypage_profile_userid, true);
    check('#enable_mypage_profile_detail', options.enable_mypage_profile_detail, true);

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
  });
}

/* Save Options */
function storeOptions(){
  var options = {
    /* Novel */
    enable_novel_css: $("#enable_novel_css").prop('checked'),
    novel_header_mode: $("#novel_header_mode").val(),

    /* Mypage */
    enable_mypage_profile_userid: $("#enable_mypage_profile_userid").prop('checked'),
    enable_mypage_profile_detail: $("#enable_mypage_profile_detail").prop('checked'),

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
  if(debug){
    $("textarea").text(JSON.stringify(options, null, 3))
  }
  saveOptions(options);
}

/* Remove Warning Message */
$('#js-failed').remove();
if(!debug){$('#debug').remove()}

document.addEventListener('DOMContentLoaded', restoreOptions);
$(".options").each(function() {
  $(this).on("click", function(){
    storeOptions();
  });
});