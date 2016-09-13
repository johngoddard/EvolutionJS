/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _simulation = __webpack_require__(1);
	
	var _simulation2 = _interopRequireDefault(_simulation);
	
	var _simulation_view = __webpack_require__(6);
	
	var _simulation_view2 = _interopRequireDefault(_simulation_view);
	
	var _chart = __webpack_require__(7);
	
	var _chart2 = _interopRequireDefault(_chart);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.addEventListener('DOMContentLoaded', function () {
	    var canvas = document.getElementById('simulation-canvas');
	    var context = canvas.getContext('2d');
	    var simulation = new _simulation2.default(500, 500, 3, 30);
	    var simulationView = new _simulation_view2.default(simulation, context);
	    Highcharts.setOptions({
	        global: {
	            useUTC: false
	        }
	    });
	
	    simulationView.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _prey = __webpack_require__(2);
	
	var _prey2 = _interopRequireDefault(_prey);
	
	var _predator = __webpack_require__(5);
	
	var _predator2 = _interopRequireDefault(_predator);
	
	var _chart = __webpack_require__(7);
	
	var _chart2 = _interopRequireDefault(_chart);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var COLORS = ['blue', 'green', 'aqua', 'bisque', 'violet', 'chartreuse', 'deeppink', 'orange'];
	
	var Simulation = function () {
	  function Simulation(dimX, dimY, initialPred, initialPrey) {
	    _classCallCheck(this, Simulation);
	
	    this.DIM_X = dimX;
	    this.DIM_Y = dimY;
	    this.initialPredators = initialPred;
	    this.initialPrey = initialPrey;
	    this.predators = [];
	    this.prey = [];
	    this.steps = 0;
	    this.mutationRate = .03;
	    this.mutantIdx = 0;
	    this.data = [];
	    this.preyGeneration = 250;
	
	    while (this.prey.length < this.initialPrey) {
	      this.addPrey(2, 'blue', 'original');
	    }
	
	    while (this.predators.length < this.initialPredators) {
	      this.addPredator();
	    }
	
	    this.charter = new _chart2.default(this);
	  }
	
	  _createClass(Simulation, [{
	    key: 'addPrey',
	    value: function addPrey(speed, color, strain) {
	      if (this.prey.length < 100) {
	        this.prey.push(new _prey2.default({
	          pos: this.randomPosition(),
	          speed: speed,
	          radius: 5,
	          color: color,
	          simulation: this,
	          strain: strain
	        }));
	      }
	    }
	  }, {
	    key: 'addPredator',
	    value: function addPredator() {
	      this.predators.push(new _predator2.default({
	        pos: this.randomPosition(),
	        speed: 2.7,
	        radius: 10,
	        color: 'red',
	        simulation: this,
	        mutationRate: .03
	      }));
	    }
	  }, {
	    key: 'allAnimals',
	    value: function allAnimals() {
	      return [].concat(_toConsumableArray(this.prey), _toConsumableArray(this.predators));
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.allAnimals().forEach(function (animal) {
	        animal.draw(ctx);
	      });
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.moveAnimals();
	      this.handleCollisions();
	      this.reproduce();
	      this.die();
	      if (this.steps % 250 === 0) {
	        this.recordData(this.steps / 250);
	      }
	
	      this.steps++;
	    }
	  }, {
	    key: 'recordData',
	    value: function recordData(generation) {
	      var strainInfo = this.getStrainInfo();
	      var avgSpeed = this.getAverageSpeed();
	
	      this.data.push({
	        generation: generation,
	        predators: this.predators.length,
	        prey: this.prey.length,
	        dominantStrain: strainInfo[1],
	        numStrains: strainInfo[0],
	        strains: strainInfo[2],
	        averageSpeed: avgSpeed
	      });
	    }
	  }, {
	    key: 'getStrainInfo',
	    value: function getStrainInfo() {
	      var strains = {};
	      var strainCount = 0;
	
	      this.prey.forEach(function (preyObj) {
	        if (strains[preyObj.strain]) {
	          strains[preyObj.strain] = strains[preyObj.strain] + 1;
	        } else {
	          strains[preyObj.strain] = 1;
	          strainCount += 1;
	        }
	      });
	
	      var maxCount = 0;
	      var maxStrain = null;
	
	      Object.keys(strains).forEach(function (strain) {
	        if (strains[strain] > maxCount) {
	          maxStrain = strain;
	          maxCount = strains[strain];
	        }
	      });
	
	      return [strainCount, maxStrain, strains];
	    }
	  }, {
	    key: 'getAverageSpeed',
	    value: function getAverageSpeed() {
	      var total = 0;
	      this.prey.forEach(function (preyObj) {
	        total += preyObj.speed;
	      });
	      return total / this.prey.length;
	    }
	  }, {
	    key: 'reproduce',
	    value: function reproduce() {
	      var _this = this;
	
	      this.prey.forEach(function (preyObj) {
	
	        if (preyObj.steps % _this.preyGeneration === 0 && preyObj.steps > 0) {
	          var mutationNum = Math.random();
	
	          if (mutationNum > .97) {
	            _this.mutantIdx += 1;
	            var newSpeed = preyObj.speed + .25;
	            _this.addPrey(newSpeed, COLORS[_this.mutantIdx % COLORS.length], 'strain-' + _this.mutantIdx);
	          } else if (mutationNum < .03) {
	            _this.mutantIdx += 1;
	            var _newSpeed = preyObj.speed - .25;
	            _this.addPrey(_newSpeed, COLORS[(_this.mutantIdx % COLORS.length, 'strain-' + _this.mutantIdx)]);
	          } else {
	            var _newSpeed2 = preyObj.speed + .1 * (.5 - Math.random());
	            _this.addPrey(_newSpeed2, preyObj.color, preyObj.strain);
	          }
	        }
	      });
	
	      this.predators.forEach(function (predObj) {
	        if (predObj.steps % 300 === 0 && predObj.steps > 0) {
	          _this.addPredator();
	        }
	      });
	    }
	  }, {
	    key: 'die',
	    value: function die() {
	      var simulation = this;
	
	      this.predators.forEach(function (predObj) {
	        if (predObj.sinceFood > 175 || predObj.steps > 2000) {
	          simulation.remove(predObj, 'predator');
	        }
	      });
	
	      this.prey.forEach(function (preyObj) {
	        if (preyObj.steps > 650) {
	          simulation.remove(preyObj, 'prey');
	        }
	      });
	    }
	  }, {
	    key: 'moveAnimals',
	    value: function moveAnimals() {
	      this.allAnimals().forEach(function (animal) {
	        animal.move();
	      });
	    }
	  }, {
	    key: 'randomPosition',
	    value: function randomPosition() {
	      return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
	    }
	  }, {
	    key: 'isOutOfBounds',
	    value: function isOutOfBounds(pos) {
	      if (pos[0] > this.DIM_X || pos[0] < this.DIM_X || pos[1] > this.DIM_Y || pos[1] < this.DIM_Y) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(pos) {
	      var x = (pos[0] + this.DIM_X) % this.DIM_X;
	      var y = (pos[1] + this.DIM_Y) % this.DIM_Y;
	      return [x, y];
	    }
	  }, {
	    key: 'handleCollisions',
	    value: function handleCollisions() {
	      var _this2 = this;
	
	      var toRemove = [];
	
	      var simulation = this;
	      this.prey.forEach(function (preyObj) {
	        simulation.predators.forEach(function (predObj) {
	          if (preyObj.isTouching(predObj) && !toRemove.includes(preyObj)) {
	            predObj.resetSinceFood();
	            toRemove.push(preyObj);
	          }
	        });
	      });
	
	      toRemove.forEach(function (item) {
	        _this2.remove(item, 'prey');
	      });
	    }
	  }, {
	    key: 'remove',
	    value: function remove(animal, type) {
	      if (type === 'prey') {
	        var idx = this.prey.indexOf(animal);
	        this.prey.splice(idx, 1);
	      } else {
	        var _idx = this.predators.indexOf(animal);
	        this.predators.splice(_idx, 1);
	      }
	    }
	  }]);
	
	  return Simulation;
	}();
	
	exports.default = Simulation;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _animal = __webpack_require__(3);
	
	var _animal2 = _interopRequireDefault(_animal);
	
	var _utils = __webpack_require__(4);
	
	var UTIL = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Prey = function (_Animal) {
	  _inherits(Prey, _Animal);
	
	  function Prey(options) {
	    _classCallCheck(this, Prey);
	
	    return _possibleConstructorReturn(this, (Prey.__proto__ || Object.getPrototypeOf(Prey)).call(this, options));
	  }
	
	  _createClass(Prey, [{
	    key: 'setVelocity',
	    value: function setVelocity() {
	      if (this.steps % 15 === 0 || this.steps < 10) {
	        var closestPred = this.findClosestPredator();
	        var dir = UTIL.findDirection(this.position, closestPred.position);
	        this.velocity = [-this.speed * dir[0], -this.speed * dir[1]];
	      }
	    }
	  }, {
	    key: 'findClosestPredator',
	    value: function findClosestPredator() {
	      var prey = this;
	
	      var closest = void 0;
	      var minDistance = 100000;
	
	      this.simulation.predators.forEach(function (predator) {
	        var distance = UTIL.distance(prey.position, predator.position);
	        if (distance < minDistance) {
	          minDistance = distance;
	          closest = predator;
	        }
	      });
	
	      return closest;
	    }
	  }]);
	
	  return Prey;
	}(_animal2.default);
	
	exports.default = Prey;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(4);
	
	var UTIL = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Animal = function () {
	  function Animal(options) {
	    _classCallCheck(this, Animal);
	
	    this.position = options['pos'];
	    this.speed = options['speed'];
	    this.radius = options['radius'];
	    this.color = options['color'];
	    this.simulation = options['simulation'];
	    this.velocity = [0, 0];
	    this.steps = 0;
	    this.strain = options['strain'];
	  }
	
	  _createClass(Animal, [{
	    key: 'isTouching',
	    value: function isTouching(otherAnimal) {
	      if (UTIL.distance(this.position, otherAnimal.position) < this.radius + otherAnimal.radius) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      this.steps++;
	      this.setVelocity();
	      this.position[0] += this.velocity[0];
	      this.position[1] += this.velocity[1];
	      if (this.simulation.isOutOfBounds(this.position)) {
	        this.position = this.simulation.wrap(this.position);
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	
	      ctx.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, false);
	
	      ctx.fill();
	    }
	  }]);
	
	  return Animal;
	}();
	
	exports.default = Animal;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var diff = exports.diff = function diff(pos1, pos2, dir) {
	
	  var idx = dir === 'x' ? 0 : 1;
	
	  if (Math.abs(pos2[idx] - pos1[idx]) > 250) {
	    if (pos2[idx] > 250) {
	      return pos2[idx] - 500 - pos1[idx];
	    } else {
	      return 500 + pos2[idx] - pos1[idx];
	    }
	  } else {
	    return pos2[idx] - pos1[idx];
	  }
	};
	
	var dir = exports.dir = function dir(pos1, pos2, _dir) {
	  var idx = _dir === 'x' ? 0 : 1;
	  if (pos1[idx] < pos2[idx]) {
	    if (pos2[idx] - pos1[idx] < pos1[idx] + 500 - pos2[idx]) {
	      return 1;
	    } else {
	      return -1;
	    }
	  } else {
	    if (pos1[idx] - pos2[idx] < pos2[idx] + 500 - pos1[idx]) {
	      return -1;
	    } else {
	      return 1;
	    }
	  }
	};
	
	var distance = exports.distance = function distance(pos1, pos2) {
	  var xDiff = diff(pos1, pos2, 'x');
	  var yDiff = diff(pos1, pos2, 'y');
	
	  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	};
	
	var findDirection = exports.findDirection = function findDirection(pos1, pos2) {
	  var posDiff = [diff(pos1, pos2, 'x'), diff(pos1, pos2, 'y')];
	
	  var xDir = dir(pos1, pos2, 'x');
	  var yDir = dir(pos1, pos2, 'y');
	
	  var magnitude = Math.pow(posDiff[0], 2) + Math.pow(posDiff[1], 2);
	  return [xDir * Math.pow(posDiff[0], 2) / magnitude, yDir * Math.pow(posDiff[1], 2) / magnitude];
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _animal = __webpack_require__(3);
	
	var _animal2 = _interopRequireDefault(_animal);
	
	var _utils = __webpack_require__(4);
	
	var UTIL = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Predator = function (_Animal) {
	  _inherits(Predator, _Animal);
	
	  function Predator(options) {
	    _classCallCheck(this, Predator);
	
	    var _this = _possibleConstructorReturn(this, (Predator.__proto__ || Object.getPrototypeOf(Predator)).call(this, options));
	
	    _this.sinceFood = 0;
	    return _this;
	  }
	
	  _createClass(Predator, [{
	    key: 'setVelocity',
	    value: function setVelocity() {
	      if (this.steps % 5 === 0 || this.steps < 10) {
	        var closestPred = this.findClosestPrey();
	        var dir = UTIL.findDirection(this.position, closestPred.position);
	        this.velocity = [this.speed * dir[0], this.speed * dir[1]];
	      }
	
	      this.sinceFood++;
	    }
	  }, {
	    key: 'findClosestPrey',
	    value: function findClosestPrey() {
	      var predator = this;
	
	      var closest = void 0;
	      var minDistance = 100000;
	
	      this.simulation.prey.forEach(function (prey) {
	        var distance = UTIL.distance(predator.position, prey.position);
	        if (distance < minDistance) {
	          minDistance = distance;
	          closest = prey;
	        }
	      });
	
	      return closest;
	    }
	  }, {
	    key: 'resetSinceFood',
	    value: function resetSinceFood() {
	      this.sinceFood = 0;
	    }
	  }]);
	
	  return Predator;
	}(_animal2.default);
	
	exports.default = Predator;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimulationView = function () {
	  function SimulationView(simulation, ctx) {
	    _classCallCheck(this, SimulationView);
	
	    this.simulation = simulation;
	    this.ctx = ctx;
	  }
	
	  _createClass(SimulationView, [{
	    key: "start",
	    value: function start() {
	      var view = this;
	
	      this.simulationID = window.setInterval(function () {
	        view.simulation.draw(view.ctx);
	        view.simulation.step();
	      }, 30);
	    }
	  }]);
	
	  return SimulationView;
	}();
	
	exports.default = SimulationView;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Charter = function () {
	    function Charter(simulation) {
	        _classCallCheck(this, Charter);
	
	        this.simulation = simulation;
	        this.renderChart();
	        this.maxGen = 0;
	    }
	
	    _createClass(Charter, [{
	        key: 'renderChart',
	        value: function renderChart() {
	            var simulation = this.simulation;
	            var charter = this;
	            $('#pop-graph').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg,
	                    marginRight: 10,
	                    events: {
	                        load: function load() {
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var latest = simulation.data.slice(-1)[0];
	
	                                if (latest.generation > charter.maxGen) {
	                                    charter.maxGen = latest.generation;
	                                    console.log(latest.generation);
	                                    console.log(latest.prey);
	                                    series.addPoint([latest.generation, latest.prey], true, false);
	                                    console.log(series);
	                                }
	                            }, 1000);
	                        }
	                    }
	                },
	                title: {
	                    text: 'Prey Population'
	                },
	                xAxis: {
	                    title: {
	                        text: 'Prey Population'
	                    },
	                    tickPixelInterval: 150
	                },
	                yAxis: {
	                    title: {
	                        text: 'Value'
	                    },
	                    plotLines: [{
	                        value: 0,
	                        width: 1,
	                        color: '#808080'
	                    }]
	                },
	                tooltip: {
	                    formatter: function formatter() {
	                        return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [{
	                    name: 'Population Data',
	                    data: function () {
	                        return [[0, 30]];
	                    }()
	                }]
	            });
	        }
	    }]);
	
	    return Charter;
	}();
	
	exports.default = Charter;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map