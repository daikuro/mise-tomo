const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.CL_7oj85.js",app:"_app/immutable/entry/app.Czbvolj6.js",imports:["_app/immutable/entry/start.CL_7oj85.js","_app/immutable/chunks/DU25-fHU.js","_app/immutable/chunks/B9G1ZdG6.js","_app/immutable/entry/app.Czbvolj6.js","_app/immutable/chunks/B9G1ZdG6.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/nszvv3va.js","_app/immutable/chunks/WQTESPAT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-D-pOVJx_.js')),
			__memo(() => import('./chunks/1-DjkVpKg2.js')),
			__memo(() => import('./chunks/2-CRPOjNbS.js')),
			__memo(() => import('./chunks/3-t1BE54Bm.js')),
			__memo(() => import('./chunks/4-r1uQtrXs.js')),
			__memo(() => import('./chunks/5-2VIEWDHY.js')),
			__memo(() => import('./chunks/6-jt1ZsRLA.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/jobs",
				pattern: /^\/jobs\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/jobs/[id]",
				pattern: /^\/jobs\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
