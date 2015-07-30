# ![flux logo](/assets/img/flux_logo_fandc.png) FOR_FLUX_SAKE ![flux logo](/assets/img/flux_logo_fandc.png)

# Advanced Patterns

In a larger application, you'll find yourself writing the same flux boilerplate over and over again. This gets fairly tedious fairly quickly. There are a few simple ways you can reduce boilerplate through abstraction of a flux application. Many independent flux implementations tend to just take different approaches to reducing boilerplate, and don't provide much more (other than server-side rendering, or 'isomorphism' to be fancy). I'll be using some ideas borrowed from gaearon in an example app he made, and these ideas stay to true to vanilla flux but with some nice abstractions.

Incidentally, gaearon has his own flux implementation that offers some very nice things on top of reduction of boilerplate (the isomorphism typical to flux implementations, but also hot-loading, stores as pure functions, and more).

The two primary abstractions made are:
1. A higher-level component purely for the purposes of connecting to store(s) and fetching data.
2. A store-generating utility function, that takes some store methods and returns a store object with the standard emit/connect/disconnect methods.

These files are both found in `utils`, the former is called `connectToStores`, the latter `createStore`. Below are some commented versions of the files.

# connectToStores

```js
"use strict";
var React = require("react");

// Export a function that returns a function that takes a component
// and wraps it in a purely data-fetching component
module.exports = function connectToStores(arrayOfStores, getStateFromStores) {
	return function(ComponentToConnect) {
		return React.createClass({
			getInitialState: function() {
				return getStateFromStores();
			},

			componentWillMount: function() {
				// In general cases, we want to subscribe to stores when the component is in the
				// about-to-mount phase. Since a component will likely be subscribing to multiple stores
				// in a larger app, we pass in an array of stores to connect to.
				arrayOfStores.forEach(function(store) {
					store.addChangeListener(this.onStoreChange)
				}.bind(this));
			},

			componentWillUnmount: function() {
				// Just as we subscribe to a store when a component mounts, we also want to clean up
				// after ourselves when the component is no longer going to be mounted in the page.
				arrayOfStores.forEach(function(store) {
					store.removeChangeListener(this.onStoreChange)
				}.bind(this));
			},

			onStoreChange: function() {
				// Our typical state-setting callback that fetches data using a getState function passed in to the
				// higher order component.
				this.setState(getStateFromStores());
			},

			render: function() {
				// All we want this component to render is the component that we passed in, but
				// with the fetched data (hence the use of the spread operator)
				return <ComponentToConnect {...this.state} {...this.props} />;
			}
		};
	};
}
```

See FruitApp for example usage of such a component. These sorts of components should not be though of as merely abstracting out repeated functionality, but also should be seen as seperating concerns in an efficient and correct manner - data-fetching is a different responsibility to churning out DOM, and so should hence lie in a different component.

#createStore

```js
"use strict";
var EventEmitter = require("events").EventEmitter;
var objectAssign = require("object-assign");

var CHANGE_EVENT = "change";

// Export a function that takes a specification object containing the store's methods
// and decorates that specification object with some typical store methods.
// objectAssign will merge the specification into the decorating object, with the spec taking precedence.
// However, these methods shouldn't need to be overriden.
// Aside: stores aren't quite pub-sub systems in the flux pattern. See the facebook dispatcher's source code
// for comments and code as to why this is.
module.exports = function(spec) {
	var emitter = new EventEmitter();
	// We set the max listeners to 0 as we don't want to impose a limit on the number of listeners.
	// This often shouldn't matter but it's worth keeping in mind that there is a default limit of 10,
	// and you may not always want that limit.
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
```

See FruitStore for example usage of this function.
This should look fairly familiar if you've been following the tutorial thus far. It is merely some abstraction of code we've already written.
If you find yourself using more methods as part of your store boilerplate, rather than directly modifying this fairly abstract and single-concern utility method, I would instead make another utility function with the same idea as this one, but with the methods and properties you wish to be conferred onto your store, and then define a basic `compose` function so that you can `compose(createStore, addMoreToStore)(spec)`.

If you're not entirely sure what function composition is, let's break it down with reference to what we're doing here with stores. Our `createStore` function takes an object, and returns a new object. Our `addMoreToStore` function operates in the same way - it takes an object, and returns a new object. These functions have no side effects - they merely take a value and return a value. In this sense, they are 'pure'. If this is the case, then it would be nice to be able to condense these functions into a single function - one that takes an object and returns an object, only this time, it returns an object that has got the functionality conferred upon it by both the `createStore` and `addMoreToStore` functions. We would like to `compose` those two functions together so that we just have one function.
Since this was a very brief explanation and one particular to our case, I really recommend giving 'function composition' a google. A generic `compose` function is very resusable across projects and is a staple in functional programming. It also makes you feel pretty badass.