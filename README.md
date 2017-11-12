<!-- REPO BADGES -->
<p align="center">
  <img
    height="30"
    src="http://forthebadge.com/images/badges/uses-js.svg"
    alt="Uses JS badge" >
  <img
    height="30"
    src="http://forthebadge.com/images/badges/built-with-love.svg" 
    alt="Built with love badge" >
  <img
    height="30"
    src="http://forthebadge.com/images/badges/no-ragrets.svg" 
    alt="No ragrets badge" >
</p><!-- ./REPO BADGES -->



<!-- BANNER -->
<h1 align="center">
  <img 
    width="100%" src="https://cdn.ucl.ac.uk/skins/UCLProspectiveStudentsUGSkin/ug-theme/images/ucl-logo.svg"
    alt="UCL logo" >
  <img
    width="66.67%"
    src="https://s17.postimg.org/u6h85w1bz/ucl.gif"
    alt="scraping screenshot" >
  <img 
    width="66.67%" 
    src="https://s17.postimg.org/aef270agv/ezgif.com-crop.gif"
    alt="cli demo" >
</h1>
<p align="center">
  <b>Scrape UCL timetable and enjoy the JSON output</b>
</p><!-- BANNER -->

<p>&nbsp;</p><!-- Spacing -->



## Table of Content
- [Project](#project)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Scrape Course Timetable](#scrape-course-timetable)
  - [Debug Mode](#debug-mode)
  - [Scrape Every Timetable](#scrape-every-degree)
- [Contributors](#contributors)
- [License](#license)


## Project
This is a node app that uses a electron browser to scrape UCL's [timetable](https://timetable.ucl.ac.uk/tt/homePage.do) single page app. It's a fun weekend project written two years ago when I still used semicolons in javascript. 😬

The app has been tested and it still works late __2017__. 👍

This is a tool I wish I had when I was studying at UCL. The timetable web app is _slow_ and suffers from a terrible user interface so I rather have __JSON__.

<p>&nbsp;</p><!-- Spacing -->


## Requirements
The app requires [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (npm comes prebundled with node). The source code is written in ES2015 so Node.js V6+ is recommended. Node.js version can be checked using the `node -v` cli command. Babel is used as a dependency to transpile ES6 modules and async functions.

<p>&nbsp;</p><!-- Spacing -->


## Installation
#### 1. Clone Repository
```sh
> git clone https://github.com/Tahseenm/ucl-timetable && cd ucl-timetable
```

#### 2. Install Dependencies
Using [npm](https://www.npmjs.com/)
```sh
> npm install
```

Using [yarn](https://yarnpkg.com/en/)
```sh
> yarn
```

<p>&nbsp;</p><!-- Spacing -->


## Usage
### Scrape Course Timetable
<img 
    width="600px" 
    src="https://s17.postimg.org/aef270agv/ezgif.com-crop.gif"
    alt="cli demo" >

Just provide the app a valid [UCL degree](https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/) and year of course and let it do it's magic.

Using [npm](https://www.npmjs.com/) 
```sh
> npm start -- --degree 'BSc Mathematics' --year 2
```

Using [yarn](https://yarnpkg.com/en/)
```sh
> yarn start --degree 'BSc Mathematics' --year 2
```


### Debug Mode
<img
    width="600px"
    src="https://s17.postimg.org/u6h85w1bz/ucl.gif"
    alt="scraping screenshot" >

Just add the debug flag to see the app scrape the UCL timetable with the electron browser window open.

```sh
> npm start -- --degree 'BSc Mathematics' --year 2 --debug
```


### The whole Timetable
Scrape the timetable for every course. In case of a error just run the command again and it will resume from where it last left of.

_This can take a __long time__, since the app has to scrape over 30,000 pages using electron, so you might want to catch up with your favourite TV show._

```sh
> npm start -- --all
```

<p>&nbsp;</p><!-- Spacing -->


## Contributors
[Tahseen Malik](https://tahseenmalik.com)


## License
MIT