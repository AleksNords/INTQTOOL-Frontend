export function setUser(payload) {
    return {
        type: 'SET_USER',
        payload: payload
    }
}
export function removeUser() {
    return {
        type: 'REMOVE_USER'
    }
}