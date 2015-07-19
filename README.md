# ![flux logo](/assets/img/flux_logo_fandc.png) FOR_FLUX_SAKE ![flux logo](/assets/img/flux_logo_fandc.png)

# Advanced Patterns

In a larger application, you'll find yourself writing the same flux boilerplate over and over again. This get's fairly tedious fairly quickly. There are a few simple ways you can reduce boilerplate through abstraction of a flux application. Many independent flux implementations tend to just take different approaches to reducing boilerplate, and don't provide much more (other than server-side rendering, or 'isomorphism' to be fancy). I'll be using some ideas borrowed from gaearon in an example app he made, and are pretty much just vanilla flux but with some nice abstractions.

Incidentally, gaearon has his own flux implementation that offers some very nice things on top of reduction of boilerplate (typical isomorphism, but also hot-loading, stores as pure functions, and more).

The two primary abstractions made are:
1. A higher-level component purely for the purposes of connecting to store(s) and fetching data.
2. A store-generating utility function, that takes some store methods and returns a store object with the standard emit/connect/disconnect methods.

These files are both found in `utils`, the former is called `connectToStores`, the latter `createStore`.

