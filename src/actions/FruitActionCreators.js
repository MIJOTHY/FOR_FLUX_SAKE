var FruitConstants  = require("../constants/FruitConstants");
var FruitDispatcher = require("../dispatcher/FruitDispatcher");

var ActionTypes = FruitDispatcher.ActionTypes; 

module.exports = {

	clearFruities: function() {
		FruitDispatcher.dispatch({
			eventType: ActionTypes.CLEAR_ALL_FRUITS
		});
	}

};