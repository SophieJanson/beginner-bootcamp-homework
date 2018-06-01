// Variables

const hero = {
  name: "CommitMan",
  heroic: true,
  inventory: [1, 2],
  health: 1,
  weapon: {
    type: "git commit",
    damage: 1
  }
};

// ## Section 2. Implementing the game logic
// #### Declare the following functions in global scope:
//
// - `equipWeapon` is a function that takes a changes the weapon of the creature to one that is in their inventory and removes that weapon from their inventory.
//     1. `equipWeapon` should have two parameters. `creature` and `index`. You can assume that creature has the same structure as your `hero` object and that `index` is a number.
//     2. modify the `weapon` of the `creature` by assigning it the value of the `index`th element of the `inventory`
//     3. modify the creature's `inventory` by removing the `index`th element from it
//     4. return the `creature` object from the function
//
// - `doBattle` is a function that takes two creatures, the first of which is a hero, which deal damage to each other until one of them dies.
//     1. `doBattle` should have two parameters `heroicCreature` and `creature`. You can assume that both have the same structure as your `hero` object.
//     2. make a guard clause which checks if `heroicCreature` is `heroic`. If `heroicCreature` is not `heroic` return `null` from this function.
//     3. while `heroicCreature` and `creature` have health above zero they take turns dealingDamage to eachother: `heroicCreature` deals damage to `creature` first. If `creature` survives it deals damage to `heroicCreature`.
//     4. at the end of `doBattle` check if `heroicCreature` has health above zero; if so return it from the function. Otherwise give the user feedback about the death of their hero with a popup.
//
// If you've implemented these instructions you console in the browser should read:
//
// `Function tests passed! `

// Game logic
function rest(creature) {
  creature.health = 10;
  return creature;
};
function pickUpItem(creature, item) {
  creature.inventory.push(item);
  return creature;
};

function dealDamage(attacker, defender) {
  defender.health -= attacker.weapon.damage;
  return defender;
};

function equipWeapon(creature, index) {
  let newWeapon = creature.inventory[index];
  creature.weapon = newWeapon;
  creature.inventory.splice(newWeapon, 1); //fix
  return creature;
};

function doBattle(heroicCreature, creature) {
  if(!heroicCreature.heroic) {
    return null;
  }

  while(heroicCreature.health > 0 && creature.health > 0) {
    dealDamage(heroicCreature, creature);
    if(creature.health < 1) {
      break;
    }
    dealDamage(creature, heroicCreature);
  };

  if(heroicCreature.health > 0) {
    return heroicCreature;
  }
  alert("Your hero died. It's a sad day.")
};

// UI
