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

    createModalWithText(windowDimension, contentText) {
        let text = this.createText(contentText, windowDimension);
        windowDimension.height = text.getHeight() + 40;
        let modal = this.createModal(windowDimension);
        this.addActorToCanvas(modal);
        this.addActorToCanvas(text);
        this.canvasLayer.batchDraw();
    }


    removeModal() {
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

    playDoneSound() {
        let doneSound = document.getElementById("done");
        doneSound.play();
    }

    playTickSound() {
        let tickSound = document.getElementById("tick");
        tickSound.play();
    }

}

