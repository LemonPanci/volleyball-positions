// Court Objects
let receiveCourt;
let referenceCourt;
let defenseCourt;
// Lists of Rotation Objects
let referenceRotations;
let receiveRotations;
let defenseRotations;
// Inputs
let rotationRadio;
let constraintsRadio;
let startingPositionRadio;
// Number of the currently selected rotation
let currentSelectedIndex;
// list of players to be drawn on the top layer (above the constraint lines)
let priorityPlayers = [];
// Player Object currently being dragged
let selectedPlayer = null;
// Constraint Objects
let verticalConstraint1;
let verticalConstraint2;
let horizontalConstraint;
let constraints = [];
// some configs
const validPlayerColor = "lightgreen";
const invalidPlayerColor = "red";
const courtTitleSize = 30;

function setup() {
    const canvasSize = Math.min(windowWidth / 3, windowHeight * 3 / 5);
    let canvas = createCanvas(3 * canvasSize, canvasSize + courtTitleSize);
    canvas.parent("tutorial_canvas");
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);

    const roles = [
        "P", "A1", "C2", "O", "A2", "C1"
    ];

    const canvasPadding = 10;
    const courtSize = canvasSize - 2 * canvasPadding;
    const courtX = canvasPadding;
    const courtY = canvasPadding + courtTitleSize;

    // set up reference rotations
    referenceCourt = new Court(courtX, courtY, courtSize, "zones");
    referenceRotations = [
        new Rotation(courtX, courtY, courtSize, roles, 0),
        new Rotation(courtX, courtY, courtSize, roles, 1),
        new Rotation(courtX, courtY, courtSize, roles, 2),
        new Rotation(courtX, courtY, courtSize, roles, 3),
        new Rotation(courtX, courtY, courtSize, roles, 4),
        new Rotation(courtX, courtY, courtSize, roles, 5)
    ];

    // set up receive rotations
    const offsetCourtX = courtX + courtSize + 2 * canvasPadding;
    receiveCourt = new Court(offsetCourtX, courtY, courtSize);
    receiveRotations = [
        getReceiveP1(offsetCourtX, courtY, courtSize, roles),
        getReceiveP2(offsetCourtX, courtY, courtSize, roles),
        getReceiveP3(offsetCourtX, courtY, courtSize, roles),
        getReceiveP4(offsetCourtX, courtY, courtSize, roles),
        getReceiveP5(offsetCourtX, courtY, courtSize, roles),
        getReceiveP6(offsetCourtX, courtY, courtSize, roles)
    ];

    const doubleOffsetCourtX = offsetCourtX + courtSize + 2 * canvasPadding;
    defenseCourt = new Court(doubleOffsetCourtX, courtY, courtSize);
    defenseRotations = [
        getNoFrontSwapDefenseP1(doubleOffsetCourtX, courtY, courtSize, roles),
        getNeutralDefenseP2(doubleOffsetCourtX, courtY, courtSize, roles),
        getNeutralDefenseP3(doubleOffsetCourtX, courtY, courtSize, roles),
        getNeutralDefenseP4(doubleOffsetCourtX, courtY, courtSize, roles),
        getNeutralDefenseP5(doubleOffsetCourtX, courtY, courtSize, roles),
        getNeutralDefenseP6(doubleOffsetCourtX, courtY, courtSize, roles)
    ];

    // constraint lines
    horizontalConstraint = new HorizontalConstraint(offsetCourtX, offsetCourtX + courtSize, 0, 'red');
    verticalConstraint1 = new VerticalConstraint(0, courtY, courtY + courtSize, 'red');
    verticalConstraint2 = new VerticalConstraint(0, courtY, courtY + courtSize, 'red');

    // radio to select which rotation to use
    let rotationRadioTitle = createP('Rotazione');
    rotationRadioTitle.parent("rotation_menu_title");

    rotationRadio = createRadio();
    rotationRadio.parent("rotation_menu_options");

    rotationRadio.option("0", 'p1');
    rotationRadio.option("1", 'p2');
    rotationRadio.option("2", 'p3');
    rotationRadio.option("3", 'p4');
    rotationRadio.option("4", 'p5');
    rotationRadio.option("5", 'p6');

    rotationRadio.selected("0");
}

function draw() {
    background('white');

    // court titles
    push();
    textAlign(LEFT, BOTTOM);
    textSize(courtTitleSize);
    textStyle(BOLD);
    text('Riferimento', referenceCourt.x, referenceCourt.y);
    pop();

    push();
    textAlign(LEFT, BOTTOM);
    textSize(courtTitleSize);
    textStyle(BOLD);
    text('Ricezione', receiveCourt.x, receiveCourt.y);
    pop();

    push();
    textAlign(LEFT, BOTTOM);
    textSize(courtTitleSize);
    textStyle(BOLD);
    text('Difesa', defenseCourt.x, defenseCourt.y);
    pop();

    referenceCourt.display();
    receiveCourt.display();
    defenseCourt.display();

    currentSelectedIndex = Number(rotationRadio.value());
    referenceRotations[currentSelectedIndex].display();
    receiveRotations[currentSelectedIndex].display();
    defenseRotations[currentSelectedIndex].display();

    for (let i = 0; i < constraints.length; ++i) {
        constraints[i].display();
    }

    for (let i = 0; i < priorityPlayers.length; ++i) {
        priorityPlayers[i].display();
    }
}

/**
 * shows/hides constraints for the clicked player
 * showConstriantsForPlayer() automatically hides constraints by removing them from the constraint list
 */
function mouseClicked() {
    priorityPlayers.forEach(current => {
        current.hideConstraintHighlight();
    });
    if (selectedPlayer) {
        hideSelectedHighlightFromRotation(referenceRotations[currentSelectedIndex]);
        hideSelectedHighlightFromRotation(receiveRotations[currentSelectedIndex]);
        hideSelectedHighlightFromRotation(defenseRotations[currentSelectedIndex]);
    }
    const candidatePlayer = selectPlayer(mouseX, mouseY, receiveRotations[currentSelectedIndex]);
    if (!candidatePlayer || candidatePlayer && selectedPlayer && candidatePlayer.role === selectedPlayer.role) {
        selectedPlayer = null;
    } else {
        selectedPlayer = candidatePlayer;
        referenceRotations[currentSelectedIndex].getPlayerByRole(selectedPlayer.role).showSelectedHighlight();
        receiveRotations[currentSelectedIndex].getPlayerByRole(selectedPlayer.role).showSelectedHighlight();
        defenseRotations[currentSelectedIndex].getPlayerByRole(selectedPlayer.role).showSelectedHighlight();
    }
    showConstraintsForPlayer(selectedPlayer, receiveRotations[currentSelectedIndex]);
}

function selectPlayer(x, y, rotation) {
    const selectedReference = referenceRotations[currentSelectedIndex].getPlayerByPosition(x, y);
    const selectedReceive = receiveRotations[currentSelectedIndex].getPlayerByPosition(x, y);
    const selectedDefense = defenseRotations[currentSelectedIndex].getPlayerByPosition(x, y);

    if (selectedReference) {
        return rotation.getPlayerByRole(selectedReference.role);
    }
    if (selectedReceive) {
        return rotation.getPlayerByRole(selectedReceive.role);
    }
    if (selectedDefense) {
        return rotation.getPlayerByRole(selectedDefense.role);
    }
}

/**
 * turns on highlight for player giving constraints,
 * sets the correct constraint positions,
 * adds them to the list of constraints to be displayed,
 * and adds the relevant player to the priority display list
 */
function showConstraintsForPlayer(player, rotation) {
    if (!player) {
        priorityPlayers = [];
        constraints = [];
        return;
    }
    const playerIndex = rotation.getIndexByRole(player.role);
    const previous = rotation.getPreviousPlayer(player);
    const next = rotation.getNextPlayer(player);
    const opposite = rotation.getOppositePlayer(player);
    switch (playerIndex) {
        // players in position 1 and 4
        case 0:
        case 3:
            verticalConstraint1.setX(previous.x);
            horizontalConstraint.setY(next.y);
            constraints = [verticalConstraint1, horizontalConstraint];
            previous.showConstraintHighlight();
            next.showConstraintHighlight();
            priorityPlayers = [previous, next, player];
            return;
        // players in position 2 and 5
        case 1:
        case 4:
            horizontalConstraint.setY(previous.y)
            verticalConstraint1.setX(next.x);
            constraints = [verticalConstraint1, horizontalConstraint];
            previous.showConstraintHighlight();
            next.showConstraintHighlight();
            priorityPlayers = [previous, next, player];
            return;
        // players in position 3 and 6
        case 2:
        case 5:
            verticalConstraint1.setX(previous.x);
            verticalConstraint2.setX(next.x);
            horizontalConstraint.setY(opposite.y);
            constraints = [verticalConstraint1, verticalConstraint2, horizontalConstraint];
            previous.showConstraintHighlight();
            next.showConstraintHighlight();
            opposite.showConstraintHighlight();
            priorityPlayers = [previous, next, opposite, player];
            return;
    }
}

function hideSelectedHighlightFromRotation(rotation) {
    for (let i = 0; i < 6; ++i) {
        rotation.getPlayerByIndex(i).hideSelectedHighlight();
    }
}