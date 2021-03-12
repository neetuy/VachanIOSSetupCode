
import { UPDATE_COLOR_MODE, UPDATE_FONT_SIZE, UPDATE_NET_CONNECTION } from '../action/actionsType'

import { nightColors, dayColors } from '../../utils/colors.js'
import { extraSmallFont, smallFont, mediumFont, largeFont, extraLargeFont } from '../../utils/dimens.js'

const initialState = {
    colorMode: 1,
    sizeMode: 2,
    colorFile: dayColors,
    sizeFile: mediumFont,
    netConnection: false,
}

function updateStyling(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FONT_SIZE:
            let sizes = {
                sizeMode: () => {
                    switch (action.sizeMode) {
                        case 0:
                            return {
                                ...state,
                                sizeMode: action.sizeMode,
                                sizeFile: extraSmallFont
                            }
                        case 1:
                            return {
                                ...state,
                                sizeMode: action.sizeMode,
                                sizeFile: smallFont

                            }
                        case 2:
                            return {
                                ...state,
                                sizeMode: action.sizeMode,
                                sizeFile: mediumFont

                            }
                        case 3:
                            return {
                                ...state,
                                sizeMode: action.sizeMode,
                                sizeFile: largeFont

                            }
                        case 4:
                            return {
                                ...state,
                                sizeMode: action.sizeMode,
                                sizeFile: extraLargeFont

                            }
                        default:
                            return {
                                ...state,
                            }

                    }
                }
            }
            return sizes.sizeMode()

        case UPDATE_COLOR_MODE:
            const colors = {
                switchColor: () => {
                    switch (action.colorMode) {
                        case 1:
                            return {
                                ...state,
                                colorMode: action.colorMode,
                                colorFile: dayColors,

                            }
                        case 0:
                            return {
                                ...state,
                                colorMode: action.colorMode,
                                colorFile: nightColors,
                            }
                        default:
                            return {
                                ...state,
                            }


                    }
                }
            }
            return colors.switchColor()

        case UPDATE_NET_CONNECTION:
            return {
                ...state,
                netConnection: action.netConnection
            }
        default:
            return state

    }

}

export default updateStyling