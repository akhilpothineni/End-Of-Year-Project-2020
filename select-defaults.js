var values = [];
var labib = document.forms['addValues'].elements['test'];

document.addEventListener('DOMContentLoaded', function(){
    //checklist onclick
    document.getElementById("addValues").addEventListener("click",
    e => {
        let target = e.target;
        if(target.name === "checkName"){
            //checks whether the box is checked
            if(e.target.checked){
                //if it is, it then gets added to the chrome.storage array
                console.log("YES");
                chrome.storage.sync.get({list:[]}, function(data){
                    var array = data.list;
                    array.push(target.value);
                    chrome.storage.sync.set({list:array}, function(){
                        console.log("added" + target.value + "to list");
                    });
                });
            }
            else if(!e.target.checked){
                //if unchecked, it removes the value from the chrome.storage
                console.log("NO");
                chrome.storage.sync.get({list:[]}, function(data){
                    var array = data.list;
                    var index = array.indexOf(e.target.value);
                    if (index > -1){
                        array.splice(index, 1);
                    }
                    chrome.storage.sync.set({list:array});
                });
                console.log("removed");
            }
        }
    });
});
