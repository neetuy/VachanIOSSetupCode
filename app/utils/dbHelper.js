'use strict';

import Realm from 'realm';
import LanguageModel from '../models/LanguageModel';
import VersionModel from '../models/VersionModel';
import BookModel from '../models/BookModel';
import ChapterModel from '../models/ChapterModel';
import VerseModel from '../models/VerseModel';
import VerseStylingModel from '../models/VerseStylingModel';
import ReferenceModel from '../models/ReferenceModel';
import HistoryModel from '../models/HistoryModel';
import VerseMetadataModel from '../models/VerseMetadataModel';
import bookNameList from '../models/bookNameList';
import LanguageMetaData from '../models/LanguageMetaData'


import {
	Platform,
} from 'react-native';
var RNFS = require('react-native-fs');

class DbHelper {
	async getRealm() {
		try {
			return await Realm.open({
				schemaVersion: 2,
				deleteRealmIfMigrationNeeded: true,
				path:
					Platform.OS === 'ios'
						? RNFS.MainBundlePath + '/vachan_go.realm'
						: RNFS.DocumentDirectoryPath + '/vachan_go.realm',
				schema: [LanguageModel.schema, LanguageMetaData.schema, VersionModel.schema, BookModel.schema, ChapterModel.schema, VerseModel.schema, VerseStylingModel.schema, ReferenceModel.schema, HistoryModel.schema, VerseMetadataModel.schema, bookNameList.schema,]
			});
		} catch (err) {
			return null;
		}
	}

	async query(model: string, filter?: string, sort?: string, desc?: bool) {

		let realm = await this.getRealm();
		if (realm) {
			let results = realm.objects(model);
			if (filter) {
				results = results.filtered(filter);
			}
			if (sort) {
				return results = results.sorted(sort, desc);
			}
			return results;
		}
		return null;
	}

	async queryBooksWithCode(verCode: string, langCode: string, text?: string) {
		let realm = await this.getRealm();
		if (realm) {
			let resultsA = realm.objects("BookModel")
			if (resultsA.length > 0) {
				var resultsB = resultsA.filtered('languageName ==[c] "' + langCode + '" && versionCode ==[c] "' + verCode + '" && bookName CONTAINS[c] "' + text + '"').sorted("bookNumber");
				if (resultsB.length > 0) {
					return { bookId: resultsB[0].bookId, bookName: resultsB[0].bookName }
				}
			}
			return null;
		}
		return null;
	}

	async queryInVerseText(verCode: string, langName: string, text: string) {
		let realm = await this.getRealm();
		if (realm) {
			let resultsA = realm.objects("BookModel")
			var resultsB = resultsA.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '"');
			if (resultsB.length > 0) {
				var textValue = []
				for (var i = 0; i <= resultsB.length - 1; i++) {
					for (var j = 0; j <= resultsB[i].chapters.length - 1; j++) {
						var matchedStr = resultsB[i].chapters[j].verses.filtered('text CONTAINS[c] "' + text + '"')
						if (Object.keys(matchedStr).length > 0) {
							textValue.push({
								bookId: resultsB[i].bookId,
								bookName: resultsB[i].bookName,
								chapterNumber: resultsB[i].chapters[j].chapterNumber,
								verseNumber: matchedStr[0].number,
								text: matchedStr[0].text,
							})
						}
					}
				}
				return textValue
			}
		}
		return null;
	}

	async addHistory(sourceId, langName, langCode, verCode, bId, bookName, cNum, downloaded, timeStamp) {
		let realm = await this.getRealm();
		if (realm) {
			realm.write(() => {
				realm.create('HistoryModel', {
					sourceId: sourceId,
					languageName: langName,
					languageCode: langCode,
					versionCode: verCode,
					bookId: bId,
					bookName: bookName,
					chapterNumber: cNum,
					downloaded: JSON.parse(downloaded),
					time: timeStamp
				})
			});
		}
	}

	async queryHistory() {
		let realm = await this.getRealm();
		if (realm) {
			let results = realm.objects('HistoryModel')
			return results.sorted('time');
		}
		return null
	}

	async getVersionMetaData(langName,verCode,sourceId){
		let realm = await this.getRealm();
		if (realm) {
			let result = realm.objectForPrimaryKey("LanguageModel", langName)
			let resultsA = result.versionModels
			let resultsB = resultsA.filtered('versionCode ==[c] "' + verCode + '" && sourceId ==[c] "' + sourceId + '"')
			return resultsB[0].metaData
		}
		return null
	}
	

	async clearHistory() {
		let realm = await this.getRealm();
		realm.write(() => {
			let historyData = realm.objects('HistoryModel')
			realm.delete(historyData);
		});
	}

	async deleteBibleVersion(langName, verCode, sourceId, downloaded) {
		let realm = await this.getRealm();
		realm.write(() => {
			let result = realm.objectForPrimaryKey("LanguageModel", langName)
			let bible = realm.objects("BookModel")
			let bibleA = bible.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '"')
			realm.delete(bibleA);
			let resultsA = result.versionModels
			let resultsB = resultsA.filtered('versionCode ==[c] "' + verCode + '" && sourceId ==[c] "' + sourceId + '"')
			resultsB[0].downloaded = false
			resultsB[0].bookNameList = []
		})
	}

	async addLangaugeList(languages, books) {
		let realm = await this.getRealm()

		if (realm) {
			for (var i = 0; i < languages.length; i++) {
				for (var j = 0; j < books.length; j++) {
					var bookArr = []
					if (languages[i].languageName.toLowerCase() == books[j].language.name) {
						for (var k = 0; k < books[j].bookNames.length; k++) {
							const bookObj = {
								bookId: books[j].bookNames[k].book_code,
								bookName: books[j].bookNames[k].short,
								bookNumber: books[j].bookNames[k].book_id,
							}
							bookArr.push(bookObj)
						}
						var bookList = bookArr.sort(function (a, b) { return a.bookNumber - b.bookNumber })
						realm.write(() => {
							realm.create('LanguageModel', {
								languageName: languages[i].languageName,
								languageCode: languages[i].languageCode,
								versionModels: languages[i].versionModels,
								bookNameList: bookList,
							})
						})
					}
				}
			}
		}
	}

	async getLangaugeList() {
		let realm = await this.getRealm();
		if (realm) {
			let result = realm.objects('LanguageModel');
			if (Object.keys(result).length > 0) {
				return result
			}
			else {
				return null
			}
		}
	}
	async deleteLangaugeList(){
		let realm = await this.getRealm();
		realm.write(() => {
			let languages = realm.objects('LanguageModel')
			realm.delete(languages);
		});
	}

	//get all available booklist
	async getDownloadedBook(langName) {
		let realm = await this.getRealm();
		if (realm) {
			let result = realm.objectForPrimaryKey("LanguageModel", langName);
			let resultsA = result.bookNameList;
			return resultsA
		}
	}
	//download version
	async addNewVersion(langName, verCode, bookmodel, sourceId) {
		let realm = await this.getRealm();
		if (realm) {
			let result = realm.objectForPrimaryKey("LanguageModel", langName)
			let resultsA = result.versionModels
			var resultsB = resultsA.filtered('sourceId  =="' + sourceId + '"')
			var resultBook = realm.objects('BookModel').filtered('languageName ==[c] "' + langName + '" ')

			if (bookmodel.length > 0) {
				var bookIdList = []
				if (resultBook.length == 0) {
					realm.write(() => {
						for (var i = 0; i < bookmodel.length; i++) {
							realm.create('BookModel', bookmodel[i])
							bookIdList.push({ bookId: bookmodel[i].bookId, bookName: bookmodel[i].bookName, bookNumber: bookmodel[i].bookNumber })
						}
						resultsB[0].downloaded = true;
					})
				}
				else {
					for (var i = 0; i < resultBook.length; i++) {
						if (resultBook[i].versionCode == verCode) {
							realm.write(() => {
								for (var i = 0; i < bookmodel.length; i++) {
									realm.create('BookModel', bookmodel[i])
								}
								resultsA[0].downloaded = true;
							})
						}
					}

				}

			}
		}
	}
	//query  chapter
	async queryVersions(langName, verCode, bookId) {
		let realm = await this.getRealm()

		if (realm) {
			let result = realm.objects('BookModel')
			let data = result.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" && bookId =="' + bookId + '"')
			if (Object.keys(data).length > 0) {
				return data
			}
			else {
				return null
			}
		}
	}

}

export default new DbHelper();