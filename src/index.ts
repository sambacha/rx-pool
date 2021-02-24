// @flow

// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
type PromiseProducer = () => Promise<*>;
type Deferred = {
	resolve: Function;
	reject: Function;
	// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
	promise: Promise<*>;
};
type Options = { concurrency?: number };

// see: http://bluebirdjs.com/docs/api/deferred-migration.html
function defer() {
	let resolve = () => {};
	let reject = () => {};
	const promise = new Promise((res, rej) => {
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
class PromisePool {
	queue: PromiseProducer[] = [];
	// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
	pool: Promise<*>[] = [];
	// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
	results: *[] = [];
	final: Deferred;
	// @ts-expect-error ts-migrate(2564) FIXME: Property 'error' has no initializer and is not def... Remove this comment to see the full error message
	error: ?Error;
	concurrency: number = Number.MAX_VALUE;

	constructor(options: Options = {}) {
		if (options.concurrency) {
			this.concurrency = options.concurrency;
		}
		this.final = defer();
	}

	// @ts-expect-error ts-migrate(7024) FIXME: Function implicitly has return type 'any' because ... Remove this comment to see the full error message
	next = async () => {
		// If any of the previous promises rejected then we should immediately abort
		// this ensures that if anything failed while being added to the pool then
		// calling pool.all will always result in an error being thrown
		if (this.error) {
			return this.final.reject(this.error);
		}

		// There's nothing left to do if the queue and pool are both empty, we can
		// return the promise results now.
		if (!this.queue.length && !this.pool.length) {
			return this.final.resolve(this.results);
		}

		// The number of promises running is enough or there are no more promises left to queue up then wait.
		if (this.pool.length >= this.concurrency || !this.queue.length) return;

		// At this point we have a new promise to run and the concurrency to run it
		const promiseProducer = this.queue.shift();

		let result;
		// @ts-expect-error ts-migrate(7034) FIXME: Variable 'promise' implicitly has type 'any' in so... Remove this comment to see the full error message
		let promise;
		try {
			// @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
			promise = promiseProducer();
			this.pool.push(promise);
			result = await promise;

			this.results.push(result);
			// @ts-expect-error ts-migrate(7005) FIXME: Variable 'promise' implicitly has an 'any' type.
			this.pool = this.pool.filter((p) => p !== promise);
		} catch (err) {
			this.error = err;
		}

		return this.next();
	};

	add(promiseProducer: PromiseProducer) {
		this.queue.push(promiseProducer);
		this.next();
	}

	all() {
		if (!this.pool.length && !this.queue.length) return [];
		return this.final.promise;
	}
}

module.exports = PromisePool;
