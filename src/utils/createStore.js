"use strict";
import { EventEmitter } from "events";
import objectAssign from "object-assign";

const CHANGE_EVENT = "change";

export default function createStore(spec) {
	const emitter = new EventEmitter();
	emitter.setMaxListeners(0);

	const store = objectAssign({
		emitChange() {
			emitter.emit(CHANGE_EVENT);
		},

		addChangeListener(callback) {
			emitter.on(CHANGE_EVENT, callback);
		},

		removeChangeListener(callback) {
			emitter.removeListener(CHANGE_EVENT, callback);
		}
	}, spec);

	// Auto-bind store methods for convenience
	let methods = Object.keys(store);

	methods.forEach(method => {
		if (typeof store[method] === "function") {
			store[method] = store[method].bind(store);
		}
	});

	return store;
}
