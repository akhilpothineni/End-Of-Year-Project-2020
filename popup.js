//ITEMS THAT RUN ONCE
// const tableData = ['bool house', 'liggy', 'thoom', 'shim ravage'];

makeList();
var lastId = 0;

//Button Click Checking
document.addEventListener('DOMContentLoaded', function(){
    // document.getElementById('boolHouse').onclick = function () {
    //     chrome.storage.sync.get('myLine', function(data){
    //         navigator.clipboard.writeText(data.myLine);
    //         // alert(data.myLine);
    //     });
    //     //copies the value in the input field to the clipboard
    // }
    document.getElementById('save').onclick = function () {
        var value = document.getElementById('saveLine').value;
        if(value !== ""){   
            chrome.storage.sync.get({list:['bool house', 'liggy', 'thoom', 'shim ravage', 
            'yeah unfortunately android studio was very hard to learn, and so I could only produce a hello world main page']}, function(data){
                var array = data.list;
                array.push(value);
                chrome.storage.sync.set({list:array}, function(){
                    console.log("added to list");
                });
                eraseText();
                updateList(value);
            });
        }
    }
    document.getElementById("list").addEventListener("click", function(e){
        if(e.target && e.target.nodeName == "LI"){
            console.log(e.target.id + "was clicked");
            navigator.clipboard.writeText(e.target.innerHTML);
            document.getElementById("CopyAlert").style.display = 'inline';
            setTimeout(function(){
                document.getElementById("CopyAlert").style.display = 'none';
            }, 1500);
        }
    })
})
//displays a list of the things in the array, need to make it so that the array is stored using the chrome.storage API
function makeList(){ 
    chrome.storage.sync.get({list:['bool house', 'liggy', 'thoom', 'shim ravage',
    'yeah unfortunately android studio was very hard to learn, and so I could only produce a hello world main page']}, function(data){
        var tempList = data.list;
        for (let i = 0; i < tempList.length; i++) {
            listItem = document.createElement('li');
            listItem.appendChild(document.createTextNode(tempList[i]));
            listItem.setAttribute('id', 'listItem'+lastId);
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
function eraseText() {
    document.getElementById("saveLine").value = "";
}