function getReceiveP1(x, y, courtSize, roles) {
    const receive_p1 = new Rotation(x, y, courtSize, roles, 0);
    receive_p1.updateCourtPositionByIndex(0, 11 / 12 * courtSize, 8 / 15 * courtSize);
    receive_p1.updateCourtPositionByIndex(1, 5 / 6 * courtSize, 9 / 20 * courtSize);
    receive_p1.updateCourtPositionByIndex(2, 2 / 15 * courtSize, 7 / 30 * courtSize);
    receive_p1.updateCourtPositionByIndex(3, 1 / 10 * courtSize, 1 / 10 * courtSize);
    receive_p1.updateCourtPositionByIndex(4, 1 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p1.updateCourtPositionByIndex(5, 1 / 2 * courtSize, 3 / 4 * courtSize);
    return receive_p1;
}

function getReceiveP2(x, y, courtSize, roles) {
    const receive_p2 = new Rotation(x, y, courtSize, roles, 1);
    receive_p2.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p2.updateCourtPositionByIndex(1, 2 / 3 * courtSize, 1 / 10 * courtSize);
    receive_p2.updateCourtPositionByIndex(2, 1 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p2.updateCourtPositionByIndex(3, 1 / 10 * courtSize, 1 / 6 * courtSize);
    receive_p2.updateCourtPositionByIndex(4, 1 / 3 * courtSize, 9 / 10 * courtSize);
    receive_p2.updateCourtPositionByIndex(5, 1 / 2 * courtSize, 3 / 4 * courtSize);
    return receive_p2;
}

function getReceiveP3(x, y, courtSize, roles) {
    const receive_p3 = new Rotation(x, y, courtSize, roles, 2);
    receive_p3.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p3.updateCourtPositionByIndex(1, 9 / 10 * courtSize, 4 / 15 * courtSize);
    receive_p3.updateCourtPositionByIndex(2, 2 / 3 * courtSize, 1 / 10 * courtSize);
    receive_p3.updateCourtPositionByIndex(3, 1 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p3.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    receive_p3.updateCourtPositionByIndex(5, 2 / 3 * courtSize, 9 / 10 * courtSize);
    return receive_p3;
}

function getReceiveP4(x, y, courtSize, roles) {
    const receive_p4 = new Rotation(x, y, courtSize, roles, 3);
    receive_p4.updateCourtPositionByIndex(0, 9 / 10 * courtSize, 9 / 10 * courtSize);
    receive_p4.updateCourtPositionByIndex(1, 1 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p4.updateCourtPositionByIndex(2, 1 / 6 * courtSize, 1 / 4 * courtSize);
    receive_p4.updateCourtPositionByIndex(3, 1 / 10 * courtSize, 1 / 10 * courtSize);
    receive_p4.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    receive_p4.updateCourtPositionByIndex(5, 4 / 5 * courtSize, 3 / 5 * courtSize);
    return receive_p4;
}

function getReceiveP5(x, y, courtSize, roles) {
    const receive_p5 = new Rotation(x, y, courtSize, roles, 4);
    receive_p5.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p5.updateCourtPositionByIndex(1, 11 / 12 * courtSize, 1 / 5 * courtSize);
    receive_p5.updateCourtPositionByIndex(2, 1 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p5.updateCourtPositionByIndex(3, 1 / 10 * courtSize, 1 / 10 * courtSize);
    receive_p5.updateCourtPositionByIndex(4, 1 / 6 * courtSize, 4 / 15 * courtSize);
    receive_p5.updateCourtPositionByIndex(5, 1 / 2 * courtSize, 3 / 4 * courtSize);
    return receive_p5;
}

function getReceiveP6(x, y, courtSize, roles) {
    const receive_p6 = new Rotation(x, y, courtSize, roles, 5);
    receive_p6.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p6.updateCourtPositionByIndex(1, 11 / 12 * courtSize, 4 / 15 * courtSize);
    receive_p6.updateCourtPositionByIndex(2, 2 / 3 * courtSize, 1 / 10 * courtSize);
    receive_p6.updateCourtPositionByIndex(3, 1 / 5 * courtSize, 3 / 5 * courtSize);
    receive_p6.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    receive_p6.updateCourtPositionByIndex(5, 3 / 5 * courtSize, 1 / 5 * courtSize);
    return receive_p6;
}

function getNeutralDefenseP1(x, y, courtSize, roles) {
    const formation_p1 = new Rotation(x, y, courtSize, roles, 0, true);
    formation_p1.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p1.updateCourtPositionByIndex(1, 1 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p1.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    formation_p1.updateCourtPositionByIndex(3, 5 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p1.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    formation_p1.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return formation_p1;
}

function getNeutralDefenseP2(x, y, courtSize, roles) {
    const formation_p2 = new Rotation(x, y, courtSize, roles, 1, true);
    formation_p2.updateCourtPositionByIndex(0, 1 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p2.updateCourtPositionByIndex(1, 5 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p2.updateCourtPositionByIndex(2, 1 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p2.updateCourtPositionByIndex(3, 1 / 2 * courtSize, 1 / 10 * courtSize);
    formation_p2.updateCourtPositionByIndex(4, 4 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p2.updateCourtPositionByIndex(5, 1 / 2 * courtSize, 3 / 4 * courtSize);
    return formation_p2;
}

function getNeutralDefenseP3(x, y, courtSize, roles) {
    const formation_p3 = new Rotation(x, y, courtSize, roles, 2, true);
    formation_p3.updateCourtPositionByIndex(0, 1 / 2 * courtSize, 3 / 4 * courtSize);
    formation_p3.updateCourtPositionByIndex(1, 1 / 2 * courtSize, 1 / 10 * courtSize);
    formation_p3.updateCourtPositionByIndex(2, 5 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p3.updateCourtPositionByIndex(3, 1 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p3.updateCourtPositionByIndex(4, 1 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p3.updateCourtPositionByIndex(5, 4 / 5 * courtSize, 3 / 5 * courtSize);
    return formation_p3;
}

function getNeutralDefenseP4(x, y, courtSize, roles) {
    const formation_p4 = new Rotation(x, y, courtSize, roles, 3, true);
    formation_p4.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p4.updateCourtPositionByIndex(1, 1 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p4.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    formation_p4.updateCourtPositionByIndex(3, 5 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p4.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    formation_p4.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return formation_p4;
}

function getNeutralDefenseP5(x, y, courtSize, roles) {
    const formation_p5 = new Rotation(x, y, courtSize, roles, 4, true);
    formation_p5.updateCourtPositionByIndex(0, 1 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p5.updateCourtPositionByIndex(1, 5 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p5.updateCourtPositionByIndex(2, 1 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p5.updateCourtPositionByIndex(3, 1 / 2 * courtSize, 1 / 10 * courtSize);
    formation_p5.updateCourtPositionByIndex(4, 4 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p5.updateCourtPositionByIndex(5, 1 / 2 * courtSize, 3 / 4 * courtSize);
    return formation_p5;
}

function getNeutralDefenseP6(x, y, courtSize, roles) {
    const formation_p6 = new Rotation(x, y, courtSize, roles, 5, true);
    formation_p6.updateCourtPositionByIndex(0, 1 / 2 * courtSize, 3 / 4 * courtSize);
    formation_p6.updateCourtPositionByIndex(1, 1 / 2 * courtSize, 1 / 10 * courtSize);
    formation_p6.updateCourtPositionByIndex(2, 5 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p6.updateCourtPositionByIndex(3, 1 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p6.updateCourtPositionByIndex(4, 1 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p6.updateCourtPositionByIndex(5, 4 / 5 * courtSize, 3 / 5 * courtSize);
    return formation_p6;
}

// this variant keeps A1 and O in their starting positions instead of swapping after the receive
function getNoFrontSwapDefenseP1(x, y, courtSize, roles) {
    const formation_p1 = new Rotation(x, y, courtSize, roles, 0, true);
    formation_p1.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    formation_p1.updateCourtPositionByIndex(3, 1 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p1.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    formation_p1.updateCourtPositionByIndex(1, 5 / 6 * courtSize, 1 / 4 * courtSize);
    formation_p1.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    formation_p1.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return formation_p1;
}