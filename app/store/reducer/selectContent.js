import { SELECT_CONTENT } from '../action/actionsType';

const initialState = {
    modalVisible: false,
    visibleParallelView:false,
    parallelLanguage:{
        languageName:'',
        versionCode:'',
        sourceId:null
    },
    parallelMetaData:{
    copyrightHolder: 'Unfolding Word',
    description: 'Revision of existing public domain bible 1950 . Hard copy of original available with BCS ',
    license: 'Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    source: 'Wycliffe Associates - 2017',
    technologyPartner: 'Bridge Connectivity Solutions',
    revision: 'unfoldingWord - 2018',
    versionNameGL: '\u0939\u093f\u0902\u0926\u0940 - \u0907\u0902\u0921\u093f\u092f\u0928 \u0930\u093f\u0935\u093e\u0907\u091c\u094d\u0921 \u0935\u0930\u094d\u091c\u0928\n',
}

}
function selectContent(state = initialState, action) {
    switch (action.type) {
        case SELECT_CONTENT:
            return {
                ...state,
                modalVisible: action.payload.modalVisible,
                parallelMetaData:action.payload.parallelMetaData,
                visibleParallelView:action.payload.visibleParallelView,
                parallelLanguage:action.payload.parallelLanguage
            }
        default:
            return state
    }
}

export default selectContent