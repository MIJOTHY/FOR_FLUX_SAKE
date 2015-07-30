"use strict";
var React = require("react");

module.exports = function connectToStores(arrayOfStores, getStateFromStores) {
	return function(ComponentToConnect) {
		return React.createClass({
			getInitialState: function() {
				return getStateFromStores();
			},

			componentWillMount: function() {
				arrayOfStores.forEach(function(store) {
					store.addChangeListener(this.onStoreChange)
				}.bind(this));
			},

			componentWillUnmount: function() {
				arrayOfStores.forEach(function(store) {
					store.removeChangeListener(this.onStoreChange)
				}.bind(this));
			},

			onStoreChange: function() {
				this.setState(getStateFromStores());
			},

			render: function() {
				return <ComponentToConnect {...this.state} {...this.props} />;
			}
		});
	};
}
