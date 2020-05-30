//ITEMS THAT RUN ONCE
// const tableData = ['bool house', 'liggy', 'thoom', 'shim ravage'];

makeList();
var lastId = 0;

//Button Click Checking
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('save').onclick = function () {
        //save NEW user values to the chrome.storage
        var value = document.getElementById('saveLine').value;
        if(value !== ""){
            //checks for empty strings   
            chrome.storage.sync.get({list:[]}, function(data){
                //stores value to chrome.storage array
                var array = data.list;
                array.push(value);
                console.log(array.length);
                chrome.storage.sync.set({list:array}, function(){
                    console.log("added to list");
                });
                eraseText();
                updateList(value);
            });
        }
    }
    document.getElementById("list").addEventListener("click", function(e){
        //checks to see if a list element was clicked
        if(e.target && e.target.nodeName == "LI"){
            //if it was a 'li' it copies the text to the clipboard
            console.log(e.target.id + " was clicked");
            navigator.clipboard.writeText(e.target.innerHTML);
            document.getElementById("CopyAlert").style.display = 'inline';
            setTimeout(function(){
                document.getElementById("CopyAlert").style.display = 'none';
            }, 1500);
        }
        //checks to see if the remove button was clicked
        if(e.target && e.target.nodeName == "BUTTON"){
            var num = e.target.id.match(/\d+/g); //gets the number ID
            var item = document.getElementById(e.target.id); //gets the button
            var liHost = document.getElementById('listItem'+num); //gets the list element
            chrome.storage.sync.get({list:[]}, function(data){
                //removes the value from the chrome.storage array
                var array = data.list;
                var tempString = liHost.innerText;
                var index = array.indexOf(tempString);
                if (index > -1){
                    array.splice(index, 1);
                }
                chrome.storage.sync.set({list:array});
            });
            //remove the elements from the list
            document.getElementById('listItem'+num).removeChild(item);
            document.getElementById('list').removeChild(liHost);
        }
    });
});
//displays a list of the things in the array, need to make it so that the array is stored using the chrome.storage API
function makeList(){ 
    chrome.storage.sync.get({list:[]}, function(data){
        var tempList = data.list;
        for (let i = 0; i < tempList.length; i++) {
            listItem = document.createElement('li');
            listItem.appendChild(document.createTextNode(tempList[i]));
            listItem.setAttribute('id', 'listItem'+lastId);
            
            var removeBtn = document.createElement('button');
            removeBtn.append(document.createTextNode("R"));
            removeBtn.setAttribute('id', 'removeBtn'+lastId);
            listItem.appendChild(removeBtn);

            lastId +=1;
            document.getElementById('list').appendChild(listItem); 
        }
    });
}
function updateList(addValue){
    var listItem = document.createElement('li');
    listItem.innerHTML = addValue;
    document.getElementById('list').appendChild(listItem);
}
//similar to the function above but displays the list in the form of a table
function makeTable(){ 
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    
    for (let i = 0; i < tableData.length; i++) {
        var row = document.createElement('tr');
        row.appendChild(document.createTextNode(tableData[i]));
        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    document.body.appendChild(table);
}
//removes the text in the enter field so that the user can add more
function eraseText() {
    document.getElementById("saveLine").value = "";
}