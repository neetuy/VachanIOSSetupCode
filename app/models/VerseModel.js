'use strict';

import Realm from 'realm'

export default class VerseModel extends Realm.Object {}
VerseModel.schema = {
    name: 'VerseModel',
    properties: {
    	text: {type: 'string', indexed: true},
        number: {type: 'string', indexed: true},
        section:{type: 'string', optional: true}
    }
};

