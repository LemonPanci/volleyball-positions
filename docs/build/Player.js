export class Player {
    constructor(x, y, size, role, startingPosition) {
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
    }
    isInside(x, y) {
        return false;
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
    setConstraintHighlight(bool) {
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
    setSelectedHighlight(bool) {
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
