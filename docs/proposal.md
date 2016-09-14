## Visual Evolution simulation

### Background

The goal of this project is to visualize evolutionary and ecology phenomena in a classic predator-prey system. The ultimate goal of the project would be use as an educational tool.

The primary component in the project will be a canvas area where "predators" are chasing "prey". The predators and prey will behave in the following the way:

- Predators will "chase" the closest prey object. If a predator and prey object collide, the predator will "eat" the prey, and the prey will disappear.
- If a predator goes a certain amount of time without eating, it will "die" and disappear.
- Prey will die after a set amount of time and disappear.
- After a set amount of time, predators and prey will reproduce. Predators will (initially at least) always be identical to parents in terms of speed. Prey offspring will have speed close to their parent's speed, with the occasionally "mutation" that causes a more  substantial change in speed (either positive or negative).
- Live graphs will update to show predator and prey populations as well as average prey speed vs. generation. If all goes well, these graphs should resemble classic evolutionary biology and ecology models with inverse sine-like population graphs and increaseing average prey speed.
- Users will be able to use sliders to control some settings like mutation rate, generation time, and simulation speed.

### Functionality & MVP  

The following are the core pieces of functionality:

- [x] Start and pause the simulation
- [x] A controls area where users can change simulation settings
- [x] Live updating charts
- [x] A brief introduction or explanatory modal
- [ ] Production Readme

### Wireframes

This will be a single page app where the bulk of the space is taken up by the simulation canvas area. Controls on the left will allow the user to change certain simulation parameters. Charts on the bottom will update as the simulation runs. The charts will show populations and average fitness vs. generation.

![wireframes]

### Architecture and Technologies


This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure simulation structure and logic
- `HTML5 Canvas` for DOM manipulation and rendering,
- HighCharts to generate live updating graphs on the page
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be four scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary canvas elements and rendering them to the DOM.

`simulation.js`: This will contain the core logic for running the simulation. It will handle initialization and contain methods to `step` the simulation forward, detect eating/dying events, and update simulation data points. It will also handle plotting this data onto charts.

`animal.js`: This will be the parent class for `Predators` and `Prey`. It will contain the logic to `move` and `render` the objects.  

`prey.js`: This will be the class for `Prey` objects. It will hold prey-specific logic for reproducing with inheritance, as well as moving AI to run away from the nearest predator.

`predator.js`: This will be the class for `Predator` objects. It will hold predator-specific logic for chasing the nearest prey.



### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Goals for the day:

- [x] Get a green bundle with `webpack`
- [x] Render a canvas with moving predators and pray.

**Day 2**: Handle collision and dying events in the simulation. Set up recording population / average speed data.

- [x] Complete the `predator.js` and `prey.js` classes, including inheritance models and AI for movement
- [x] Record data at every step (log it in console for now)

**Day 3**: Live updating graphs.

- [x] Learn highcharts API
- [x] Render graphs on the page with live updating population and average speed information.
- [x] Fine tune simulation initialization


**Day 4**: Add simulation controls.  Style the frontend, and add an introdution:

- [x] Create controls for simulation speed, mutation rate, and generation time
- [ ] Syle objects
- [ ] Add an information modal.


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Animated introduction
- [ ] More simulation controls
- [ ] Evolving predators

[wireframes]: ./evolutionjs.png
