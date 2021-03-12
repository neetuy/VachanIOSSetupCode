import {StyleSheet} from 'react-native'

export const routestyle=(colorFile, sizeFile) =>{
    return StyleSheet.create({
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
            backgroundColor: Color.blueText,
        }

    })
}