const character = ["Nameless knight", "The Cat", "Julia"];

const bossTarget = Math.floor(Math.random() * character.length);

const monster = document.querySelector("#appearing-monster");

const knight = document.querySelector("#nameless-knight");

const action = document.querySelector("p");

let monsterAlive = false;
console.log(monsterAlive);

//target selector
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
//listen for click on the knight to run hero attack function
knight.addEventListener("click", () => {
  heroAttack();
  monsterSpawn();
});
const heroAttack = () => {
  let damage = 0;
  damage = Math.floor(Math.random() * 10);
  if (damage === 0) {
    action.textContent = `your attack missed and did ${damage} on the boss!`;
    console.log("i did no dmg");
  } else {
    action.textContent = ` you strike the boss dealing ${damage}HP`;
    console.log("i did dmg");
  }
};

//does a 1/4 check if a monster should spawn
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
    monsterSelector(monsterType);
    console.log("summoned monster!!");
  }
};
