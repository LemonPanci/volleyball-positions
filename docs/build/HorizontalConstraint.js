export class HorizontalConstraint {
    constructor(x1, x2, y, color) {
        let validatedColor = color;
        if (typeof color === 'undefined') {
            validatedColor = 'black';
        }
        else if (typeof color !== 'string') {
            throw Error('If a color is passed it must be a string.');
        }
        this.x1 = x1;
        this.x2 = x2;
        this.y = y;
        this.color = validatedColor;
    }
    display() {
    }
    setY(y) {
        this.y = y;
    }
    setToPlayer(player) {
        this.setY(player.y);
    }
}
