var keyMirror = require("react/lib/keymirror");

module.exports = {
	ActionTypes: keyMirror({
		INCREMENT_FRUIT: null,
		DECREMENT_FRUIT: null,
		ADD_FRUIT_ITEM: null,
		CHANGE_TEXT: null,
		CLEAR_ALL_FRUITS: null
	})
};