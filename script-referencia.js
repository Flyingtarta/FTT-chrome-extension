/*
function higlightMods() {
    var ids = ['843577117', '450814997', '843425103', '463939057', '843632231', '843593391', '1779063631', '333310405', '2191542091', '1673456286', '773131200', '773125288', '884966711', '2174495332', '615007497', '903134884', '820924072', '2910222830', '837729515', '2122257848', '583496184', '2034363662', '825172265', '2626530649', '929396506', '930903722', '2127693591', '894678801', '2018593688', '2910222451'];
    
    
    ids.forEach( modid => {
        
        let requiredMod = document.getElementById("choice_MySubscribedItems_" + modid)
        
        if (requiredMod) {
            requiredMod.style.backgroundColor = "darkorchid";
        }
    })
}
*/

/*
function insertScript() {
    // This selects the focused tab for the operation and passes the autoSearch function
    
    chrome.extension.sendMessage({message: "changeColor"}, function(changeColor) {
        console.log(response);
     });
    window.close();
}
*/

/*
sessionStorage.setItem("ids", JSON.stringify(ids));
sessionStorage.setItem("current", JSON.stringify(0) );

function suscribirMod() {
  var modid = JSON.parse(sessionStorage.getItem("ids")) 
  var current = JSON.parse(sessionStorage.getItem("current"))    
*/
document.getElementById('showModsToggle').addEventListener('click', onoff)
// This function selects a random topic from an array and 
