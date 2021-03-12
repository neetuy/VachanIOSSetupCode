import {StyleSheet,Dimensions, ColorPropType} from 'react-native'
import { color } from 'react-native-reanimated'
import colorConstants from '../../../utils/colorConstants'
import Color from '../../../utils/colorConstants'

export const SelectBookPageStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
   container:{
    flex:1,
    backgroundColor:colorFile.backgroundColor,
  
   },
    textStyle: {
        fontSize:sizeFile.titleText,
        color:colorFile.textColor,
        justifyContent:'center'
   },
   headerRightText:{
    color:Color.White,
    margin:16
   },
    sideBarContainer:{
        flexDirection:'column',
        backgroundColor:Color.Black
    },
    sideBarIconCustom:{
        alignSelf:'center',
        padding:16,
        color:colorConstants.White
    },
    bookNameContainer:{
        flexDirection:'column',
        
    },
  
    segmentButton:{
        padding:4,
        height: 45,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:Color.Blue_Color,
        justifyContent:'center'
    },
    buttonText:{
        alignItems:'center'
    },
    bookList:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        paddingHorizontal:16, 
        height:48
      },
    iconCustom:{
        color:colorFile.iconColor,
        fontSize:sizeFile.iconSize
    },
   cardItemStyle:{
       paddingTop:16,
       paddingBottom:16
    },
    activeBgColor:{
        backgroundColor:Color.Blue_Color
    },
    inactiveBgColor:{
        backgroundColor:colorFile.backgroundColor
    },
    activetabText:{
    color:colorFile.blueText
    },
    inactivetabText:{
    color:Color.White
    }
})
}

