

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

function toggleShowModsInHtml() {
    let show = JSON.parse(sessionStorage.getItem("toggleHiglightMods")) || true;
    sessionStorage.setItem("toggleHiglightMods", JSON.stringify(!show));
    window.location.reload();
}

function toogleAddAllMods() {
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
        return;
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
            document.getElementById("sharedfile_" + item_mod_id).style.backgroundColor = "#8B0000";
        }

    }
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
        sessionStorage.setItem("addAllmodsInpreset", JSON.parse(false));
        sessionStorage.setItem("modsInPreset_temp", JSON.stringify([]));
        return;
    }

    let modid = modTemp[0];
    modTemp.splice(0, 1);
    console.log(modTemp)
    sessionStorage.setItem("modsInPreset_temp", JSON.stringify(modTemp));

    let myButton = document.getElementById("choice_MySubscribedItems_" + modid);

    if (myButton) {
        myButton.click();
        return;
    }

    window.location.reload();

}

function addButtons() {
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
        return (div);
    }

    function infoText(textinfo) {
        const title = document.createElement("h4");
        textinfo.appendChild(title);
        textinfo.style.color = "gray";
        //title.className = "manageItemsTitle";

        const modids = JSON.parse(sessionStorage.getItem("modsInPreset")) || [];
        if (modids.length === 0) {
            title.innerText = "Preset not loaded";
            return;
        }

        let modsLoaded = 0;
        let modsExtra = 0;
        let unsuscribed = [];

        //count extra mods:
        const items = document.getElementsByClassName("itemChoice");

        const breadcrumbs = document.getElementsByClassName("breadcrumbs")[0];
        const ModUrl = breadcrumbs.getElementsByTagName("a")[2].href.split("=")[1];
        const currentModInPreset =  modids.includes(ModUrl);
        

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            //if its favorite jump 
            const itemtag = item.id.split("_")[1]
            if ( itemtag === "MyFavoriteItems" || itemtag === "MyItems" ) {
                continue;
            }

            let item_mod_id = item.id.split("_")[2];
            let agregado = document.getElementById("sharedfile_" + item_mod_id) || false;
            let in_preset = modids.includes(item_mod_id);

            if (in_preset && agregado) {
                modsLoaded = modsLoaded + 1;
            }

            if (agregado && !in_preset) {
                modsExtra = modsExtra + 1;
            }
            
        }

        modids.forEach(modid => {

                const inListOfItems = document.getElementById("choice_MySubscribedItems_" + modid) || false;
                if (!inListOfItems && !modid === ModUrl) {
                    unsuscribed.push(modid); 

            }
        })
        
        title.innerText = "Preset with: " + modids.length + " Mods in it detected";

        const subtitle = document.createElement("h5");
        textinfo.appendChild(subtitle);
        subtitle.className = "manageItemsTitle";
        subtitle.innerText = "Mods added to colection: " + modsLoaded + "/" + modids.length ;
        if (currentModInPreset) {
            subtitle.innerText = subtitle.innerText + " (This mod is in the preset)";
        }

        if (modsExtra > 0) {
            console.log("mods extra detected"); 
            const miniAlert = document.createElement("h5");
            //miniAlert.className = "manageItemsTitle";
            miniAlert.style.color = "rgb(254, 162, 4)";
            miniAlert.innerText = "INFO | There is " + modsExtra + " Mods loaded that dont are present in the preset ( need to be removed manually)";
            miniAlert.style.fontSize = "14px";
            textinfo.appendChild(miniAlert);
        }
        
        if (unsuscribed.length > 0) {
            console.log("hola2")
            const modUnsuscribedAlert = document.createElement("h5");
            modUnsuscribedAlert.innerText = "ALERT! | There is mods in the html that you are not suscribed: ";
            modUnsuscribedAlert.classname = "manageItemsTitle";
            modUnsuscribedAlert.style.color = "rgb(254, 162, 4)";
            modUnsuscribedAlert.style.fontSize = "14px";
            const list = document.createElement("ul");
            unsuscribed.forEach(modid => {
                const modLink = document.createElement("li");
                const modlink_a = document.createElement("a");
                modlink_a.href = "https://steamcommunity.com/sharedfiles/filedetails/?id=" + modid;
                modlink_a.innerText = "https://steamcommunity.com/sharedfiles/filedetails/?id=" + modid;
                modlink_a.style.fontSize= "10px";
                modLink.appendChild(modlink_a); 
                list.appendChild(modLink);
            })
            modUnsuscribedAlert.appendChild(list);
            textinfo.appendChild(modUnsuscribedAlert);

        }
        

        

        
    }

    let buttonsDiv = document.getElementsByClassName("collectionAddItemsSection");
    if (buttonsDiv.length === 0) {
        return;
    }
    buttonsDiv = buttonsDiv[0];
    //file input
    const fileinput = document.createElement("input");
    fileinput.type = "file";
    fileinput.id = "ftt-fileInput";
    fileinput.style.margin = "1px";
    //higligt mods

    //const higlight = createButton("Higlight mods");
    //ADD ALL MODS
    const addallmods = createButton("Add all mods");
    //remove mods
    //const removeallitems = createButton("remove all items");
    //export to html
    const export2html = createButton("Export to HTML");
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
    mybuttonsDiv.style.padding = "10px";

    //texto info
    const textinfo = document.createElement("div");
    infoText(textinfo);

    //title of the extension:
    title = document.createElement("h3");
    title.innerText = "Flying Tarta Tools:";
    title.className = "manageItemsTitle";
    mybuttonsDiv.appendChild(title);

    mybuttonsDiv.appendChild(fileinput);
    mybuttonsDiv.appendChild(document.createElement("br"));
    mybuttonsDiv.appendChild(textinfo)
    mybuttonsDiv.appendChild(document.createElement("br"));
    //mybuttonsDiv.appendChild(higlight);
    mybuttonsDiv.appendChild(addallmods);
    //mybuttonsDiv.appendChild(removeallitems);

    buttonsDiv.appendChild(parent_mybuttonsDiv);

    /*LISTENERS*/
    //FILE READER
    const reader = new FileReader();
    reader.onload = function () {

        const fileContent = reader.result;
        const mod_ids = readModsFromPreset(fileContent);
        sessionStorage.setItem("modsInPreset", JSON.stringify(mod_ids));
        window.location.reload();
    };

    fileinput.addEventListener("change", function () {
        reader.readAsText(fileinput.files[0]);
    });

    //BUTTONS:

    //higlight.addEventListener('click', toggleShowModsInHtml)
    addallmods.addEventListener('click', toogleAddAllMods);
    //export2html.addEventListener("click", exporttohtml);
}
/*
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
*/


addButtons()
higlightMods()
modAdder()
