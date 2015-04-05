# ![flux logo](/assets/img/flux_logo_fandc.png) FOR_FLUX_SAKE ![flux logo](/assets/img/flux_logo_fandc.png)
A simple tutorial for simple people who want to use flux with react.
This tutorial follows on from [my react tutorial (WIP)](https://github.com/MIJOTHY/REACT_SCHMEACT).

##Introduction
In this tutorial, we'll be converting a purely react app into one built with the flux design pattern. By doing so, I hope you can see why you probably want to use flux if you're using react, and how you might start going about changing your app accordingly.


## Pre-requisites
Although this guide attempts to be as beginner-friendly as possible, it does make some assumptions about your background. It assumes:
 * Familiarity with __Javascript__ (you understand what `.bind()` does, and when it might be needed),
 * Familiarity with __NodeJS__ (you understand the module.exports/require pattern, and know of EventEmitters),
 * Some experience with __React__ (you understand the difference between state and props, where state should lie, and how components can set the state of other components),
 * Some experience with __git__ (we'll be switching branches now and again).

We'll be using __react__ and __flux__ in this tutorial. Other than a number of build/dev tools and __object-assign__, we won't be using anything else.

## Getting Started
```
// -- Terminal window -- \\
git clone https://github.com/MIJOTHY/FOR_FLUX_SAKE.git
cd FOR_FLUX_SAKE
git checkout reactversion
npm install gulp browserify -g
npm install
```

So now you're good to get coding, right? Wrong. We've got some preparatory work to do first.

##The App
The app we'll be building with the flux design pattern is a 5-a-day tracker. On the left is the old, react version. On the right is the version built with the flux architecture.

![](/assets/img/App-Mockup.png) ![](/assets/img/App-Mockup-Flux.png) 


### Where do I go now?
[Away to a place that will teach you to code really well for free.](http://foundersandcoders.org/apply.html)
