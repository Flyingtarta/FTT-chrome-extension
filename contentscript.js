

function readModsFromPreset(fileContent) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "None";
    document.body.appendChild(iframe);
    iframe.contentWindow.document.body.innerHTML = fileContent;
    const links = iframe.contentWindow.document.getElementsByTagName("a");
    iframe.style.height = "0px";
    iframe.style.width = "0px";

    let mod_ids = [];
    for (let i = 0; i < links.length; i++) {
        mylink = links[i].href
        let id = mylink.split("=")[mylink.split("=").length - 1];
        mod_ids.push(id);
    }
    const parent = iframe.parentNode;
    parent.removeChild(iframe);
    return mod_ids;
}

function toggleShowModsInHtml(){
    let show = JSON.parse(sessionStorage.getItem("toggleHiglightMods")) || true;
    sessionStorage.setItem("toggleHiglightMods", JSON.stringify(!show));
    window.location.reload();    
}

function toogleAddAllMods(){
    let modids = sessionStorage.getItem("modsInPreset") || [];
    if (modids === []) {
        return;
    }            
    sessionStorage.setItem("modsInPreset_temp", modids);
    sessionStorage.setItem("addAllmodsInpreset", JSON.stringify(true));
    location.reload();

}

function higlightMods() {
    let show = JSON.parse(sessionStorage.getItem("toggleHiglightMods")) || true;

    if (!show) {
        return;
    }


    //var ids = ['843577117', '450814997', '843425103', '463939057', '843632231', '843593391', '1779063631', '333310405', '2191542091', '1673456286', '773131200', '773125288', '884966711', '2174495332', '615007497', '903134884', '820924072', '2910222830', '837729515', '2122257848', '583496184', '2034363662', '825172265', '2626530649', '929396506', '930903722', '2127693591', '894678801', '2018593688', '2910222451'];

    var ids = JSON.parse(sessionStorage.getItem("modsInPreset")) || false;
    
    if (!ids) {
        return ;
    }
    
    let items = document.getElementsByClassName("itemChoice");

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
    let modTemp = [];
    
    modids_temp.forEach(modid => {
        let isAdded = document.getElementById("sharedfile_" + modid) || false;
        if (!isAdded) {
            modTemp.push(modid);
        }
    })

    if (modTemp.length === 0) {
        sessionStorage.setItem("addAllmodsInpreset",JSON.parse(false));
        sessionStorage.setItem("modsInPreset_temp", JSON.stringify([]));
        return; 
    }

    let modid = modTemp[0];
    modTemp.splice( 0, 1);
    console.log(modTemp)
    sessionStorage.setItem("modsInPreset_temp", JSON.stringify(modTemp) );
    
    let myButton = document.getElementById("choice_MySubscribedItems_" + modid);

    if (myButton) {
        myButton.click();
        return;
    }
    
    window.location.reload();
    
}

function removeAllAddedItems() {
    
    let items = document.getElementsByClassName("general_btn delete");
    
    for (let i = 0; i < items.length; i++) {

        let item = items[i];
        let cmd = item.href;

        console.log("WIP")
        //javascript:RemoveChildFromCollection( '837729515' )

        //chrome.tabs.update({url: cmd });
        
    }
}

function owo() {
    /*
        TESTING 
    
    */
    function createButton(text) {
        let div = document.createElement("div");
        div.className = "btnv6_blue_blue_innerfade btn_small_thin"; 
        let span = document.createElement("span")
        span.innerText = text;
        span.id = "ftt-" + text; 
        div.appendChild(span);
        div.style.marginLeft = "2px";
        return(div);
    }

    function infoText() {
        return("Preset not loaded");
    }

    let buttonsDiv = document.getElementsByClassName("manageItemsSort");
    if (buttonsDiv.length === 0) {
        return;
    }
    buttonsDiv = buttonsDiv[0];
    //file input
    const fileinput = document.createElement("input");
    fileinput.type="file";
    fileinput.id = "ftt-fileInput";
    fileinput.style.margin = "1px";
    //higligt mods

    const higlight = createButton("Higlight mods");
    //ADD ALL MODS
    const addallmods = createButton("Add all mods");
    //remove mods
    const removeallitems = createButton("remove all items");
    //export to html    
    //My own div:
    let parent_mybuttonsDiv = document.createElement("div");
    //style for it:
    parent_mybuttonsDiv.style.borderWidth = "0px 0px 0px 3px";
    parent_mybuttonsDiv.style.borderStyle = "solid";
    parent_mybuttonsDiv.style.color = "#FEA204";
    parent_mybuttonsDiv.style.backgroundColor = "#49443C";

    let mybuttonsDiv = document.createElement("div");
    parent_mybuttonsDiv.appendChild(mybuttonsDiv);

    mybuttonsDiv.style.margin = "10px";
    
    //texto info
    let textinfo = document.createElement("h4");
    textinfo.innerText = infoText();
    textinfo.className = "manageItemsTitle";
    //mybuttonsDiv.style.padding = "3px";
    //
    mybuttonsDiv.appendChild(document.createElement("br"));
    mybuttonsDiv.appendChild(fileinput);
    mybuttonsDiv.appendChild(document.createElement("br"));
    mybuttonsDiv.appendChild(textinfo)
    mybuttonsDiv.appendChild(document.createElement("br"));
    mybuttonsDiv.appendChild(higlight);
    mybuttonsDiv.appendChild(addallmods);
    mybuttonsDiv.appendChild(removeallitems);
    
    buttonsDiv.appendChild(parent_mybuttonsDiv);

    /*LISTENERS*/
    //FILE READER
    const reader = new FileReader();
    reader.onload = function () {

        const fileContent = reader.result;
        let mod_ids = readModsFromPreset(fileContent);
        sessionStorage.setItem("modsInPreset", JSON.stringify(mod_ids));
    };

    fileinput.addEventListener("change", function () {
        reader.readAsText(fileinput.files[0]);
    });

    //BUTTONS:

    higlight.addEventListener('click', toggleShowModsInHtml)
    addallmods.addEventListener('click', toogleAddAllMods)
    removeallitems.addEventListener('click', removeAllAddedItems)
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

owo()
higlightMods()
modAdder()

