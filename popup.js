//TODO:
//Make either the list have no bullets and clickable
//OR make the table clickable
//'click' action on either should copy to the clipboard
//Make it so that the button press takes the text in the input field and moves it into the array

const tableData = ['bool house', 'liggy', 'thoom', 'shim ravage'];

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('boolHouse').onclick = function () {
        chrome.storage.sync.get('myLine', function(data){
            navigator.clipboard.writeText(data.myLine);
            // alert(data.myLine);
        });
        //copies the value in the input field to the clipboard
    }
    document.getElementById('save').onclick = function () {
        var value = document.getElementById('saveLine').value;
        chrome.storage.sync.set({'myLine': value}, function(){
            // alert('Success');
        });
        // alert(value);
    }
})
//displays a list of the things in the array, need to make it so that the array is stored using the chrome.storage API
function makeList(){ 
    var listContainer = document.createElement('div');
    var listElement = document.createElement('ul');
    var listItem;

    document.getElementsByTagName('body')[0].appendChild(listContainer);
    listContainer.appendChild(listElement);

    for (let i = 0; i < tableData.length; i++) {
        listItem = document.createElement('li');
        listItem.innerHTML = tableData[i];
        listElement.appendChild(listItem);        
    }
}
makeList();
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

// makeTable();