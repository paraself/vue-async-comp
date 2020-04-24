"use strict";
// Originally from
// https://github.com/vuejs/vue/issues/9788#issuecomment-520519960
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var AsyncComp = /** @class */ (function () {
    function AsyncComp(params) {
        this.delay = params.delay;
        this.error = params.error;
        this.timeout = params.timeout;
        this.loading = params.loading;
    }
    /**
     * @param comp The component to load (should be a Promise), e.g. import('./MyComponent.vue')
     */
    AsyncComp.prototype.load = function (comp) {
        var _this = this;
        var component_ = function () { return function () { return ({
            component: comp,
            loading: _this.loading,
            error: _this.error,
            delay: _this.delay || 200,
            timeout: _this.timeout || 7000
        }); }; };
        var observe = vue_1.default.observable({ compFactory: component_() });
        var comp_ = vue_1.default.extend({
            functional: true,
            name: 'AsyncCompLoader',
            render: function (h, _a) {
                var data = _a.data, children = _a.children;
                if (!data.on)
                    data.on = {};
                data.on.reload = function () {
                    vue_1.default.set(observe, 'compFactory', component_());
                };
                return h(observe.compFactory, data, children);
            }
        });
        return comp_;
    };
    return AsyncComp;
}());
exports.AsyncComp = AsyncComp;
//# sourceMappingURL=index.js.map