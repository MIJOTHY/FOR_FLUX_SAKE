"use strict";
var EventEmitter   = require("events").EventEmitter;
var objectAssign   = require("object-assign");

var CHANGE_EVENT = "change";

module.exports = function(spec) {
	var emitter = new EventEmitter();
	emitter.setMaxListeners(0);

	var store = objectAssign({
		emitChange: function() {
			emitter.emit(CHANGE_EVENT);
		},

		addChangeListener: function(callback) {
			emitter.on(CHANGE_EVENT, callback);
		},

		removeChangeListener: function(callback) {
			emitter.removeListener(CHANGE_EVENT, callback);
		}
	}, spec);

	// Auto-bind store methods for convenience
	Object.keys(store).forEach(function(method) {
		if (typeof store[method] === "function") {
			store[method] = store[method].bind(store);
		}
	});

	return store;
};
