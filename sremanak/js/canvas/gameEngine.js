class GameEngine {
    constructor() {
        this.canvasSize = new Dimension(1000, 500);
        this.counter = 0;
        this.lastTime = (new Date()).getTime();
        this.killAnimation = true;
    }

    _killAnimation;
    get killAnimation() {
        return this._killAnimation;
    }

    set killAnimation(value) {
        this._killAnimation = value;
    }

    _canvas;

    get canvas() {
        return this._canvas;
    }

    set canvas(value) {
        this._canvas = value;
    }

    _canvasLayer;

    get canvasLayer() {
        return this._canvasLayer;
    }

    set canvasLayer(value) {
        this._canvasLayer = value;
    }

    _canvasSize

    get canvasSize() {
        return this._canvasSize;
    }

    set canvasSize(value) {
        this._canvasSize = value;
    }

    _puzzle;

    get puzzle() {
        return this._puzzle;
    }

    set puzzle(value) {
        this._puzzle = value;
    }

    _counter;

    get counter() {
        return this._counter;
    }

    set counter(value) {
        this._counter = value;
    }

    _lastTime;

    get lastTime() {
        return this._lastTime;
    }

    set lastTime(value) {
        this._lastTime = value;
    }

    _renderer;

    get renderer() {
        return this._renderer;
    }

    set renderer(value) {
        this._renderer = value;
    }

    createCanvas() {
        document.getElementById("game-canvas").style.backgroundColor = "#050505";
        return new Konva.Stage({
            container: 'game-canvas',
            width: this.canvasSize.width,
            height: this.canvasSize.height,
        });

    }

    createLayer() {
        return new Konva.Layer();
    }

    createCanvasAndLayer() {
        this.canvas = this.createCanvas();
        this.canvasLayer = this.createLayer()
    }

    addActorToCanvas(actor) {
        this.canvasLayer.add(actor);
        this.canvas.add(this.canvasLayer);
    }


    createImage(imagePiece) {
        const path = "../../app/assets/images/sremanak/";
        let htmlImage = document.createElement("img");
        htmlImage.setAttribute("id", imagePiece.id);
        htmlImage.setAttribute("src", path + imagePiece.name + imagePiece.format);
        htmlImage.setAttribute("alt", imagePiece.name + " htmlImageElement");
        htmlImage.classList.add("piece-image");
        return htmlImage;
    }

    imageStyle(piece) {
        let image = gameEngine.createImage(piece.imagePiece);
        return {image: image, shadowBlur: 10, shadowColor: "#FFC5C5"};

    }

    createImageActorFromPiece(piece) {
        let image = new Konva.Image(this.imageStyle(piece));
        let scaleWidth = piece.imagePiece.width * piece.width;
        let scaleHeight = piece.imagePiece.height * piece.height;
        image.x(piece.targetCoordinates.x);
        image.y(piece.targetCoordinates.y);
        image.width(scaleWidth);
        image.height(scaleHeight);
        return image;
    }

    modalTextStyle() {
        return {
            fontSize: 24,
            fontFamily: "Roboto",
            fontStyle: "bolder",
            fill: '#000000',
            padding: 40,
            align: 'center',
            id: "text",
        }

    }

    createText(contentText, dimension) {
        let text = new Konva.Text(this.modalTextStyle());
        text.x(this.canvasSize.width / 2 - dimension.width / 2);
        text.y(this.canvasSize.height / 2 - text.getHeight());
        text.width(dimension.width);
        text.text(contentText);
        return text;
    }

    modalStyle() {
        return {
            fill: 'rgb(255, 197, 197)',
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 15,
            opacity: 0.9,
            id: "modal",
            stroke: "black",
            strokeWidth: 5,
        }
    }

    createModal(dimension) {
        let modal = new Konva.Rect(this.modalStyle());
        modal.x(this.canvasSize.width / 2 - dimension.width / 2);
        modal.y(this.canvasSize.height / 2 - dimension.height / 2);
        modal.width(dimension.width);
        modal.height(dimension.height);
        return modal;
    }

    createWindow(windowDimension, contentText) {
        let text = this.createText(contentText, windowDimension);
        windowDimension.height = text.getHeight() + 40;
        let modal = this.createModal(windowDimension);
        this.addActorToCanvas(modal);
        this.addActorToCanvas(text);
        this.canvasLayer.batchDraw();
    }


    removeWindow() {
        let modal = this.canvas.find("#modal");
        let text = this.canvas.find("#text");
        modal.remove();
        text.remove();
    }

    randomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    secondsToTime(seconds) {
        const s = seconds % 60;
        seconds = (seconds - s) / 60;
        const m = seconds % 60;
        return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }

    setTimer(seconds) {
        let timer = document.getElementById("time");
        gameEngine.counter = seconds;
        timer.innerText = this.secondsToTime(this.counter);
    }

    actorInTargetPlace(actor) {
        actor.draggable(false);
        actor.off('mouseover');
        actor.shadowBlur(10);
        actor.shadowColor("green");
        actor.zIndex = 0;
    }

    pieceInTarget(piece, actor) {
        piece.inTarget = true;
        this.actorInTargetPlace(actor);
        this.playTickSound();
        document.body.style.cursor = 'default';
        this.canvasLayer.draw();
        actor.off('mouseout');
        actor.x(piece.targetCoordinates.x);
        actor.y(piece.targetCoordinates.y);

    }

    getToleranceFromDifficulty() {
        let difficulty = document.getElementById("difficulty").value;
        if (difficulty === "easy") {
            return 16;
        } else if (difficulty === "medium") {
            return 9;
        } else if (difficulty === "hard") {
            return 2;
        }
    }

    countCoordinatesForPointOfDirectionVector(directionVector, point) {
        const x = directionVector.x / point;
        const y = directionVector.y / point;
        return new Coordinates(x, y);
    }

    createMoveAnimation(piece, targetCoordinates, animation) {
        const actualCoordinates = new Coordinates(piece.actor.getX(), piece.actor.getY());
        const directionVector = piece.directionVector(targetCoordinates, actualCoordinates);
        const distance = piece.distance(directionVector);
        const exactPoint = 10.00;
        let velocity = 8.00;

        if (piece.areActualCoordinatesInRange(actualCoordinates, targetCoordinates, exactPoint)) {
            velocity = 1.00;
        }
        const point = distance / velocity;
        let countedCoordinates = this.countCoordinatesForPointOfDirectionVector(directionVector, point);

        if (piece.areActualCoordinatesInRange(actualCoordinates, targetCoordinates, 0)) {
            animation.stop();
            return;

        }
        piece.actor.move({x: (countedCoordinates.x), y: (countedCoordinates.y)});
    }

    playDoneSound() {
        let doneSound = document.getElementById("done");
        doneSound.play();
    }

    playTickSound() {
        let tickSound = document.getElementById("tick");
        tickSound.play();
    }


    gameDone() {
        gameEngine.puzzle.colorize(gameEngine.canvasLayer);
        let windowDimension = new Dimension(400, 200);
        let gameDoneText = createGameDoneText();
        gameEngine.createWindow(windowDimension, gameDoneText);
        gameEngine.puzzle.turnOfListeners();
        gameEngine.puzzle.removeTargets();
        this.playDoneSound();
        let startButton = document.getElementById("start");
        setButtonTextAndSwitchRenderer(startButton, "Reset", false);
    }
}

