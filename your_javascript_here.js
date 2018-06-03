// Variables

const hero = {
  name: "Spiderman",
  heroic: true,
  inventory: [{type: "weapon1", damage: 1}, {type: "weapon2", damage: 3}],
  health: 100,
  weapon: {
    type: "gun",
    damage: 11
  }
};

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
function flip(event, imageGridItem) {
  if (event.target.id === "new-name") {
    return;
  };
  let classes = imageGridItem.classList;
  if(classes.contains('flipped')) {
    classes.remove('flipped');
  } else {
    displaySideB(imageGridItem);
    classes.add('flipped');
  }
  imageGridItem.classList = classes;
  //todo: user event listener instead of onclick and make sure to call content for backside first.
}

function displaySideB(item) {
  //item = HTML id-attribute of selected image.
  let previousStatus;
  let currentStatus;
  let deleteButton;

  switch(item.id) {
    case('hero-bed'):
      previousStatus = hero.health;
      currentStatus  = rest(hero).health;

      document.getElementById('previous-rest-status').innerHTML = previousStatus;
      document.getElementById('current-rest-status').innerHTML = currentStatus;
      console.log("Your hero is well rested");
      break;
    case('hero-weapon'):
      let weapon = {type: 'Sword', damage: 6};
      pickUpItem(hero, weapon);

      document.getElementById('new-weapon').innerHTML = hero.inventory[hero.inventory.length - 1].type;

      deleteButton = document.getElementById('remove-weapon');
      deleteButton.addEventListener("click", function (e) {
        e.stopPropagation();
        removeElementFromDOM(item);
      }, true);
      break;
    case ('hero-enemy'):
      let enemy = { health: 15, weapon: { type: "slingshot", damage: 2 } };
      doBattle(hero, enemy);
      document.getElementById('health-remainder').innerHTML = hero.health;

      deleteButton = document.getElementById('remove-enemy');
      deleteButton.addEventListener("click", function (e) {
        e.stopPropagation();
        removeElementFromDOM(item);
      }, true);
      break;
    case ('hero-backpack'):
      let getIndex = function () {
        let userInput = window.prompt("Provide a number: ");
        return userInput;
      }
      equipWeapon(hero, getIndex());
      document.getElementById('new-selected-weapon').innerHTML = hero.weapon.type;
      break;
    default:
      break;
  };
  updateStats();
};

function removeElementFromDOM(element) {
  element.remove();
  console.log("This element has been removed: ", element);
}

function displayStats() {
  let targetElement = document.getElementById('stats-content');
  let fragmentString = `
    <p>Name: ${hero.name}</p>
    <p>Health: ${hero.health}</p>
    <p>Weapon type: ${hero.weapon.type}</p>
    <p>Weapon damage: ${hero.weapon.damage}</p>
  `;
  targetElement.innerHTML = fragmentString;
};

function displayInventory() {
  let targetElement = document.getElementById('stats-inventory');
  let fragmentString = ``
  hero.inventory.forEach((item) => {
    fragmentString += `<p>Type: ${item.type}, Damage: ${item.damage}`;
  })
  targetElement.innerHTML = fragmentString;
}

function updateStats() {
  displayStats();
  displayInventory();
}

function updateHeroName() {
  let newName = document.getElementById('new-name').value;
  hero.name = newName;
}

function formSubmitEventListener() {
  let form = document.getElementById('change-name');
  form.addEventListener("submit", function (e) {
    e.stopPropagation();
    updateHeroName();
  });
}

