export class Court {
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
    }
    displayRotationZones() {
    }
    zoneRect(x, y, w, h, n) {
    }
    displayNoLines() {
    }
    setOption(option) {
        this.option = option;
    }
}
