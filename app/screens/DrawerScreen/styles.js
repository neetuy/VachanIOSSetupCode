import {StyleSheet} from 'react-native'
import Color from '../../utils/colorConstants'

export const styles =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor 
    },
    headerContainer: {
        height: 150,
    },
    drawerItem:{
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:8,
        paddingVertical:12,
        borderWidth: 0.3,
        borderColor: Color.Gray,
        backgroundColor:colorFile.backgroundColor 
    },
    headerText: {
    color: Color.White,
    },
    customText:{
    fontSize: 18,
    textAlign: 'center',
    color:Color.Black

    },
    versionText:{
        color: colorFile.textColor,   
        fontSize:16,
        alignSelf:'center',
        paddingVertical:10
    },
    textStyle: {
        color: colorFile.textColor,   
        fontSize:16,
        marginLeft:4,
        alignSelf:'center'
    },
   
    iconStyle:{
        color:colorFile.iconColor
    },
    iconStyleDrawer:{
        paddingRight:16,
        color:colorFile.iconColor
    },
    imageStyle:{width: 64,height: 64,alignSelf:'center',padding:8}
})
}



