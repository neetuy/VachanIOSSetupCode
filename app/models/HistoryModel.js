import Realm from 'realm'

export default class HistoryModel extends Realm.Object {}
HistoryModel.schema = {
    name: 'HistoryModel',
    properties: {
        sourceId:'int',
        languageName: 'string',
        languageCode:'string',
    	versionCode: 'string',
        bookId: 'string',
        bookName:'string',
        chapterNumber:'int',
		downloaded:'bool',
        time:'date'
    }
};