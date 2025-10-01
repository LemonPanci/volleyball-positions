export class Court {
    x: number;
    y: number;
    color: string;
    size: number;
    option?: string;
    constructor(x: number, y: number, size: number, option?: string) {
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
        // push();
        // strokeWeight(5);
        // fill(this.color);
        // rect(this.x, this.y, this.size, this.size / 3);
        // translate(0, this.size / 3);
        // rect(this.x, this.y, this.size, this.size * 2 / 3);
        // pop();
    }

    displayRotationZones() {
        // const zoneWidth = this.size / 3;
        // const zoneHeight = this.size / 2;
        // push();
        // strokeWeight(5);
        // fill(this.color);
        // this.zoneRect(this.x, this.y, zoneWidth, zoneHeight, '4');
        // this.zoneRect(this.x + zoneWidth, this.y, zoneWidth, zoneHeight, '3');
        // this.zoneRect(this.x + 2 * zoneWidth, this.y, zoneWidth, zoneHeight, '2');
        // this.zoneRect(this.x + 0, this.y + zoneHeight, zoneWidth, zoneHeight, '5');
        // this.zoneRect(this.x + zoneWidth, this.y + zoneHeight, zoneWidth, zoneHeight, '6');
        // this.zoneRect(this.x + 2 * zoneWidth, this.y + zoneHeight, zoneWidth, zoneHeight, '1');
        // pop();
    }

    zoneRect(x: number, y: number, w: number, h: number, n: number) {
        // const textX = x + w - 10;
        // const textY = y + h - 10;
        // rect(x, y, w, h);
        // push();
        // fill('black');
        // textAlign(RIGHT, BOTTOM);
        // textSize(20);
        // text(n, textX, textY);
        // pop();
    }

    displayNoLines() {
        // push();
        // strokeWeight(5);
        // fill(this.color);
        // rect(this.x, this.y, this.size, this.size);
        // pop();
    }

    setOption(option?: string) {
        this.option = option;
    }
}