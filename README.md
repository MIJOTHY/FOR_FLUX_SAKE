# ![flux logo](/assets/img/flux_logo_fandc.png) FOR_FLUX_SAKE: REACT VERSION ![flux logo](/assets/img/flux_logo_fandc.png)
A simple tutorial for simple people who want to use flux with react.
This tutorial follows on from [my react tutorial (WIP)](https://github.com/MIJOTHY/REACT_SCHMEACT).

##Introduction
In this tutorial, we'll be converting a purely React app into one built with the Flux design pattern. By doing so, I hope you can see why you probably want to use Flux if you're using React, and how you might start going about changing your app accordingly.

## Pre-requisites
Although this tutorial attempts to be as beginner-friendly as possible, it does make some assumptions about your background. It assumes:
 * Familiarity with __Javascript__ (you understand what `.bind()` does, and when it might be needed),
 * Familiarity with __NodeJS__ (you understand the module.exports/require pattern, and know of EventEmitters),
 * Some experience with __React__ (you understand the difference between state and props, where state should lie, and how components can set the state of other components),
 * Some experience with __Git__ (we'll be switching branches now and again).

We'll be using __React__ and __Flux__ in this tutorial. Other than a number of build/dev tools and __object-assign__, we won't be using anything else.

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
Flux is not a library, or even a module. It's a design pattern more than anything else. If you've done much React, you'll know that a big part of the design philosophy behind it is this __unidirectional data flow__ concept. Having a one-way flow of data through your app is meant to make interactions easier to reason about, as well as leading to a significantly more robust app as complexity grows.  
Safe, but what is Flux?

### The flow
i. Some sort of action happens  
ii. Dispatcher dispatches an action [aka event]  
iii. Store reacts to dispatched action [aka event], updating its internal state      
iv. Store emits change event  
v. View reacts to store's change event   

There's a lot there, but I'll try to break it down.  
###__Actions__:  
An action is just what it says, it's something happening. If you want a user to be able to submit a registration form by clicking on a button, then clicking that button is an action. So, in our React version, all of those 'onChange/Click' functions are actions. If you want to update your application when a server sends you new tweets, then receiving those tweets on the client-side is an action.  
###__The Dispatcher__:  
You can think of this as being like a radio station. All it does is broadcast actions when they happen. Instead of your 'onClick' function using a callback passed down to it through props to set the state of your application, you'll instead want to use the dispatcher to dispatch a __specific event__.  
How specific? Well, you'll want to give it two things: a __type__ and a __payload__. Why? Well, when a user submits a form, that action needs to be taken care of appropriately. First you need to know that the action that just happened was a form submission, so you can treat it appropriately (i.e. give it a __type__ of NEW_FORM_SUBMISSION), and secondly you need to also send off the information contained within the form (i.e. put the form data in a __payload__).  
In order to react to specific dispatched events, stores (more on these below) need to register a callback with the dispatcher. What this practically means is that you to write some code that explicitly tells your store to actually listen to the dispatcher in order to hear it, and that tells it to do something when it hears the right thing.  
Also, there's only one of these.
###__Stores__:  
Store's are really important. You know how you've been holding all the logic and data concerning the state of your application in your top-level React component? That really shouldn't be there. It looks pretty messy too. React is first and foremost a __UI library__. Your data and logic concerns should be taken care of elsewhere. What does that mean? It means your React components shouldn't be pushing objects to arrays of data that you then use to set state. React components should simply __ask stores__ for data, and update themselves accordingly. The only thing allowed to update data in your application is the store itself.  

Your store should represent the __ideal state__ of your application at any given time. Let's clarify this with an example. In the React version of the application, if a user types a fruit name into the header and hits enter, that causes the top-level component to push that new fruit to the array of fruities, and then set its state to the new, updated data, causing a re-render and making that new fruit appear on the list.  

Using the Flux pattern, A user would do the same, but rather than this directly causing the top-level component to mess with the data, it would instead dispatch an action with a type of NEW_FRUIT and a payload of whatever the user typed in. Let's say our Fruit Store is listening for this particular action (it does this by registering a callback with the dispatcher, which sounds complicated but should get clearer on seeing the code). Upon hearing this dispatched action, it does what the top-level component used to do. It pushes the new fruit to the array of fruities it holds. So, now a user has taken an action, and the store has updated its internal state. __The view is now out of sync with the data we want it to represent__.  
So, what the store needs to do is to say that it has changed. As long as the view is listening for that particular store's change event, when the store says it has changed, the view should ask the store for the new data to bring it back into sync, call setState, re-render and so the new list item appears on the screen.  

So, a store holds a stock of data, and responds to dispatched actions that it's interested in by updating that data accordingly, before broadcasting an event saying that "I've changed". Any time a store changes its data, it has updated its __internal state__. Whenever a store updates its internal state, it needs to __emit__ a change event. But it can't use the dispatcher for this since this updating isn't an __action__! The dispatcher is only used for __actions__, and only __stores__ listen to the dispatcher. So the store will simply be an `EventEmitter` that emits "change" after every update. If you look in FruitStore.js, you'll see that this all takes place in `FruitDispatcher.register`, which is where it described what it wants to do once it hears an action from the Dispatcher. 

So a big part of Flux is that there's no direct messaging service. Things are never __sent__ directly to places. All that happens is that __events get broadcasted__, __things listen for events__, and if they hear an event that they're listening for, they __react accordingly__. Stores listen for specific actions, and once they hear something they're listening for, they update their internal state. Views listen for update events from store's they're interested in, and once they hear them, ask for the fresh data so they can re-render.

##The App
The app we'll be building with the Flux design pattern is a 5-a-day tracker.
First you'll see the __old, React version__ built decades ago. Next to it is the __new, Flux version__ we'll be building.

![](/assets/img/App-Mockup.png)![](/assets/img/App-Mockup-Flux.png)
###Impressed? I thought so.  Let's break down the functionality of this app.
In the __header__, we can:
* Type text into the header to __filter__ the fruit list
* Type text into the header and click the leaf button/hit enter to __add__ a new fruit item to the list

In each __list item__, we can:
* __Increment__ the quantity we've eaten of a given piece of fruit by clicking the associated plus button.
* __Decrement__ the quantity we've eaten by clicking the minus button, and if we click minus on a 0-quantity fruit item, it __removes__ it from the list.

In the __footer__, we can:
* __Clear__ the entire list by clicking that crappy little restart button


## Let's begin
Let's start small. What's the simplest action we have? I'm gonna say it's `clearFruities()`, which we use when someone clicks that reset button in the footer. Let's ditch `clearFruities()` and move this logic to the FruitStore! We're going to want to:

i. Replace our use of `clearFruities()` in the footer's `clickHandler()` function. Instead, we'll create an action with the type CLEAR_ALL_FRUITS that we'll dispatch with the `FruitDispatcher`.

ii. Create a store to hold the data we use for fruits, and take care of the updating logic for us. We'll also need to get the store listening for dispatched events. In particular, we're gonna want to set it up to listen for actions with a type of CLEAR_ALL_FRUITS, and on hearing that event, have it clear all of the fruit data.

iii. Once we've dealt with the store, we'll need to change our top-level component to get its state from that store, rather than taking care of the data and logic on its own!

`git checkout clearfruitversion` to see the changes that have happened.

## WIP

### Where do I go now?
[Away to a place that will teach you to code really well for free.](http://foundersandcoders.org/apply.html)
