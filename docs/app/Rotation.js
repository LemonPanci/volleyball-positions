class Rotation {
    constructor(x, y, courtSize, roles, option, noInvalidColor) {
        if (roles.length != 6) {
            throw Error("expects an array of 6 players");
        }
        if (typeof option !== "number" || option > 6) {
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

        this.courtX = x;
        this.courtY = y;
        this.courtSize = courtSize;

        const step = this.courtSize / 6;
        const row1 = this.courtY + step;
        const row2 = this.courtY + 4 * step;
        const col1 = this.courtX + step;
        const col2 = this.courtX + 3 * step;
        const col3 = this.courtX + 5 * step;

        const playerSize = courtSize / 6;

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
        const step = this.courtSize / 6;
        const row1 = this.courtY + step;
        const row2 = this.courtY + 4 * step;
        const col1 = this.courtX + step;
        const col2 = this.courtX + 3 * step;
        const col3 = this.courtX + 5 * step;

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

    isValid() {
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
        // inverse iteration so that the highest(last) layer get picked in case of overlap
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
    }

    getRoleByPosition(x, y) {
        for (let i = 5; i >= 0; i--) {
            let currentPlayer = this.getPlayerByIndex(i);
            if (currentPlayer.isInside(x, y)) {
                return currentPlayer.role;
            }
        }
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
        // if is in p3(index 2) or p6(index 5) the opposite is adjacent
        if (this.getIndexByRole(player.role) % 3 === 2) {
            adjacentPlayers.push(this.getOppositePlayer(player));
        }
        return adjacentPlayers;
    }

    updateAbsolutePositionByIndex(playerIndex, x, y) {
        this.getPlayerByIndex(playerIndex).updatePosition(x, y);
    }

    updateCourtPositionByIndex(playerIndex, x, y) {
        this.getPlayerByIndex(playerIndex).updatePosition(this.courtX + x, this.courtY + y);
    }

    updateColors() {
        this.p1.updateColor(validPlayerColor);
        this.p2.updateColor(validPlayerColor);
        this.p3.updateColor(validPlayerColor);
        this.p4.updateColor(validPlayerColor);
        this.p5.updateColor(validPlayerColor);
        this.p6.updateColor(validPlayerColor);

        if (this.noInvalidColor) {
            return;
        }

        if (!this.p1p2) {
            this.p1.updateColor(invalidPlayerColor);
            this.p2.updateColor(invalidPlayerColor);
        }
        if (!this.p1p6) {
            this.p1.updateColor(invalidPlayerColor);
            this.p6.updateColor(invalidPlayerColor);
        }
        if (!this.p2p3) {
            this.p2.updateColor(invalidPlayerColor);
            this.p3.updateColor(invalidPlayerColor);
        }
        if (!this.p3p4) {
            this.p3.updateColor(invalidPlayerColor);
            this.p4.updateColor(invalidPlayerColor);
        }
        if (!this.p3p6) {
            this.p3.updateColor(invalidPlayerColor);
            this.p6.updateColor(invalidPlayerColor);
        }
        if (!this.p4p5) {
            this.p4.updateColor(invalidPlayerColor);
            this.p5.updateColor(invalidPlayerColor);
        }
        if (!this.p5p6) {
            this.p5.updateColor(invalidPlayerColor);
            this.p6.updateColor(invalidPlayerColor);
        }
    }

    copyCourtPositionByIndex(rotation, index) {
        // (source player absolute position - source court origin absolute position)/source court size
        // * target court size + target court origin absolute position
        this.updateAbsolutePositionByIndex(
            index,
            (rotation.getPlayerByIndex(index).x - rotation.courtX) / rotation.courtSize * this.courtSize + this.courtX,
            (rotation.getPlayerByIndex(index).y - rotation.courtY) / rotation.courtSize * this.courtSize + this.courtY
        );
    }

    copyCourtPositions(rotation) {
        for (let i = 0; i < 6; ++i) {
            this.copyCourtPositionByIndex(rotation, i);
        }
    }

    setInvalidColor(flag) {
        if (typeof flag !== 'boolean') {
            throw Error('flag must be boolean');
        }
        this.noInvalidColor = flag;
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

    // forEach(fn) {
    //     for (let i = 5; i >= 0; --i) {
    //         fn(this.getPlayerByIndex(i));
    //     }
    // }
}