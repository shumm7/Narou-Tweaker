function check(elm, value, _default) {
  if(value!=true && value!=false){
    value = _default;
  }
  $(elm).attr('checked', value).prop('checked', value).change();
}

/* Restore Options */
export function restoreOptions(){
  chrome.storage.sync.get(null, (options) => {
    check('#enable_mypage_profile_detail', options.enable_mypage_profile_detail, true)
    check('#enable_mypage_profile_autourl', options.enable_mypage_profile_autourl, true);;
    check('#enable_mypage_blog_autourl', options.enable_mypage_blog_autourl, true);
    check('#enable_mypage_blogcomment_autourl', options.enable_mypage_blogcomment_autourl, false);

    check('#enable_kasasagi_css', options.enable_kasasagi_css, true);
    check('#enable_kasasagi_graph', options.enable_kasasagi_graph, true);
    check('#enable_kasasagi_export', options.enable_kasasagi_export, true);
   });
}

/* Save Options */
export function saveOptions(){
  var options = {
    enable_mypage_profile_detail: $("#enable_mypage_profile_detail").prop('checked'),
    enable_mypage_profile_autourl: $("#enable_mypage_profile_autourl").prop('checked'),
    enable_mypage_blog_autourl: $("#enable_mypage_blog_autourl").prop('checked'),
    enable_mypage_blogcomment_autourl: $("#enable_mypage_blogcomment_autourl").prop('checked'),

    enable_kasasagi_css: $("#enable_kasasagi_css").prop('checked'),
    enable_kasasagi_graph: $("#enable_kasasagi_graph").prop('checked'),
    enable_kasasagi_export: $("#enable_kasasagi_export").prop('checked'),
  }
  chrome.storage.sync.set(options);
}

/* Remove Warning Message */
$('#js-failed').remove();

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelectorAll(".options").forEach((elm) => {
  elm.addEventListener("click", (e) => {
    saveOptions(elm);
  });
});