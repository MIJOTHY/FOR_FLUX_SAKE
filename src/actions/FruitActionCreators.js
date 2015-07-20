"use strict";
import { ActionTypes } from "../constants/FruitConstants";
import { dispatch } from FruitDispatcher from "../dispatcher/FruitDispatcher";

export default {
	changeText(newText) {
		dispatch({
			type: ActionTypes.CHANGE_TEXT,
			contents: newText
		});
	},

	addFruit(fruitName) {
		dispatch({
			type: ActionTypes.ADD_FRUIT,
			contents: fruitName
		});
	},

	clearFruities() {
		dispatch({
			type: ActionTypes.CLEAR_ALL_FRUITS
		});
	},

	incrementQuantity(id) {
		dispatch({
			type: ActionTypes.INCREMENT_QUANTITY,
			contents: id
		});
	},

	decrementQuantity(id) {
		dispatch({
			type: ActionTypes.DECREMENT_QUANTITY,
			contents: id
		});
	}
};