import { StyleSheet } from 'react-native'
import Color from '../../utils/colorConstants'

export const aboutPage = (colorFile, sizeFile) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorFile.backgroundColor,
        },
        textStyle: {
            fontSize: sizeFile.contentText,
            color: colorFile.textColor,
            lineHeight: sizeFile.lineHeight,
        },
        textContainer: {
            margin: 16,
            padding: 8
        },
        featureList: {
            fontSize: sizeFile.contentText,
            color: colorFile.textColor,
            fontWeight: "bold"
        },
        italicText: {
            fontWeight: 'bold', fontStyle: 'italic'
        },
        boldText: {
            fontWeight: "bold"
        },
        linkText: {
            color: Color.Red,
            textDecorationLine: 'underline',
            fontSize: sizeFile.contentText
        },
        featureView: {
            flexDirection: 'row'
        },
        TitleText: {
            paddingTop: 8,
            fontSize: sizeFile.titleText,
            color: colorFile.sectionHeading,
            lineHeight: sizeFile.lineHeight
        },
        bulletIcon: {
            fontSize: 26,
            color: colorFile.iconColor,
            lineHeight: sizeFile.lineHeight,
        },
        rlsNoteTitleText:{
            paddingTop: 8,
            fontSize: sizeFile.contentText,
            color: colorFile.sectionHeading,
            lineHeight: sizeFile.lineHeight
        }
    })

}