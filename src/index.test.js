"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		var _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y["return"]
									: op[0]
									? y["throw"] || ((t = y["return"]) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PromisePoo... Remove this comment to see the full error message
var PromisePool = require(".");
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("PromisePool", function () {
	var promiseSpy;
	var promiseProducer;
	// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
	beforeEach(function () {
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
		promiseSpy = jest.fn();
		promiseProducer = function () {
			return new Promise(function (resolve, reject) {
				promiseSpy();
				resolve("success");
			});
		};
	});
	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should await all promises", function () {
		return __awaiter(void 0, void 0, void 0, function () {
			var pool, results;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						pool = new PromisePool();
						pool.add(promiseProducer);
						pool.add(promiseProducer);
						return [4 /*yield*/, pool.all()];
					case 1:
						results = _a.sent();
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(promiseSpy).toHaveBeenCalledTimes(2);
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results.length).toBe(2);
						return [2 /*return*/];
				}
			});
		});
	});
	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should await all promises with no concurrency", function () {
		return __awaiter(void 0, void 0, void 0, function () {
			var pool, results;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						pool = new PromisePool({ concurrency: 1 });
						pool.add(promiseProducer);
						pool.add(promiseProducer);
						pool.add(promiseProducer);
						return [4 /*yield*/, pool.all()];
					case 1:
						results = _a.sent();
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(promiseSpy).toHaveBeenCalledTimes(3);
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results.length).toBe(3);
						return [2 /*return*/];
				}
			});
		});
	});
	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should allow multiple concurrency", function () {
		return __awaiter(void 0, void 0, void 0, function () {
			var delayedPromiseSpy, delayedPromiseProducer, pool, results;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						delayedPromiseSpy = jest.fn();
						delayedPromiseProducer = function () {
							return new Promise(function (resolve, reject) {
								setTimeout(function () {
									delayedPromiseSpy();
									resolve("delayed");
								}, 1000);
							});
						};
						pool = new PromisePool({ concurrency: 2 });
						pool.add(delayedPromiseProducer);
						pool.add(promiseProducer);
						return [4 /*yield*/, pool.all()];
					case 1:
						results = _a.sent();
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(delayedPromiseSpy).toBeCalled();
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(promiseSpy).toBeCalled();
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results[0]).toBe("success");
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results[1]).toBe("delayed");
						return [2 /*return*/];
				}
			});
		});
	});
	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should respect concurrency", function () {
		return __awaiter(void 0, void 0, void 0, function () {
			var delayedPromiseSpy,
				kindaDelayedPromiseProducer,
				delayedPromiseProducer,
				pool,
				results;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						delayedPromiseSpy = jest.fn();
						kindaDelayedPromiseProducer = function () {
							return new Promise(function (resolve, reject) {
								setTimeout(function () {
									delayedPromiseSpy();
									resolve("delayed2");
								}, 500);
							});
						};
						delayedPromiseProducer = function () {
							return new Promise(function (resolve, reject) {
								setTimeout(function () {
									delayedPromiseSpy();
									resolve("delayed");
								}, 1000);
							});
						};
						pool = new PromisePool({ concurrency: 2 });
						pool.add(delayedPromiseProducer);
						pool.add(kindaDelayedPromiseProducer);
						pool.add(promiseProducer);
						return [4 /*yield*/, pool.all()];
					case 1:
						results = _a.sent();
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results[0]).toBe("delayed2");
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results[1]).toBe("success");
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results[2]).toBe("delayed");
						return [2 /*return*/];
				}
			});
		});
	});
	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("can be called multiple times", function () {
		return __awaiter(void 0, void 0, void 0, function () {
			var pool, results;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						pool = new PromisePool({ concurrency: 2 });
						pool.add(promiseProducer);
						return [4 /*yield*/, pool.all()];
					case 1:
						_a.sent();
						pool.add(promiseProducer);
						pool.add(promiseProducer);
						return [4 /*yield*/, pool.all()];
					case 2:
						results = _a.sent();
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(promiseSpy).toHaveBeenCalledTimes(3);
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results.length).toBe(3);
						return [2 /*return*/];
				}
			});
		});
	});
	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should throw if .all fails", function () {
		return __awaiter(void 0, void 0, void 0, function () {
			var pool, error, errorProducer, err_1;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						pool = new PromisePool({ concurrency: 2 });
						errorProducer = function () {
							return new Promise(function (resolve, reject) {
								reject(new Error("Test"));
							});
						};
						_a.label = 1;
					case 1:
						_a.trys.push([1, 3, , 4]);
						pool.add(promiseProducer);
						pool.add(promiseProducer);
						pool.add(errorProducer);
						return [4 /*yield*/, pool.all()];
					case 2:
						_a.sent();
						return [3 /*break*/, 4];
					case 3:
						err_1 = _a.sent();
						error = err_1.message;
						return [3 /*break*/, 4];
					case 4:
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(error).toBe("Test");
						return [2 /*return*/];
				}
			});
		});
	});
	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should throw if any promise fails outside of .all", function () {
		return __awaiter(void 0, void 0, void 0, function () {
			var pool, error, errorProducer, err_2;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						pool = new PromisePool({ concurrency: 2 });
						errorProducer = function () {
							return new Promise(function (resolve, reject) {
								reject(new Error("Test"));
							});
						};
						pool.add(promiseProducer);
						pool.add(promiseProducer);
						pool.add(errorProducer);
						_a.label = 1;
					case 1:
						_a.trys.push([1, 3, , 4]);
						return [4 /*yield*/, pool.all()];
					case 2:
						_a.sent();
						return [3 /*break*/, 4];
					case 3:
						err_2 = _a.sent();
						error = err_2.message;
						return [3 /*break*/, 4];
					case 4:
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(error).toBe("Test");
						return [2 /*return*/];
				}
			});
		});
	});
	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should resolve if pool is empty", function () {
		return __awaiter(void 0, void 0, void 0, function () {
			var pool, results;
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						pool = new PromisePool({ concurrency: 2 });
						return [4 /*yield*/, pool.all()];
					case 1:
						results = _a.sent();
						// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
						expect(results.length).toBe(0);
						return [2 /*return*/];
				}
			});
		});
	});
});
