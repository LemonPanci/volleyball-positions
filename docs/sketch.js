// Court Objects
let draggableCourt;
let referenceCourt;
let receiveCourt;
let defenseCourt;
// Lists of Rotation Objects
let draggableRotations;
let referenceRotations;
let receiveRotations;
let defenseRotations;
// Currently displayed draggable Rotation Object
let currentRotation;
// Inputs
let rotationRadio;
let courtRadio;
let constraintsRadio;
let resetButton;
let receiveButton;
let defenseButton;
let toggleInvalidColorButton;
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
    let canvas = createCanvas(900, 650);
    canvas.position(0, 70);
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);

    const roles = [
        "P", "A1", "C2", "O", "A2", "C1"
    ];

    const padding = 5;
    const gap = 20;

    // set up zones and reference rotations
    const referenceSize = 200;
    const referenceX = padding;
    const referenceY = padding;
    referenceCourt = new Court(referenceX, referenceY, referenceSize, 'zones');

    referenceRotations = [
        new Rotation(referenceX, referenceY, referenceSize, roles, 0),
        new Rotation(referenceX, referenceY, referenceSize, roles, 1),
        new Rotation(referenceX, referenceY, referenceSize, roles, 2),
        new Rotation(referenceX, referenceY, referenceSize, roles, 3),
        new Rotation(referenceX, referenceY, referenceSize, roles, 4),
        new Rotation(referenceX, referenceY, referenceSize, roles, 5)
    ];

    // set up receive rotations and it's sample court
    const receiveSize = 200;
    const receiveX = padding;
    const receiveY = padding + referenceSize + gap;
    receiveCourt = new Court(receiveX, receiveY, receiveSize);

    receiveRotations = [
        getReceiveP1(receiveX, receiveY, receiveSize, roles),
        getReceiveP2(receiveX, receiveY, receiveSize, roles),
        getReceiveP3(receiveX, receiveY, receiveSize, roles),
        getReceiveP4(receiveX, receiveY, receiveSize, roles),
        getReceiveP5(receiveX, receiveY, receiveSize, roles),
        getReceiveP6(receiveX, receiveY, receiveSize, roles)
    ];

    // set up defense rotation and it's sample court
    const defenseSize = 200;
    const defenseX = padding;
    const defenseY = padding + referenceSize + gap + receiveSize + gap;
    defenseCourt = new Court(defenseX, defenseY, defenseSize);

    defenseRotations = [
        getNeutralDefenseP1(defenseX, defenseY, defenseSize, roles),
        getNeutralDefenseP2(defenseX, defenseY, defenseSize, roles),
        getNeutralDefenseP3(defenseX, defenseY, defenseSize, roles),
        getNeutralDefenseP4(defenseX, defenseY, defenseSize, roles),
        getNeutralDefenseP5(defenseX, defenseY, defenseSize, roles),
        getNeutralDefenseP6(defenseX, defenseY, defenseSize, roles)
    ];

    // set up court and rotations for the draggable part
    const courtSize = 550;
    const courtX = 300;
    const courtY = padding;
    draggableCourt = new Court(courtX, courtY, courtSize);

    draggableRotations = [
        new Rotation(courtX, courtY, courtSize, roles, 0),
        new Rotation(courtX, courtY, courtSize, roles, 1),
        new Rotation(courtX, courtY, courtSize, roles, 2),
        new Rotation(courtX, courtY, courtSize, roles, 3),
        new Rotation(courtX, courtY, courtSize, roles, 4),
        new Rotation(courtX, courtY, courtSize, roles, 5)
    ];

    // constraint lines
    horizontalConstraint = new HorizontalConstraint(courtX, courtX + courtSize, 0, 'red');
    verticalConstraint1 = new VerticalConstraint(0, courtY, courtY + courtSize, 'red');
    verticalConstraint2 = new VerticalConstraint(0, courtY, courtY + courtSize, 'red');

    // radio to select which rotation to use
    rotationRadio = createRadio();
    rotationRadio.position(25, 25);

    rotationRadio.option("0", 'p1');
    rotationRadio.option("1", 'p2');
    rotationRadio.option("2", 'p3');
    rotationRadio.option("3", 'p4');
    rotationRadio.option("4", 'p5');
    rotationRadio.option("5", 'p6');

    rotationRadio.selected("0");

    rotationRadio.changed(resetRotation);

    // radio to select which version of the court to display: normal, divided in zones, or without any lines
    courtRadio = createRadio();
    courtRadio.position(300, 25);

    courtRadio.option("normal", 'Normale');
    courtRadio.option("zones", 'Zone');
    courtRadio.option("nolines", 'Senza linee');

    courtRadio.selected("normal");

    // radio to select which version of the court to display: normal, divided in zones, or without any lines
    constraintsRadio = createRadio();
    constraintsRadio.position(600, 25);

    constraintsRadio.option("for", 'per il giocatore');
    constraintsRadio.option("from", 'dal giocatore');
    constraintsRadio.option("none", 'nessuno');

    constraintsRadio.selected("for");

    // button to reset the draggable players to the reference positions
    resetButton = createButton('Reset');
    resetButton.position(950, 75);
    resetButton.mousePressed(resetRotation);

    // button to copy the receive positions to the draggable players
    receiveButton = createButton('Ricezione');
    receiveButton.position(950, 100);
    receiveButton.mousePressed(copyReceiveRotation);

    // button to copy the defense position to the draggable players
    defenseButton = createButton('Difesa');
    defenseButton.position(950, 125);
    defenseButton.mousePressed(copyDefenseRotation);

    // button to toggle the invalid color for the draggable players
    toggleInvalidColorButton = createButton('Verifica');
    toggleInvalidColorButton.position(950, 200);
    toggleInvalidColorButton.mousePressed(toggleInvalidColor);
}

function draw() {
    background(220);

    draggableCourt.setOption(courtRadio.value());

    draggableCourt.display();
    referenceCourt.display();
    receiveCourt.display();
    defenseCourt.display();

    currentSelectedIndex = Number(rotationRadio.value());

    referenceRotations[currentSelectedIndex].display();

    receiveRotations[currentSelectedIndex].display();

    defenseRotations[currentSelectedIndex].display();

    currentRotation = draggableRotations[currentSelectedIndex];

    currentRotation.display();

    for (let i = 0; i < constraints.length; ++i) {
        constraints[i].display();
    }

    for (let i = 0; i < priorityPlayers.length; ++i) {
        priorityPlayers[i].display();
    }
}

// on mouse press starts dragging the player underneath and shows the constraint highlights
function mousePressed() {
    startDraggingPlayer(mouseX, mouseY);
}

function touchStarted() {
    startDraggingPlayer(touches[0].x, touches[0].y);
}

function startDraggingPlayer(x, y) {
    draggedPlayer = currentRotation.getPlayerByPosition(x, y);
    if (draggedPlayer) {
        switch (constraintsRadio.value()) {
            case "for":
                showConstraintsForDragged();
                return;
            case "from":
                showConstraintsFromDragged();
                return;
            case "none":
                return;
            default:
                return;
        }
    }
}

// on mouse dragged if a player is being dragged update it's position and if necessary it's related constraints
function mouseDragged() {
    dragPlayer(mouseX, mouseY);
}

function touchMoved() {
    dragPlayer(touches[0].x, touches[0].y);
}

function dragPlayer(x, y) {
    if (draggedPlayer) {
        draggedPlayer.updatePosition(x, y);
        switch (constraintsRadio.value()) {
            case "from":
                horizontalConstraint.setY(draggedPlayer.y);
                verticalConstraint1.setX(draggedPlayer.x);
                return;
            case "for":
            case "none":
            default:
                return;
        }
    }
}

// on mouse release stops dragging the player underneath and hides the constraint highlights
function mouseReleased() {
    stopDraggingPlayer();
}

function touchEnded() {
    stopDraggingPlayer();
}

function stopDraggingPlayer() {
    if (draggedPlayer) {
        hideConstraintsForDragged();
        hideConstraintsFromDragged();
    }
    draggedPlayer = null;
}

// resets the position of the players in the draggable court to the neutral reference
function resetRotation() {
    currentRotation.reset();
}

// sets the position of the player in the draggable court to the receive position
function copyReceiveRotation() {
    currentRotation.copyCourtPositions(receiveRotations[currentSelectedIndex]);
}

// sets the position of the players in the draggable court to the defense position
function copyDefenseRotation() {
    currentRotation.copyCourtPositions(defenseRotations[currentSelectedIndex])
}

function toggleInvalidColor() {
    disableInvalidColorFlag = !disableInvalidColorFlag;
    for (let i = 0; i < draggableRotations.length; ++i) {
        draggableRotations[i].setInvalidColor(disableInvalidColorFlag);
    }
}

// shows the positional constraints for the currently dragged player and which players are the source for those constraints
function showConstraintsForDragged() {
    const draggedIndex = currentRotation.getIndexByRole(draggedPlayer.role);
    const previous = currentRotation.getPreviousPlayer(draggedPlayer);
    const next = currentRotation.getNextPlayer(draggedPlayer);
    const opposite = currentRotation.getOppositePlayer(draggedPlayer);
    switch (draggedIndex) {
        // players in position 1 and 4
        case 0:
        case 3:
            verticalConstraint1.setX(previous.x);
            horizontalConstraint.setY(next.y);
            constraints = [verticalConstraint1, horizontalConstraint];
            previous.showHighlight();
            next.showHighlight();
            priorityPlayers = [previous, next, draggedPlayer];
            return;
        // players in position 2 and 5
        case 1:
        case 4:
            horizontalConstraint.setY(previous.y)
            verticalConstraint1.setX(next.x);
            constraints = [verticalConstraint1, horizontalConstraint];
            previous.showHighlight();
            next.showHighlight();
            priorityPlayers = [previous, next, draggedPlayer];
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
            priorityPlayers = [previous, next, opposite, draggedPlayer];
            return;
    }
}

// hides the positional constraints for the currently dragged player and which players are the source for those constraints
function hideConstraintsForDragged() {
    for (let i = 0; i < priorityPlayers.length; ++i) {
        priorityPlayers[i].hideHighlight();
    }
    constraints = [];
    priorityPlayers = [];
}

// shows the constraints generated by the currently dragged player
function showConstraintsFromDragged() {
    horizontalConstraint.setY(draggedPlayer.y);
    verticalConstraint1.setX(draggedPlayer.x);
    constraints = [horizontalConstraint, verticalConstraint1];
    draggedPlayer.showHighlight();
    priorityPlayers = [draggedPlayer];
}

// hides the constraints generated by the currently dragged player
function hideConstraintsFromDragged() {
    draggedPlayer.hideHighlight();
    constraints = [];
    priorityPlayers = [];
}