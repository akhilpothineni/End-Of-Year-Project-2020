document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick(){
        navigator.clipboard.writeText("Bool House")        
    }
})
