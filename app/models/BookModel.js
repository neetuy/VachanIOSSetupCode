'use strict';

import Realm from 'realm'

export default class BookModel extends Realm.Object {}
BookModel.schema = {
    name: 'BookModel',
    properties: {
      languageName: 'string',
      versionCode: 'string',
      bookId: 'string',
      bookName: 'string',
      bookNumber: 'int',
      chapters: 'ChapterModel[]',
      section: {type: 'string', default: 'NT'},
      // bookOwner: {type: 'linkingObjects', objectType: 'VersionModel', property:'bookModels' }
    }
};
