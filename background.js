chrome.runtime.onInstalled.addListener(function (object){
    if(object.reason == "install"){
        chrome.tabs.create({url: "select-defaults.html"}, function (tab){
            console.log("new tab created");
        });
    }else if(object.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + object.previousVersion + " to " + thisVersion + "!");
        chrome.tabs.create({url: "select-defaults.html"}, function (tab){
            console.log("new tab created");
        });
    }
});