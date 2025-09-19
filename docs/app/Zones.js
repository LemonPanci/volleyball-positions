class Zones {
    constructor(x, y, size) {
        this.x = x;
        this.y = y
        this.size = size;
        this.color = "lightblue";
    }

    display() {
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
}