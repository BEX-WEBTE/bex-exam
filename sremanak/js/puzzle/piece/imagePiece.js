class ImagePiece {
    constructor(id, name, format) {
        this.id = id;
        this.name = name;
        this.format = format;
        this.scale = new Dimension(1, 1);
    }

    _scale;
    get scale() {
        return this._scale;
    }

    set scale(value) {
        this._scale = value;
    }

    get width() {
        return this._scale.width;
    }

    set width(value) {
        this._scale.width = value;
    }

    get height() {
        return this._scale.height;
    }

    set height(value) {
        this._scale.height = value;
    }

    _id;

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    _name;

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    _format;

    get format() {
        return this._format;
    }

    set format(value) {
        this._format = value;
    }
}
