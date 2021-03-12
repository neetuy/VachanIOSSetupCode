'use strict';

import Realm from 'realm'

export default class VerseStylingModel extends Realm.Object {}
VerseStylingModel.schema = {
    name: 'VerseStylingModel',
    properties: {
        marker:'string',
        index:'int'
    }
};