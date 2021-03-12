import dbHelper from './dbHelper';
import DbHelper from './dbHelper';

class DbQueries {
    querySearchBookWithName(verCode: string, langName: string, text: string) {
        return DbHelper.queryBooksWithCode(verCode, langName, text);
    }
    querySearchVerse(verCode: string, langName: string, text: string) {
        return DbHelper.queryInVerseText(verCode, langName, text);
    }
    addNewVersion(langName, versCode, bookModels, sourceId) {
        DbHelper.addNewVersion(langName, versCode, bookModels, sourceId)
    }
    addHistory(sourceId, langName, languageCode, verCode, bookId, bookName, chapterNumber, downloaded, time) {
        DbHelper.addHistory(sourceId, langName, languageCode, verCode, bookId, bookName, chapterNumber, downloaded, time)
    }
    queryHistory() {
        return DbHelper.queryHistory();
    }
    clearHistory() {
        DbHelper.clearHistory()
    }
    getVersionMetaData(langName,verCode,sourceId){
      return  DbHelper.getVersionMetaData(langName,verCode,sourceId)
    }
    deleteBibleVersion(langName, verCode, sourceId, downloaded) {
        DbHelper.deleteBibleVersion(langName, verCode, sourceId, downloaded)
    }
    // add list of languages to db
    addLangaugeList(lang, books) {
        DbHelper.addLangaugeList(lang, books)
    }
    getLangaugeList() {
        return DbHelper.getLangaugeList()
    }
    deleteLangaugeList(){
        return dbHelper.deleteLangaugeList()
    }
    queryVersions(lang, ver, bookId) {
        return DbHelper.queryVersions(lang, ver, bookId)
    }
    queryBook(lang, ver, bookId) {
        return DbHelper.queryBook(lang, ver, bookId)
    }
    getDownloadedBook(lang) {
        return DbHelper.getDownloadedBook(lang)
    }

}

export default new DbQueries();