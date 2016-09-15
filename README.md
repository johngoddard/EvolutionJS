# EvolutionJS

[EvolutionJS live][prodlink]

EvolutionJS is a browser-based visual natural selection simulation primarily intended to be an educational tool. The simulation models a classic predator-prey system where there is selective pressure on prey speed. As the simulation runs, live charts update with simulation data, frequently showing evolutionary trends like increasing prey fitness.

![EvolutionJS home page: https://johngoddard.github.io/EvolutionJS/][home page]

## Features & Implementation

### Simulation Mechanics

The simulation is based on a classic predator-prey ecology model. When the simulation initializes, there a are set number predators and prey animals. Artificial intelligence methods dictate Predator and prey behavior such that predators periodically identify the closest prey animal and chase after it, and prey identify the closest predator and run away from it.

If a predator collides with a prey animal, the predator eats the prey, and the prey is removed from the simulation. If a predator takes a certain number of steps without eating prey, it 'starves' and is removed from the simulation.

Both predators and prey periodically reproduce, which adds another predator or prey animal to the simulation. Reproduction happens probabilistically, and the chance an animal reproduces in a given turn is defined by a function similar to the following:

```javascript
reproductionProbability = (animal) => {
  return (animal.stepsSinceReproduce - MINIMUM_GENERATION_STEPS) / MINIMUM_GENERATION_STEPS;
}
```

The longer an animal survives, the more chances it has to reproduce. Since faster prey will generally survive the longer, there is sexual selective pressure on prey speed.

When a prey animal reproduces, its offspring will generally have a similar speed as the parent. Unless a mutation occurs, the offspring speed is randomly assigned by a uniform distribution in a narrow range around the parent speed.

Occasionally, however, a mutation does occur. If an offspring has a mutation, it's speed will vary significantly from its parents. 50% of mutations are beneficial, increasing offspring speed, while 50% of them are detrimental. Mutation rate can be controlled by the user with the slider in the controls panel. Mutants are rendered in as a different color than their parents.

For the sake of simplicity and isolating changes in prey fitness, predator offspring are always identical to their parents.

### Simulation implementation

The `Prey` and `Predator` classes both inherit from an `Animal` parent class that handles basic logic for moving and rendering. The `Prey` and `Predator` classes hold species-specific logic for things like AI and reproduction logic.

Simulation logic for things like adding and removing animals, updating simulation parameters, and logging data is handled by the `Simulation` class. A `SimulationView` class handles the logic for rendering the simulation, stepping it forward, and responding to user interactions.

The simulation itself is rendered using an HTML5 canvas. Each time the simulation steps forward, the position for each predator and prey object is updated, and then each of the objects is re-rendered on the canvas.

### Live graphing of simulation data

As the simulation progresses, live graphs update to show average prey fitness (speed) and species populations. The graphs are created using HighCharts, and the logic for the graphs can be found in the `Charter` class. The graphs periodically pull for updated data from the simulation, and they render new points when appropriate.

Note that the population graph shows populations relative to the species' initial populations. While this is slightly more difficult to interpret than total population, it makes it easier to compare relative trends in predator and prey populations. This graph often shows inverse predator and prey population peaks, which is a classic pattern in predator-prey systems.

### User controls

Users can update simulation parameters and play/pause the simulation using sliders and buttons in the control panels. JQuery event listeners are used to handle relevant changes to the DOM, as well as various modals and tooltips that appear as users interact with the page.

##Future directions

There a few features I'd eventually like to add EvolutionJS to make it more robust:

- Predator evolution: for the sake of simplicity, currently only prey evolve. It'd also be interesting to see how predators would evolve, since there's also selective pressure on their speed.

- Improved AI: Currently, the AI for predators and prey is relatively simple. It might be possible to improve this by doing something like weighting nearby members of the other species to pick a direction instead of just looking at the closest one.

- Improved performance: Currently if a simulation is run for several minutes, some of the graphics can start to slow down. I'd like to investigate other

- Improved graphics: More predator/prey specific graphics could make it easier to understand what the simulation is and what's happening. 

[prodlink]: https://johngoddard.github.io/EvolutionJS/
[home page]: ./docs/screenshots/evojs.png "EvolutionJS home page"
