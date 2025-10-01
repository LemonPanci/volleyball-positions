import { Player } from "./Player.js";

export class HorizontalConstraint {
    x1: number;
    x2: number;
    y: number;
    color: string;

    constructor(x1: number, x2: number, y: number, color: string) {
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
        // push()
        // stroke(this.color);
        // strokeWeight(5);
        // line(this.x1, this.y, this.x2, this.y);
        // pop();
    }

    setY(y: number) {
        this.y = y;
    }

    setToPlayer(player: Player) {
        this.setY(player.y);
    }
}