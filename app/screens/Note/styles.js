import {StyleSheet,Dimensions} from 'react-native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const noteStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    noteCardItem:{
        justifyContent:'space-between', 
        alignItems:'center',
        marginTop:16, 
        flexDirection:'row'
        
    },
    chapterSelectionContainer:{
        flex:1,
        backgroundColor:colorFile.backgroundColor        
    },
    selectGridNum:{
        flex:0.25,
        borderColor:colorFile.gridBorderColor,
        height:width/4,
        justifyContent:"center"
    },
    modalText:{
        textAlign:'left',
        fontSize:sizeFile.titleText,
        color:colorFile.textColor
    },
    modalMainView:{flex:1,justifyContent:'center',
    alignItems:'center',
    backgroundColor:colorFile.semiTransparentBackground},
    modalView:{
        width:'80%',height:'80%',position:'absolute',zIndex:0,top:80
    },
    modalCloseIcon:{
        position:'absolute',right:-20,top:-20,zIndex: 1
    },
    chapterNum:{
        fontSize:sizeFile.titleText,
        textAlign:"center",
        alignItems:"center", 
        color:colorFile.textColor
    },
    cardItemStyle:{
        paddingTop:16,
        paddingBottom:16,
        backgroundColor:colorFile.backgroundColor
     },
    notesContentView:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    noteContent:{
        flex:1,
        backgroundColor:colorFile.backgroundColor,
    },
    centerEmptySet: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
    },
    noteFontCustom:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    noteText:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    deleteIon:{
        fontSize:sizeFile.iconSize,
        color:colorFile.textColor
    },
    noteFlatlistCustom:{
        backgroundColor:colorFile.backgroundColor,
        margin:8
    },
    placeholderColor:{
        color: colorFile.textColor, 
    },
    inputStyle:{
        fontSize:sizeFile.contentText,
        color: colorFile.textColor,
        margin:8
    },
    NoteAddButton:{
        flex:8
    },
    noteTextSize:{
    fontSize:sizeFile.contentText,      
    },
    FlowLayoutCustom:{
        flex:8
    },
    addIconCustom:{
    flex:1,
    fontSize:sizeFile.iconSize,
    color:colorFile.iconColor
    },
    noteTextView:
    {height:2, 
    backgroundColor:'gray', 
    marginHorizontal:8
    },
    containerEditNote:{
        flex:1, 
        flexDirection:'column', 
        backgroundColor:colorFile.backgroundColor,
    },
    subContainer:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        margin:8,
        marginHorizontal:8,
        marginVertical:16
    },
    noteReferenceViewCustom:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        margin:8
    },
    tapButton:{
        flex:8,
        color:colorFile.textColor,
        fontSize:sizeFile.titleText
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
    textEditorView:{
        flexDirection: 'column-reverse'
    },
    richTextEditor:{
        height:height,
        color:colorFile.textColor,
        fontSize:sizeFile.contentText,
        backgroundColor:colorFile.backgroundColor
    },
    iconCustom:{
        margin:8, 
        padding:8, 
    },
    textStyle:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText
    },
    iconReferClose:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText
    }

})
}

