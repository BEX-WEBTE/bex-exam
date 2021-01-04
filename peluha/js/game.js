let mouseX;
let mouseY;

if (window.Event) {
    document.captureEvents(Event.MOUSEMOVE);
}

function getCursorXY(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
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

    if (isDroppable(draggedImage, dropContainer))
        finishDrop(draggedImage, dropContainer);


    dropContainer.style.zIndex = "0";
}

function isDroppable(draggedImage, dropContainer) {
    const expectedContainerId = draggedImage.id + "-container";

    if (expectedContainerId !== dropContainer.id)
        return false;

    const bounds = dropContainer.getBoundingClientRect();
    const upBound = bounds.top;
    const downBound = bounds.bottom;
    const leftBound = bounds.left;
    const rightBound = bounds.right;

    if (mouseY < upBound || mouseY > downBound)
        return false;
    else if (mouseX < leftBound || mouseX > rightBound)
        return false;

    return true;
}

let numberOfDropped = 0;

function finishDrop(draggedImage, dropContainer) {
    dropContainer.appendChild(draggedImage);
    draggedImage.draggable = false;
    draggedImage.classList.remove("pony-grab-cursor");

    numberOfDropped++;

    if (numberOfDropped === 9)
        finishGame();
}

function finishGame() {
    stopStopWatch();

    const showTime = document.getElementById("show-time")
    showTime.innerText = "Čas: " + timeToString(elapsedTime);

    const modal = document.getElementById("win-modal");
    modal.style.display = "block";
}


function moveAllImagesOutside() {
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

function moveImageOutside(id) {
    const pony = document.getElementById(id);
    pony.draggable = true;
    pony.classList.add("pony-grab-cursor");


    let ponyOutsideContainer;

    if (id === "pony09" || id === "pony08")
        ponyOutsideContainer = document.getElementById(id + "-out-container");
    else if (id === "pony07" || id === "pony06" || id === "pony05" || id === "pony04"
        || id === "pony03" || id === "pony02" || id === "pony01")
        ponyOutsideContainer = document.getElementById("allPony-out-container");

    ponyOutsideContainer.appendChild(pony);


}


function moveAllImagesInside() {
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

function moveImageInside(id) {
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

function resetStopWatch() {
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


function initStartButton() {
    const startButton = document.getElementById("start");

    startButton.addEventListener("click", function () {
        if (isDemoRunning) {
            showDemoWarning();
            return;
        }

        startButton.innerText = "Reštart";
        moveAllImagesOutside();
        resetStopWatch();
        startStopWatch();
        numberOfDropped = 0;
    })
}

function stopStopWatch() {
    if (isDemoRunning) {
        showDemoWarning();
        return;
    }

    const startButton = document.getElementById("start");
    startButton.innerText = "Štart";

    clearInterval(timerInterval);
    moveAllImagesInside();
    numberOfDropped = 0;
}

function initModal() {
    const modal = document.getElementById("win-modal");
    const span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}


function initDemoButton() {
    const demoButton = document.getElementById("demo");

    demoButton.addEventListener("click", showDemo);
}

let isDemoRunning = false;

function showDemo() {
    if (isDemoRunning) {
        showDemoWarning();
        return;
    }

    resetStopWatch();

    const startButton = document.getElementById("start");
    startButton.innerText = "Štart";

    isDemoRunning = true;

    moveAllImagesOutside();
    setAllImagesDraggableFalse();
    animateAllImagesInside();
}

function showDemoWarning() {
    const waitHeader = document.getElementById("wait-for-demo");

    waitHeader.classList.add("top-modal");
    waitHeader.style.opacity = "1";
    setTimeout(function () {
        waitHeader.style.opacity = "0";
        waitHeader.classList.remove("top-modal");
    }, 2000)

}

function setAllImagesDraggableFalse() {
    document.getElementById("pony09").draggable = false;
    document.getElementById("pony09").classList.remove("pony-grab-cursor");
    document.getElementById("pony08").draggable = false;
    document.getElementById("pony08").classList.remove("pony-grab-cursor");
    document.getElementById("pony07").draggable = false;
    document.getElementById("pony07").classList.remove("pony-grab-cursor");
    document.getElementById("pony06").draggable = false;
    document.getElementById("pony06").classList.remove("pony-grab-cursor");
    document.getElementById("pony05").draggable = false;
    document.getElementById("pony05").classList.remove("pony-grab-cursor");
    document.getElementById("pony04").draggable = false;
    document.getElementById("pony04").classList.remove("pony-grab-cursor");
    document.getElementById("pony03").draggable = false;
    document.getElementById("pony03").classList.remove("pony-grab-cursor");
    document.getElementById("pony02").draggable = false;
    document.getElementById("pony02").classList.remove("pony-grab-cursor");
    document.getElementById("pony01").draggable = false;
    document.getElementById("pony01").classList.remove("pony-grab-cursor");
}

function animateAllImagesInside() {
    animateImageInside("pony09");

    setTimeout(function () {
        normalizeAfterAnimation("pony09");
        animateImageInside("pony08");
    }, 2000);
    setTimeout(function () {
        normalizeAfterAnimation("pony08");
        animateImageInside("pony07");
    }, 4000);
    setTimeout(function () {
        normalizeAfterAnimation("pony07");
        animateImageInside("pony06");
    }, 6000);
    setTimeout(function () {
        normalizeAfterAnimation("pony06");
        animateImageInside("pony05");
    }, 8000);
    setTimeout(function () {
        normalizeAfterAnimation("pony05");
        animateImageInside("pony04");
    }, 10000);
    setTimeout(function () {
        normalizeAfterAnimation("pony04");
        animateImageInside("pony03");
    }, 12000);
    setTimeout(function () {
        normalizeAfterAnimation("pony03");
        animateImageInside("pony02");
    }, 14000);
    setTimeout(function () {
        normalizeAfterAnimation("pony02");
        animateImageInside("pony01");
    }, 16000);
    setTimeout(function () {
        normalizeAfterAnimation("pony01");
        isDemoRunning = false;
    }, 18000);
}

function animateImageInside(id) {
    const pony = document.getElementById(id);
    pony.draggable = false;

    const ponySize = pony.getBoundingClientRect();
    pony.style.left = ponySize.left + window.scrollX + "px";
    pony.style.top = ponySize.top + window.scrollY + "px";
    pony.style.width = ponySize.width + "px";
    pony.style.height = ponySize.height + "px";

    document.getElementById("game-container-id").appendChild(pony);

    pony.classList.add("pony-transition");

    const ponyContainer = document.getElementById(id + "-container");
    const ponyContainerSize = ponyContainer.getBoundingClientRect();

    pony.style.left = ponyContainerSize.left + window.scrollX + "px";
    pony.style.top = ponyContainerSize.top + window.scrollY + "px";

}

function normalizeAfterAnimation(id) {
    const pony = document.getElementById(id);
    const ponyContainer = document.getElementById(id + "-container");
    ponyContainer.appendChild(pony);
    pony.classList.remove("pony-transition");
}


function onLoad() {

    initStartButton();
    initModal();
    initDemoButton();

    handleAttendanceCookies();
}


window.onload = onLoad;



