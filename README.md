# vue-async-comp

A wrapper class to replace vue async component factory. Mainly help to re-try loading when a chunck fails to load.

The original vue [async component factory](https://vuejs.org/v2/guide/components-dynamic-async.html#Handling-Loading-State) does not offer a way to reload when chunck fail to load. The wrapper class can help reloading chunks.

Vue 异步组件加载器，主要用于当异步组件懒加载失败的时候，能够重新加载该chunk。Vue[默认的异步组件工厂函数](https://vuejs.org/v2/guide/components-dynamic-async.html#Handling-Loading-State)没有提供重试的方法，通过该插件可以方便的在chunk加载失败的时候，重新加载对应的chunk。

## Install
```
npm i -S vue-async-comp
```

## Usage
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
    component: asyncComp.load(import('../MyHome.vue'))
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
    MyComp: asyncComp.load(import('../MyComp.vue'))
  }
})
export default class Test extends Vue {
}
```

## Chunk reloading
In `Error.vue`, emit `reload` event.
``` vue
<template>
<div class="btn" @click="$emit('reload')">
  click to reload
</div>
</template>
```

