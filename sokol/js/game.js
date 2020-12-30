let correct = [];

let minute = 0;
let second = 0;
let stopWatch;

$(function () {
    $("#game-drop-left-background").droppable({
        accept: "#game-image-left-background",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top',
            });
            correct["game-image-left-background"] = 1;
            endGame();
        }
    });

    $("#game-drop-banana").droppable({
        accept: "#game-image-banana",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-banana"] = 1;
            endGame();
        }
    });

    $("#game-drop-tomatos").droppable({
        accept: "#game-image-tomatos",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-tomatos"] = 1;
            endGame();
        }
    });

    $("#game-drop-main-background").droppable({
        accept: "#game-image-main-background",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-main-background"] = 1;
            endGame();
        }
    });

    $("#game-drop-blackberries").droppable({
        accept: "#game-image-blackberries",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-blackberries"] = 1;
            endGame();
        }
    });

    $("#game-drop-kiwi").droppable({
        accept: "#game-image-kiwi",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-kiwi"] = 1;
            endGame();
        }
    });

    $("#game-drop-table").droppable({
        accept: "#game-image-table",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-table"] = 1;
            endGame();
        }
    });

    $("#game-drop-cabbage").droppable({
        accept: "#game-image-cabbage",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-cabbage"] = 1;
            endGame();
        }
    });

    $("#game-drop-pepper").droppable({
        accept: "#game-image-pepper",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-pepper"] = 1;
            endGame();
        }
    });

    $("#game-drop-broccoli").droppable({
        accept: "#game-image-broccoli",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-broccoli"] = 1;
            endGame();
        }
    });

    $("#game-drop-right-background").droppable({
        accept: "#game-image-right-background",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["game-image-right-background"] = 1;
            endGame();
        }
    });


});

function check() {
    let full = true;
    if (correct["game-image-left-background"] === 0)
        full = false;
    if (correct["game-image-banana"] === 0)
        full = false;
    if (correct["game-image-tomatos"] === 0)
        full = false;
    if (correct["game-image-main-background"] === 0)
        full = false;
    if (correct["game-image-blackberries"] === 0)
        full = false;
    if (correct["game-image-kiwi"] === 0)
        full = false;
    if (correct["game-image-table"] === 0)
        full = false;
    if (correct["game-image-cabbage"] === 0)
        full = false;
    if (correct["game-image-pepper"] === 0)
        full = false;
    if (correct["game-image-broccoli"] === 0)
        full = false;
    if (correct["game-image-right-background"] === 0)
        full = false;
    return full;
}

function setWrongPosition() {
    let leftBackground = document.getElementById("game-image-left-background");
    leftBackground.style.top = 0 + "%";
    leftBackground.style.left = 200 + "%";

    let banana = document.getElementById("game-image-banana");
    banana.style.top = -10 + "%";
    banana.style.left = 150 + "%";

    let tomatos = document.getElementById("game-image-tomatos");
    tomatos.style.top = 360 + "%";
    tomatos.style.left = 100 + "%";

    let mainBackground = document.getElementById("game-image-main-background");
    mainBackground.style.top = 0 + "%";
    mainBackground.style.left = -30 + "%";

    let blackberries = document.getElementById("game-image-blackberries");
    blackberries.style.top = -37 + "%";
    blackberries.style.left = 200 + "%";

    let kiwi = document.getElementById("game-image-kiwi");
    kiwi.style.top = -300 + "%";
    kiwi.style.left = -200 + "%";

    let table = document.getElementById("game-image-table");
    table.style.top = 60 + "%";
    table.style.left = 100 + "%";

    let cabbage = document.getElementById("game-image-cabbage");
    cabbage.style.top = -200 + "%";
    cabbage.style.left = -150 + "%";

    let pepper = document.getElementById("game-image-pepper");
    pepper.style.top = -30 + "%";
    pepper.style.left = -300 + "%";

    let broccoli = document.getElementById("game-image-broccoli");
    broccoli.style.top = 100 + "%";
    broccoli.style.left = -250 + "%";

    let rightBackground = document.getElementById("game-image-right-background");
    rightBackground.style.top = 0 + "%";
    rightBackground.style.left = -200 + "%";
}


function startGame() {
    $("#game-image-left-background, #game-image-banana, #game-image-tomatos, #game-image-main-background, #game-image-blackberries, #game-image-kiwi, #game-image-table, #game-image-cabbage, #game-image-pepper, #game-image-broccoli, #game-image-right-background").draggable(
        {
            start: function () {
                correct[this.id] = 0;
            }
        }
    );
    turnOffTransitionOnImage()
    resetTime();
    allIncorrect();
    setWrongPosition();
    startTime();
    fromStartToReset();
}


function startTime() {
    clearInterval(stopWatch);
    stopWatch = setInterval(timer, 1000);
}

function timer() {
    second++;
    if (second === 60) {
        minute++;
        second = 0;
    }
    let formattedMM = minute.toString().padStart(2, "0");
    let formattedSS = second.toString().padStart(2, "0");
    console.log(minute);
    console.log(second);
    document.getElementById("time").innerHTML = formattedMM + ":" + formattedSS;
}

function stopTime() {
    clearInterval(stopWatch);
}

function resetTime() {
    minute = 0;
    second = 0;
    document.getElementById("time").innerHTML = "00:00";
}

function endGame() {
    if (check()) {
        stopTime();
        showEndGameModal();
        fromResetToStart();
        $("#game-image-left-background, #game-image-banana, #game-image-tomatos, #game-image-main-background, #game-image-blackberries, #game-image-kiwi, #game-image-table, #game-image-cabbage, #game-image-pepper, #game-image-broccoli, #game-image-right-background").draggable("destroy");
    }
}

function allIncorrect() {
    correct["game-image-left-background"] = 0;
    correct["game-image-banana"] = 0;
    correct["game-image-tomatos"] = 0;
    correct["game-image-main-background"] = 0;
    correct["game-image-blackberries"] = 0;
    correct["game-image-kiwi"] = 0;
    correct["game-image-table"] = 0;
    correct["game-image-cabbage"] = 0;
    correct["game-image-pepper"] = 0;
    correct["game-image-broccoli"] = 0;
    correct["game-image-right-background"] = 0;
}

function turnOnDemo() {
    turnOffTransitionOnImage();
    stopTime();
    resetTime();
    fromResetToStart();
    setWrongPosition();
    setTimeout(turnOnTransitionOnImage, 1000);


}

function turnOnTransitionOnImage() {
    turnOnOffTransitionOnImage(true, "game-image-left-background", 0);
    turnOnOffTransitionOnImage(true, "game-image-banana", 1);
    turnOnOffTransitionOnImage(true, "game-image-tomatos", 2);
    turnOnOffTransitionOnImage(true, "game-image-main-background", 3);
    turnOnOffTransitionOnImage(true, "game-image-blackberries", 4);
    turnOnOffTransitionOnImage(true, "game-image-kiwi", 5);
    turnOnOffTransitionOnImage(true, "game-image-table", 6);
    turnOnOffTransitionOnImage(true, "game-image-cabbage", 7);
    turnOnOffTransitionOnImage(true, "game-image-pepper", 8);
    turnOnOffTransitionOnImage(true, "game-image-broccoli", 9);
    turnOnOffTransitionOnImage(true, "game-image-right-background", 10);
}

function turnOffTransitionOnImage() {
    turnOnOffTransitionOnImage(false, "game-image-left-background", 0);
    turnOnOffTransitionOnImage(false, "game-image-banana", 1);
    turnOnOffTransitionOnImage(false, "game-image-tomatos", 2);
    turnOnOffTransitionOnImage(false, "game-image-main-background", 3);
    turnOnOffTransitionOnImage(false, "game-image-blackberries", 4);
    turnOnOffTransitionOnImage(false, "game-image-kiwi", 5);
    turnOnOffTransitionOnImage(false, "game-image-table", 6);
    turnOnOffTransitionOnImage(false, "game-image-cabbage", 7);
    turnOnOffTransitionOnImage(false, "game-image-pepper", 8);
    turnOnOffTransitionOnImage(false, "game-image-broccoli", 9);
    turnOnOffTransitionOnImage(false, "game-image-right-background", 10);

}

function turnOnOffTransitionOnImage(on, id, poradie) {
    let obr = document = document.getElementById(id);
    obr.style.top = 0 + "%";
    obr.style.left = 0 + "%";
    if (on) {
        obr.style.transition = "left 2s, top 2s";
        obr.style.transitionDelay = 2 * poradie + "s";
    } else {
        obr.style.transition = "";
        obr.style.transitionDelay = "";
    }
}


function showEndGameModal() {
    let timeInModal = document.getElementById("end-game-time");
    timeInModal.innerHTML = document.getElementById("time").innerHTML;

    let modal = document.getElementById("end-game-modal");
    modal.classList.remove("end-game-modal-hidden");
    modal.classList.add("end-game-modal");
}

function deleteEndGameModal() {
    let modal = document.getElementById("end-game-modal");
    modal.classList.remove("end-game-modal");
    modal.classList.add("end-game-modal-hidden");
}


function fromStartToReset() {
    let button = document.getElementById("start");
    button.innerHTML = "Reset";
}

function fromResetToStart() {
    let button = document.getElementById("start");
    button.innerHTML = "Štart";
}

handleAttendanceCookies();
