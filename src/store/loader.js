const loader = {
    namespaced: true,
    state: {
        isLoading: false
    },
    getters: {
        getIsLoading(state) {
            return state.isLoading;
        }
    },
    mutations: {
        setIsLoading(state, value) {
            state.isLoading = value;
        }
    }
}

export default loader
