class VerticalConstraint {
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
        push()
        stroke(this.color);
        strokeWeight(5);
        line(this.x, this.y1, this.x, this.y2);
        pop();
    }

    setX(x) {
        this.x = x;
    }
}