const layout = {
    namespaced: true,
    state: {
        height: '100%'
    },
    getters: {
        getHeight(state) {
            return state.height;
        },
    },
    mutations: {
        setHeight(state, value) {
            state.height = value;
        },
    }
}

export default layout
