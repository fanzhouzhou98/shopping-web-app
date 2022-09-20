export const actions = {
    INCREMENT(state, action) {
        state.count += action
    },
    SET_TOKEN(state, action) {
        state.token = `Bearer ${action}`
    }
}