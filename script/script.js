const ATTACK_VALUE = 70;
const MONSTER_ATTACK_VALUE = 80;
const STRONG_ATTACK_VALUE = 95;
const HEAL_VALUE = 50;
let logEntry;

let health = chosenHealthBar;

function endRound() {
  const initialHealth = playerHealthBar;
  dealPlayerDamage(MONSTER_ATTACK_VALUE);
  if (playerHealthBar <= 1 && bonusLife) {
    removeBonusLife();
    setPlayerHealth(initialHealth);
    alert("Bonus Life saved you!");
  }
  if (monsterHealthBar <= 5) {
    alert("You Win!");
    monsterHealthBar = 0;
  } else if (playerHealthBar <= 5) {
    alert("You lost!");
    playerHealthBar = 0;
  } else if (monsterHealthBar <= 5 && playerHealthBar <= 5) {
    alert("You have a draw!");
    monsterHealthBar = 0;
    playerHealthBar = 0;
  }
  changeHealthBar();
  if (playerHealthBar === 0 || monsterHealthBar === 0) {
    resetGame(chosenHealthBar);
  }
  console.log(playerHealthBar, monsterHealthBar);
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
