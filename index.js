const characters = {
  knight: {
    health: 50,
    damage: 10,
    attackSound: "sound/sword attack.wav",
  },
  archer: {
    health: 50,
    damage: 18,
    attackSound: "sound/arrow attack.wav",
  },
  cat: {
    health: 50,
    damage: 12,
    attackSound: "sound/cat attack.wav",
  },
  boss: {
    health: 150,
    damage: 5,
    attackSound: "sound/boss attack.wav",
  },
  minion: {
    health: 0,
    damage: 0,
  },
};
const audioElement = document.createElement("audio");
audioElement.volume = 0.05

const character = [characters.knight, characters.archer, characters.cat];

const bossTarget = Math.floor(Math.random() * character.length);

const monster = document.querySelector("#appearing-monster");

const knight = document.querySelector("#nameless-knight");

const action = document.querySelector("p");

const archer = document.querySelector("#julia-the-archer");

const cat = document.querySelector("#the-cat");

const catLifeBar = document.querySelector("#the-cat-hp-div");

const knightLifeBar = document.querySelector("#nameless-knight-hp-div");

const archerLifeBar = document.querySelector("#julia-the-archer-hp-div");

const bossLifeBar = document.querySelector("#big-boss-hp-div");

const damageRoll = (maxDamage) => Math.floor(Math.random() * maxDamage);

catLifeBar.textContent = characters.cat.health;

knightLifeBar.textContent = characters.knight.health;

archerLifeBar.textContent = characters.archer.health;

bossLifeBar.textContent = characters.boss.health;

let bossAttackCycle = 3000;
//check if heros are alive
let herosAlive = true;
if (
  characters.archer.health < 0 &&
  characters.knight.health < 0 &&
  characters.cat.health < 0
) {
  action.textContent = " YOU LOST";
}

let monsterAlive = false;
function monsterChecker() {
  if (characters.minion.health < 1) {
    monsterAlive = false;
    monster.src = "";
  }
  if (characters.boss.health < 0) {
    setTimeout(function () {
      action.textContent = "YOU WON!";
      console.log("du vant!!");
    }, 6000);
  }
}
console.log(monsterAlive);
// damageRoll(boss.damage)
//target selector for heros
const target = () => {
  if (monsterAlive === true) {
    attackMonster();
  } else {
    attackBoss();
  }
};

//selecting which monster to appear
function monsterSelector(monsterType) {
  if (monsterType === 1) {
    monster.src = "./images/bat.png";
  } else {
    monster.src = "./images/slime.png";
  }
}

//listen for click on the knight to run an attack on boss or monster
knight.addEventListener("click", () => {
  if (characters.knight.health < 1) {
    action.textContent = `The nameless knight is dead and cannot attack`;
  } else {
    audioElement.src = characters.knight.attackSound;
    audioElement.play();
    knightAttack();
    bossAttack();
  }
});
//listen for click on the cat to run an attack on boss or monster
cat.addEventListener("click", () => {
  if (characters.cat.health < 1) {
    action.textContent = `cat is dead and cannot attack`;
  } else {
    audioElement.src = characters.cat.attackSound;
    audioElement.play();
    catAttack();
    bossAttack();
  }
});
//listen for click on the archer to run an attack on boss or monster
archer.addEventListener("click", () => {
  if (characters.archer.health < 1) {
    action.textContent = `Julia the archer is dead and cannot attack`;
  } else {
    audioElement.src = characters.archer.attackSound;
    audioElement.play();
    archerAttack();
    bossAttack();
  }
});

//rolls the knights attack
const knightAttack = () => {
  let damage = 0;
  damage = damageRoll(characters.knight.damage);
  if (damage === 0) {
    action.textContent = `your attack missed and did ${damage} on the boss!`;
    console.log("i did no dmg");
  } else if (monsterAlive === true) {
    characters.minion.health -= damage;
    action.textContent = ` you strike the minion dealing ${damage}HP`;
    console.log("i did dmg to minion");
    monsterChecker();
  } else {
    characters.boss.health -= damage;
    action.textContent = `you strike the boss dealing ${damage}HP`;
    console.log("i did dmg to boss");
    bossLifeBar.textContent = characters.boss.health;
  }
};
//archer attack roll
const archerAttack = () => {
  let damage = 0;
  damage = damageRoll(characters.archer.damage);
  if (damage === 0) {
    action.textContent = `your attack missed and did ${damage} on the boss!`;
    console.log("i did no dmg");
  } else if (monsterAlive === true) {
    characters.minion.health -= damage;
    action.textContent = ` you strike the minion dealing ${damage}HP`;
    console.log("i did dmg to minion");
    monsterChecker();
  } else {
    characters.boss.health -= damage;
    action.textContent = ` you strike the boss dealing ${damage}HP`;
    console.log("i did dmg");
    bossLifeBar.textContent = characters.boss.health;
  }
};
//cat attack roll
const catAttack = () => {
  let damage = 0;
  damage = damageRoll(characters.cat.damage);
  if (damage === 0) {
    action.textContent = `your attack missed and did ${damage} on the boss!`;
    console.log("i did no dmg");
  } else if (monsterAlive === true) {
    characters.minion.health -= damage;
    action.textContent = ` you strike the minion dealing ${damage}HP`;
    console.log("i did dmg to minion");
    monsterChecker();
  } else {
    characters.boss.health -= damage;
    action.textContent = ` you strike the boss dealing ${damage}HP`;
    console.log("i did dmg");
    bossLifeBar.textContent = characters.boss.health;
  }
};

//does a 1/4 check if a monster should spawn and which one should be summoned
const monsterSpawn = () => {
  const spawn = Math.floor(Math.random() * 3);
  if (spawn > 1 && spawn < 3) {
    console.log("doesnt summon");
    return;
  } else if (monsterAlive === true) {
    console.log("already monster summoned");
    return;
  } else {
    const monsterType = Math.ceil(Math.random() * 2);
    monsterAlive = true;
    characters.minion.health = 15;
    monsterSelector(monsterType);
    setTimeout(function () {
      action.textContent = `and he summons a monster!!`;
    }, 2000);
    console.log("summoned monster!!");
  }
};
//boss attack function
function bossAttack() {
  if (characters.boss.health <= 0) {
    action.textContent = `YOU WON!!`;
    console.log("boss doesnt attack");
  } else {
    let damage = 0;
    const attackTarget = Math.floor(Math.random() * character.length);

    let bossTurn = setTimeout(function () {
      console.log(damage);
      monsterSpawn();

      if (attackTarget === 0 && characters.knight.health > 0) {
        damage = damageRoll(characters.boss.damage);
        characters.knight.health -= damage;
        action.textContent = `Big boss attacks dealing ${damage} to the Knight`;
        bossAttackCycle = 3000;
        audioElement.src = characters.boss.attackSound;
        audioElement.play();
      } else if (attackTarget === 1 && characters.cat.health > 0) {
        damage = damageRoll(characters.boss.damage);
        characters.cat.health -= damage;
        action.textContent = `Big boss attacks dealing ${damage} to the Cat`;
        bossAttackCycle = 3000;
        audioElement.src = characters.boss.attackSound;
        audioElement.play();
      } else if (attackTarget === 2 && characters.archer.health > 0) {
        damage = damageRoll(characters.boss.damage);
        characters.archer.health -= damage;
        action.textContent = `Big boss attacks dealing ${damage} to the Archer`;
        bossAttackCycle = 3000;
        audioElement.src = characters.boss.attackSound;
        audioElement.play();
      } else {
        bossAttackCycle = 0;
        bossAttack();
      }

      //  console.log(characters.archer.health);
      //  console.log(characters.cat.health);
      //  console.log(characters.knight.health);
      catLifeBar.textContent = characters.cat.health;
      knightLifeBar.textContent = characters.knight.health;
      archerLifeBar.textContent = characters.archer.health;
    }, bossAttackCycle);
  }
}
