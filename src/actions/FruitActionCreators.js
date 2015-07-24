"use strict";
import ActionTypes from "../constants/FruitConstants";
import FruitDispatcher from "../dispatcher/FruitDispatcher";

export default {
	changeText(newText) {
		FruitDispatcher.dispatch({
			type: ActionTypes.CHANGE_TEXT,
			contents: newText
		});
	},

	addFruit(fruitName) {
		FruitDispatcher.dispatch({
			type: ActionTypes.ADD_FRUIT,
			contents: fruitName
		});
	},

	clearFruities() {
		FruitDispatcher.dispatch({
			type: ActionTypes.CLEAR_ALL_FRUITS
		});
	},

	incrementQuantity(id) {
		FruitDispatcher.dispatch({
			type: ActionTypes.INCREMENT_QUANTITY,
			contents: id
		});
	},

	decrementQuantity(id) {
		FruitDispatcher.dispatch({
			type: ActionTypes.DECREMENT_QUANTITY,
			contents: id
		});
	}
};