import { Player } from "./Player.js";

export class Formation {
    x: number;
    y: number;
    size: number;
    roles: string[];
    option: number;

    p1: Player;
    p2: Player;
    p3: Player;
    p4: Player;
    p5: Player;
    p6: Player;

    p1p2: boolean = true;
    p1p6: boolean = true;
    p2p3: boolean = true;
    p3p4: boolean = true;
    p3p6: boolean = true;
    p4p5: boolean = true;
    p5p6: boolean = true;

    noInvalidColor: boolean = false;
    validPlayerColor: string = "lightgreen";
    invalidPlayerColor: string = "red";

    constructor(x: number, y: number, size: number, roles: string[], option: number, noInvalidColor?: boolean) {
        if (roles.length != 6) {
            throw Error("expects an array of 6 players");
        }
        if (option > 6) {
            throw Error("option must be a number between 0 and 6");
        }
        let shift = 0;
        if (!!option) {
            // to match the offset with the position of the setter
            shift = 6 - option;
        }
        if (typeof noInvalidColor === 'undefined') {
            noInvalidColor = false;
        }
        if (typeof noInvalidColor !== 'boolean') {
            throw Error("noInvalidColor must be a boolean or undefined");
        }

        this.x = x;
        this.y = y;
        this.size = size;

        const step = this.size / 6;
        const row1 = this.y + step;
        const row2 = this.y + 4 * step;
        const col1 = this.x + step;
        const col2 = this.x + 3 * step;
        const col3 = this.x + 5 * step;

        const playerSize = size / 6;

        this.p1 = new Player(col3, row2, playerSize, roles[(0 + shift) % 6], 1);
        this.p2 = new Player(col3, row1, playerSize, roles[(1 + shift) % 6], 2);
        this.p3 = new Player(col2, row1, playerSize, roles[(2 + shift) % 6], 3);
        this.p4 = new Player(col1, row1, playerSize, roles[(3 + shift) % 6], 4);
        this.p5 = new Player(col1, row2, playerSize, roles[(4 + shift) % 6], 5);
        this.p6 = new Player(col2, row2, playerSize, roles[(5 + shift) % 6], 6);

        this.p1p2 = true;
        this.p1p6 = true;
        this.p2p3 = true;
        this.p3p4 = true;
        this.p3p6 = true;
        this.p4p5 = true;
        this.p5p6 = true;

        this.noInvalidColor = noInvalidColor;
        this.validPlayerColor = "lightgreen";
        this.invalidPlayerColor = "red";
    }

    display() {
        this.verify();
        this.updateColors();
        this.p1.display();
        this.p2.display();
        this.p3.display();
        this.p4.display();
        this.p5.display();
        this.p6.display();
    }

    reset() {
        const step = this.size / 6;
        const row1 = this.y + step;
        const row2 = this.y + 4 * step;
        const col1 = this.x + step;
        const col2 = this.x + 3 * step;
        const col3 = this.x + 5 * step;

        this.p1.updatePosition(col3, row2);
        this.p2.updatePosition(col3, row1);
        this.p3.updatePosition(col2, row1);
        this.p4.updatePosition(col1, row1);
        this.p5.updatePosition(col1, row2);
        this.p6.updatePosition(col2, row2);
    }

    // check if the relative positions of the players are valid under volleyball rules and update internal state
    // x grows from left to right
    // y grows from top to bottom
    verify() {
        // p1-p2, vertical
        if (this.p1.y < this.p2.y) {
            this.p1p2 = false;
        }
        else {
            this.p1p2 = true;
        }
        // p1-p6, horizontal
        if (this.p1.x < this.p6.x) {
            this.p1p6 = false;
        }
        else {
            this.p1p6 = true;
        }
        // p2-p3, horizontal
        if (this.p2.x < this.p3.x) {
            this.p2p3 = false;
        }
        else {
            this.p2p3 = true;
        }
        // p3-p4, horizontal
        if (this.p3.x < this.p4.x) {
            this.p3p4 = false;
        }
        else {
            this.p3p4 = true;
        }
        // p3-p6, verical
        if (this.p3.y > this.p6.y) {
            this.p3p6 = false
        }
        else {
            this.p3p6 = true;
        }
        // p4-p5, vertical
        if (this.p4.y > this.p5.y) {
            this.p4p5 = false;
        }
        else {
            this.p4p5 = true;
        }
        // p5-p6, horizontal
        if (this.p5.x > this.p6.x) {
            this.p5p6 = false;
        }
        else {
            this.p5p6 = true;
        }
    }

    isValid(): boolean {
        this.verify();
        return (
            this.p1p2 ||
            this.p1p6 ||
            this.p2p3 ||
            this.p3p4 ||
            this.p3p6 ||
            this.p4p5 ||
            this.p5p6
        )
    }

    getPlayerByIndex(index: number): Player {
        switch (index) {
            case 0:
                return this.p1;
            case 1:
                return this.p2;
            case 2:
                return this.p3;
            case 3:
                return this.p4;
            case 4:
                return this.p5;
            case 5:
                return this.p6;
            default:
                return null;
        }
    }

    getPlayerByPosition(x: number, y: number): Player {
        // inverse iteration so that the highest(last) layer get picked in case of overlap
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.isInside(x, y)) {
                return currentPlayer;
            }
        }
        return null;
    }

    getIndexByPosition(x: number, y: number): number {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.isInside(x, y)) {
                return i;
            }
        }
        return -1;
    }

    getRoleByPosition(x: number, y: number): string {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.isInside(x, y)) {
                return currentPlayer.role;
            }
        }
        return '';
    }

    getPlayerByRole(role: string): Player {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.role === role) {
                return currentPlayer;
            }
        }
        return null;
    }

    getIndexByRole(role: string): number {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.role === role) {
                return i;
            }
        }
        return -1;
    }

    getNextPlayer(player: Player): Player {
        const currentIndex = this.getIndexByRole(player.role);
        const targetIndex = (currentIndex + 1) % 6;
        return this.getPlayerByIndex(targetIndex);
    }

    getPreviousPlayer(player: Player): Player {
        const currentIndex = this.getIndexByRole(player.role);
        const targetIndex = (currentIndex + 5) % 6;
        return this.getPlayerByIndex(targetIndex);
    }

    getOppositePlayer(player: Player): Player {
        const currentIndex = this.getIndexByRole(player.role);
        const targetIndex = (currentIndex + 3) % 6;
        return this.getPlayerByIndex(targetIndex);
    }

    getAdjacentPlayers(player: Player): Player[] {
        const adjacentPlayers = [
            this.getPreviousPlayer(player),
            this.getNextPlayer(player)
        ];
        // if is in p3(index 2) or p6(index 5) the opposite is adjacent
        if (this.getIndexByRole(player.role) % 3 === 2) {
            adjacentPlayers.push(this.getOppositePlayer(player));
        }
        return adjacentPlayers;
    }

    updateAbsolutePositionByIndex(playerIndex: number, x: number, y: number) {
        this.getPlayerByIndex(playerIndex).updatePosition(x, y);
    }

    updateCourtPositionByIndex(playerIndex: number, x: number, y: number) {
        this.getPlayerByIndex(playerIndex).updatePosition(this.x + x, this.y + y);
    }

    updateColors() {
        this.p1.updateColor(this.validPlayerColor);
        this.p2.updateColor(this.validPlayerColor);
        this.p3.updateColor(this.validPlayerColor);
        this.p4.updateColor(this.validPlayerColor);
        this.p5.updateColor(this.validPlayerColor);
        this.p6.updateColor(this.validPlayerColor);

        if (this.noInvalidColor) {
            return;
        }

        if (!this.p1p2) {
            this.p1.updateColor(this.invalidPlayerColor);
            this.p2.updateColor(this.invalidPlayerColor);
        }
        if (!this.p1p6) {
            this.p1.updateColor(this.invalidPlayerColor);
            this.p6.updateColor(this.invalidPlayerColor);
        }
        if (!this.p2p3) {
            this.p2.updateColor(this.invalidPlayerColor);
            this.p3.updateColor(this.invalidPlayerColor);
        }
        if (!this.p3p4) {
            this.p3.updateColor(this.invalidPlayerColor);
            this.p4.updateColor(this.invalidPlayerColor);
        }
        if (!this.p3p6) {
            this.p3.updateColor(this.invalidPlayerColor);
            this.p6.updateColor(this.invalidPlayerColor);
        }
        if (!this.p4p5) {
            this.p4.updateColor(this.invalidPlayerColor);
            this.p5.updateColor(this.invalidPlayerColor);
        }
        if (!this.p5p6) {
            this.p5.updateColor(this.invalidPlayerColor);
            this.p6.updateColor(this.invalidPlayerColor);
        }
    }

    copyCourtPositionByIndex(formation: Formation, index: number) {
        // (source player absolute position - source court origin absolute position)/source court size
        // * target court size + target court origin absolute position
        this.updateAbsolutePositionByIndex(
            index,
            (formation.getPlayerByIndex(index).x - formation.x) / formation.size * this.size + this.x,
            (formation.getPlayerByIndex(index).y - formation.y) / formation.size * this.size + this.y
        );
    }

    copyCourtPositions(formation: Formation) {
        for (let i = 0; i < 6; ++i) {
            this.copyCourtPositionByIndex(formation, i);
        }
    }

    setInvalidColor(value: boolean) {
        if (typeof value !== 'boolean') {
            throw Error('flag must be boolean');
        }
        this.noInvalidColor = value;
    }

    showStartingPositions() {
        this.p1.showStartingPosition();
        this.p2.showStartingPosition();
        this.p3.showStartingPosition();
        this.p4.showStartingPosition();
        this.p5.showStartingPosition();
        this.p6.showStartingPosition();
    }

    hideStartingPositions() {
        this.p1.hideStartingPosition();
        this.p2.hideStartingPosition();
        this.p3.hideStartingPosition();
        this.p4.hideStartingPosition();
        this.p5.hideStartingPosition();
        this.p6.hideStartingPosition();
    }

    showSelectedHighlightByIndex(index: number) {
        const player = this.getPlayerByIndex(index);
        if (player) {
            player.showSelectedHighlight();
        }
    }

    hideSelectedHighlightByIndex(index: number) {
        const player = this.getPlayerByIndex(index);
        if (player) {
            player.hideSelectedHighlight();
        }
    }

    showSelectedHighlightByRole(role: string) {
        const player = this.getPlayerByRole(role);
        if (player) {
            player.showSelectedHighlight();
        }
    }

    hideSelectedHighlightByRole(role: string) {
        const player = this.getPlayerByRole(role);
        if (player) {
            player.hideSelectedHighlight();
        }
    }

    hideAllSelectedHighlights() {
        for (let i = 5; i >= 0; --i) {
            this.hideSelectedHighlightByIndex(i);
        }
    }

    showConstraintHighlightByIndex(index: number) {
        const player = this.getPlayerByIndex(index);
        if (player) {
            player.showConstraintHighlight();
        }
    }

    hideConstraintHighlightByIndex(index: number) {
        const player = this.getPlayerByIndex(index);
        if (player) {
            player.hideConstraintHighlight();
        }
    }

    showConstraintHighlightByRole(role: string) {
        const player = this.getPlayerByRole(role);
        if (player) {
            player.showConstraintHighlight();
        }
    }

    hideConstraintHighlightByRole(role: string) {
        const player = this.getPlayerByRole(role);
        if (player) {
            player.hideConstraintHighlight();
        }
    }

    hideAllConstraintHighlights() {
        for (let i = 5; i >= 0; --i) {
            this.hideConstraintHighlightByIndex(i);
        }
    }

    // forEach(fn) {
    //     for (let i = 5; i >= 0; --i) {
    //         fn(this.getPlayerByIndex(i));
    //     }
    // }
}