import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Color from '../../utils/colorConstants'
const width = Dimensions.get('screen').width;

export default class HighlightColorGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                <View
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bottom: 60, backgroundColor: '#fff', position: 'absolute', width: width
                    }}
                >
                    <FlatList
                        data={["#fffe00", "#5dff79", "#56f3ff", "#ffcaf7", "#ffc66f"]}
                        numColumns={5}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={()=>this.props.doHighlight(item)}>
                            <View style={{ backgroundColor: item, marginHorizontal: width/25,marginVertical:8, borderWidth: 1, borderColor: item, borderRadius: 21, height: 42, width: 42 }}></View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>

        )
    }
}