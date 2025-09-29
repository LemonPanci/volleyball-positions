import { Court } from './Court.js';
import { Rotation } from './Rotation.js';
import { Player } from './Player.js';
import { VerticalConstraint } from './VerticalConstraint.js';
import { HorizontalConstraint } from './HorizontalConstraint.js';
import {
    getReceiveP1,
    getReceiveP2,
    getReceiveP3,
    getReceiveP4,
    getReceiveP5,
    getReceiveP6,
    getNoFrontSwapDefenseP1,
    getNeutralDefenseP2,
    getNeutralDefenseP3,
    getNeutralDefenseP4,
    getNeutralDefenseP5,
    getNeutralDefenseP6
} from './formations.js';
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
// Number of the currently selected rotation
let currentSelectedIndex = 0;
// list of players to be drawn on the top layer (above the constraint lines)
let priorityPlayers = [];
// role currently selected for displaying constraints
let selectedRole;
// Constraint Objects
let verticalConstraint1;
let verticalConstraint2;
let horizontalConstraint;
let constraints = [];
// some configs
const validPlayerColor = "lightgreen";
const invalidPlayerColor = "red";
const courtTitleSize = 30;

window.setup = () => {
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

    rotationRadio.changed(onRotationChange);

    repaint();
}

function repaint() {
    background('white');

    // draw court titles
    displayCourtTitle('Riferimento', referenceCourt);
    displayCourtTitle('Ricezione', receiveCourt);
    displayCourtTitle('Difesa', defenseCourt);

    // draw courts
    referenceCourt.display();
    receiveCourt.display();
    defenseCourt.display();

    // draw players from the currently selected rotation
    referenceRotations[currentSelectedIndex].display();
    receiveRotations[currentSelectedIndex].display();
    defenseRotations[currentSelectedIndex].display();

    // draw constraint lines, if any
    constraints.forEach(constraint => constraint.display());

    // draw highlighted players, if any
    priorityPlayers.forEach(player => player.display());
}

// Writes a label/title above the top left corner of the provided court
function displayCourtTitle(title, court) {
    push();
    textAlign(LEFT, BOTTOM);
    textSize(courtTitleSize);
    textStyle(BOLD);
    text(title, court.x, court.y);
    pop();
}

/**
 * highlights the clicked role in all 3 courts
 * updates the constraint for the player in the receive court
 * repaints the canvas
 */
window.mouseClicked = () => {
    if (mouseY < 0) {
        // prevent changes when clicking the rotation radio, in order to keep selection across different rotations
        return;
    }
    const candidateRole = getRoleByPosition(mouseX, mouseY);
    updateSelectedRole(candidateRole);
    updateConstraintsForRole(selectedRole, receiveRotations[currentSelectedIndex]);
    repaint();
}

/**
 * updates the rotation index
 * updates the constraint for the player in the changed rotation
 * repaints the canvas
 */
function onRotationChange() {
    currentSelectedIndex = Number(rotationRadio.value());
    updateConstraintsForRole(selectedRole, receiveRotations[currentSelectedIndex]);
    repaint();
}

// returns the role for the player in the rotation at the position, if any
function getRoleInRotationByPosition(x, y, rotation) {
    return rotation.getRoleByPosition(x, y);
}

// returns the role of the player at the position on any of the 3 courts
function getRoleByPosition(x, y) {
    let role = getRoleInRotationByPosition(x, y, referenceRotations[currentSelectedIndex]);
    if (role) {
        return role;
    }
    role = getRoleInRotationByPosition(x, y, receiveRotations[currentSelectedIndex]);
    if (role) {
        return role;
    }
    role = getRoleInRotationByPosition(x, y, defenseRotations[currentSelectedIndex]);
    if (role) {
        return role;
    }
}

// sets selectedRole to a new role, or deselects it if already selected
function updateSelectedRole(candidate) {
    hideSelectedHighlightsGlobally();
    if (!candidate || candidate && selectedRole && candidate === selectedRole) {
        selectedRole = undefined;
    } else {
        selectedRole = candidate;
    }
    showSelectedHighlightsGlobally();
}

// set the selectedHighlight flag to true for a specified role across all rotations and rotations
function showSelectedHighlightsGlobally() {
    referenceRotations.forEach(rotation => rotation.showSelectedHighlightByRole(selectedRole));
    receiveRotations.forEach(rotation => rotation.showSelectedHighlightByRole(selectedRole));
    defenseRotations.forEach(rotation => rotation.showSelectedHighlightByRole(selectedRole));
}

// set the selectedHighlight flag to false for a specified role across all rotations and rotations
function hideSelectedHighlightsGlobally() {
    referenceRotations.forEach(rotation => rotation.hideAllSelectedHighlights());
    receiveRotations.forEach(rotation => rotation.hideAllSelectedHighlights());
    defenseRotations.forEach(rotation => rotation.hideAllSelectedHighlights());
}

// wrapper to call updateConstraintsForPlayer deriving the player from the given role
function updateConstraintsForRole(role, rotation) {
    const player = rotation.getPlayerByRole(role);
    updateConstraintsForPlayer(player, rotation);
}

/**
 * turns on highlight for player giving constraints,
 * sets the correct constraint positions,
 * adds them to the list of constraints to be displayed,
 * and adds the relevant player to the priority display list
 * 
 * The function assumes that the player belongs to the provided rotation
 */
function updateConstraintsForPlayer(player, rotation) {
    clearConstraints();
    if (!player) {
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
            attachConstraintToPlayer(verticalConstraint1, previous);
            attachConstraintToPlayer(horizontalConstraint, next);
            break;
        // players in position 2 and 5
        case 1:
        case 4:
            attachConstraintToPlayer(horizontalConstraint, previous);
            attachConstraintToPlayer(verticalConstraint1, next);
            break;
        // players in position 3 and 6
        case 2:
        case 5:
            attachConstraintToPlayer(verticalConstraint1, previous);
            attachConstraintToPlayer(verticalConstraint2, next);
            attachConstraintToPlayer(horizontalConstraint, opposite);
            break;
    }
    priorityPlayers.push(player);
}

function attachConstraintToPlayer(constraint, player) {
    constraint.setToPlayer(player);
    constraints.push(constraint);
    player.showConstraintHighlight();
    priorityPlayers.push(player);
}

function clearConstraints() {
    priorityPlayers.forEach(current => {
        current.hideConstraintHighlight();
    });
    priorityPlayers = [];
    constraints = [];
}