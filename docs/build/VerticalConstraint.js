export class VerticalConstraint {
    constructor(x, y1, y2, color) {
        let validatedColor = color;
        if (typeof color === 'undefined') {
            validatedColor = 'black';
        }
        else if (typeof color !== 'string') {
            throw Error('If a color is passed it must be a string.');
        }
        this.x = x;
        this.y1 = y1;
        this.y2 = y2;
        this.color = validatedColor;
    }
    display() {
    }
    setX(x) {
        this.x = x;
    }
    setToPlayer(player) {
        this.setX(player.x);
    }
}
