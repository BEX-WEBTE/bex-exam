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


    createPiece(id, imageJson) {
        let imagePiece = new ImagePiece(id, imageJson.name, imageJson.format);
        let scaleWidth = imageJson.scale.width;
        let scaleHeight = imageJson.scale.height;
        imagePiece.scale = new Dimension(scaleWidth, scaleHeight);
        let targetCoordinates = imageJson.targetCoordinates;
        return new Piece(id, new Coordinates(targetCoordinates.x, targetCoordinates.y), imagePiece);
    }

    imageStyle(piece) {
        let image = piece.createImage();
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

    createImageActorAndSetProperties(piece) {
        let actor = this.createImageActorFromPiece(piece);
        actor.perfectDrawEnabled();
        piece.actor = actor;
        this.createAssemblingAnimation(piece);
        this.createRandomAnimation(piece);
        gameEngine.addActorToCanvas(actor);
    }

    drawPieceToCanvas(piece) {
        let image = piece.createImage();
        image.onload = function () {
            piece.dimension = new Dimension(image.width, image.height);
            puzzle.createImageActorAndSetProperties(piece);
        }

    }

    createPiecesFromImagesAndDrawToCanvas(images) {
        images.forEach((searchedImage, id) => {
            let piece = this.createPiece(id, searchedImage);
            this.append(piece);
            this.drawPieceToCanvas(piece);
        });
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

    createAssemblingAnimation(piece) {
        piece.animations.push(new Konva.Animation(function () {
            puzzle.createMoveAnimation(piece, piece.targetCoordinates, piece.animations[0]);
        }, gameEngine.canvasLayer));
    }

    createRandomAnimation(piece) {
        let rangeMax = new Coordinates(500, 1000);
        let scaledWidth = piece.width * piece.imagePiece.width;
        let scaledHeight = piece.height * piece.imagePiece.height;
        let targetCoordinates = new Coordinates(gameEngine.randomInteger(0, Math.round(rangeMax.x + scaledWidth)),
            gameEngine.randomInteger(0, Math.round(scaledHeight)));
        piece.animations.push(new Konva.Animation(function () {
            puzzle.createMoveAnimation(piece, targetCoordinates, piece.animations[1]);
        }, gameEngine.canvasLayer));
    }

    randomize() {
        this.pieces.forEach((piece) => {
            piece.animations.splice(1, 1);
            this.createRandomAnimation(piece);
        });
    }


    orderAssemblingAnimation(id) {
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
            this.orderAssemblingAnimation(id + 1);
        } else
            requestAnimationFrame(function () {
                puzzle.nextAnimation(piece, id);
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
            this.orderAssemblingAnimation(0);
        } else
            requestAnimationFrame(function () {
                puzzle.animation(pieces);
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
            canvasLayer.batchDraw();
        });
    }

    colorizeDifferent() {
        const colors = ["#12d1df", "white", "#9FE2BF", "red", "white", "#12d1df", "red", "#eb6510"];
        this.pieces.forEach((piece) => {
            piece.actor.shadowBlur(10);
            piece.actor.shadowColor(colors[piece.id]);
            gameEngine.canvasLayer.batchDraw()
        });
    }

    turnOfListeners() {
        this.pieces.forEach((piece) => {
            piece.actor.off('mouseover');
            piece.actor.off('mouseleave');
            piece.actor.off('dragend');
        });
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
        if (areSoundsOn())
            gameEngine.playTickSound();
        document.body.style.cursor = 'default';
        gameEngine.canvasLayer.batchDraw()
        actor.off('mouseout');
        actor.x(piece.targetCoordinates.x);
        actor.y(piece.targetCoordinates.y);

    }

    onHoverActor(actor) {
        actor.shadowBlur(10);
        actor.shadowColor("#EFF210");
        gameEngine.canvasLayer.batchDraw()
        document.body.style.cursor = 'pointer';
    }

    onLeaveActor(actor) {
        const colors = ["#12d1df", "white", "#9FE2BF", "red", "white", "#12d1df", "red", "#eb6510"];
        actor.shadowColor(colors[actor.attrs.image.id]);
        document.body.style.cursor = 'default';
        gameEngine.canvasLayer.batchDraw();
    }

    onDropActor(actor, piece) {
        let cords = new Coordinates(actor.getX(), actor.getY());
        let tolerance = getToleranceFromDifficulty();
        let isTarget = piece.areActualCoordinatesInRange(cords, piece.targetCoordinates, tolerance);
        if (isTarget) {
            puzzle.pieceInTarget(piece, actor);
            actor.setZIndex(0);
        }
    }

    turnOnListeners() {
        this.pieces.forEach((piece) => {
            piece.actor.on('mouseover', function () {
                puzzle.onHoverActor(piece.actor);
            });
            piece.actor.on('mouseleave', function () {
                puzzle.onLeaveActor(piece.actor);
            })

            piece.actor.on('dragend', function () {
                puzzle.onDropActor(piece.actor, piece);
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


}
