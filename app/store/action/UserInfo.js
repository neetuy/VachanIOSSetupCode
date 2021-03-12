import { USER_INFO } from "./actionsType";

export const userInfo = (payload) => {
    return {
        type: USER_INFO,
        payload
    }
}
