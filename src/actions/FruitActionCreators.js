var FruitConstants  = require("../constants/FruitConstants");
var FruitDispatcher = require("../dispatcher/FruitDispatcher");

var ActionTypes = FruitConstants.ActionTypes; 

module.exports = {

	clearFruities: function() {
		FruitDispatcher.dispatch({
			type: ActionTypes.CLEAR_ALL_FRUITS
		});
	}

};