// store/index.js
import Vuex from 'vuex';
import loader from './loader.js'

export default new Vuex.Store({
    strict: true,
    modules: {
        loader: loader
    }
});
