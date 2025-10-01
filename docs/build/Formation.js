import { Player } from "./Player.js";
export class Formation {
    constructor(x, y, size, roles, option, noInvalidColor) {
        this.p1p2 = true;
        this.p1p6 = true;
        this.p2p3 = true;
        this.p3p4 = true;
        this.p3p6 = true;
        this.p4p5 = true;
        this.p5p6 = true;
        this.noInvalidColor = false;
        this.validPlayerColor = "lightgreen";
        this.invalidPlayerColor = "red";
        if (roles.length != 6) {
            throw Error("expects an array of 6 players");
        }
        if (option > 6) {
            throw Error("option must be a number between 0 and 6");
        }
        let shift = 0;
        if (!!option) {
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
    verify() {
        if (this.p1.y < this.p2.y) {
            this.p1p2 = false;
        }
        else {
            this.p1p2 = true;
        }
        if (this.p1.x < this.p6.x) {
            this.p1p6 = false;
        }
        else {
            this.p1p6 = true;
        }
        if (this.p2.x < this.p3.x) {
            this.p2p3 = false;
        }
        else {
            this.p2p3 = true;
        }
        if (this.p3.x < this.p4.x) {
            this.p3p4 = false;
        }
        else {
            this.p3p4 = true;
        }
        if (this.p3.y > this.p6.y) {
            this.p3p6 = false;
        }
        else {
            this.p3p6 = true;
        }
        if (this.p4.y > this.p5.y) {
            this.p4p5 = false;
        }
        else {
            this.p4p5 = true;
        }
        if (this.p5.x > this.p6.x) {
            this.p5p6 = false;
        }
        else {
            this.p5p6 = true;
        }
    }
    isValid() {
        this.verify();
        return (this.p1p2 ||
            this.p1p6 ||
            this.p2p3 ||
            this.p3p4 ||
            this.p3p6 ||
            this.p4p5 ||
            this.p5p6);
    }
    getPlayerByIndex(index) {
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
    getPlayerByPosition(x, y) {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.isInside(x, y)) {
                return currentPlayer;
            }
        }
        return null;
    }
    getIndexByPosition(x, y) {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.isInside(x, y)) {
                return i;
            }
        }
        return -1;
    }
    getRoleByPosition(x, y) {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.isInside(x, y)) {
                return currentPlayer.role;
            }
        }
        return '';
    }
    getPlayerByRole(role) {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.role === role) {
                return currentPlayer;
            }
        }
        return null;
    }
    getIndexByRole(role) {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.role === role) {
                return i;
            }
        }
        return -1;
    }
    getNextPlayer(player) {
        const currentIndex = this.getIndexByRole(player.role);
        const targetIndex = (currentIndex + 1) % 6;
        return this.getPlayerByIndex(targetIndex);
    }
    getPreviousPlayer(player) {
        const currentIndex = this.getIndexByRole(player.role);
        const targetIndex = (currentIndex + 5) % 6;
        return this.getPlayerByIndex(targetIndex);
    }
    getOppositePlayer(player) {
        const currentIndex = this.getIndexByRole(player.role);
        const targetIndex = (currentIndex + 3) % 6;
        return this.getPlayerByIndex(targetIndex);
    }
    getAdjacentPlayers(player) {
        const adjacentPlayers = [
            this.getPreviousPlayer(player),
            this.getNextPlayer(player)
        ];
        if (this.getIndexByRole(player.role) % 3 === 2) {
            adjacentPlayers.push(this.getOppositePlayer(player));
        }
        return adjacentPlayers;
    }
    updateAbsolutePositionByIndex(playerIndex, x, y) {
        this.getPlayerByIndex(playerIndex).updatePosition(x, y);
    }
    updateCourtPositionByIndex(playerIndex, x, y) {
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
    copyCourtPositionByIndex(formation, index) {
        this.updateAbsolutePositionByIndex(index, (formation.getPlayerByIndex(index).x - formation.x) / formation.size * this.size + this.x, (formation.getPlayerByIndex(index).y - formation.y) / formation.size * this.size + this.y);
    }
    copyCourtPositions(formation) {
        for (let i = 0; i < 6; ++i) {
            this.copyCourtPositionByIndex(formation, i);
        }
    }
    setInvalidColor(value) {
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
    showSelectedHighlightByIndex(index) {
        const player = this.getPlayerByIndex(index);
        if (player) {
            player.showSelectedHighlight();
        }
    }
    hideSelectedHighlightByIndex(index) {
        const player = this.getPlayerByIndex(index);
        if (player) {
            player.hideSelectedHighlight();
        }
    }
    showSelectedHighlightByRole(role) {
        const player = this.getPlayerByRole(role);
        if (player) {
            player.showSelectedHighlight();
        }
    }
    hideSelectedHighlightByRole(role) {
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
    showConstraintHighlightByIndex(index) {
        const player = this.getPlayerByIndex(index);
        if (player) {
            player.showConstraintHighlight();
        }
    }
    hideConstraintHighlightByIndex(index) {
        const player = this.getPlayerByIndex(index);
        if (player) {
            player.hideConstraintHighlight();
        }
    }
    showConstraintHighlightByRole(role) {
        const player = this.getPlayerByRole(role);
        if (player) {
            player.showConstraintHighlight();
        }
    }
    hideConstraintHighlightByRole(role) {
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
}
