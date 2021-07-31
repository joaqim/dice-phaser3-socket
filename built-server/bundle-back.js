/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/backend/DiceDeck.ts":
/*!*********************************!*\
  !*** ./src/backend/DiceDeck.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeElementFromArray = exports.randomElementFromArray = exports.DiceController = void 0;\nclass DiceController {\n}\nexports.DiceController = DiceController;\nclass WeightedDiceDeckController extends DiceController {\n    constructor() {\n        super();\n        this.initWeightedDiceDeck();\n        this.reshuffleWeightedDiceDeck();\n        this.updateWeightedDiceDeckProbabilities();\n        this.minimumCardsBeforeReshuffling = 13;\n        this.probabilityReductionForRecentlyRolled = 0.3;\n        this.recentRolls = [];\n        this.maximumRecentRollMemory = 5;\n    }\n    throwDice() {\n        return this.drawWeightedCard();\n    }\n    drawWeightedCard() {\n        if (this.cardsLeftInDeck < this.minimumCardsBeforeReshuffling)\n            this.reshuffleWeightedDiceDeck();\n        this.updateWeightedDiceDeckProbabilities();\n        this.adjustWeightedDiceDeckBasedOnRecentRolls();\n        return this.getWeightedDice();\n    }\n    initWeightedDiceDeck() {\n        this.weightedDiceDeck = [];\n        this.weightedDiceDeck.push({\n            totalDice: 2,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 3,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 4,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 5,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 6,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 7,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 8,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 9,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 10,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 11,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n        this.weightedDiceDeck.push({\n            totalDice: 12,\n            dicePairs: [],\n            probabilityWeighting: 0,\n            recentlyRolledCount: 0,\n        });\n    }\n    reshuffleWeightedDiceDeck() {\n        const standardDiceDeck = this.getStandardDiceDeck();\n        for (const [totalDiceIndex, dicePairsForTotalDice,] of standardDiceDeck.entries()) {\n            this.weightedDiceDeck[totalDiceIndex].dicePairs =\n                dicePairsForTotalDice.dicePairs;\n        }\n        const totalCombinations = 36;\n        this.cardsLeftInDeck = totalCombinations;\n    }\n    updateWeightedDiceDeckProbabilities() {\n        for (const diceDeckForTotalDice of this.weightedDiceDeck) {\n            diceDeckForTotalDice.probabilityWeighting =\n                diceDeckForTotalDice.dicePairs.length / this.cardsLeftInDeck;\n        }\n    }\n    getWeightedDice() {\n        const totalProbabilityWeight = this.getTotalProbabilityWeight();\n        let targetRandomNumber = Math.random() * totalProbabilityWeight;\n        for (const diceDeckForTotalDice of this.weightedDiceDeck) {\n            if (targetRandomNumber <= diceDeckForTotalDice.probabilityWeighting) {\n                const drawnCard = randomElementFromArray(diceDeckForTotalDice.dicePairs);\n                removeElementFromArray(diceDeckForTotalDice.dicePairs, drawnCard);\n                this.recentRolls.push(diceDeckForTotalDice.totalDice);\n                diceDeckForTotalDice.recentlyRolledCount++;\n                this.cardsLeftInDeck--;\n                if (this.recentRolls.length > this.maximumRecentRollMemory)\n                    this.updateRecentlyRolled();\n                return drawnCard;\n            }\n            targetRandomNumber -= diceDeckForTotalDice.probabilityWeighting;\n        }\n        const defaultRollIfError = { dice1: 3, dice2: 4 };\n        return defaultRollIfError;\n    }\n    getTotalProbabilityWeight() {\n        let totalProbabilityWeight = 0;\n        for (const dicePairs of this.weightedDiceDeck) {\n            totalProbabilityWeight += dicePairs.probabilityWeighting;\n        }\n        return totalProbabilityWeight;\n    }\n    updateRecentlyRolled() {\n        const ignore0and1 = 2;\n        const totalDiceFiveRollsAgo = this.recentRolls[0];\n        this.weightedDiceDeck[totalDiceFiveRollsAgo - ignore0and1]\n            .recentlyRolledCount--;\n        this.recentRolls.shift();\n    }\n    adjustWeightedDiceDeckBasedOnRecentRolls() {\n        for (const diceDeckForTotalDice of this.weightedDiceDeck) {\n            const probabilityReduction = diceDeckForTotalDice.recentlyRolledCount *\n                this.probabilityReductionForRecentlyRolled;\n            const probabilityMultiplier = 1 - probabilityReduction;\n            diceDeckForTotalDice.probabilityWeighting *= probabilityMultiplier;\n            if (diceDeckForTotalDice.probabilityWeighting < 0)\n                diceDeckForTotalDice.probabilityWeighting = 0;\n        }\n    }\n    getStandardDiceDeck() {\n        const standardDiceDeck = [];\n        standardDiceDeck.push({\n            totalDice: 2,\n            dicePairs: [{ dice1: 1, dice2: 1 }],\n        });\n        standardDiceDeck.push({\n            totalDice: 3,\n            dicePairs: [\n                { dice1: 1, dice2: 2 },\n                { dice1: 2, dice2: 1 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 4,\n            dicePairs: [\n                { dice1: 1, dice2: 3 },\n                { dice1: 2, dice2: 2 },\n                { dice1: 3, dice2: 1 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 5,\n            dicePairs: [\n                { dice1: 1, dice2: 4 },\n                { dice1: 2, dice2: 3 },\n                { dice1: 3, dice2: 2 },\n                { dice1: 4, dice2: 1 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 6,\n            dicePairs: [\n                { dice1: 1, dice2: 5 },\n                { dice1: 2, dice2: 4 },\n                { dice1: 3, dice2: 3 },\n                { dice1: 4, dice2: 2 },\n                { dice1: 5, dice2: 1 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 7,\n            dicePairs: [\n                { dice1: 1, dice2: 6 },\n                { dice1: 2, dice2: 5 },\n                { dice1: 3, dice2: 4 },\n                { dice1: 4, dice2: 3 },\n                { dice1: 5, dice2: 2 },\n                { dice1: 6, dice2: 1 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 8,\n            dicePairs: [\n                { dice1: 2, dice2: 6 },\n                { dice1: 3, dice2: 5 },\n                { dice1: 4, dice2: 4 },\n                { dice1: 5, dice2: 3 },\n                { dice1: 6, dice2: 2 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 9,\n            dicePairs: [\n                { dice1: 3, dice2: 6 },\n                { dice1: 4, dice2: 5 },\n                { dice1: 5, dice2: 4 },\n                { dice1: 6, dice2: 3 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 10,\n            dicePairs: [\n                { dice1: 4, dice2: 6 },\n                { dice1: 5, dice2: 5 },\n                { dice1: 6, dice2: 4 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 11,\n            dicePairs: [\n                { dice1: 5, dice2: 6 },\n                { dice1: 6, dice2: 5 },\n            ],\n        });\n        standardDiceDeck.push({\n            totalDice: 12,\n            dicePairs: [{ dice1: 6, dice2: 6 }],\n        });\n        return standardDiceDeck;\n    }\n}\nexports.default = WeightedDiceDeckController;\nfunction randomElementFromArray(array) {\n    return array[Math.floor(Math.random() * array.length)];\n}\nexports.randomElementFromArray = randomElementFromArray;\nfunction removeElementFromArray(array, element) {\n    const index = array.indexOf(element);\n    if (index > -1) {\n        array.splice(index, 1);\n        return true;\n    }\n    return false;\n}\nexports.removeElementFromArray = removeElementFromArray;\n\n\n//# sourceURL=webpack://phaser3template/./src/backend/DiceDeck.ts?");

/***/ }),

/***/ "./src/backend/clientConnection.ts":
/*!*****************************************!*\
  !*** ./src/backend/clientConnection.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.clientConnection = void 0;\nconst gameComm_1 = __webpack_require__(/*! ./gameComm */ \"./src/backend/gameComm.ts\");\nfunction clientConnection(io) {\n    let currentUsers = []; //array to store socketids and player data of each connection\n    io.on(\"connection\", function (socket) {\n        gameComm_1.GameCommunication(io, socket, currentUsers);\n        //remove the users data when they disconnect.\n        socket.on(\"disconnect\", function () {\n            removeUser(currentUsers, socket);\n        });\n    });\n    setInterval(() => {\n        var time = new Date();\n        console.log(currentUsers.length +\n            \" logged in @ \" +\n            time.toLocaleString(\"en-US\", {\n                hour: \"numeric\",\n                minute: \"numeric\",\n                hour12: true,\n            }));\n    }, 5000);\n}\nexports.clientConnection = clientConnection;\nfunction removeUser(currentUsers, socket) {\n    let u = currentUsers.filter((user) => {\n        return user.socketId == socket.id;\n    });\n    if (u && u[0]) {\n        socket.broadcast.emit(\"remove player\", u[0].socketId);\n        currentUsers.splice(currentUsers.indexOf(u[0]), 1);\n    }\n    socket.removeAllListeners();\n}\n\n\n//# sourceURL=webpack://phaser3template/./src/backend/clientConnection.ts?");

/***/ }),

/***/ "./src/backend/gameComm.ts":
/*!*********************************!*\
  !*** ./src/backend/gameComm.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameCommunication = void 0;\nconst DiceDeck_1 = __importDefault(__webpack_require__(/*! ./DiceDeck */ \"./src/backend/DiceDeck.ts\"));\nfunction GameCommunication(io, socket, currentUsers) {\n    let recentUpdates = []; //array to store socketids and player data of each connection\n    let diceDeck = new DiceDeck_1.default();\n    let diceResults = new Map();\n    socket.on(\"player roll dice\", (data) => {\n        diceResults.set(data.socketId, diceDeck.throwDice());\n        io.sockets.emit(\"update dice\", data, diceResults.get(data.socketId));\n    });\n    socket.on(\"player update\", function (data) {\n        let p = recentUpdates.filter((update) => update.socketId == data.socketId);\n        if (p && p[0]) {\n            let player = p[0];\n            player.x = data.x;\n            player.y = data.y;\n            player.angle = data.angle;\n            (player.vx = data.vx), (player.vy = data.vy);\n            player.diceResult = data.diceResult;\n        }\n        else {\n            recentUpdates.push(data);\n        }\n    });\n    socket.on(\"ready\", () => {\n        let newPlayer = createNewUser(socket);\n        socket.emit(\"first hi\", newPlayer, currentUsers);\n        socket.broadcast.emit(\"add opponent\", newPlayer);\n        currentUsers.push(newPlayer); //add user for data tracking/sharing\n    });\n    setInterval(() => {\n        io.emit(\"update all\", recentUpdates);\n        recentUpdates.forEach((data) => {\n            let p = currentUsers.filter((user) => {\n                return user.socketId == data.socketId;\n            });\n            if (p && p[0]) {\n                let player = p[0];\n                player.x = data.x;\n                player.y = data.y;\n                player.angle = data.angle;\n                (player.vx = data.vx), (player.vy = data.vy);\n                player.diceResult = data.diceResult;\n            }\n        });\n        recentUpdates.length = 0;\n    }, 100 / 30);\n    function createNewUser(socket) {\n        let d = new Date();\n        let time = d.toLocaleString(\"en-US\", {\n            hour12: false,\n            timeZone: \"Europe/Stockholm\",\n        });\n        let user = {\n            socketId: socket.id,\n            loginTime: new Date().getTime(),\n            x: 200 + Math.random() * 600,\n            y: 100 + Math.random() * 200,\n            angle: Math.random() * 180,\n            color: \"0x\" + Math.floor(Math.random() * 16777215).toString(16),\n            vx: 1 - Math.random() * 2,\n            vy: 1 - Math.random() * 2,\n            diceResult: diceResults.get(socket.id),\n        };\n        return user;\n    }\n}\nexports.GameCommunication = GameCommunication;\n\n\n//# sourceURL=webpack://phaser3template/./src/backend/gameComm.ts?");

/***/ }),

/***/ "./src/backend/server.ts":
/*!*******************************!*\
  !*** ./src/backend/server.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst clientConnection_1 = __webpack_require__(/*! ./clientConnection */ \"./src/backend/clientConnection.ts\");\n//import mysql from 'mysql'\nconst app = express_1.default();\nconst port = process.env.PORT || 3000;\nconst server = http_1.default.createServer(app);\nconst io = __webpack_require__(/*! socket.io */ \"socket.io\")(server);\n// let db =  mysql.createPool({\n//     host: '',\n//     user: ',\n//     password: '',\n//     database: ''\n//   });\n//set up the routes that point web requests to the right files.\napp.use(express_1.default.static(\"/../public\"));\napp.get(\"/\", (req, res) => {\n    res.sendFile(path_1.default.join(__dirname, \"/../public/index.html\"));\n});\napp.get(\"/mystyle.css\", (req, res) => {\n    res.sendFile(path_1.default.join(__dirname, \"/../public/mystyle.css\"));\n});\napp.get(\"/bundle-front.js\", (req, res) => {\n    res.sendFile(path_1.default.join(__dirname, \"/../public/bundle-front.js\"));\n});\napp.get(\"/assets/*\", (req, res) => {\n    res.sendFile(path_1.default.join(__dirname, \"/../public/\" + req.path));\n});\n//start the game communication server to handle player data\nclientConnection_1.clientConnection(io);\n//start the web server to distribute the games files.\nserver.listen(port, () => {\n    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);\n});\n\n\n//# sourceURL=webpack://phaser3template/./src/backend/server.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/backend/server.ts");
/******/ })()
;