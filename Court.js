class Court {
    constructor(x, y, size, option) {
        this.x = x;
        this.y = y;
        this.color = "lightblue";
        this.size = size;
        this.option = option;
    }

    display() {
        switch (this.option) {
            case 'nolines':
                this.displayNoLines();
                return;
            case 'zones':
                this.displayRotationZones();
                return;
            default:
                this.displayCourt();
                return;
        }
    }

    displayCourt() {
        push();
        strokeWeight(5);
        fill(this.color);
        rect(this.x, this.y, this.size, this.size / 3);
        translate(0, this.size / 3);
        rect(this.x, this.y, this.size, this.size * 2 / 3);
        pop();
    }

    displayRotationZones() {
        const zoneWidth = this.size / 3;
        const zoneHeight = this.size / 2;
        push();
        strokeWeight(5);
        fill(this.color);
        rect(this.x, this.y, zoneWidth, zoneHeight);
        rect(this.x + zoneWidth, this.y, zoneWidth, zoneHeight);
        rect(this.x + 2 * zoneWidth, this.y, zoneWidth, zoneHeight);
        rect(this.x + 0, this.y + zoneHeight, zoneWidth, zoneHeight);
        rect(this.x + zoneWidth, this.y + zoneHeight, zoneWidth, zoneHeight);
        rect(this.x + 2 * zoneWidth, this.y + zoneHeight, zoneWidth, zoneHeight);
        pop();
    }

    displayNoLines() {
        push();
        strokeWeight(5);
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
        pop();
    }

    setOption(option) {
        this.option = option;
    }
}