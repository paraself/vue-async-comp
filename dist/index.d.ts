import { AsyncComponentPromise, Component } from 'vue/types/options';
export declare class AsyncComp {
    private loading;
    private error;
    private delay?;
    private timeout?;
    constructor(params: {
        /** A component to use while the async component is loading */
        loading: Component;
        /** A component to use if the load fails */
        error: Component;
        /** Delay before showing the loading component. Default: 200ms. */
        delay?: number;
        /**
         * The error component will be displayed if a timeout is
         * provided and exceeded. Default: 7s.
         */
        timeout?: number;
    });
    /**
     * @param comp The component to load (should be a Promise), e.g. import('./MyComponent.vue')
     */
    load(comp: AsyncComponentPromise): Component;
}
