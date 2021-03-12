import { SELECT_CONTENT } from "./actionsType";

export const selectContent = (payload) => {
    return {
        type: SELECT_CONTENT,
        payload
    }
}