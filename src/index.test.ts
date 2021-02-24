// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PromisePoo... Remove this comment to see the full error message
const PromisePool = require(".");

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("PromisePool", () => {
	let promiseSpy: any;
	let promiseProducer: any;

	// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
	beforeEach(() => {
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
		promiseSpy = jest.fn();
		promiseProducer = () =>
			new Promise((resolve, reject) => {
				promiseSpy();
				resolve("success");
			});
	});

	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should await all promises", async () => {
		const pool = new PromisePool();
		pool.add(promiseProducer);
		pool.add(promiseProducer);
		const results = await pool.all();
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(promiseSpy).toHaveBeenCalledTimes(2);
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results.length).toBe(2);
	});

	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should await all promises with no concurrency", async () => {
		const pool = new PromisePool({ concurrency: 1 });
		pool.add(promiseProducer);
		pool.add(promiseProducer);
		pool.add(promiseProducer);
		const results = await pool.all();
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(promiseSpy).toHaveBeenCalledTimes(3);
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results.length).toBe(3);
	});

	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should allow multiple concurrency", async () => {
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
		const delayedPromiseSpy = jest.fn();
		const delayedPromiseProducer = () =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					delayedPromiseSpy();
					resolve("delayed");
				}, 1000);
			});

		const pool = new PromisePool({ concurrency: 2 });
		pool.add(delayedPromiseProducer);
		pool.add(promiseProducer);
		const results = await pool.all();
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(delayedPromiseSpy).toBeCalled();
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(promiseSpy).toBeCalled();
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results[0]).toBe("success");
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results[1]).toBe("delayed");
	});

	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should respect concurrency", async () => {
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
		const delayedPromiseSpy = jest.fn();
		const kindaDelayedPromiseProducer = () =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					delayedPromiseSpy();
					resolve("delayed2");
				}, 500);
			});
		const delayedPromiseProducer = () =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					delayedPromiseSpy();
					resolve("delayed");
				}, 1000);
			});

		const pool = new PromisePool({ concurrency: 2 });
		pool.add(delayedPromiseProducer);
		pool.add(kindaDelayedPromiseProducer);
		pool.add(promiseProducer);
		const results = await pool.all();
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results[0]).toBe("delayed2");
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results[1]).toBe("success");
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results[2]).toBe("delayed");
	});

	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("can be called multiple times", async () => {
		const pool = new PromisePool({ concurrency: 2 });
		pool.add(promiseProducer);
		await pool.all();
		pool.add(promiseProducer);
		pool.add(promiseProducer);
		const results = await pool.all();
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(promiseSpy).toHaveBeenCalledTimes(3);
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results.length).toBe(3);
	});

	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should throw if .all fails", async () => {
		const pool = new PromisePool({ concurrency: 2 });
		let error;
		let errorProducer = () =>
			new Promise((resolve, reject) => {
				reject(new Error("Test"));
			});

		try {
			pool.add(promiseProducer);
			pool.add(promiseProducer);
			pool.add(errorProducer);
			await pool.all();
		} catch (err) {
			error = err.message;
		}
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(error).toBe("Test");
	});

	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should throw if any promise fails outside of .all", async () => {
		const pool = new PromisePool({ concurrency: 2 });
		let error;
		let errorProducer = () =>
			new Promise((resolve, reject) => {
				reject(new Error("Test"));
			});

		pool.add(promiseProducer);
		pool.add(promiseProducer);
		pool.add(errorProducer);
		try {
			await pool.all();
		} catch (err) {
			error = err.message;
		}
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(error).toBe("Test");
	});

	// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
	it("should resolve if pool is empty", async () => {
		const pool = new PromisePool({ concurrency: 2 });
		const results = await pool.all();
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
		expect(results.length).toBe(0);
	});
});
