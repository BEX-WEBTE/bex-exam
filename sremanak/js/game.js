let gameEngine = new GameEngine();
let puzzle = new Puzzle();


function loadImagesFromJson() {
    fetch('../js/images.json')
        .then(response => response.json())
        .then(json => {
            puzzle.createPiecesFromImagesAndDrawToCanvas(json.images);
        });
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

function onLoad() {
    gameEngine.createCanvasAndLayer();
    window.addEventListener('resize', () => {
        let containerWidth = gameEngine.getWidthOfParentContainerById("game-container");
        gameEngine.fitCanvasIntoParentContainer(containerWidth);
    });
    gameEngine.fitCanvasIntoParentContainer();
    loadImagesFromJson();
}

