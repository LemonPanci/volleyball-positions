import { Player } from "./Player.js";
const main = document.querySelector("main");
const player = new Player(10, 50, 20, 'P', 0);
if (main) {
    main.innerHTML = `x: ${player.x}, y: ${player.y}, role: ${player.role}`;
}
