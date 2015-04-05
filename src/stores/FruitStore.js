var FruitDispatcher 		= require("../dispatcher/FruitDispatcher");
var FruitConstants  		= require("../constants/FruitConstants");
var EventEmitter 			= require("events").EventEmitter;
var assign 					= require("object-assign");

var ActionTypes  = FruitConstants.ActionTypes;
var CHANGE_EVENT = "change";

var _headerText = "";
var _fruities   = [
			{ id: "123456", fruit: "Chicken", quantity:6 },
			{ id: "123467", fruit: "Apples" , quantity:2 },
			{ id: "123478", fruit: "Oranges", quantity:4 },
			{ id: "123489", fruit: "Peaches", quantity:1 }
		];

var FruitStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getFruities: function() {
		return _fruities;
	},

	getText: function() {
		return _headerText;
	}

});

FruitDispatcher.register(function(action) {

	switch(action.type) {

		case ActionTypes.CHANGE_TEXT:
			_headerText = action.contents;
			FruitStore.emitChange();
			break;
		
		case ActionTypes.ADD_FRUIT: 
			var freshFruit = {
				id: Date.now().toString().slice(-6),
				fruit: action.contents,
				quantity: 1
			};
			console.log(freshFruit.id);
			_fruities.push(freshFruit);
			_headerText = "";
			FruitStore.emitChange();
			break;

		case ActionTypes.CLEAR_ALL_FRUITS:
			_fruities = [];
			FruitStore.emitChange();
			break;

		case ActionTypes.INCREMENT_QUANTITY:
			_fruities = _fruities.map(function(ele) {
				if (ele.id === action.contents) ele.quantity += 1;
				return ele;
			});
			FruitStore.emitChange();
			break;

		case ActionTypes.DECREMENT_QUANTITY:
			newFruities = [];
			_fruities.forEach(function(ele) {
				if (ele.id === action.contents) {
					if (ele.quantity === 0) return;
					ele.quantity -= 1;
				}
				return newFruities.push(ele);
			});
			_fruities = newFruities;
			FruitStore.emitChange();
			break;

	}
});

module.exports = FruitStore;