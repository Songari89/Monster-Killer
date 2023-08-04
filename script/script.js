const ATTACK_VALUE = 70;
const MONSTER_ATTACK_VALUE = 80;
const STRONG_ATTACK_VALUE = 95;
const HEAL_VALUE = 50;
let hasBonusLife = true;
let gameover = false;
let logEntry;

let health = chosenHealthBar;

function endRound() {
  if (gameover) {
    alert("Game Over");
    return;
  }
  const initialHealth = playerHealthBar;
  dealPlayerDamage(MONSTER_ATTACK_VALUE);
  if (playerHealthBar <= 1 && hasBonusLife) {
    hasBonusLife = false;
    setBonusLife(hasBonusLife)
    // removeBonusLife();
    setPlayerHealth(initialHealth);
    alert("Bonus Life saved you!");
  }
  if (monsterHealthBar <= 1) {
    alert("You Win!");
    monsterHealthBar = 0;
    gameover = true;
  } else if (playerHealthBar <= 1) {
    alert("You lost!");
    playerHealthBar = 0;
    gameover = true;
  } else if (monsterHealthBar <= 1 && playerHealthBar <= 1) {
    alert("You have a draw!");
    monsterHealthBar = 0;
    playerHealthBar = 0;
    gameover = true;
  }
  changeHealthBar();
}

function resetHandler() {
  resetGame(chosenHealthBar);
  gameover = false;
  hasBonusLife = true;
  setBonusLife(hasBonusLife);
}

function attackHandler() {
  dealMonsterDamage(ATTACK_VALUE);
  endRound();
}

function strongAttackHandler() {
  dealMonsterDamage(STRONG_ATTACK_VALUE);
  endRound();
}

function healHandler() {
  if (chosenHealthBar - playerHealthBar < HEAL_VALUE) {
    alert("You have a enough energy!");
  } else {
    incresePlayerHealth(HEAL_VALUE);
  }
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongattackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
resetBtn.addEventListener("click", resetHandler);
