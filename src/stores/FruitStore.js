var FruitDispatcher 		= require("../dispatcher/FruitDispatcher");
var EventEmitter 			= require("events").EventEmitter;
var assign 					= require("object-assign");

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

		case "CLEAR_ALL_FRUITS":
			_fruities = [];
			FruitStore.emitChange();
			break;
	}
});

module.exports = FruitStore;