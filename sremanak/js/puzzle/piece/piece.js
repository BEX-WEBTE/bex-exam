class Piece {
    constructor(id, targetCoordinates, imagePiece) {
        this.id = id;
        this.targetCoordinates = targetCoordinates;
        this.imagePiece = imagePiece;
        this.dimension = new Dimension(0, 0);
        this.animations = [];
        this.inTarget = false;
    }

    _id;

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    _inTarget;

    get inTarget() {
        return this._inTarget;
    }

    set inTarget(value) {
        this._inTarget = value;
    }

    _animations
    get animations() {
        return this._animations;
    }

    set animations(value) {
        this._animations = value;
    }

    _actor;

    get actor() {
        return this._actor;
    }

    set actor(value) {
        this._actor = value;
    }

    _targetCoordinates;

    get targetCoordinates() {
        return this._targetCoordinates;
    }

    set targetCoordinates(value) {
        this._targetCoordinates = value;
    }

    _imagePiece;

    get imagePiece() {
        return this._imagePiece;
    }

    set imagePiece(value) {
        this._imagePiece = value;
    }

    _dimension

    get dimension() {
        return this._dimension;
    }

    set dimension(value) {
        this._dimension = value;
    }

    get width() {
        return this._dimension.width;
    }

    set width(value) {
        this._dimension.width = value;
    }

    get height() {
        return this._dimension.height;
    }

    set height(value) {
        this._dimension.height = value;
    }

    startAnimation(id) {
        this.animations[id].start();
    }

    stopAnimation(id) {
        this.animations[id].stop();
    }

    areActualCoordinatesInRange(actualCoordinates, targetCoordinates, tolerance) {
        return Math.round(actualCoordinates.x) >= targetCoordinates.x - tolerance && Math.round(actualCoordinates.x) <= targetCoordinates.x + tolerance &&
            Math.round(actualCoordinates.y) >= targetCoordinates.y - tolerance && Math.round(actualCoordinates.y) <= targetCoordinates.y + tolerance;
    }


    directionVector(targetCoordinates, actualCoordinates) {

        return new Coordinates(targetCoordinates.x - actualCoordinates.x, targetCoordinates.y - actualCoordinates.y);
    }


    distance(directionVector) {
        return Math.sqrt((directionVector.x * directionVector.x) + (directionVector.y * directionVector.y));
    }

    createImage() {
        const path = "../../app/assets/images/sremanak/";
        let htmlImage = document.createElement("img");
        htmlImage.setAttribute("id", this.imagePiece.id);
        htmlImage.setAttribute("src", path + this.imagePiece.name + this.imagePiece.format);
        htmlImage.setAttribute("alt", this.imagePiece.name + " htmlImageElement");
        htmlImage.classList.add("piece-image");
        return htmlImage;
    }

}
