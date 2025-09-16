function getReceiveP1(x, y, courtSize, roles) {
    const hikawa_receive_p1 = new Rotation(x, y, courtSize, roles, 0);
    hikawa_receive_p1.updateCourtPositionByIndex(0, 11 / 12 * courtSize, 8 / 15 * courtSize);
    hikawa_receive_p1.updateCourtPositionByIndex(1, 5 / 6 * courtSize, 9 / 20 * courtSize);
    hikawa_receive_p1.updateCourtPositionByIndex(2, 2 / 15 * courtSize, 7 / 30 * courtSize);
    hikawa_receive_p1.updateCourtPositionByIndex(3, 1 / 10 * courtSize, 1 / 10 * courtSize);
    hikawa_receive_p1.updateCourtPositionByIndex(4, 1 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p1.updateCourtPositionByIndex(5, 1 / 2 * courtSize, 3 / 4 * courtSize);
    return hikawa_receive_p1;
}

function getReceiveP2(x, y, courtSize, roles) {
    const hikawa_receive_p2 = new Rotation(x, y, courtSize, roles, 1);
    hikawa_receive_p2.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p2.updateCourtPositionByIndex(1, 2 / 3 * courtSize, 1 / 10 * courtSize);
    hikawa_receive_p2.updateCourtPositionByIndex(2, 1 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p2.updateCourtPositionByIndex(3, 1 / 10 * courtSize, 1 / 6 * courtSize);
    hikawa_receive_p2.updateCourtPositionByIndex(4, 1 / 3 * courtSize, 9 / 10 * courtSize);
    hikawa_receive_p2.updateCourtPositionByIndex(5, 1 / 2 * courtSize, 3 / 4 * courtSize);
    return hikawa_receive_p2;
}

function getReceiveP3(x, y, courtSize, roles) {
    const hikawa_receive_p3 = new Rotation(x, y, courtSize, roles, 2);
    hikawa_receive_p3.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p3.updateCourtPositionByIndex(1, 9 / 10 * courtSize, 4 / 15 * courtSize);
    hikawa_receive_p3.updateCourtPositionByIndex(2, 2 / 3 * courtSize, 1 / 10 * courtSize);
    hikawa_receive_p3.updateCourtPositionByIndex(3, 1 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p3.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_receive_p3.updateCourtPositionByIndex(5, 2 / 3 * courtSize, 9 / 10 * courtSize);
    return hikawa_receive_p3;
}

function getReceiveP4(x, y, courtSize, roles) {
    const hikawa_receive_p4 = new Rotation(x, y, courtSize, roles, 3);
    hikawa_receive_p4.updateCourtPositionByIndex(0, 9 / 10 * courtSize, 9 / 10 * courtSize);
    hikawa_receive_p4.updateCourtPositionByIndex(1, 1 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p4.updateCourtPositionByIndex(2, 1 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_receive_p4.updateCourtPositionByIndex(3, 1 / 10 * courtSize, 1 / 10 * courtSize);
    hikawa_receive_p4.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_receive_p4.updateCourtPositionByIndex(5, 4 / 5 * courtSize, 3 / 5 * courtSize);
    return hikawa_receive_p4;
}

function getReceiveP5(x, y, courtSize, roles) {
    const hikawa_receive_p5 = new Rotation(x, y, courtSize, roles, 4);
    hikawa_receive_p5.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p5.updateCourtPositionByIndex(1, 11 / 12 * courtSize, 1 / 5 * courtSize);
    hikawa_receive_p5.updateCourtPositionByIndex(2, 1 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p5.updateCourtPositionByIndex(3, 1 / 10 * courtSize, 1 / 10 * courtSize);
    hikawa_receive_p5.updateCourtPositionByIndex(4, 1 / 6 * courtSize, 4 / 15 * courtSize);
    hikawa_receive_p5.updateCourtPositionByIndex(5, 1 / 2 * courtSize, 3 / 4 * courtSize);
    return hikawa_receive_p5;
}

function getReceiveP6(x, y, courtSize, roles) {
    const hikawa_receive_p6 = new Rotation(x, y, courtSize, roles, 5);
    hikawa_receive_p6.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p6.updateCourtPositionByIndex(1, 11 / 12 * courtSize, 4 / 15 * courtSize);
    hikawa_receive_p6.updateCourtPositionByIndex(2, 2 / 3 * courtSize, 1 / 10 * courtSize);
    hikawa_receive_p6.updateCourtPositionByIndex(3, 1 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_receive_p6.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_receive_p6.updateCourtPositionByIndex(5, 3 / 5 * courtSize, 1 / 5 * courtSize);
    return hikawa_receive_p6;
}

function getDefenseP1(x, y, courtSize, roles) {
    const hikawa_defense_p1 = new Rotation(x, y, courtSize, roles, 0, true);
    hikawa_defense_p1.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(1, 1 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(3, 5 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return hikawa_defense_p1;
}

function getDefenseP2(x, y, courtSize, roles) {
    const hikawa_defense_p1 = new Rotation(x, y, courtSize, roles, 1, true);
    hikawa_defense_p1.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(1, 1 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(3, 5 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return hikawa_defense_p1;
}

function getDefenseP3(x, y, courtSize, roles) {
    const hikawa_defense_p1 = new Rotation(x, y, courtSize, roles, 2, true);
    hikawa_defense_p1.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(1, 1 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(3, 5 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return hikawa_defense_p1;
}

function getDefenseP4(x, y, courtSize, roles) {
    const hikawa_defense_p1 = new Rotation(x, y, courtSize, roles, 3, true);
    hikawa_defense_p1.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(1, 1 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(3, 5 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return hikawa_defense_p1;
}

function getDefenseP5(x, y, courtSize, roles) {
    const hikawa_defense_p1 = new Rotation(x, y, courtSize, roles, 4, true);
    hikawa_defense_p1.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(1, 1 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(3, 5 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return hikawa_defense_p1;
}

function getDefenseP6(x, y, courtSize, roles) {
    const hikawa_defense_p1 = new Rotation(x, y, courtSize, roles, 5, true);
    hikawa_defense_p1.updateCourtPositionByIndex(0, 4 / 5 * courtSize, 3 / 5 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(1, 1 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(2, 1 / 2 * courtSize, 1 / 10 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(3, 5 / 6 * courtSize, 1 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(4, 1 / 2 * courtSize, 3 / 4 * courtSize);
    hikawa_defense_p1.updateCourtPositionByIndex(5, 1 / 5 * courtSize, 3 / 5 * courtSize);
    return hikawa_defense_p1;
}