class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    _x;

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    _y;

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    coordinates(x, y) {
        this.x = x;
        this.Y = y;
    }

    areSame(compareCoordinates) {
        return (this.x === compareCoordinates.x) && (this.y === compareCoordinates.y);
    }
}
