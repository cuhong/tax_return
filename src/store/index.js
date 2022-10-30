// store/index.js
import Vuex from 'vuex';
import loader from './loader.js'
import layout from './layout.js'

export default new Vuex.Store({
    strict: true,
    modules: {
        loader: loader,
        layout: layout,
    }
});
