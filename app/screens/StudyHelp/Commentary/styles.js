import {StyleSheet,Dimensions} from 'react-native'
import Color from '../../../utils/colorConstants'

export const styles =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    commentaryHeading:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
        fontWeight:'bold'
    },
    verseWrapperText:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
        justifyContent:'center',
        
    },
    cardItemBackground:{
        backgroundColor:colorFile.backgroundColor,
        padding:10
    },
    commentaryText:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
    },
    chapterList:{
        margin:16
    },
    footerComponent:{
        height:64,
        marginBottom:4
    },

    VerseText:{
        fontWeight:'100'
    },
    textString:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
        fontWeight:'normal',
        lineHeight:sizeFile.lineHeight
    },
   
    IconFloatingStyle:{
        position: 'absolute',
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        padding:8,
        top: 10,
      },
      reloadText:{
        fontSize:18,color:Color.White,textAlign:'center'
      },
      reloadButton:{height:40,width:120,
        borderRadius:4,backgroundColor:Color.Blue_Color,
        justifyContent:'center',alignItems:'center'},
        emptyMessageIcon:{
            fontSize:sizeFile.emptyIconSize,
            margin:16,
            color:colorFile.iconColor,
            alignSelf:'center'
        },
      
    })
}
