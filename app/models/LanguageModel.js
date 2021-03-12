'use strict';

import Realm from 'realm'

export default class LanguageModel extends Realm.Object {}
LanguageModel.schema = {
    name: 'LanguageModel',
    primaryKey: 'languageName',
    properties: {
        // languageCode: 'string',
        languageName: 'string',
        languageCode:'string',
        versionModels: 'VersionModel[]',
		bookNameList:'bookNameList[]',
    }
};