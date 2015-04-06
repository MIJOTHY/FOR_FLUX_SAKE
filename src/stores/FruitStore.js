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
// This is a method so that the store can broadcast to anyone listening that it has changed. We use this whenever the store updates the data it holds.
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
// These listener functions are what our views use to make sure they're listening for change events emitted by the store
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
// These are public 'getter' functions. Anyone importing 'FruitStore' can use these methods to get the data they need. At the moment, 
// there are only two, but as the application gets more complex, we may add more. Also if we find we have multiple different 'domains'
// (e.g. we have an array of users as well), we may create another store for them
	getFruities: function() {
		return _fruities;
	},

	getText: function() {
		return _headerText;
	}

});

// This is how our FruitStore is able to listen to actions dispatched by the FruitDispatcher. We need to register with the dispatcher to be able to hear it.
FruitDispatcher.register(function(action) {

// If we want our Store to update its data when it hears something, we'll need to specify what we want it to do when it hears an event of a particular type
// 'action' is the object we dispatched in our FruitFooter component
	switch(action.type) {

		case "CLEAR_ALL_FRUITS":
			_fruities = [];
			FruitStore.emitChange();
			break;
	}
});

module.exports = FruitStore;