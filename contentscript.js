

function toggleShowModsInHtml(){
    let show = JSON.parse(sessionStorage.getItem("toggleHiglightMods")) || false;
    
    if (!show) {
        sessionStorage.setItem("toggleHiglightMods", JSON.stringify(true));
    }else{
        sessionStorage.setItem("toggleHiglightMods", JSON.stringify(!show));
    }
    window.location.reload();
    
}


function higlightMods() {
    let show = JSON.parse(sessionStorage.getItem("toggleHiglightMods")) || false;

    if (!show) {
        return;
    }


    //var ids = ['843577117', '450814997', '843425103', '463939057', '843632231', '843593391', '1779063631', '333310405', '2191542091', '1673456286', '773131200', '773125288', '884966711', '2174495332', '615007497', '903134884', '820924072', '2910222830', '837729515', '2122257848', '583496184', '2034363662', '825172265', '2626530649', '929396506', '930903722', '2127693591', '894678801', '2018593688', '2910222451'];

    var ids = JSON.parse(sessionStorage.getItem("modsInPreset")) || false;
    
    if (!ids) {
        return ;
    }
    
    let items = document.getElementsByClassName("itemChoice")

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let item_mod_id = item.id.split("_")[2];
        let agregado = document.getElementById("sharedfile_" + item_mod_id) || false;
        let in_preset = ids.includes(item_mod_id);
        
        if (in_preset && !agregado) {
            item.style.backgroundColor = "darkorchid";
        }

        if (agregado && !in_preset) {
            item.style.backgroundColor = "#8B0000";
            document.getElementById("sharedfile_" + item_mod_id ).style.backgroundColor = "#8B0000";
        }
        
    }
    /*

    ids.forEach( modid => {
        //verificamos si este mod ya esta agregado

        let agregado = document.getElementById("sharedfile_" + modid);
        
        //Marca en la lista los que faltan agregar
        let requiredMod = document.getElementById("choice_MySubscribedItems_" + modid)

        if (requiredMod && !agregado) { 
            requiredMod.style.backgroundColor = "darkorchid";
        }
    })
    */


}

function modAdder() {
    let addmods = JSON.parse(sessionStorage.getItem("addAllmodsInpreset")) || false;
    if (!addmods) {
        return;
    }
    let modids_temp = JSON.parse(sessionStorage.getItem("modsInPreset_temp")) || [];

    if (modids_temp === []) {
        sessionStorage.setItem("addAllmodsInpreset", JSON.stringify(false));
        return; 
    }

    let modid = modids_temp[0]
    modids_temp.splice( 0, 1);
    sessionStorage.setItem("modsInPreset_temp", JSON.stringify(modids_temp));
    
    let myButton = document.getElementById("choice_MySubscribedItems_" + modid);

    if (myButton) {
        console.log(myButton)
        myButton.click();
        return;
    }

    location.reload();
    // Simular un clic en el elemento
    
    //
}



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log(request.order)

        if ( request.order === "toggleHiglightMods" ) {
            toggleShowModsInHtml();
            let higlihtOn = JSON.parse(sessionStorage.getItem("toggleHiglightMods")) || false;
            sendResponse({isHiglightOn: higlihtOn });

        }
        
        if ( request.order === "toggleAddAll") {
                toggleAddAll();
        }
        
        if (request.order === "modids") {
            modids = JSON.stringify(request.ids)
            sessionStorage.setItem("modsInPreset", JSON.stringify(request.ids));
        }

        if (request.order === "addAll" ) {
            let modids = JSON.stringify(request.ids)
            if (modids === []) {
                return;
            }            
            sessionStorage.setItem("modsInPreset_temp", JSON.stringify(request.ids));
            sessionStorage.setItem("addAllmodsInpreset", JSON.stringify(true));
            location.reload();
        }

        //Requests of information 
        if (request.order === "hasModIds") {
            let modInPreset = JSON.parse(sessionStorage.getItem("modsInPreset")) || [];
            sendResponse({mods_ids : modInPreset});
        }

        if (request.order === "isHiglightOn") {
            let higlihtOn = JSON.parse(sessionStorage.getItem("toggleHiglightMods")) || false;
            sendResponse({isHiglightOn: higlihtOn });
        }

    }
);


higlightMods()
modAdder()
