export class Player {
    x: number;
    y: number;
    role: string;
    size: number;
    textSize: number;
    color: string;
    constraintHighlight: boolean;
    selectedHighlight: boolean;
    startingPosition: number;
    startingPositionFlag: boolean;

    constructor(x: number, y: number, size: number, role: string, startingPosition: number) {
        this.x = x;
        this.y = y;
        this.role = role;
        this.size = size;
        this.textSize = size * 2 / 5;
        this.color = "white";
        this.constraintHighlight = false;
        this.selectedHighlight = false;
        this.startingPosition = startingPosition;
        this.startingPositionFlag = true;
    }

    display() {
        // push();
        // translate(this.x, this.y);
        // fill(this.color);
        // if (this.constraintHighlight) {
        //     stroke('red');
        //     strokeWeight(2)
        // }
        // if (this.selectedHighlight) {
        //     stroke('blue');
        //     strokeWeight(5);
        // }
        // circle(0, 0, this.size);

        // stroke(0);
        // strokeWeight(0);
        // fill(0);
        // textSize(this.textSize);
        // if (this.role === "S" || this.role === "P") {
        //     textStyle(BOLD);
        // }
        // text(this.role, 0, 0);

        // if (this.startingPositionFlag) {
        //     textSize(this.textSize / 2);
        //     text(this.startingPosition, 0, this.size / 3);
        // }
        // pop();
    }

    isInside(x: number, y: number): boolean {
        return false;
        // return dist(this.x, this.y, x, y) < this.size / 2;
    }

    updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    copyPosition(player: Player) {
        this.x = player.x;
        this.y = player.y;
    }

    updateColor(color: string) {
        this.color = color;
    }

    setConstraintHighlight(bool: boolean) {
        this.constraintHighlight = bool;
    }

    showConstraintHighlight() {
        this.constraintHighlight = true;
    }

    hideConstraintHighlight() {
        this.constraintHighlight = false;
    }

    toggleConstraintHighlight() {
        this.constraintHighlight = !this.constraintHighlight;
    }

    setSelectedHighlight(bool: boolean) {
        this.selectedHighlight = bool;
    }

    showSelectedHighlight() {
        this.selectedHighlight = true;
    }

    hideSelectedHighlight() {
        this.selectedHighlight = false;
    }

    toggleSelectedHighlight() {
        this.selectedHighlight = !this.selectedHighlight;
    }

    showStartingPosition() {
        this.startingPositionFlag = true;
    }

    hideStartingPosition() {
        this.startingPositionFlag = false;
    }

    toggleStartingPosition() {
        this.startingPositionFlag = !this.startingPositionFlag;
    }
}