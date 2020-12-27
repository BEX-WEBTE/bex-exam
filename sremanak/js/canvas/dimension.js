class Dimension {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    _width;

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    _height;

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    dimension(width, height) {
        this.height = height;
        this.width = width;
    }
}
