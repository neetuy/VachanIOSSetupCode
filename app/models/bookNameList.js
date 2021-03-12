
'use strict';

import Realm from 'realm'

export default class bookNameList extends Realm.Object {}
bookNameList.schema = {
    name: 'bookNameList',
    properties: {
        bookId:'string',
        bookName:'string',
        bookNumber:{type: 'int', optional: true}
    }
};
