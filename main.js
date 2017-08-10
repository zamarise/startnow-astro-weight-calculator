//All planets and their values
var planets = [
  ['Pluto', 0.06],
  ['Neptune', 1.148],
  ['Uranus', 0.917],
  ['Saturn', 1.139],
  ['Jupiter', 2.640],
  ['Mars', 0.3895],
  ['Moon', 0.1655],
  ['Earth', 1],
  ['Venus', 0.9032],
  ['Mercury', 0.377],
  ['Sun', 27.9]
];

//Populate dropdown
var sel = document.getElementById('planets');
var fragment = document.createDocumentFragment();
planets.forEach(function(x, index) {
    var opt = document.createElement('option');
    opt.innerHTML = x[0];
    opt.value = x[1];
    fragment.appendChild(opt);
});
sel.appendChild(fragment);

//Get user weight and their selected planet name and do calculation
function calculateWeight(userWeight, selectedPlanetName) {
  var planetWeight; //undefined

  for (var index = 0; index < planets.length; index++) {
    var pair = planets[index]; // ['Pluto', 0.06]
    var name = pair[0]; // 'Pluto'
    var weight = pair[1]; // 0.06
    
    if (selectedPlanetName === name) {
      planetWeight = weight;
    }

  }
  console.log('selectedPlanetName', selectedPlanetName);
  return userWeight * planetWeight;

}

//Fires when button is clicked
function handleClickEvent(e) {

  var userWeight = $('#userWeight').val();
  var planetName = $('#planets :selected').text();
  var result = calculateWeight(userWeight, planetName);
  var sentence = "If you were on " + planetName + ", you would weigh " + result + " pounds!";
  $('#output').text(sentence);

}

//button to use handleClickEvent
var button = document.getElementById('calculateWeight');
button.onclick = handleClickEvent