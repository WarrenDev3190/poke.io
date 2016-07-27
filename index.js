var PokemonGo = require('pokemon-go-node-api');
var fs = require('fs');

var ACCOUNT_NAME = '...'; // your email or account name
var PASSWORD = '...'; // your password
var PROVIDER = '...'; //either 'google' or 'ptc'
var FILENAME = 'example.json'; //where

var a = new PokemonGo.Pokeio();
var LOCATION = {
	type: 'coords',
	coords:{
		latitude: 36.1485, // centenial park
		longitude: 86.8125 //
	}
}

// helper function to get pokemon from inventory
function handleGetInventory(err, iv){
  if(err) throw err;
  pokemon = iv.inventory_delta.inventory_items.map(function(item){
    return item.inventory_item_data.pokemon
  });
  fs.writeFileSync(FILENAME, JSON.stringify(pokemon));
}

a.init(ACCOUNT_NAME,PASSWORD, LOCATION, PROVIDER, function (err) {
	if(err) throw err;
  console.log('1[i] Current location: ' + a.playerInfo.locationName);
  console.log('1[i] lat/long/alt: : ' + a.playerInfo.latitude + ' ' + a.playerInfo.longitude + ' ' + a.playerInfo.altitude);
  a.GetProfile(function(err, profile) {
    a.GetInventory(handleGetInventory)
  });
})