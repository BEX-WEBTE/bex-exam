class Puzzle {
    constructor() {
        this._pieces = [];
    }

    _pieces;

    get pieces() {
        return this._pieces;
    }

    set pieces(value) {
        this._pieces = value;
    }


    append(piece) {
        this._pieces.push(piece);
    }


    createRandomAnimation(piece) {
        let rangeMax = new Coordinates(500, 1000);
        let scaledWidth = piece.width * piece.imagePiece.width;
        let scaledHeight = piece.height * piece.imagePiece.height;
        let targetCoordinates = new Coordinates(gameEngine.randomInteger(0, Math.round(rangeMax.x + scaledWidth)),
            gameEngine.randomInteger(0, Math.round(scaledHeight)));
        piece.animations.push(new Konva.Animation(function () {
            gameEngine.createMoveAnimation(piece, targetCoordinates, piece.animations[1]);
        }, gameEngine.canvasLayer));
    }

    randomize() {
        this.pieces.forEach((piece) => {
            piece.animations.splice(1, 1);
            this.createRandomAnimation(piece);
        });
    }

    createAssemblingAnimation(piece) {

        piece.animations.push(new Konva.Animation(function () {
            gameEngine.createMoveAnimation(piece, piece.targetCoordinates, piece.animations[0]);
        }, gameEngine.canvasLayer));


    }


    createOrderAssemblingAnimation(id) {
        const order = [6, 2, 4, 7, 3, 5, 1, 0];
        let index = order[id];
        if (id > 7) {
            document.getElementById("demo").disabled = false;
            return;
        }


        let piece = this.pieces[index];
        piece.startAnimation(0);
        this.nextAnimation(piece, id);
    }

    nextAnimation(piece, id) {
        if (gameEngine.killAnimation) {
            return;
        }
        if (!piece.animations[0].isRunning()) {
            this.createOrderAssemblingAnimation(id + 1);
        } else
            requestAnimationFrame(function () {
                gameEngine.puzzle.nextAnimation(piece, id);
            });
    }

    createRandomAndOrderAssemblingAnimation() {
        this.randomize();
        this.startAnimations(1);
        let pieces = this.pieces;
        this.animation(pieces);
    }

    areAllAnimationsStop(pieces, animationId) {
        let flag = true;
        pieces.forEach((piece) => {
                if (piece.animations[animationId].isRunning())
                    flag = false;
            }
        );
        return flag;
    }

    animation(pieces) {
        if (gameEngine.killAnimation) {
            return;
        }
        if (this.areAllAnimationsStop(pieces, 1)) {
            this.stopAnimations(1);
            this.stopAnimations(0);
            this.createOrderAssemblingAnimation(0);
        } else
            requestAnimationFrame(function () {
                gameEngine.puzzle.animation(pieces);
            });
    }

    startAnimations(id) {
        this.pieces.forEach((piece) => {
            piece.startAnimation(id);
        });
    }

    stopAnimations(id) {
        this.pieces.forEach((piece) => {
            piece.stopAnimation(id);
        });
    }

    areAllInTarget() {
        let allInTarget = true;
        this.pieces.forEach((piece) => {
            if (!piece.inTarget) {
                allInTarget = false;
            }
        });
        return allInTarget;
    }

    removeTargets() {
        this.pieces.forEach((piece) => {
            piece.inTarget = false;
        });
    }

    colorize(canvasLayer) {
        this.pieces.forEach((piece) => {
            piece.actor.shadowBlur(10);
            piece.actor.shadowColor("#FFC5C5");
            canvasLayer.draw();
        });
    }

    colorizeDifferent() {
        const colors = ["#12d1df", "white", "#9FE2BF", "red", "white", "#12d1df", "red", "#eb6510"];
        this.pieces.forEach((piece) => {
            piece.actor.shadowBlur(10);
            piece.actor.shadowColor(colors[piece.id]);
            gameEngine.canvasLayer.draw();
        });
    }

    turnOfListeners() {
        this.pieces.forEach((piece) => {
            piece.actor.off('mouseover');
            piece.actor.off('mouseleave');
            piece.actor.off('dragend');
        });
    }

    turnOnListeners() {
        this.pieces.forEach((piece) => {
            piece.actor.on('mouseover', function onHoverActor() {
                this.shadowBlur(10);
                this.shadowColor("#EFF210");
                gameEngine.canvasLayer.batchDraw()
                document.body.style.cursor = 'pointer';
            });
            piece.actor.on('mouseleave', function onDropActor() {
                const colors = ["#12d1df", "white", "#9FE2BF", "red", "white", "#12d1df", "red", "#eb6510"];
                this.shadowColor(colors[this.attrs.image.id]);
                document.body.style.cursor = 'default';
                gameEngine.canvasLayer.batchDraw();
            })

            piece.actor.on('dragend', function onDropActor() {


                let cords = new Coordinates(this.getX(), this.getY());
                let tolerance = gameEngine.getToleranceFromDifficulty();
                let isTarget = piece.areActualCoordinatesInRange(cords, piece.targetCoordinates, tolerance);
                if (isTarget) {
                    gameEngine.pieceInTarget(piece, this);
                    this.setZIndex(0);
                }
            });
        });
    }

    turnOnDrag() {
        this.pieces.forEach((piece) => {
            piece.actor.draggable(true);
        });
    }

    turnOffDrag() {
        this.pieces.forEach((piece) => {
            piece.actor.draggable(false);
        });
    }

    createPiece(id, imageJson) {
        let imagePiece = new ImagePiece(id, imageJson.name, imageJson.format);
        let scaleWidth = imageJson.scale.width;
        let scaleHeight = imageJson.scale.height;
        imagePiece.scale = new Dimension(scaleWidth, scaleHeight);
        let targetCoordinates = imageJson.targetCoordinates;
        return new Piece(id, new Coordinates(targetCoordinates.x, targetCoordinates.y), imagePiece);
    }
}
