import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export const bookStyle=(colorFile, sizeFile) =>{
    return StyleSheet.create({
    imagecontainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        resizeMode:'contain',
        justifyContent: 'center',
        },
        pinchableImage: {
        width: 300,
        height: 300,
        resizeMode:'contain',
        },
        wrapper: {
        flex: 1,
        backgroundColor:colorFile.backgroundColor,
        },
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor,
        padding:8
    },
    infoView:{
        width:'100%',
        fontSize:sizeFile.fontSize,
    },
    infoText:{
        fontSize:sizeFile.titleText,
        color:colorFile.iconColor
    },

    emptyMessageContainer:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    messageEmpty:{
        fontSize:sizeFile.titleText,
        color:colorFile.textColor,
    },
    emptyMessageIcon:{
        fontSize:sizeFile.emptyIconSize,
        margin:16,
        color:colorFile.iconColor,
    },
    centerEmptySet: { 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%' 
    },
    infoStyle:{
        height:'50%',
        width:'100%'
    },
    description:{
        marginHorizontal:8,
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    title:{
        margin:16,
        fontSize:sizeFile.titleText,
        color:colorFile.textColor
    },
    cardItemStyle:{
        paddingTop:16,
        paddingBottom:16,
        backgroundColor:colorFile.backgroundColor
     },

    })
}