import {StyleSheet} from 'react-native'
import Color from '../../../utils/colorConstants'

export const styles =(colorFile, sizeFile) =>{
    return StyleSheet.create({
        container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor,
        },
        iconStyle:{
            fontSize:28,
            color:colorFile.textColor,
            fontSize:sizeFile.contentText
        },
        headerText:{
            fontWeight: "600" ,
            color:colorFile.textColor,
            fontSize:sizeFile.contentText
        },
        headerStyle:{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center" ,
            color:colorFile.textColor,
            fontSize:sizeFile.contentText
        },
        dictionaryModal:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dictionaryModalView:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        cardStyle:{
            backgroundColor:colorFile.backgroundColor
        },
        textStyle:{
            color:colorFile.textColor,
            fontSize:sizeFile.contentText,
        },
        textString:{
            fontSize:sizeFile.contentText,
            color:colorFile.textColor,
            fontWeight:'normal',
            lineHeight:sizeFile.lineHeight
        },
        scrollViewModal:{
            margin:12,
            padding:12,
            flex:1,
            borderColor:Color.Blue_Color,
            borderWidth:1,
            backgroundColor:colorFile.backgroundColor
        },
        textDescription:{
            color:colorFile.textColor,
            fontSize:sizeFile.contentText,
        },
        reloadButton:{
            height:40,width:120,borderRadius:4,
            backgroundColor:Color.Blue_Color,
            justifyContent:'center',alignItems:'center'
          },
        reloadText:{fontSize:18,color:Color.White,textAlign:'center'},
        emptyMessageIcon:{
            fontSize:sizeFile.emptyIconSize,
            margin:16,
            color:colorFile.iconColor,
            alignSelf:'center'
        },
        centerEmptySet: { 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%' 
        },
        emptyMessageContainer:{
            flex:1,
            alignItems:'center',
            flexDirection:'column',
            justifyContent:'center'
        },
        emptyMessageIcon:{
            fontSize:sizeFile.emptyIconSize,
            margin:16,
            color:colorFile.iconColor,
        },
        messageEmpty:{
            fontSize:sizeFile.titleText,
            color:colorFile.textColor,
        },
        cardItemStyle:{
            paddingTop:16,
            paddingBottom:16,
            backgroundColor:colorFile.backgroundColor
         },
         dictionaryText:{
            fontSize:sizeFile.titleText,
            color:colorFile.iconColor
        },
    })
}
