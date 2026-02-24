let interviewList = [];
let rejectedList = [];

let total = document.getElementById("total");
let intCount = document.getElementById("int-count");
let rejCount = document.getElementById("rej-count");



function calculateCount(){
    total.innerText = cardContainer.children.length;
    intCount.innerText = interviewList.length;
    rejCount.innerText = rejectedList.length;
}

calculateCount();

