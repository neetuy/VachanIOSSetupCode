import {StyleSheet,Dimensions} from 'react-native'
import Color from '../../utils/colorConstants'
export const styles = StyleSheet.create({

    container:{
       marginHorizontal:6,marginVertical:16
    },
    button:{
        paddingRight:0,
        paddingLeft:0,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomWidth:0,
        borderTopWidth:0,
        borderColor:Color.Blue_Color,
        
    },
    buttonCenter:{
        paddingRight:0,
        paddingLeft:0,
        borderBottomWidth:0,
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
    }


})
