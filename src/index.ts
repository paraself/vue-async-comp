// Originally from
// https://github.com/vuejs/vue/issues/9788#issuecomment-520519960

import { AsyncComponentFactory, AsyncComponentPromise, Component } from 'vue/types/options'
import Vue, { CreateElement, RenderContext } from 'vue'

export class AsyncComp {
  private loading: Component
  private error: Component
  private delay?: number
  private timeout?: number
  constructor(params: {
    /** A component to use while the async component is loading */
    loading: Component,
    /** A component to use if the load fails */
    error: Component,
    /** Delay in millieseconds before showing the loading component. Default: 200ms. */
    delay?: number,
    /**
     * The error component will be displayed if a timeout in millieseconds is
     * provided and exceeded. Default: 7000ms.
     */
    timeout?: number
  }) {
    this.delay = params.delay
    this.error = params.error
    this.timeout = params.timeout
    this.loading = params.loading
  }

  /**
   * @param comp The component to load (should be a Promise), e.g. import('./MyComponent.vue')
   */
  load(comp: AsyncComponentPromise): Component {
    let component_: () => AsyncComponentFactory = () => () => ({
      component: comp,
      loading: this.loading,
      error: this.error,
      delay: this.delay || 200,
      timeout: this.timeout || 7000
    })
    const observe = Vue.observable({ compFactory: component_() })
    let comp_: Component = Vue.extend({
      functional: true,
      name: 'AsyncCompLoader',
      render(h: CreateElement, { data, children }: RenderContext) {
        if (!data.on) data.on = {}
        data.on.reload = () => {
          Vue.set(observe, 'compFactory', component_())
        }
        return h(observe.compFactory, data, children)
      }
    })
    return comp_
  }
}
