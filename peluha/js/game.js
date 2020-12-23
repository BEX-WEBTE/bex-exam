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
    draggedImage.style.cursor = "default";
    draggedImage.style.width = "100%";
    draggedImage.style.height = "100%";
}

function onLoad() {
    const pony09 = document.getElementById("pony09");


}


window.onload = onLoad;
