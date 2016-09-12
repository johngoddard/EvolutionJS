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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.addEventListener('DOMContentLoaded', function () {
	  var canvas = document.getElementById('simulation-canvas');
	  var context = canvas.getContext('2d');
	  var simulation = new _simulation2.default(500, 500, 5, 10);
	  var simulationView = new _simulation_view2.default(simulation, context);
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Simulation = function () {
	  function Simulation(dimX, dimY, initialPred, initialPrey) {
	    _classCallCheck(this, Simulation);
	
	    this.DIM_X = dimX;
	    this.DIM_Y = dimY;
	    this.initialPredators = initialPred;
	    this.initialPrey = initialPrey;
	    this.predators = [];
	    this.prey = [];
	
	    while (this.prey.length < this.initialPrey) {
	      this.addPrey();
	    }
	
	    while (this.predators.length < this.initialPredators) {
	      this.addPredator();
	    }
	  }
	
	  _createClass(Simulation, [{
	    key: 'addPrey',
	    value: function addPrey() {
	      this.prey.push(new _prey2.default({
	        pos: this.randomPosition(),
	        velocity: [10 * (.5 - Math.random()), 10 * (.5 - Math.random())],
	        radius: 5,
	        color: 'blue',
	        simulation: this
	      }));
	    }
	  }, {
	    key: 'addPredator',
	    value: function addPredator() {
	      this.predators.push(new _predator2.default({
	        pos: this.randomPosition(),
	        velocity: [10 * (.5 - Math.random()), 10 * (.5 - Math.random())],
	        radius: 10,
	        color: 'red',
	        simulation: this
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
	
	var _animal = __webpack_require__(3);
	
	var _animal2 = _interopRequireDefault(_animal);
	
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
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Animal = function () {
	  function Animal(options) {
	    _classCallCheck(this, Animal);
	
	    this.position = options['pos'];
	    this.velocity = options['velocity'];
	    this.radius = options['radius'];
	    this.color = options['color'];
	    this.simulation = options['simulation'];
	  }
	
	  _createClass(Animal, [{
	    key: 'isTouching',
	    value: function isTouching(otherAnimal) {
	      if (_utils2.default.distance(this.pos, otherAnimal.pos) < this.radius + otherAnimal.radius) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'move',
	    value: function move() {
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Util = {
	  inherits: function inherits(childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },
	
	  distance: function distance(pos1, pos2) {
	    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	  }
	};
	
	exports.default = Util;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _animal = __webpack_require__(3);
	
	var _animal2 = _interopRequireDefault(_animal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Predator = function (_Animal) {
	  _inherits(Predator, _Animal);
	
	  function Predator(options) {
	    _classCallCheck(this, Predator);
	
	    return _possibleConstructorReturn(this, (Predator.__proto__ || Object.getPrototypeOf(Predator)).call(this, options));
	  }
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map