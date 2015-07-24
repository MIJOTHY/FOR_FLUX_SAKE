"use strict";
import FruitDispatcher from "../dispatcher/FruitDispatcher";
import ActionTypes from "../constants/FruitConstants";
import createStore from "../utils/createStore";

let _headerText = "";
let _fruities   = [
			{ id: "123456", fruit: "Chicken", quantity:6 },
			{ id: "123467", fruit: "Apples" , quantity:2 },
			{ id: "123478", fruit: "Oranges", quantity:4 },
			{ id: "123489", fruit: "Peaches", quantity:1 }
		];

const FruitStore = createStore({

	getFruities() {
		return _fruities;
	},

	getText() {
		return _headerText;
	}

});

FruitDispatcher.register(action => {
	switch (action.type) {

		case ActionTypes.CHANGE_TEXT:
			_headerText = action.contents;
			FruitStore.emitChange();
			break;

		case ActionTypes.ADD_FRUIT:
			const freshFruit = {
				id: Date.now().toString().slice(-6),
				fruit: action.contents,
				quantity: 1
			};
			_fruities.push(freshFruit);
			_headerText = "";
			FruitStore.emitChange();
			break;

		case ActionTypes.CLEAR_ALL_FRUITS:
			_fruities = [];
			FruitStore.emitChange();
			break;

		case ActionTypes.INCREMENT_QUANTITY:
			_fruities = _fruities.map(ele => {
				if (ele.id === action.contents) ele.quantity += 1;

				return ele;
			});
			FruitStore.emitChange();
			break;

		case ActionTypes.DECREMENT_QUANTITY:
			let newFruities = [];
			_fruities.forEach(ele => {
				if (ele.id === action.contents) {
					if (ele.quantity === 0) return;

					ele.quantity -= 1;
				}
				newFruities.push(ele);
			});
			_fruities = newFruities;
			FruitStore.emitChange();
			break;

	}
});

export default FruitStore;