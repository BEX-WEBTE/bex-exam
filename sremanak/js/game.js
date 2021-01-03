let gameEngine = new GameEngine();
let puzzle = new Puzzle();


async function loadImagesFromJson() {
    const response = await fetch('../js/images.json');
    return await response.json();
}

function setButtonTextAndSwitchRenderer(button, text, rendererState) {
    button.innerText = text;
    gameEngine.renderer = rendererState;
}

function preparePuzzleForGame() {
    puzzle.turnOnListeners();
    puzzle.turnOnDrag();
    puzzle.colorizeDifferent();
    puzzle.removeTargets();
}

function gameStarted(button) {
    setButtonTextAndSwitchRenderer(button, "Reset", true);
    preparePuzzleForGame();
    puzzle.randomize();
    puzzle.startAnimations(1);
    gameEngine.canvasLayer.batchDraw()
    requestAnimationFrame(render);
}


function gameDemoMode() {
    puzzle.colorizeDifferent();
    let difficulty = document.getElementById("difficulty");
    difficulty.disabled = false;
    puzzle.turnOfListeners();
    puzzle.removeTargets();
    puzzle.turnOffDrag();
}


function formattedTimeToSentence() {
    let time = gameEngine.secondsToTime(gameEngine.counter);
    let seconds = time.substr(3);
    let minutes = time.substr(0, 2);
    return Number(time[1]) !== 0 ? minutes + " minúty a " + seconds + " sekúnd." : seconds + " sekúnd.";
}


function createGameDoneText() {
    let contentText = "Super!\n\n Zvládol si to za " + formattedTimeToSentence();
    let difficulty = document.getElementById("difficulty").innerText;
    contentText += "\n\n" + "Obtiažnosť: " + difficulty;
    return contentText;
}


function setDefaultDifficulty(difficulty) {
    if (difficulty.value === "difficulty") {
        difficulty.value = "easy";
        difficulty.innerText = "Ľahká";
    }
}

function getToleranceFromDifficulty() {
    let difficulty = document.getElementById("difficulty").value;
    if (difficulty === "easy") {
        return 16;
    } else if (difficulty === "medium") {
        return 9;
    } else if (difficulty === "hard") {
        return 2;
    }
}

function isStartButtonClicked(button) {
    return button.value === "false"
}

function overturnButtonFromStartToResetAndViceVersa(button) {
    button.value = button.value !== "true";
}

function gameDone() {
    puzzle.colorize(gameEngine.canvasLayer);
    let windowDimension = new Dimension(400, 200);
    let gameDoneText = createGameDoneText();
    gameEngine.createModalWithText(windowDimension, gameDoneText);
    puzzle.turnOfListeners();
    puzzle.removeTargets();
    if (areSoundsOn())
        gameEngine.playDoneSound();
    let startButton = document.getElementById("start");
    setButtonTextAndSwitchRenderer(startButton, "Reset", false);
}


function resetGame(button) {
    setButtonTextAndSwitchRenderer(button, "Štart", false);
    puzzle.stopAnimations(1);
    puzzle.stopAnimations(0);
    puzzle.startAnimations(0);
    gameDemoMode();
    gameEngine.canvasLayer.batchDraw();
    gameEngine.setTimer(0);
}

function startGame(event) {
    document.getElementById("demo").disabled = false;
    gameEngine.killAnimation = true;
    gameEngine.canvasLayer.batchDraw()
    let difficulty = document.getElementById("difficulty");
    setDefaultDifficulty(difficulty);
    difficulty.disabled = true;
    gameEngine.setTimer(0);
    puzzle.stopAnimations(0);
    puzzle.stopAnimations(1);
    overturnButtonFromStartToResetAndViceVersa(event);

    if (isStartButtonClicked(event)) {
        gameStarted(event);
    } else {
        resetGame(event);
        difficulty.disabled = false;
    }
    gameEngine.removeModal();
}

async function demo() {
    let startButton = document.getElementById("start");
    startButton.value = "true";
    document.getElementById("demo").disabled = true;
    setButtonTextAndSwitchRenderer(startButton, "Štart", false);
    await puzzle.stopAnimations(1);
    await puzzle.stopAnimations(0);
    gameEngine.removeModal();
    gameDemoMode();
    gameEngine.setTimer(0);
    gameEngine.killAnimation = false;
    puzzle.createRandomAndOrderAssemblingAnimation();
    gameEngine.canvasLayer.batchDraw()
}

function difficulty(event) {
    let difficulty = document.getElementById("difficulty");
    difficulty.innerText = event.innerText;
    difficulty.value = event.value;
}

function areSoundsOn() {
    let sounds = document.getElementById("sounds");
    return sounds.value === "true";
}

function sounds(event) {
    if (areSoundsOn()) {
        event.innerText = "volume_off"
        event.value = false;
    } else {
        event.innerText = "volume_up"
        event.value = true;
    }
}

async function render() {

    let currentTime = (new Date()).getTime();

    if (currentTime - gameEngine.lastTime >= 1000) {
        gameEngine.lastTime = currentTime;
        gameEngine.counter++;
        gameEngine.setTimer(gameEngine.counter);
    }
    if (puzzle.areAllInTarget()) {
        gameDone();
    }
    if (gameEngine.renderer)

        requestAnimationFrame(render);

}

function scaleCanvas(scaledCanvas, scale) {
    gameEngine.canvas.width(scaledCanvas.width);
    gameEngine.canvas.height(scaledCanvas.height);
    gameEngine.canvas.scale({x: scale, y: scale});
    gameEngine.canvas.batchDraw();
}

function isCanvasScaleInDefaultRange(scaledCanvas) {
    return scaledCanvas.width > 1000 && scaledCanvas.height > 500;
}

function getWidthOfParentContainerById(id) {
    let container = document.getElementById(id);
    return container.offsetWidth;
}

function fitCanvasIntoParentContainer() {
    let containerWidth = getWidthOfParentContainerById("game-container");
    let scale = containerWidth / gameEngine.canvasSize.width;
    let scaledCanvas = new Dimension(gameEngine.canvasSize.width * scale, gameEngine.canvasSize.height * scale);

    if (isCanvasScaleInDefaultRange(scaledCanvas)) {
        scale = 1;
        scaledCanvas.dimension(1000, 500);
    }
    scaleCanvas(scaledCanvas, scale);
}

function onLoad() {
    gameEngine.createCanvasAndLayer();
    window.addEventListener('resize', fitCanvasIntoParentContainer);
    fitCanvasIntoParentContainer();
    loadImagesFromJson().then(json => {
        puzzle.createPiecesFromImagesAndDrawToCanvas(json.images);
    });

    handleAttendanceCookies()
}

