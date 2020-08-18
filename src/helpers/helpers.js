

export function randomScheme(schemes){
  shuffle(schemes)
  return schemes[0]
}

export function trimSideScheme(schemes){
  trimScheme(schemes)
  return schemes
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// build loop
function trimScheme(array){

var newArray = []

 for  ( let card in array){
  if (card.real_name != "Collapsing Bridge")
  newArray.push(card)
  }

return newArray
}
//.map for villains

//   (card.real_name === "Collapsing Bridge", card.real_name === "Goblin Nation", card.real_name === "Overrun", card.real_name === "Goblin Reinforcements", card.real_name === "Payoff", card.real_name === "Oscorp Manufacturing")
// }
