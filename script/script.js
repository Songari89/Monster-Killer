const ATTACK_VALUE = 70;
const MONSTER_ATTACK_VALUE = 80;
const STRONG_ATTACK_VALUE = 95;
const HEAL_VALUE = 50;
let hasBonusLife = true;
let gameover = false;
let battleLog = [];
let lastLoggedEntry;

const LOG_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_PLAYER_HEAL = "PLAYER HEAL";
const GAME_OVER = "GAME_OVER";

//로그로 받을 정보 정리 event정보(player공격인지 monster공격인지, damage값, target, 결과 그리고 그 정보를 객체로 만들 것.
function writeLog(ev, damage, playerHealth, monsterHealth) {
  // if (playerHealth < 0) {
  //   playerHealth = 1;
  // }
  // if (monsterHealth < 0) {
  //   monsterHealth = 1;
  // }
  let logEntry = {
    Event: ev,
    Value: damage,
    FinalPlayerHaalth: parseInt(playerHealth),
    FinalMonsterHealth: parseInt(monsterHealth),
  };

  battleLog.push(logEntry);
}

function endRound() {
  if (gameover) {
    alert("Game Over");
    return;
  }
  const initialHealth = playerHealthBar;
  const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  writeLog(
    LOG_MONSTER_ATTACK,
    parseInt(monsterDamage),
    playerHealthBar,
    monsterHealthBar
  );
  if (playerHealthBar <= 1 && hasBonusLife) {
    hasBonusLife = false;
    setBonusLife(hasBonusLife);
    // removeBonusLife();
    setPlayerHealth(initialHealth);
    alert("Bonus Life saved you!");
    writeLog(
      "USE BONUSLIFE",
      parseInt(monsterDamage),
      initialHealth,
      monsterHealthBar
    );
  }
  if (monsterHealthBar <= 1) {
    alert("You Win!");
    monsterHealthBar = 0;
    gameover = true;
    writeLog(GAME_OVER, "Player Won", playerHealthBar, monsterHealthBar);
  } else if (playerHealthBar <= 1) {
    alert("You lost!");
    playerHealthBar = 0;
    gameover = true;
    writeLog(GAME_OVER, "Monster Won", playerHealthBar, monsterHealthBar);
  } else if (monsterHealthBar <= 0 && playerHealthBar <= 0) {
    alert("You have a draw!");
    monsterHealthBar = 0;
    playerHealthBar = 0;
    gameover = true;
    writeLog(GAME_OVER, "A Draw", playerHealthBar, monsterHealthBar);
  }
  changeHealthBar();
}

function resetHandler() {
  resetGame(chosenHealthBar);
  gameover = false;
  hasBonusLife = true;
  setBonusLife(hasBonusLife);
  writeLog("GAME_RESET", " ", playerHealthBar, monsterHealthBar);
}

function attackHandler() {
  const playerAttackDamage = dealMonsterDamage(ATTACK_VALUE);
  writeLog(
    LOG_PLAYER_ATTACK,
    parseInt(playerAttackDamage),
    playerHealthBar,
    monsterHealthBar
  );
  endRound();
}

function strongAttackHandler() {
  const playerStrongAttackDamage = dealMonsterDamage(STRONG_ATTACK_VALUE);
  writeLog(
    LOG_PLAYER_ATTACK,
    parseInt(playerStrongAttackDamage),
    playerHealthBar,
    monsterHealthBar
  );
  endRound();
}

function healHandler() {
  if (chosenHealthBar - playerHealthBar < HEAL_VALUE) {
    alert("You have a enough energy!");
  } else {
    incresePlayerHealth(HEAL_VALUE);
  }
  writeLog(LOG_PLAYER_HEAL, HEAL_VALUE, playerHealthBar, monsterHealthBar);
  endRound();
}

function printBattleLog() {
  for (let i = battleLog.length - 1; i >= 0; i--) {
    const logEntry = battleLog[i];
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry > i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break;
    }
  }
}

attackBtn.addEventListener("click", attackHandler);
strongattackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
resetBtn.addEventListener("click", resetHandler);
showLogBtn.addEventListener("click", printBattleLog);
