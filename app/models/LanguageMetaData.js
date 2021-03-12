'use strict';

import Realm from 'realm'

export default class LanguageMetaData extends Realm.Object {}
LanguageMetaData.schema = {
    name: 'LanguageMetaData',
    properties: {
        abbreviationtype:{type: 'string', optional: true},
        contact:{type: 'string', optional: true},
        contentType:{type: 'string', optional: true},
        copyrightHolder:{type: 'string', optional: true},
        description:{type: 'string', optional: true},
        languageCode:{type: 'string', optional: true},
        languageName:{type: 'string', optional: true},
        license:{type: 'string', optional: true},
        licenseURL:{type: 'string', optional: true},
        NTURL:{type: 'string', optional: true},
        OTURL:{type: 'string', optional: true},
        publicDomain:{type: 'string', optional: true},
        revision:{type: 'string', optional: true},
        source:{type: 'string', optional: true},
        technologyPartner:{type: 'string', optional: true},
        versionName:{type: 'string', optional: true},
        versionNameGL:{type: 'string', optional: true},
        Latest:{type:'bool',optional: true}
    }
};


