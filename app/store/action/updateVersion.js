import { UPDATE_VERSION, UPDATE_CONTENT_TYPE,API_BASE_URL,AUDIO_URL, PARALLEL_METADATA, UPDATE_VERSION_BOOK, UPDATE_MATA_DATA } from "./actionsType";

export const updateVersion = (payload) => {
    return {
        type: UPDATE_VERSION,
        payload
    }
}
export const updateVersionBook = (payload) => {
    return {
        type: UPDATE_VERSION_BOOK,
        payload
    }
}

export const updateContentType = (payload) => {
    return {
        type: UPDATE_CONTENT_TYPE,
        payload
    }
}

export const parallelMetadta = (payload) => {
    return {
        type: PARALLEL_METADATA,
        payload
    }
}

export const updateMetadata = (payload) => {
    return {
        type: UPDATE_MATA_DATA,
        payload
    }
}
export const APIBaseURL = (baseAPI) => {
    return {
        type: API_BASE_URL,
        baseAPI
    }
}
export const APIAudioURL = (payload) => {
    return {
        type: AUDIO_URL,
        payload
    }
}

