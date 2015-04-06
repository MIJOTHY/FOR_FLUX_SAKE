var FruitConstants  = require("../constants/FruitConstants");
var FruitDispatcher = require("../dispatcher/FruitDispatcher");

var ActionTypes = FruitConstants.ActionTypes; 

module.exports = {

	changeText: function(newText) {
		FruitDispatcher.dispatch({
			type: ActionTypes.CHANGE_TEXT,
			contents: newText
		});
	},

	addFruit: function(fruitName) {
		FruitDispatcher.dispatch({
			type: ActionTypes.ADD_FRUIT,
			contents: fruitName
		});
	},

	clearFruities: function() {
		FruitDispatcher.dispatch({
			type: ActionTypes.CLEAR_ALL_FRUITS
		});
	},

	incrementQuantity: function(id) {
		FruitDispatcher.dispatch({
			type: ActionTypes.INCREMENT_QUANTITY,
			contents: id
		});
	},
	decrementQuantity: function(id) {
		FruitDispatcher.dispatch({
			type: ActionTypes.DECREMENT_QUANTITY,
			contents: id
		});
	},

};