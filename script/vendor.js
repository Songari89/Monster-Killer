// HTMl 요소 가져오기
const monsterHealth = document.getElementById("monsterhealth");
const playerHealth = document.getElementById("playerhealth");
const bonusLife = document.getElementById("bonuslife");

const attackBtn = document.getElementById("attack");
const strongattackBtn = document.getElementById("strongattack");
const healBtn = document.getElementById("heal");
const showLogBtn = document.getElementById("showlog");

const resetBtn = document.getElementById("reset")

const userEnterValue = prompt("You Enter Life for You and Monster.", "300");

let chosenHealthBar = userEnterValue;
let monsterHealthBar = chosenHealthBar;
let playerHealthBar = chosenHealthBar;

changeHealthBar();

//monster, player HP setting
function changeHealthBar() {
  monsterHealth.style.setProperty("width", `${monsterHealthBar}px`);
  playerHealth.style.setProperty("width", `${playerHealthBar}px`);
}

//monster, player damage setting
function dealMonsterDamage(damage) {
  const playerDamage = Math.random() * damage;
  monsterHealthBar = monsterHealthBar - playerDamage;
  return playerDamage;
}

function dealPlayerDamage(damage) {
  const monsterDamage = Math.random() * damage;
  playerHealthBar = playerHealthBar - monsterDamage;
  return monsterDamage;
}

function incresePlayerHealth(healValue) {
  playerHealthBar = playerHealthBar + healValue;
}

function resetGame(value) {
  playerHealthBar = value;
  monsterHealthBar = value;
  changeHealthBar();
}

function removeBonusLife() {
    bonusLife.parentNode.removeChild(bonusLife);
  }


function setPlayerHealth(health) {
  playerHealthBar = health;
  playerHealth.style.setProperty("width", `${playerHealthBar}px`);
}
