# ![flux logo](/assets/img/flux_logo_fandc.png) FOR_FLUX_SAKE ![flux logo](/assets/img/flux_logo_fandc.png)

# ES6

On this branch you'll see the exact same code as on the advanced branch but written with a more full set of ES6 features. The linter has been changed to ESLint (a more robust and featureful linter for es6+ and nicely pluggable). Instead of using reactify, we instead transform our code with babel - babel transpiles ES6/7 (moreso than the reactify --es6 flag) for us. The relevant browserify package for using babel is babelify.