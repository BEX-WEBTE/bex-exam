let mouseX;
let mouseY;

if (window.Event) {
    document.captureEvents(Event.MOUSEMOVE);
}

function getCursorXY(e) {
    mouseX = e.clientX;
    mouseY  = e.clientY;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {

    const draggedImage = ev.target;
    const imageXCenter = draggedImage.width / 1.25;
    const imageYCenter = draggedImage.height / 1.25;

    ev.dataTransfer.effectAllowed = 'move';

    ev.dataTransfer.setDragImage(draggedImage, imageXCenter, imageYCenter);
    ev.dataTransfer.setData("text", draggedImage.id);

    const dropContainerId = draggedImage.id + "-container";
    document.getElementById(dropContainerId).style.zIndex = "1";
}

function drop(ev) {
    ev.preventDefault();
    const draggedImage = document.getElementById(ev.dataTransfer.getData("text"));
    const dropContainer = ev.target;

    getCursorXY(ev);

    if(isDroppable(draggedImage, dropContainer))
        finishDrop(draggedImage, dropContainer);


    dropContainer.style.zIndex = "0";
}

function isDroppable(draggedImage, dropContainer){
    const expectedContainerId = draggedImage.id + "-container";

    if(expectedContainerId !== dropContainer.id)
        return false;

    const bounds = dropContainer.getBoundingClientRect();
    const upBound = bounds.top + bounds.height/3;
    const downBound = bounds.bottom - bounds.height/3;
    const leftBound = bounds.left + bounds.width/3;
    const rightBound = bounds.right - bounds.width/3;

    console.log("up: " + upBound);
    console.log("down: " + downBound);
    console.log("left: " + leftBound);
    console.log("right: " + rightBound);
    console.log("mouseX: " + mouseX);
    console.log("mouseY: " + mouseY);

    if(mouseY < upBound || mouseY > downBound)
        return false;
    else if(mouseX < leftBound || mouseX > rightBound)
        return false;

    return true;
}

function finishDrop(draggedImage, dropContainer){
    dropContainer.appendChild(draggedImage);
    draggedImage.draggable = false;
    draggedImage.classList.remove("pony-grab-cursor");
    draggedImage.style.width = "100%";
    draggedImage.style.height = "100%";
}

function moveAllImagesOutside(){
    moveImageOutside("pony01");
    moveImageOutside("pony02");
    moveImageOutside("pony03");
    moveImageOutside("pony04");
    moveImageOutside("pony05");
    moveImageOutside("pony06");
    moveImageOutside("pony07");
    moveImageOutside("pony08");
    moveImageOutside("pony09");
}

function moveImageOutside(id){
    const pony = document.getElementById(id);
    pony.draggable = true;
    pony.classList.add("pony-grab-cursor");


    let ponyOutsideContainer;

     if(id === "pony09" || id === "pony08")
         ponyOutsideContainer = document.getElementById(id + "-out-container");
     else if(id === "pony07" || id === "pony06" || id === "pony05" || id === "pony04"
         || id === "pony03" || id === "pony02" || id === "pony01")
         ponyOutsideContainer = document.getElementById("allPony-out-container");

     ponyOutsideContainer.appendChild(pony);


}


function moveAllImagesInside(){
    moveImageInside("pony01");
    moveImageInside("pony02");
    moveImageInside("pony03");
    moveImageInside("pony04");
    moveImageInside("pony05");
    moveImageInside("pony06");
    moveImageInside("pony07");
    moveImageInside("pony08");
    moveImageInside("pony09");
}

function moveImageInside(id){
    const pony = document.getElementById(id);
    pony.draggable = false;
    pony.classList.remove("pony-grab-cursor");


    let ponyOutsideContainer = document.getElementById(id + "-container");
    ponyOutsideContainer.appendChild(pony);
}



let startTime;
let elapsedTime = 0;
let timerInterval;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function resetStopWatch(){
    clearInterval(timerInterval);
    document.getElementById("time").innerHTML = "00:00:00";
    elapsedTime = 0;
}

function startStopWatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("time").innerHTML = timeToString(elapsedTime);
    }, 10);

}


function initStartButton(){
    const startButton = document.getElementById("start");

    startButton.addEventListener("click", function (){
        startButton.innerText = "Reštart";
        moveAllImagesOutside();
        resetStopWatch();
        startStopWatch();
    })
}

function initStopButton(){
    const stopButton = document.getElementById("stop");

    stopButton.addEventListener("click", function (){
        const startButton = document.getElementById("start");
        startButton.innerText = "Štart";

        clearInterval(timerInterval);

        moveAllImagesInside();
    })
}


function onLoad() {
    initStartButton();
    initStopButton();
}


window.onload = onLoad;
