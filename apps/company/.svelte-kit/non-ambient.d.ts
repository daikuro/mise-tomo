
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/analytics" | "/applications" | "/inventory" | "/notifications" | "/staff";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/analytics": Record<string, never>;
			"/applications": Record<string, never>;
			"/inventory": Record<string, never>;
			"/notifications": Record<string, never>;
			"/staff": Record<string, never>
		};
		Pathname(): "/" | "/analytics" | "/analytics/" | "/applications" | "/applications/" | "/inventory" | "/inventory/" | "/notifications" | "/notifications/" | "/staff" | "/staff/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}