import { debug } from "../debug_mode.js"

/* Debug */
export function debug_log(text){
    if(debug){
      $("#debug textarea").text(text)
    }
  }
export function debug_logObject(obj){
    debug_log(JSON.stringify(obj, null, 3))
}
    