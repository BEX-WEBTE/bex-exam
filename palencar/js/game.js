let correct = [];
let sec = 0;
let min = 0;
let timerInterval;

function posCheck() {
    let full = true;
    if (correct["sky"] === 0) {
        full = false;
    }

    if (correct["bottom-left"] === 0) {
        full = false;
    }

    if (correct["mid-left"] === 0) {
        full = false;
    }

    if (correct["roof"] === 0) {
        full = false;
    }

    if (correct["under-roof"] === 0) {
        full = false;
    }

    if (correct["balcony"] === 0) {
        full = false;
    }

    if (correct["tower"] === 0) {
        full = false;
    }

    if (correct["dome"] === 0) {
        full = false;
    }

    return full;
}

$(function () {
    $("#sky-drop").droppable({
        accept: "#sky",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                at: 'left top',
                my: 'left top',
            });
            correct["sky"] = 1;
            endGame();
        }
    });

    $("#bottom-left-drop").droppable({
        accept: "#bottom-left",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                at: 'left top',
                my: 'left top'
            });
            correct["bottom-left"] = 1;
            endGame();
        }
    });

    $("#mid-left-drop").droppable({
        accept: "#mid-left",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                at: 'left top',
                my: 'left top'
            });
            correct["mid-left"] = 1;
            endGame();
        }
    });

    $("#roof-drop").droppable({
        accept: "#roof",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                at: 'left top',
                my: 'left top'
            });
            correct["roof"] = 1;
            endGame();
        }
    });

    $("#under-roof-drop").droppable({
        accept: "#under-roof",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                at: 'left top',
                my: 'left top'
            });
            correct["under-roof"] = 1;
            endGame();
        }
    });

    $("#balcony-drop").droppable({
        accept: "#balcony",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["balcony"] = 1;
            endGame();
        }
    });

    $("#tower-drop").droppable({
        accept: "#tower",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["tower"] = 1;
            endGame();
        }
    });

    $("#dome-drop").droppable({
        accept: "#dome",
        tolerance: "pointer",
        drop: function (event, ui) {
            ui.draggable.position({
                of: $(this),
                my: 'left top',
                at: 'left top'
            });
            correct["dome"] = 1;
            endGame();
        }
    });

});

function shuffleImages() {
    const sky = document.getElementById("sky");
    sky.style.top = 20 + "%";
    sky.style.left = 10 + "%";

    const bottomLeft = document.getElementById("bottom-left");
    bottomLeft.style.top = -30 + "%";
    bottomLeft.style.left = 80 + "%";

    const midLeft = document.getElementById("mid-left");
    midLeft.style.top = -10 + "%";
    midLeft.style.left = 80 + "%";

    const roof = document.getElementById("roof");
    roof.style.top = 30 + "%";
    roof.style.left = 40 + "%";

    const underRoof = document.getElementById("under-roof");
    underRoof.style.top = -10 + "%";
    underRoof.style.left = -20 + "%";

    const balcony = document.getElementById("balcony");
    balcony.style.top = -20 + "%";
    balcony.style.left = -10 + "%";

    const tower = document.getElementById("tower");
    tower.style.top = 0 + "%";
    tower.style.left = -100 + "%";

    const dome = document.getElementById("dome");
    dome.style.top = 0 + "%";
    dome.style.left = -120 + "%";

}


function gameStart() {
    $("#sky, #bottom-left, #mid-left, #roof, #under-roof, #balcony, #tower, #dome").draggable(
        {
            start: function () {
                correct[this.id] = 0;
            }
        }
    );
    imageTransitionOff()
    resetTime();
    posWrong();
    shuffleImages();
    timerStart();
    start2reset();
}


function timerStart() {
    clearInterval(timerInterval);
    timerInterval = setInterval(timer, 1000);
}

function timer() {
    sec++;
    if (sec === 60) {
        sec = 0;
        min++;
    }

    let formattedSS = sec.toString().padStart(2, "0");
    let formattedMM = min.toString().padStart(2, "0");


    document.getElementById("time").innerHTML = formattedMM + ":" + formattedSS;
}

function stopTime() {
    clearInterval(timerInterval);
}

function resetTime() {
    min = 0;
    sec = 0;
    document.getElementById("time").innerHTML = "00:00";
}

function endGame() {
    if (posCheck()) {
        stopTime();
        showModal();
        reset2start();
        $("#sky, #bottom-left, #mid-left, #roof, #under-roof, #balcony, #tower, #dome").draggable("destroy");
    }
}

function posWrong() {
    correct["sky"] = 0;
    correct["bottom-left"] = 0;
    correct["mid-left"] = 0;
    correct["roof"] = 0;
    correct["under-roof"] = 0;
    correct["balcony"] = 0;
    correct["tower"] = 0;
    correct["dome"] = 0;
}

function imageTransitionOn() {
    imageTransisionSwitch(true, "sky", 0);
    imageTransisionSwitch(true, "bottom-left", 1);
    imageTransisionSwitch(true, "mid-left", 2);
    imageTransisionSwitch(true, "roof", 3);
    imageTransisionSwitch(true, "under-roof", 4);
    imageTransisionSwitch(true, "balcony", 5);
    imageTransisionSwitch(true, "tower", 6);
    imageTransisionSwitch(true, "dome", 7);
}

function imageTransitionOff() {
    imageTransisionSwitch(false, "sky", 0);
    imageTransisionSwitch(false, "bottom-left", 1);
    imageTransisionSwitch(false, "mid-left", 2);
    imageTransisionSwitch(false, "roof", 3);
    imageTransisionSwitch(false, "under-roof", 4);
    imageTransisionSwitch(false, "balcony", 5);
    imageTransisionSwitch(false, "tower", 6);
    imageTransisionSwitch(false, "dome", 7);

}

function imageTransisionSwitch(turnedOn, id) {
    let img = document = document.getElementById(id);
    img.style.top = 0 + "%";
    img.style.left = 0 + "%";

    if (turnedOn) {
        img.style.transition = "all 2s";
        img.style.transitionDelay = 0.5;
    } else {
        img.style.transition = "";
        img.style.transitionDelay = "";
    }
}

function demo() {
    imageTransitionOff();
    stopTime();
    resetTime();
    reset2start();
    shuffleImages();
    setTimeout(imageTransitionOn, 1000);
}


function reset2start() {
    let button = document.getElementById("start");
    button.innerHTML = "Štart";
}

function start2reset() {
    let button = document.getElementById("start");
    button.innerHTML = "Reset";
}

function showModal() {
    let timeInModal = document.getElementById("modal-time");
    timeInModal.innerHTML = document.getElementById("time").innerHTML;

    let modal = document.getElementById("modal");
    modal.classList.remove("modal-hid");
    modal.classList.add("modal");
}

function removeModal() {
    let modal = document.getElementById("modal");
    modal.classList.remove("modal");
    modal.classList.add("modal-hid");
}

handleAttendanceCookies();
