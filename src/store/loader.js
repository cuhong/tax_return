const loader = {
    namespaced: true,
    state: {
        isLoading: false,
        isBlock: true
    },
    getters: {
        getIsLoading(state) {
            return state.isLoading;
        },
        getIsBlock(state) {
            return state.isBlock;
        }
    },
    mutations: {
        setIsLoading(state, value) {
            state.isLoading = value;
        },
        setIsBlock(state, value) {
            state.isBlock = value;
        }
    }
}

export default loader
