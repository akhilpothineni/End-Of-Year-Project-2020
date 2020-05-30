chrome.runtime.onInstalled.addListener(function (object){
    //checks to see when the extension is first installed
    if(object.reason == "install"){
        chrome.tabs.create({url: "select-defaults.html"}, function (tab){
            console.log("new tab created");
        });
    }else if(object.reason == "update"){
        //check to see if the extension was updated
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + object.previousVersion + " to " + thisVersion + "!");
        chrome.tabs.create({url: "select-defaults.html"}, function (tab){
            console.log("new tab created");
        });
        chrome.storage.sync.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
    }
});