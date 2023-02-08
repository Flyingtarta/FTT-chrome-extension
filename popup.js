/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs[0].url);
  });
*/
async function send_showModsToggle() {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { order: "toggleHiglightMods" }, function (response) {
            let button = document.getElementById("showModsToggle");            
            if (response.isHiglightOn) {
                button.style.backgroundColor = "#71A63C";
            }else{
                button.style.backgroundColor = "#FEA204";
            }
        });
    });

}

async function send_ids(mod_ids) {
    let modids = mod_ids;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { order: "modids", ids: modids }, function (response) {
            ;
        });
    });
}

async function addAll() {
    let mods_id = JSON.parse(sessionStorage.getItem("modsInPreset")) || []
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { order: "addAll", ids: mods_id }, function (response) {
            ;
        });
    });
}

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

const input = document.getElementById("file");
const reader = new FileReader();

reader.onload = function () {

    const fileContent = reader.result;
    let mod_ids = readModsFromPreset(fileContent);

    sessionStorage.setItem("modsInPreset", JSON.stringify(mod_ids));
    let info = document.getElementById("modInformation-h3");
    info.innerText = mod_ids.length +" Mods detected in preset";
    send_ids(mod_ids)

};

input.addEventListener("change", function () {
    reader.readAsText(input.files[0]);
});

//Buttons:
document.getElementById('showModsToggle').addEventListener('click', send_showModsToggle)
document.getElementById('addAllMods').addEventListener('click', addAll)

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { order: "hasModIds"}, function (response) {
        sessionStorage.setItem("modsInPreset", JSON.stringify(response.mods_ids));

        if (response.mods_ids === []) {
            return; 
        };
        //buttons.style.display = "None";
        let info = document.getElementById("modInformation-h3");
        info.innerText = response.mods_ids.length +" Mods in preset";
    });
});


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { order: "isHiglightOn"}, function (response) {
        //sessionStorage.setItem("toggleHiglightMods", JSON.stringify(response.isHiglightOn));
        let button = document.getElementById("showModsToggle");
        if (response.isHiglightOn) {
            button.style.backgroundColor = "#71A63C";
        }else{
            button.style.backgroundColor = "#FEA204";
        }


    });
});


//let mods_id = JSON.parse(sessionStorage.getItem("modsInPreset")) || [];

//esto ta al pedo 
let button = document.getElementsByClassName("buttons")[0];






