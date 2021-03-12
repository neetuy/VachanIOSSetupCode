import { UPDATE_VERSION, UPDATE_VERSION_BOOK, UPDATE_CONTENT_TYPE, UPDATE_MATA_DATA, API_BASE_URL, AUDIO_URL } from '../action/actionsType';

const initialState = {
    language: 'Hindi',
    languageCode: 'hin',
    version: 'Indian Revised Bible',
    versionCode: 'IRV',
    sourceId: 10,
    downloaded: false,
    bookId: 'jhn',
    bookName: 'यूहन्ना',
    chapterNumber: 1,
    totalChapters: 21,
    verseText: '',

    copyrightHolder: 'Unfolding Word',
    description: 'Revision of existing public domain bible 1950 . Hard copy of original available with BCS ',
    license: 'Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    source: 'Wycliffe Associates - 2017',
    technologyPartner: 'Bridge Connectivity Solutions',
    revision: 'unfoldingWord - 2018',
    versionNameGL: '\u0939\u093f\u0902\u0926\u0940 - \u0907\u0902\u0921\u093f\u092f\u0928 \u0930\u093f\u0935\u093e\u0907\u091c\u094d\u0921 \u0935\u0930\u094d\u091c\u0928\n',

    parallelContentType: 'bible',
    baseAPI: null,
    audioURL:null,
    audioFormat:'mp3'
}

function updateVersionReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_VERSION:
            return {
                ...state,
                language: action.payload.language,
                languageCode: action.payload.languageCode,
                versionCode: action.payload.versionCode,
                sourceId: action.payload.sourceId,
                downloaded: action.payload.downloaded,

            }
        case UPDATE_VERSION_BOOK:
            return {
                ...state,
                bookId: action.payload.bookId,
                bookName: action.payload.bookName,
                chapterNumber: action.payload.chapterNumber,
                totalChapters: action.payload.totalChapters,
            }
        case UPDATE_CONTENT_TYPE:
            return {
                ...state,
                parallelContentType: action.payload.parallelContentType,
            }
        case UPDATE_MATA_DATA:
            return {
                ...state,
                copyrightHolder: action.payload.copyrightHolder,
                description: action.payload.description,
                license: action.payload.license,
                source: action.payload.source,
                technologyPartner: action.payload.technologyPartner,
                revision: action.payload.revision,
                versionNameGL: action.payload.versionNameGL,
            }
        case API_BASE_URL:
            return {
                ...state,
                baseAPI: action.baseAPI
            }
        case AUDIO_URL:
            return {
                ...state,
                audioURL: action.payload.audioURL,
                audioFormat:action.payload.audioFormat
            }
        default:
            return state
    }
}

export default updateVersionReducer