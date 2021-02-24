declare type PromiseProducer = () => Promise<*>;
declare type Deferred = {
	resolve: Function;
	reject: Function;
	promise: Promise<*>;
};
declare type Options = {
	concurrency?: number;
};
declare function defer(): {
	resolve: () => void;
	reject: () => void;
	promise: any;
};
declare class PromisePool {
	queue: PromiseProducer[];
	pool: Promise<*>[];
	results: *[];
	final: Deferred;
	error: ?Error;
	concurrency: number;
	constructor(options?: Options);
	next: () => any;
	add(promiseProducer: PromiseProducer): void;
	all(): any[] | Promise<any>;
}
