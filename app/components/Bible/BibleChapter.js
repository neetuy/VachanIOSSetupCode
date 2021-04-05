import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchVersionBooks } from '../../store/action'
import { styles } from './styles';
import { connect } from 'react-redux'
import { getResultText } from '../../utils/UtilFunctions'
import { Header, Button, Right, Title } from 'native-base'
import Color from '../../utils/colorConstants'
import ReloadButton from '../ReloadButton';
import vApi from '../../utils/APIFetch';

class BibleChapter extends Component {
    constructor(props) {
        super(props)
        this.styles = styles(this.props.colorFile, this.props.sizeFile);
        this.state = {
            currentParallelViewChapter: this.props.currentChapter,
            bookId: this.props.bookId,
            bookName: this.props.bookName,
            bookNameList: [],
            shortbookName: null,
            totalChapters: this.props.totalChapters,
            error: false,
            message: null,
            parallelBible: null,
            parallelBibleHeading: null,
            totalVerses: null,
            loading: false
        }
        this.alertPresent = false
    }
    queryParallelBible = (val, bkId) => {
        try {
            if (this.props.parallelLanguage) {
                let currentParallelViewChapter = (val != null && bkId == null) ? this.state.currentParallelViewChapter + parseInt(val) : (val != null && bkId != null ? parseInt(val) : this.state.currentParallelViewChapter)
                let bookId = bkId != null ? bkId : this.state.bookId
                this.setState({ loading: true, currentParallelViewChapter: currentParallelViewChapter, bookId }, async () => {
                    let url = "bibles" + "/" + this.props.parallelLanguage.sourceId + "/" + "books" + "/" + bookId + "/" + "chapter" + "/" + this.state.currentParallelViewChapter
                    let response = await vApi.get(url)
                    if (response.chapterContent) {
                        let chapterContent = response.chapterContent.verses
                        let totalVerses = response.chapterContent.verses.length
                        let parallelBibleHeading = response.chapterContent.metadata &&
                            (response.chapterContent.metadata[0].section && response.chapterContent.metadata[0].section.text)
                        this.setState({
                            parallelBible: chapterContent,
                            parallelBibleHeading: parallelBibleHeading,
                            totalVerses: totalVerses,
                            loading: false,
                            error: false, message: null
                        })
                    } else {
                        this.setState({
                            parallelBible: null,
                            parallelBibleHeading: null,
                            totalVerses: null,
                            bookId: bookId,
                            loading: false,
                            error: true,
                            message: null
                        })
                    }

                })
            }
        }
        catch (error) {
            this.setState({ message: null, error: true, loading: false })
        }

    }
    getRef = async (item) => {
        try {
            this.setState({ totalChapters: item.totalChapters })
            this.queryParallelBible(item.chapterNumber, item.bookId)
            this.updateBook()
        } catch (error) {
            this.setState({ error: true, message: null })
        }

    }
    updateBook = async () => {
        try {
            let response = await vApi.get('booknames')
            this.setState({ bookNameList: response })
            let bukName = null
            if (response) {
                let parallelLanguage = this.props.parallelLanguage && this.props.parallelLanguage.languageName.toLowerCase()
                for (var i = 0; i <= response.length - 1; i++) {
                    if (response[i].language.name === parallelLanguage) {
                        for (var j = 0; j <= response[i].bookNames.length - 1; j++) {
                            if (this.state.bookId != null) {
                                if (response[i].bookNames[j].book_code == this.state.bookId) {
                                    bukName = response[i].bookNames[j].short
                                }
                            }
                            
                        }

                    }
                }
                if (bukName != null) {
                    let shortbookName = bukName != null && (bukName.length > 10 ? bukName.slice(0, 9) + "..." : bukName)
                    this.setState({ message: null, error: false, bookName: bukName, shortbookName })
                } else {
                    this.setState({ error: true, message: 'This will be available soon' })
                    if (parallelLanguage) {
                        let lang = parallelLanguage.charAt(0).toUpperCase() + parallelLanguage.slice(1)
                        Alert.alert("", "The book you were reading is not available in " + lang, [{ text: 'OK', onPress: () => { return } }]);
                    }
                }
            } else {
                this.setState({ message: null, error: false })
                return
            }
        } catch (error) {
            this.setState({ error: true, bookNameList: [] });
        }
    }
    componentDidMount() {
        this.queryParallelBible(null, null)
        this.updateBook()
    }
    componentWillUnmount() {
        // to get the books name in language for single reading page
        this.props.books.length = 0;
        this.props.fetchVersionBooks({
            language: this.props.language,
            versionCode: this.props.versionCode,
            downloaded: this.props.downloaded, sourceId: this.props.sourceId
        })
    }
    errorMessage() {
        if (!this.alertPresent) {
            this.alertPresent = true;
            if (this.state.error) {
                Alert.alert("", "Check your internet connection", [{ text: 'OK', onPress: () => { this.alertPresent = false } }], { cancelable: false });
            } else {
                this.alertPresent = false;
            }
        }
    }

    updateData = () => {
        if (this.state.error) {
            this.errorMessage()
            this.queryParallelBible(null, null)
        }
        else {
            return
        }
    }
    goToSelectionTab = () => {
        if (this.props.parallelLanguage) {
            this.props.navigation.navigate("SelectionTab", {
                getReference: this.getRef, parallelContent: true, bookId: this.state.bookId, bookName: this.state.bookName,
                chapterNumber: this.state.currentParallelViewChapter, totalChapters: this.state.totalChapters,
                language: this.props.parallelLanguage.languageName, version: this.props.parallelLanguage.versionCode,
                sourceId: this.props.parallelLanguage.sourceId, downloaded: false,
            })
        }
    }
    render() {

        this.styles = styles(this.props.colorFile, this.props.sizeFile);
        return (
            <View style={this.styles.container}>
                <Header style={{ backgroundColor: Color.Blue_Color, height: 40, borderLeftWidth: 0.2, borderLeftColor: Color.White }}>
                    <Button transparent onPress={this.goToSelectionTab}>
                        {this.state.shortbookName ? <Title style={{ fontSize: 16 }}>{this.state.shortbookName} {this.state.currentParallelViewChapter} </Title> : null}
                        <Icon name="arrow-drop-down" color={Color.White} size={20} />
                    </Button>
                    <Right style={{ position: 'absolute', right: 4 }}>
                        <Button transparent onPress={() => this.props.toggleParallelView(false)}>
                            <Icon name='cancel' color={Color.White} size={20} />
                        </Button>
                    </Right>
                </Header>
                {this.state.loading &&
                    <Spinner
                        visible={true}
                        textContent={'Loading...'}
                    />}
                {
                    (this.state.parallelBible == null && this.state.error) ?
                        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                            <ReloadButton
                                styles={this.styles}
                                reloadFunction={this.queryParallelBible}
                                message={this.state.message}
                            />
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} ref={(ref) => { this.scrollViewRef = ref; }} >
                                {this.state.parallelBible && this.state.parallelBible.map((verse, index) =>
                                    <View style={{ marginHorizontal: 16, paddingTop: 8 }}>
                                        {verse.number == 1 ?
                                            <Text letterSpacing={24}
                                                style={this.styles.verseWrapperText}>
                                                {this.state.parallelBibleHeading != null ?
                                                    <Text style={this.styles.sectionHeading}>
                                                        {this.state.parallelBibleHeading} {"\n"}
                                                    </Text> : null}
                                                <Text>
                                                    <Text style={this.styles.verseChapterNumber}>
                                                        {this.state.currentParallelViewChapter}{" "}
                                                    </Text>
                                                    <Text style={this.styles.textString}>
                                                        {getResultText(verse.text)}
                                                    </Text>
                                                </Text>
                                                {
                                                    (verse.metadata && verse.metadata[0].section)
                                                        ?
                                                        <Text style={this.styles.sectionHeading}>
                                                            {"\n"}{verse.metadata[0].section.text}
                                                        </Text>
                                                        : null
                                                }
                                            </Text>
                                            :
                                            <Text letterSpacing={24}
                                                style={this.styles.verseWrapperText}>
                                                <Text>
                                                    <Text style={this.styles.verseNumber} >
                                                        {verse.number}{" "}
                                                    </Text>
                                                    <Text style={this.styles.textString}
                                                    >
                                                        {getResultText(verse.text)}
                                                    </Text>
                                                </Text>
                                                {
                                                    (verse.metadata && verse.metadata[0].section)
                                                        ?
                                                        <Text style={this.styles.sectionHeading}>
                                                            {"\n"}{verse.metadata[0].section.text}
                                                        </Text>
                                                        : null
                                                }
                                            </Text>

                                        }
                                    </View>
                                )}
                                <View style={this.styles.addToSharefooterComponent}>
                                    {
                                        (this.props.parallelMetaData != null && this.state.parallelBible) &&
                                        <View style={this.styles.footerView}>
                                            {(this.props.parallelMetaData.revision !== null && this.props.parallelMetaData.revision !== '') && <Text style={this.styles.textListFooter}><Text style={this.styles.footerText}>Copyright:</Text>{' '}{this.props.parallelMetaData.revision}</Text>}
                                            {(this.props.parallelMetaData.license !== null && this.props.parallelMetaData.license !== '') && <Text style={this.styles.textListFooter}><Text style={this.styles.footerText}>License:</Text>{' '}{this.props.parallelMetaData.license}</Text>}
                                            {(this.props.parallelMetaData.technologyPartner !== null && this.props.parallelMetaData.technologyPartner !== '') && <Text style={this.styles.textListFooter}><Text style={this.styles.footerText}>Technology partner:</Text>{' '}{this.props.parallelMetaData.technologyPartner}</Text>}
                                        </View>
                                    }
                                </View>

                            </ScrollView>

                            <View style={{ justifyContent: (this.state.currentParallelViewChapter != 1 && this.state.currentParallelViewChapter == this.state.currentParallelViewChapter != this.state.totalChapters) ? 'center' : 'space-around', alignItems: 'center' }}>
                                {
                                    this.state.currentParallelViewChapter == 1 ? null :
                                        <View style={this.styles.bottomBarParallelPrevView}>
                                            <Icon name={'chevron-left'} color={Color.Blue_Color} size={16}
                                                style={this.styles.bottomBarChevrontIcon}
                                                onPress={() => this.queryParallelBible(-1, null)}
                                            />
                                        </View>
                                }
                                {
                                    this.state.currentParallelViewChapter == this.state.totalChapters ? null :
                                        <View style={this.styles.bottomBarNextParallelView}>
                                            <Icon name={'chevron-right'} color={Color.Blue_Color} size={16}
                                                style={this.styles.bottomBarChevrontIcon}
                                                onPress={() => this.queryParallelBible(1, null)}
                                            />
                                        </View>
                                }
                            </View>
                        </View>

                }
            </View>
        )
    }

}


const mapStateToProps = state => {
    return {
        sizeFile: state.updateStyling.sizeFile,
        colorFile: state.updateStyling.colorFile,
        books: state.versionFetch.data,
        language: state.updateVersion.language,
        versionCode: state.updateVersion.versionCode,
        sourceId: state.updateVersion.sourceId,
        downloaded: state.updateVersion.downloaded,
        bookId: state.updateVersion.bookId,
        bookName: state.updateVersion.bookName,
        parallelLanguage: state.selectContent.parallelLanguage,
        parallelMetaData: state.selectContent.parallelMetaData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchVersionBooks: (payload) => dispatch(fetchVersionBooks(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BibleChapter)