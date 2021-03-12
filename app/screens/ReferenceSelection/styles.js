import {StyleSheet} from 'react-native'

export const styles =(colorFile, sizeFile) =>{
    return StyleSheet.create({
        emptyMessageIcon:{
            fontSize:sizeFile.emptyIconSize,
            margin:16,
            color:colorFile.iconColor,
            alignSelf:'center'
        },
        tabLabel:{
            fontSize: 16, 
            margin: 0, 
            padding: 0, 
            color: colorFile.blueText
        },
        tabBarOptions:{
            borderBottomWidth: 1,
            borderColor: colorFile.blueText,
            backgroundColor: colorFile.backgroundColor,
            height: 36
        },
        indicatorStyle:{
            backgroundColor: colorFile.blueText,
        },

    })
    
}