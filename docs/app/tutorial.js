// Court Objects
let receiveCourt;
let referenceCourt;
// Lists of Rotation Objects
let referenceRotations;
let receiveRotations;
// Inputs
let rotationRadio;
let constraintsRadio;
let startingPositionRadio;
// Number of the currently selected rotation
let currentSelectedIndex;
// Flag for disabling the coloring for players in invalid positions
let disableInvalidColorFlag = false;
// list of players to be drawn on the top layer (above the constraint lines)
let priorityPlayers = [];
// Player Object currently being dragged
let draggedPlayer = null;
// Constraint Objects
let verticalConstraint1;
let verticalConstraint2;
let horizontalConstraint;
let constraints = [];
// some configs
const validPlayerColor = "lightgreen";
const invalidPlayerColor = "red";

function setup() {
    const canvasSize = 500;
    let canvas = createCanvas(2 * canvasSize, canvasSize);
    canvas.parent("tutorial_canvas");
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);

    const roles = [
        "P", "A1", "C2", "O", "A2", "C1"
    ];

    const canvasPadding = 10;
    // set up court and rotations for the draggable part
    const courtSize = canvasSize - 2 * canvasPadding;
    const courtX = canvasPadding;
    const courtY = canvasPadding;

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

    referenceCourt.display();
    receiveCourt.display();

    currentSelectedIndex = Number(rotationRadio.value());
    referenceRotations[currentSelectedIndex].display();
    receiveRotations[currentSelectedIndex].display();

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
        current.hideHighlight();
    });
    const selectedPlayer = selectPlayer(mouseX, mouseY, receiveRotations[currentSelectedIndex]);
    if (selectedPlayer && draggedPlayer && selectedPlayer.role === draggedPlayer.role) {
        draggedPlayer = null;
    } else {
        draggedPlayer = selectedPlayer;
    }
    showConstraintsForPlayer(draggedPlayer, receiveRotations[currentSelectedIndex]);
}

function selectPlayer(x, y, rotation) {
    return rotation.getPlayerByPosition(x, y);
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
            previous.showHighlight();
            next.showHighlight();
            priorityPlayers = [previous, next, player];
            return;
        // players in position 2 and 5
        case 1:
        case 4:
            horizontalConstraint.setY(previous.y)
            verticalConstraint1.setX(next.x);
            constraints = [verticalConstraint1, horizontalConstraint];
            previous.showHighlight();
            next.showHighlight();
            priorityPlayers = [previous, next, player];
            return;
        // players in position 3 and 6
        case 2:
        case 5:
            verticalConstraint1.setX(previous.x);
            verticalConstraint2.setX(next.x);
            horizontalConstraint.setY(opposite.y);
            constraints = [verticalConstraint1, verticalConstraint2, horizontalConstraint];
            previous.showHighlight();
            next.showHighlight();
            opposite.showHighlight();
            priorityPlayers = [previous, next, opposite, player];
            return;
    }
}