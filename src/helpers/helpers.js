

export function randomScheme(schemes){
  shuffle(schemes)
  return schemes[0]
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
// trying to fliter villains to have one of each in the array.
//work on this step tomorrow
function trimVillains(villain){
  var trimArray = []
  for (let card in villain)
  if
}
