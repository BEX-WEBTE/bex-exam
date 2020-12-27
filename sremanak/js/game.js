let gameEngine = new GameEngine();

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

function createImageActorAndSetProperties(piece) {
    let actor = gameEngine.createImageActorFromPiece(piece);
    actor.perfectDrawEnabled();
    piece.actor = actor;
    piece.actor.on('dragmove', function onDraggingActor() {

        }
    );
    gameEngine.puzzle.createAssemblingAnimation(piece);
    gameEngine.puzzle.createRandomAnimation(piece);
    gameEngine.addActorToCanvas(actor);
}

function drawPieceToCanvas(piece) {
    let image = gameEngine.createImage(piece.imagePiece);
    image.onload = function () {
        piece.dimension = new Dimension(image.width, image.height);
        createImageActorAndSetProperties(piece);
    }

}

function createPiecesFromImagesAndDrawToCanvas(images) {
    images.forEach((searchedImage, id) => {
        let piece = gameEngine.puzzle.createPiece(id, searchedImage);
        gameEngine.puzzle.append(piece);
        drawPieceToCanvas(piece);
    });
}

function loadImagesFromJson() {
    fetch('../js/images.json')
        .then(response => response.json())
        .then(json => {
            createPiecesFromImagesAndDrawToCanvas(json.images);
        });
}

function setButtonTextAndSwitchRenderer(button, text, rendererState) {
    button.innerText = text;
    gameEngine.renderer = rendererState;
}

function preparePuzzleForGame() {
    gameEngine.puzzle.turnOnListeners();
    gameEngine.puzzle.turnOnDrag();
    gameEngine.puzzle.colorizeDifferent();
    gameEngine.puzzle.removeTargets();
}

function gameStarted(button) {
    setButtonTextAndSwitchRenderer(button, "Reset", true);
    preparePuzzleForGame();
    gameEngine.puzzle.randomize();
    gameEngine.puzzle.startAnimations(1);
    gameEngine.canvasLayer.batchDraw()

    requestAnimationFrame(render);
}


function gameDemoMode() {
    gameEngine.puzzle.colorizeDifferent();
    let difficulty = document.getElementById("difficulty");
    difficulty.disabled = false;
    gameEngine.puzzle.turnOfListeners();
    gameEngine.puzzle.removeTargets();
    gameEngine.puzzle.turnOffDrag();
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

function isStartButtonClicked(button) {
    return button.value === "false"
}

function overturnButtonFromStartToResetAndViceVersa(button) {
    button.value = button.value !== "true";
}

function gameReset(button) {
    setButtonTextAndSwitchRenderer(button, "Štart", false);
    gameEngine.puzzle.stopAnimations(1);
    gameEngine.puzzle.stopAnimations(0);
    gameEngine.puzzle.startAnimations(0);
    gameDemoMode();
    gameEngine.canvasLayer.batchDraw()
    gameEngine.setTimer(0);
}

function startGame(event) {
    document.getElementById("demo").disabled = false;
    gameEngine.killAnimation = true;
    gameEngine.canvas.batchDraw()
    let difficulty = document.getElementById("difficulty");
    setDefaultDifficulty(difficulty);
    difficulty.disabled = true;
    gameEngine.setTimer(0);
    gameEngine.puzzle.stopAnimations(0);
    gameEngine.puzzle.stopAnimations(1);
    overturnButtonFromStartToResetAndViceVersa(event);

    if (isStartButtonClicked(event)) {
        gameStarted(event);
    } else {
        gameReset(event);
        difficulty.disabled = false;
    }
    gameEngine.removeWindow();
}

async function demo() {
    let startButton = document.getElementById("start");
    startButton.value = "true";
    document.getElementById("demo").disabled = true;
    setButtonTextAndSwitchRenderer(startButton, "Štart", false);
    await gameEngine.puzzle.stopAnimations(1);
    await gameEngine.puzzle.stopAnimations(0);
    gameEngine.removeWindow();
    gameDemoMode();
    gameEngine.setTimer(0);
    gameEngine.killAnimation = false;
    gameEngine.puzzle.createRandomAndOrderAssemblingAnimation();
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
    if (gameEngine.puzzle.areAllInTarget()) {
        gameEngine.gameDone();
    }
    if (gameEngine.renderer)

        requestAnimationFrame(render);

}

function onLoad() {
    gameEngine.puzzle = new Puzzle();
    gameEngine.createCanvasAndLayer();
    window.addEventListener('resize', fitCanvasIntoParentContainer);
    fitCanvasIntoParentContainer();
    loadImagesFromJson();
}

