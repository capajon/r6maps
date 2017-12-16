# r6maps
[![Build Status](https://travis-ci.org/capajon/r6maps.svg?branch=master)](https://travis-ci.org/capajon/r6maps)

**Hosted at http://www.r6maps.com**

r6maps.com is designed to be a quick reference for Rainbow Six Siege maps.  Please see the about.html page for more details.

## Running locally

### Dependencies
- [npm/Nodejs](https://www.npmjs.com/get-npm)
    + [UglifyJS3](https://www.npmjs.com/package/uglifyjs) for cli (Try `npm install uglify-js -g`)
- [Ruby](https://www.ruby-lang.org/en/)
    + [gem](https://rubygems.org/pages/download)
    + sass (`gem install sass`)

To check the dependencies, just type `uglifyjs` or `scss`. If the program waits for input, your dependencies are installed correctly. (`uglifyjs` might already be installed from `npm install`, see below).

### Building and running
- Install npm and install packages: `npm install`
- General build: `npm run build`
    + Builds js and scss into the `site` folder. 
    + Check `package.json` for more particular scripts.
- File watches are also available (see `packages.json`)
- To run, locate `site/index.html` and open it. 

## Things to work on
Contributions are welcome. :)

### Active
Current development is fairly "steady state" with only a few new features planned:
- [ ] Map stats - based on [data dump from Ubisoft](https://rainbow6.ubisoft.com/siege/en-us/news/152-293696-16/introduction-to-the-data-peek-velvet-shell-statistics).
- [ ] Mark breakable windows - [see original feature suggestion here](https://github.com/capajon/r6maps/issues/89).
- [ ] Translations - [info on how you can help](http://www.r6maps.com/about/translations-help.html).
- [ ] [Open issues](https://github.com/capajon/r6maps/issues)
- [ ] Map accuracy - please log any errors/missing items as an [issue](https://github.com/capajon/r6maps/issues)
- [ ] New maps

### Thinking about (maybe someday)...
- [ ] Tactics drawing (& saving/sharing)
- [ ] Shared sessions (map controls, shared pings, drawing if available)
- [ ] Automated tests (perceptual diff?)
- [ ] Offline mode (progressive web app? Cordova?)
- [ ] Embeded currated hints/strats (from community contributions)
