'use strict';

import Realm from 'realm'

export default class VerseMetadataModel extends Realm.Object {}
VerseMetadataModel.schema = {
    name: 'VerseMetadataModel',
    properties: {
        // styling:{type: 'string?[]'},
        // styling:'VerseStylingModel[]',
        // section:{type: 'string', optional: true},
        // VerseMetadataOwner: {type: 'linkingObjects', objectType: 'VerseModel', property: 'metadata' }
    }
};