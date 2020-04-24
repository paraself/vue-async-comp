# vue-async-comp

A wrapper class to replace vue async component factory. Mainly help to re-try loading when a chunck fails to load.


## usage
Routing
``` ts
import RouteLoading from './RouteLoading.vue'
import RouteError from './RouteError.vue'
import { AsyncComp } from 'vue-async-comp'

const asyncComp = new AsyncComp({
  error: CompError,
  loading: CompLoading
})

const routes: RouteConfig[] = [
  {
    path: '/',
    component: asyncComp(import('../MyHome.vue'))
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
```

or along with `vue-class-component`
``` ts
@Component({
  components: {
    MyComp: asyncComp(import('../MyComp.vue'))
  }
})
export default class Test extends Vue {
}
```

## about chunk reloading
In `Error.vue`, emit `reload` event.
``` vue
<template>
<div class="btn" @click="$emit('reload')">
  click to reload
</div>
</template>
```

