// Court Objects
let draggableCourt;
// Lists of Rotation Objects
let draggableRotations;
let referenceRotations;
let receiveRotations;
let defenseRotations;
// Currently displayed draggable Rotation Object
let currentRotation;
// Inputs
let resetButton;
let rotationRadio;
let courtRadio;
let constraintsRadio;
let formationRadio;
let invalidColorRadio;
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
    const headerElement = select('header');
    const instructionElement = select('#instructions');
    const availableHeight = windowHeight - headerElement.height - instructionElement.height;
    const canvasSize = (availableHeight > windowWidth) ? windowWidth * 4 / 5 : availableHeight;
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent("canvas");
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
    draggableCourt = new Court(courtX, courtY, courtSize);

    draggableRotations = [
        new Rotation(courtX, courtY, courtSize, roles, 0),
        new Rotation(courtX, courtY, courtSize, roles, 1),
        new Rotation(courtX, courtY, courtSize, roles, 2),
        new Rotation(courtX, courtY, courtSize, roles, 3),
        new Rotation(courtX, courtY, courtSize, roles, 4),
        new Rotation(courtX, courtY, courtSize, roles, 5)
    ];

    // set up reference rotations
    referenceRotations = [
        new Rotation(courtX, courtY, courtSize, roles, 0),
        new Rotation(courtX, courtY, courtSize, roles, 1),
        new Rotation(courtX, courtY, courtSize, roles, 2),
        new Rotation(courtX, courtY, courtSize, roles, 3),
        new Rotation(courtX, courtY, courtSize, roles, 4),
        new Rotation(courtX, courtY, courtSize, roles, 5)
    ];

    // set up receive rotations
    receiveRotations = [
        getReceiveP1(courtX, courtY, courtSize, roles),
        getReceiveP2(courtX, courtY, courtSize, roles),
        getReceiveP3(courtX, courtY, courtSize, roles),
        getReceiveP4(courtX, courtY, courtSize, roles),
        getReceiveP5(courtX, courtY, courtSize, roles),
        getReceiveP6(courtX, courtY, courtSize, roles)
    ];

    // set up defense rotation
    defenseRotations = [
        getNoFrontSwapDefenseP1(courtX, courtY, courtSize, roles),
        getNeutralDefenseP2(courtX, courtY, courtSize, roles),
        getNeutralDefenseP3(courtX, courtY, courtSize, roles),
        getNeutralDefenseP4(courtX, courtY, courtSize, roles),
        getNeutralDefenseP5(courtX, courtY, courtSize, roles),
        getNeutralDefenseP6(courtX, courtY, courtSize, roles)
    ];


    // constraint lines
    horizontalConstraint = new HorizontalConstraint(courtX, courtX + courtSize, 0, 'red');
    verticalConstraint1 = new VerticalConstraint(0, courtY, courtY + courtSize, 'red');
    verticalConstraint2 = new VerticalConstraint(0, courtY, courtY + courtSize, 'red');

    resetButton = createButton('Resetta Posizioni');
    resetButton.mousePressed(setRotation);
    resetButton.parent("reset_button");

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

    rotationRadio.changed(setRotation);

    // radio to select the formation for the current rotation
    let formationRadioTitle = createP('Formazione');
    formationRadioTitle.parent("formation_menu_title");

    formationRadio = createRadio();
    formationRadio.parent("formation_menu_options");

    formationRadio.option("base", 'Base');
    formationRadio.option("receive", 'Ricezione');
    formationRadio.option("defense", 'Difesa');

    formationRadio.selected("base");

    formationRadio.changed(setRotation);

    // radio to select which version of the court to display: normal, divided in zones, or without any lines
    let courtRadioTitle = createP('Tipo di Campo');
    courtRadioTitle.parent("court_menu_title");

    courtRadio = createRadio();
    courtRadio.parent("court_menu_options");

    courtRadio.option("normal", 'Normale');
    courtRadio.option("zones", 'Zone');
    courtRadio.option("nolines", 'Senza linee');

    courtRadio.selected("normal");

    // radio to select which version of the court to display: normal, divided in zones, or without any lines
    let constraintsRadioTitle = createP('Limiti di Posizione');
    constraintsRadioTitle.parent("constraint_menu_title");

    constraintsRadio = createRadio();
    constraintsRadio.parent("constraint_menu_options");

    constraintsRadio.option("for", 'per il giocatore');
    constraintsRadio.option("from", 'dal giocatore');
    constraintsRadio.option("none", 'nessuno');

    constraintsRadio.selected("for");

    // radio to toggle the invalid color for the draggable players in positional foul
    let invalidColorRadioTitle = createP('Verifica Giocatori in Fallo di Posizione');
    invalidColorRadioTitle.parent("foul_menu_title");

    invalidColorRadio = createRadio();
    invalidColorRadio.parent("foul_menu_options");

    invalidColorRadio.option("enabled", 'Abilita');
    invalidColorRadio.option("disabled", 'Disabilita');

    invalidColorRadio.selected("enabled");

    invalidColorRadio.changed(toggleInvalidColor);

    // radio to toggle the display of the starting position under each player role
    let startingPositionRadioTitle = createP('Mostra posizione di riferimento');
    startingPositionRadioTitle.parent("starting_position_menu_title");

    startingPositionRadio = createRadio();
    startingPositionRadio.parent("starting_position_menu_options");

    startingPositionRadio.option("enabled", 'Abilita');
    startingPositionRadio.option("disabled", 'Disabilita');

    startingPositionRadio.selected("enabled");

    startingPositionRadio.changed(setStartingPosition);
}

function draw() {
    background('white');

    draggableCourt.setOption(courtRadio.value());
    draggableCourt.display();

    currentSelectedIndex = Number(rotationRadio.value());
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

// sets the position of the player in the draggable court to the receive position
function copyReceiveRotation() {
    currentRotation.copyCourtPositions(receiveRotations[currentSelectedIndex]);
}

// sets the position of the players in the draggable court to the defense position
function copyDefenseRotation() {
    currentRotation.copyCourtPositions(defenseRotations[currentSelectedIndex])
}

function setRotation() {
    let rotationsToCopy;
    switch (formationRadio.value()) {
        case "receive":
            rotationsToCopy = receiveRotations;
            break;
        case "defense":
            rotationsToCopy = defenseRotations;
            break;
        case "base":
        default:
            rotationsToCopy = referenceRotations;
            break;
    }
    for (let i = 0; i < draggableRotations.length; ++i) {
        draggableRotations[i].copyCourtPositions(rotationsToCopy[i]);
    }
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
            previous.showConstraintHighlight();
            next.showConstraintHighlight();
            priorityPlayers = [previous, next, draggedPlayer];
            return;
        // players in position 2 and 5
        case 1:
        case 4:
            horizontalConstraint.setY(previous.y)
            verticalConstraint1.setX(next.x);
            constraints = [verticalConstraint1, horizontalConstraint];
            previous.showConstraintHighlight();
            next.showConstraintHighlight();
            priorityPlayers = [previous, next, draggedPlayer];
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
            priorityPlayers = [previous, next, opposite, draggedPlayer];
            return;
    }
}

// hides the positional constraints for the currently dragged player and which players are the source for those constraints
function hideConstraintsForDragged() {
    for (let i = 0; i < priorityPlayers.length; ++i) {
        priorityPlayers[i].hideConstraintHighlight();
    }
    constraints = [];
    priorityPlayers = [];
}

// shows the constraints generated by the currently dragged player
function showConstraintsFromDragged() {
    horizontalConstraint.setY(draggedPlayer.y);
    verticalConstraint1.setX(draggedPlayer.x);
    constraints = [horizontalConstraint, verticalConstraint1];
    draggedPlayer.showConstraintHighlight();
    priorityPlayers = [draggedPlayer];
}

// hides the constraints generated by the currently dragged player
function hideConstraintsFromDragged() {
    draggedPlayer.hideConstraintHighlight();
    constraints = [];
    priorityPlayers = [];
}

function setStartingPosition() {
    switch (startingPositionRadio.value()) {
        case "enabled":
            draggableRotations.forEach(rotation => {
                rotation.showStartingPositions();
            });
            return;
        case "disabled":
            draggableRotations.forEach(rotation => {
                rotation.hideStartingPositions();
            });
            return;
    }
}