# ![flux logo](/assets/img/flux_logo_fandc.png) FOR_FLUX_SAKE ![flux logo](/assets/img/flux_logo_fandc.png)
A simple tutorial for simple people who want to use flux with react.
This tutorial follows on from [my react tutorial (WIP)](https://github.com/MIJOTHY/REACT_SCHMEACT).

##Introduction
In this tutorial, we'll be converting a purely React app into one built with the Flux design pattern. By doing so, I hope you can see why you might want to use Flux if you're using React, and how you might start going about changing your app accordingly.  
This tutorial isn't intended to take you the whole way to competency with Flux, but it is meant to bridge the pretty significant gap between not knowing Flux and being able to understand most tutorials online. It tries to do this by slowly morphing something you hopefully already understand into one built according to the principles of the Flux architecture (how grand does that sound).  

## Pre-requisites
Although this tutorial attempts to be as beginner-friendly as possible, it does make some assumptions about your background. It assumes:
 * Familiarity with __Javascript__ (you understand what `.bind()` does, and when it might be needed),
 * Familiarity with __NodeJS__ (you understand the module.exports/require pattern, and know of EventEmitters),
 * Some experience with __React__ (you understand the difference between state and props, where state should lie, and how components can set the state of other components),
 * Some experience with __Git__ (we'll be switching branches now and again).  

If you don't feel comfortable with any of these, tutorials for these are everywhere. I've linked a few at the bottom of this readme if you're feeling a bit lost though.  

We'll be using __React__ and __Flux__. Other than a number of build tools and __object-assign__, we won't be using anything else. So no funky random modules required into our code to make learning difficult. Oh yeah, and keyMirror, which is included with React.  

"Apart from __object-assign and keyMirror__", I hear you quip. Well, all object- assign is is a nice utility module filling in for an [es6 feature we don't yet have](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). In a nutshell, it lets you copy the properties of some source objects and stick them in a destination object. But read the readme and the link above for more details if you want.  
KeyMirror just takes an object as an argument and returns an object with the values the same as the keys. So `keyMirror({"blah": null})` returns `{"blah": "blah"}`. What a lifesaver.  

## Getting Started
```
// -- Terminal window -- \\
git clone https://github.com/MIJOTHY/FOR_FLUX_SAKE.git
cd FOR_FLUX_SAKE
npm install gulp browserify -g
npm install
gulp

// -- Terminal window 2 -- \\
python -m SimpleHTTPServer

// -- browser -- \\
localhost:8000
```

So now you've installed the shizzle, you're good to get coding, right? Wrong. We've got some preparatory work to do first.  
If you're on master, you'll be looking at the fully Flux-ified version. 
I highly recommend comparing the purely React version, the mid-transition-to-Flux version and the fully Flux version, which you can do with a `git checkout` between `reactversion`, `clearfruitversion` and `master`. If you're still gulping and server-ing, you'll be able to refresh your browser and see the new version. But it's the code we're interested in here.

##What is Flux?
Flux is not a library, or even a module. It's a design pattern more than anything else. If you've done much React, you'll know that a big part of the design philosophy behind it is this __unidirectional data flow__ concept. Having a one-way flow of data through your app is meant to make interactions easier to reason about, as well as leading to a significantly more robust app as complexity grows. Although technically you can `npm install flux`, all you get is the facebook dispatcher. This is a crucial part of this tutorial, but there are a plethora of other ways to implement Flux design principles without their particular flux module.  
Safe, thanks for that m8, but what's Flux?

## The flow
1. Some sort of interaction happens in the view  
2. This creates an action, which the dispatcher dispatches  
3. Stores react to the dispatched action if they're interested, updating their internal state     
4. After updating, the stores emit a change event  
5. The stateful view component hears the change event of stores it is listening to  
6. The stateful view component asks the stores for new data, calling setState with the new data

There's a lot there, but I'll try to break it down.  

###__Actions__:  
An action in Flux is what's made when something happens. If you want a user to be able to submit a registration form by clicking on a button, then you want the user's interaction with the form to __create an action__. So, in our React version, contained within all of those 'onChange/Click' functions are actions, which are then dispatched. "So what you're saying is, if I click on something, that's not an action in itself, but it creates an action?" Yh, don't blame me for the unintuitiveness. Just accept it. Your click is an interaction. And stop talking to your computer.    
Anyway, to give these more context, I'll introduce...  

###__The Dispatcher__:  
You can think of this as being like a radio station. All it does is broadcast actions when they happen, and let things tune in to hear those broadcasts. Instead of your 'onClick' function using a callback passed down to it through props to set the state of your application, you'll instead have it use the dispatcher to dispatch a __specific action__. Where does it get dispatched to? Nowhere, everywhere, whatever. It just __gets dispatched__. The dispatcher isn't a postperson. The dispatcher just dispatches. It releases actions into the air for anyone to hear if they're tuned in.    
So how specific are these actions meant to be? Well, you'll probably want to give them two things: a __type__ and a __payload__. Why? Well, when a user submits a form, you want to take care of that interaction appropriately. You need to know that what just happened was a form submission, so you can treat it as such. Also, you need the information contained within the form. Sometimes you can get away with just a __type__. Sometimes you might want some other identifying bit of data. But for now, let's stick with __type__ and __payload__.  

In order to react to dispatched actions, stores (more on these below) need to register a callback with the dispatcher. What this practically means is that you to write some code that explicitly tells your store to actually listen to actions dispatched by the dispatcher, and what to do when it hears them. In this way, stores __can do stuff__ when the dispatcher dispatches something they like. If you want to listen to Kurupt FM to hear your mum get a shout-out so you can tease your brother about it, you need to tune in your radio to whatever frequency those badmen broadcast on, and start listening for some keywords. That's what happens when a store registers a callback with the dispatcher and provides some code to run in it if shoutOut.type === "your mum".    

Also, there's only one dispatcher. It's basically a single, global communication point between your components and your stores. Much nicer than those bloody callbacks passed down through props. Am I right? Yes I am.    

###__Stores__:  
Store's are really important. You know how you've been holding all the logic and data concerning the state of your application in your top-level React component? That really shouldn't be there. It looks pretty messy too. React is first and foremost a __UI library__. Your data and logic concerns should be taken care of elsewhere. What does that mean? It means your React components shouldn't be pushing objects to arrays of data that you then use to set state. React components should simply __ask stores__ for data, and update themselves accordingly. The only thing allowed to update data in your application is the store itself.  

Your store should represent the __ideal state__ of your application at any given time. Let's clarify this with an example. In the React version of the application, if a user types a fruit name into the header and hits enter, that causes the top-level component to push that new fruit to the array of fruities, and then set its state to the new, updated data, causing a re-render and making that new fruit appear on the list.  

Using the Flux pattern, A user would do the same, but rather than this directly causing the top-level component to mess with the data, it would instead dispatch an action with a type of NEW_FRUIT and a payload of whatever the user typed in. Let's say our Fruit Store is listening for this particular action (it does this by registering a callback with the dispatcher, which sounds complicated but should get clearer on seeing the code). Upon hearing this dispatched action, it does what the top-level component used to do. It pushes the new fruit to the array of fruities it holds. So, now a user has taken an action, and the store has updated its internal state. __The view is now out of sync with the data we want it to represent__.  
So, what the store needs to do is to say that it has changed. As long as the view is listening for that particular store's change event, when the store says it has changed, the view should ask the store for the new data to bring it back into sync, call setState, re-render and so the new list item appears on the screen.  

So, a store holds a stock of data, and responds to dispatched actions that it's interested in by updating that data accordingly, before broadcasting an event saying that "I've changed". Any time a store changes its data, it has updated its __internal state__. Whenever a store updates its internal state, it needs to __emit__ a change event. But it can't use the dispatcher for this since this updating isn't an __action__! The dispatcher is only used for __actions__, and only __stores__ listen to the dispatcher. So the store will simply be an `EventEmitter` that emits "change" after every update. If you look in FruitStore.js, you'll see that this all takes place in `FruitDispatcher.register`, which is where it describes what it wants to do once it hears an action from the Dispatcher. 

Things are never __sent__ directly to places. All that happens is that __events get broadcasted__, __things listen for events__, and if they hear an event that they're listening for, they __react accordingly__. Stores listen for specific dispatched actions, and once they hear one that they're interested in, they update their internal state. Views listen for update events from stores that they're interested in, and once they hear them, ask for the fresh data so they can re-render. Note the slight difference. __Actions__ are dispatched with their data contained within them, so anyone listening can immediately get to work with them. __Stores__ emit change events that __only say "I've changed"__, and __don't contain any data__, so __their subscribers have to go to the store to ask for the updated data__.  

I bet that at this point, that rogue apostrophe at the start of this section has been slyly tempting you into thinking of raising an issue to proudly point out how heinous a mistake I've made. Well, the joke's on you. Stores are actually so important that __nobody can reach in and change their data__. The only things that can change their data are __themselves when they hear a dispatched action that they care about__. In more technical terms, there are __no public setters__ provided by stores. The __only public store methods are getters__ (for getting crap from the store) __and ways to subscribe or unsubscribe from the store__ (for letting your components hear it when that store emits a change event, so you can go to get the updated crap from the store). So if you've got a problem with that apostrophe, __tough__. The only way you can get rid of it is to dispatch an action that it's listening for. But you don't have a dispatcher, sucker. I can put apostrophes in any st'o're I like and you can't do shit about it.    

##The App
The app we'll be building with the Flux design pattern is a 5-a-day tracker. But I use it for counting how many pints I've had before lunchtime.  
First you'll see the __old, React version__ built decades ago. Next to it is the __new, Flux version__ we'll be building. How far we've come. Isn't technology great.

![](/assets/img/App-Mockup.png)![](/assets/img/App-Mockup-Flux.png)
###Impressed? I thought so.  Let's break down the functionality of this app.
In the __header__, we can:
* Type text into the header to __filter__ the fruit list
* Type text into the header and click the leaf button/hit enter to __add__ a new fruit item to the list

In each __list item__, we can:
* __Increment__ the quantity we've eaten of a given piece of fruit by clicking the associated plus button.
* __Decrement__ the quantity we've eaten by clicking the minus button, and if we click minus on a 0-quantity fruit item, it __removes__ it from the list.

In the __footer__, we can:
* __Clear__ the entire list by clicking that crappy little restart button.  

Wow, amazing. I feel healthier already.  

## Let's begin
Let's start small. What's the simplest action we have? I'm gonna say it's `clearFruities()`, which we use when someone clicks that reset button in the footer. It's also ridiculously named. Let's ditch `clearFruities()` and move this logic to the FruitStore! We're going to want to:

1. Replace our use of `clearFruities()` in the footer's `clickHandler()` function. Instead, we'll create an action with the type CLEAR_ALL_FRUITS that we'll dispatch with the `FruitDispatcher`. We don't need no payload this time!

2. Create a store to hold the data we use for fruits, and take care of the updating logic for us. We'll also need to get the store listening for dispatched events. In particular, we're gonna want to set it up to listen for actions with a type of CLEAR_ALL_FRUITS, and on hearing that event, have it clear all of the fruit data it's holding. Then it will need to emit a change event, so its subscribers can ask it for the new shiznit.

3. Once we've dealt with the sto're, we'll need to change our top-level component to get its state from that store, rather than taking care of the data and logic on its own!

Exciting. And hey, there's that rogue apostrophe again! I forgot why that's there (__HINT HINT__).  

### Step 1

Ite, you'd better be on the react branch, so you can play along. __`git checkout -b reactversion`__ and __`git pull`__ if you haven't already. You should now have _only react stuff_. First things first, we need to make a __dispatcher__ so we can use it to dispatch actions. How do we do that? Go to your src folder, and create a folder called _/dispatcher_. In there, let's make a file called `FruitDispatcher.js`, and that'll contain these two lines...
```js
var Dispatcher = require("flux").Dispatcher;
module.exports = new Dispatcher();
```
And that's it. We've made our dispatcher. Isn't flux cool? The equals operators even line up without us trying. god thats fluxy.

### Step 1.1
To the FruitFooter!  

Presently, your `clickHandler` looks a bit like this:
```js
e.preventDefault();
this.props.clearFruities()
```
Since we're gonna get fluxy, we don't need (or want) to use this state-changing callback passed down from 'pon high. Instead, we're gonna want to have our click create and dispatch an action for anything that's interested to hear and act upon. For now, we'll do that directly in this file as we're only dealing with this one action, but later on, we'll create a file specifically for creating actions and dispatching them. So, go ahead and __require__ the `FruitDispatcher` you just made, and let's create an action with the type `CLEAR_ALL_FRUITS`. Remember, we won't need a payload this time as we're only sending out a deletion action:
```js
e.preventDefault();
var action = {
	type: "CLEAR_ALL_FRUITS"
}
FruitDispatcher.dispatch(action);

```
If you're feeling fluxy, go ahead and create the action directly within the call to dispatch. I assigned it to the variable `action` here to make it obvious that we're creating an action and then dispatching that action. Refresh your browser page, and start clicking reset like a madperson. One of three things should happen:  
a) An `ERROR` cos you forgot to npm install  
b) An `ERROR` cos you done screwed up  
c) An `ANYTHING` cos you done screwed up  
d) Nothing cos you did good  

### Step 2
This a big one - got to make a store. In the _/src_ folder, let's make a folder called _/stores_, and in there a file called `FruitStore.js`. This store is gonna need a bunch of boilerplate:
```js
var FruitDispatcher = require("../dispatcher/FruitDispatcher");
var EventEmitter    = require("events").EventEmitter;
var assign          = require("object-assign");

// We'll assign this to a variable with a longer name than the string so that 
// we can practice our touch-typing (and so an error is thrown if we make a typo)
var CHANGE_EVENT = "change";

// We create an empty object (a 'singleton', since we're not using a constructor), 
// and assign to it the methods of EventEmitter.prototype and these custom methods
// we're sticking in the object passed as the 3rd argument
var FruitStore = assign({}, EventEmitter.prototype, {

// This is a method so that the store can broadcast to anyone listening that it has changed. 
// We'll want to call this whenever the store updates the data it holds (changes its internal state).
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
// These listener functions are what our views use to make sure they're listening for 
// change events emitted by the store, and to stop listening accordingly.
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

module.exports = FruitStore;
```

Let's move our state into to `FruitStore` so that we can listen for the `CLEAR_ALL_FRUITS` action if it gets dispatched and __clear our stock__ of fruits accordingly if we hear it. Let's insert the following just below `var CHANGE_EVENT = "change";`
```js
var _headerText = "";
var _fruities   = [
			{ id: "123456", fruit: "Chicken", quantity:6 },
			{ id: "123467", fruit: "Apples" , quantity:2 },
			{ id: "123478", fruit: "Oranges", quantity:4 },
			{ id: "123489", fruit: "Peaches", quantity:1 }
		];
```
Mad. So we've done our setup - our __state is now held in the store__, and we've got a bunch of __public un/subscribe__ methods available. Now for the slightly more interesting part - let's register a callback with the FruitDispatcher so that the store can do something when it hears an action of a certain type:
```js
// Start listening to actions dispatched by the dispatcher, 
// And upon hearing one
FruitDispatcher.register(function(action) {
	// Check for its type...
	switch(action.type) {
		// If it's one we want
		case "CLEAR_ALL_FRUITS":
			// Empty our stock of fruities
			_fruities = [];
			// And emit a change event to let anyone listening know that 
			// we've just updated our internal state
			FruitStore.emitChange();
			break;
	}
});
```
### Step 3
#### FruitStore
So, now we've got our state held in the FruitStore rather than in the top-level component of our app, and we have a way to mutate that state through the medium of the dispatcher. What we're missing, however, are ways to __get state from the stores__. From other modules, we _can't access _fruities or _headerText because they're local to this module_. That leading underscore is meant to let us know that they're private. What we'll want to do is give our FruitStore some __public getter methods__. Let's stick these below the public change listener functions:
```js
var FruitStore = assign(
	...
	getFruities: function() {
		return _fruities;
	},

	getText: function() {
		return _headerText;
	}

});
```
Why are these public methods? Because they're methods of an object that we're exporting, so anyone importing the module can call them. Why are these public methods? Because we want them to be accessible to the general public, and these only let them un/subscribe to the store and ask the store for its current state.  

Let's go to FruitApp and fruit some shiz up (...)
#### FruitApp
We'll need to do some cleaning. Let's change `getStateFromData` to `getStateFromStore`. If you haven't guessed already, we're gonna want to import `FruitStore.js` into this file, and make use of the two public getter methods we defined above. So, instead of hardcoding `headerText` and `fruities` there, we can instead say:
```js
return {
	headerText: FruitStore.getText(),
	fruities: FruitStore.getFruities()
};
```
Gd 1. We now have a way to get state from stores, but we're not using it. In order to use it, we'll need to change `getInitialState` so that it calls `getStateFromStore()` rather than `getStateFromData()`. Do that now, refresh your browser, and you should see our default fruits there. Click on the clear fruits button, and if nothing happens, you haven't screwed up yet. Give yourself a pat on the back if you like congratulating yourself for non-achievements.  

#### You wanna fix it yh?
So let's think this through. When our app runs, initially it asks the store for its stock of fruities. When the app gets that stock, it sets its state with it. When we click that clear fruits button, we dispatch an action with type `CLEAR_ALL_FRUITS`. Our store hears that action, and empties its array of `_fruities`. It then emits a `CHANGE_EVENT` and... There's our problem. Firstly, although our `FruitApp` is getting its initial state from the `FruitStore`, it's not subscribed to it so it doesn't get any update notifications. Secondly, in virtue of it not getting any update notifications, it doesn't realise that it should ask the store for its updated state when it changes. Let's fix that. There are 3 methods we'll want to add to `var FruitApp` just under `getInitialState`:
```js
componentDidMount: function() {
	FruitStore.addChangeListener(this._onChange);
},

componentWillUnmount: function() {
	FruitStore.removeChangeListener(this._onChange);
},

_onChange: function() {
	this.setState(getStateFromStore());
},
```
The first one tells our component to, once it mounts, subscribe to `FruitStore` so it can hear any change events that it emits. Take a peek at `addChangeListener` inside `FruitStore` and you'll see that it takes a callback that it passes to `on` to be executed when `CHANGE_EVENT` occurs. In FruitApp, we'll want to call `getStateFromStore` when we hear that the store has changed its state. We'll always want to get the entire state from the store as the store is the caretaker of state for our application. If there's any logic going on, the store takes care of it, so all our view has to do is to ask for that new data and it arrives ready to be rendered. So `_onChange` does that for us - it asks for the updated state and sets the component state with what arrives.  
We'll also want a way for our component to unsubscribe from store notifications if it ever gets removed from the page. We do that in the same way as we subscribe to the store. We pass in the callback so that the component has the freshest state before its untimely demise.    

_Nice_, now our app should fully run. Of course, there's still a considerable amount of legacy code flying about - we're only getting our initial state from the store and only clearing fruities is done properly, but we've laid the groundwork and there's really not much work left to get the app fully fluxified!    

__`Add`__ and __`commit`__, then __`git checkout clearfruitversion`__ to compare your version to mine.

### K, let's do the rest
I'll let you do the rest on your own. But here are some hints:  

### 1. Folder Structure
Try to keep your code __modular__. Move your action creator functions into a seperate file, in which you __create and dispatch the actions__. Define a __set of constants__ for your app that your action creators will use as `type`s, and that your stores will listen for. You should be able to look at your `blahBlahAppConstants.js` file and, at a glance, know every state-mutating action that can occur in your app. For this app, your final product should have a structure that looks a bit like this:
```
/src
	/actions
		FruitActionCreators.js
	/components
		...
	/constants
		FruitConstants.js
	/dispatcher
		FruitDispatcher.js
	/stores
		FruitStore.js
main.js
```
If you start wanting to make api calls or your logic gets a bit bloated, I'd advise making a `util` folder and to stick those capabilities in there. The fundamental thing is to be _sensible_ with splitting up your app though. If a function does more than one thing, it should be split up. If you have a bunch of functions that do similar stuff (such as making API calls or creating actions) but they're in a file not dedicated to that, perhaps it's bloody well time you move them there.  

### 2. Migrating state-mutating functions to the store
Literally all you have to do now is add the relevant `case`s to your switch statement within your callback that's registered with the dispatcher, and then take the logic from your components and put them there. This may also involve creating that `FruitConstants.js` file as seen above and exporting an `ActionTypes` object with a bunch of constants from there.

### 3. Tidying up
Now we can delete all those state-mutating functions in `FruitApp`, those callbacks that we were passing down through props, and change our components so that they use the dispatcher (or, even better, make use of `FruitActionCreators`' methods).

If you're feeling really stuck, you can `git checkout master` to see the final version. 

# gz bud
u shud now be ok to read other flux tuts that r a bit more advanced :)

## Where do I go now?
[Away to a place that will teach you to code really well for free.](http://foundersandcoders.org/apply.html)  

## Good Flux Resources
####Videos:  
[A basic flux app. Skims over a lot, has some unexplained requires, but a good video nonetheless](https://www.youtube.com/watch?v=o5E894TmHJg)  

[Easy to understand app. Funky code and madness modularization, but really good explanation of some of the core Fluxian concepts, and nice code to read on the repo](https://www.youtube.com/watch?v=jnOAbsBsd4g)  

####Posts:
[A really nice and short breakdown of the core concepts of Flux. Highly recommended](http://blog.andrewray.me/flux-for-stupid-people/)  

### Good Prerequisite Resources
[A solid intro to git](https://github.com/NataliaLKB/learn-git-basics)  
[My react tutorial (WIP) (am I allowed to put this here?)](https://github.com/MIJOTHY/REACT_SCHMEACT)  
[A great, brief react overview](http://blog.andrewray.me/reactjs-for-stupid-people/)
