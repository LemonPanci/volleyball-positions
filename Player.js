class Player {
    constructor(x, y, size, role) {
        this.x = x;
        this.y = y;
        this.role = role;
        this.size = size;
        this.textSize = size * 2 / 5;
        this.color = "white";
        this.highlight = false;
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(this.color);
        if (this.highlight) {
            stroke('red');
            strokeWeight(2)
        }
        circle(0, 0, this.size);
        stroke(0);
        strokeWeight(0);
        fill(0);
        textSize(this.textSize);
        if (this.role === "S" || this.role === "P") {
            textStyle(BOLD);
        }
        text(this.role, 0, 0);
        pop();
    }

    isInside(x, y) {
        return dist(this.x, this.y, x, y) < this.size / 2;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }

    copyPosition(player) {
        this.x = player.x;
        this.y = player.y;
    }

    updateColor(color) {
        this.color = color;
    }

    setHighlight(bool) {
        this.highlight = bool;
    }

    showHighlight() {
        this.highlight = true;
    }

    hideHighlight() {
        this.highlight = false;
    }

    toggleHighlight() {
        this.highlight = !this.highlight;
    }
}