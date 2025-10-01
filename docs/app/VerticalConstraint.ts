import { Player } from "./Player.js";

export class VerticalConstraint {
    x: number;
    y1: number;
    y2: number;
    color: string;

    constructor(x: number, y1: number, y2: number, color: string) {
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
        // push()
        // stroke(this.color);
        // strokeWeight(5);
        // line(this.x, this.y1, this.x, this.y2);
        // pop();
    }

    setX(x: number) {
        this.x = x;
    }

    setToPlayer(player: Player) {
        this.setX(player.x);
    }
}