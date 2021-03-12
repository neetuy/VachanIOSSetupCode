import { UPDATE_COLOR_MODE, UPDATE_FONT_SIZE, UPDATE_NET_CONNECTION } from './actionsType.js'

export const updateColorMode = (colorMode) => {
    return {
        type: UPDATE_COLOR_MODE,
        colorMode:colorMode,
    }
}
export const updateFontSize = (sizeMode) => {
    return {
        type: UPDATE_FONT_SIZE,
        sizeMode:sizeMode,
    }
}

export const updateNetConnection = (netConnection) => {
    return {
        type: UPDATE_NET_CONNECTION,
        netConnection:netConnection
    }
}




