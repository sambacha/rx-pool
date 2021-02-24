// @flow
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
// see: http://bluebirdjs.com/docs/api/deferred-migration.html
function defer() {
	var resolve = function () {};
	var reject = function () {};
	var promise = new Promise(function (res, rej) {
		// @ts-expect-error ts-migrate(2322) FIXME: Type '(value: unknown) => void' is not assignable ... Remove this comment to see the full error message
		resolve = res;
		reject = rej;
	});
	return {
		resolve: resolve,
		reject: reject,
		promise: promise,
	};
}
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'PromisePool'.
var PromisePool = /** @class */ (function () {
	function PromisePool(options) {
		var _this = this;
		if (options === void 0) {
			options = {};
		}
		this.queue = [];
		// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
		this.pool = [];
		// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
		this.results = [];
		this.concurrency = Number.MAX_VALUE;
		// @ts-expect-error ts-migrate(7024) FIXME: Function implicitly has return type 'any' because ... Remove this comment to see the full error message
		this.next = function () {
			return __awaiter(_this, void 0, void 0, function () {
				var promiseProducer, result, promise, err_1;
				return __generator(this, function (_a) {
					switch (_a.label) {
						case 0:
							// If any of the previous promises rejected then we should immediately abort
							// this ensures that if anything failed while being added to the pool then
							// calling pool.all will always result in an error being thrown
							if (this.error) {
								return [2 /*return*/, this.final.reject(this.error)];
							}
							// There's nothing left to do if the queue and pool are both empty, we can
							// return the promise results now.
							if (!this.queue.length && !this.pool.length) {
								return [2 /*return*/, this.final.resolve(this.results)];
							}
							// The number of promises running is enough or there are no more promises left to queue up then wait.
							if (this.pool.length >= this.concurrency || !this.queue.length)
								return [2 /*return*/];
							promiseProducer = this.queue.shift();
							_a.label = 1;
						case 1:
							_a.trys.push([1, 3, , 4]);
							// @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
							promise = promiseProducer();
							this.pool.push(promise);
							return [4 /*yield*/, promise];
						case 2:
							result = _a.sent();
							this.results.push(result);
							// @ts-expect-error ts-migrate(7005) FIXME: Variable 'promise' implicitly has an 'any' type.
							this.pool = this.pool.filter(function (p) {
								return p !== promise;
							});
							return [3 /*break*/, 4];
						case 3:
							err_1 = _a.sent();
							this.error = err_1;
							return [3 /*break*/, 4];
						case 4:
							return [2 /*return*/, this.next()];
					}
				});
			});
		};
		if (options.concurrency) {
			this.concurrency = options.concurrency;
		}
		this.final = defer();
	}
	PromisePool.prototype.add = function (promiseProducer) {
		this.queue.push(promiseProducer);
		this.next();
	};
	PromisePool.prototype.all = function () {
		if (!this.pool.length && !this.queue.length) return [];
		return this.final.promise;
	};
	return PromisePool;
})();
module.exports = PromisePool;
