# ![flux logo](/home/james/Coding/Tutorials/FOR_FLUX_SAKE/assets/img/flux_logo_fandc.png) FOR_FLUX_SAKE ![flux logo](/home/james/Coding/Tutorials/FOR_FLUX_SAKE/assets/img/flux_logo_fandc.png)
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

##What is Flux?
Flux is not a library, or even a module. It's a design pattern more than anything else. If you've done much React, you'll know that a big part of the design philosophy behind it is this __unidirectional data flow__ concept. Having a one-way flow of data through your app is meant to make interactions easier to reason about, as well as leading to a significantly more robust app as complexity grows.
But you've probably already heard the standard sales pitch. I'm here to try and help you understand what the hell using the Flux design pattern means, in simple terms. And by 'simple terms', I mean without assuming that you've used any other technologies (apart from those I've outlined above).

## Getting Started
```
// -- Terminal window -- \\
git clone https://github.com/MIJOTHY/FOR_FLUX_SAKE.git
cd FOR_FLUX_SAKE
git checkout reactversion
npm install gulp browserify -g
npm install
```

So now you know what Flux is, and you've installed the shizzle, you're good to get coding, right? Wrong. We've got some preparatory work to do first.

##The App
The app we'll be building with the Flux design pattern is a 5-a-day tracker.
On the left is the __old, React version__ built decades ago. On the right is the __new, Flux version__ we'll be building.

![](/home/james/Coding/Tutorials/FOR_FLUX_SAKE/assets/img/App-Mockup.png) ![](/home/james/Coding/Tutorials/FOR_FLUX_SAKE/assets/img/App-Mockup-Flux.png)
###Impressed? I thought so.  Let's break down the functionality of this app.
In the __header__, we can:
* Type text into the header to filter the fruit list
* Type text into the header and click the leaf button/hit enter to add a new fruit item to the list

In each __list item__, we can:
* Increment the quantity we've eaten of a given piece of fruit by clicking the associated plus button.
* Decrement the quantity we've eaten by clicking the minus button, and if we click minus on a 0-quantity fruit item, it removes it from the list.

In the __footer__, we can:
* Clear the entire list by clicking that crappy little restart button


### Where do I go now?
[Away to a place that will teach you to code really well for free.](http://foundersandcoders.org/apply.html)
