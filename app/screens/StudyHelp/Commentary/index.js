import React, { Component } from 'react';
import {
  FlatList,
  Alert,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Body, Header, Right, Title, Button } from 'native-base';
import {vachanAPIFetch, fetchVersionBooks } from '../../../store/action/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import Color from '../../../utils/colorConstants';
import ReloadButton from '../../../components/ReloadButton';
import HTML from 'react-native-render-html';
// import APIFetch from '../../../utils/APIFetch'
import vApi from '../../../utils/APIFetch';
import securityVaraibles from '../../../../securityVaraibles';
import bookNameList from '../../../models/bookNameList';
import { color } from 'react-native-reanimated';

const commentaryKey = securityVaraibles.COMMENTARY_KEY ? '?key=' + securityVaraibles.COMMENTARY_KEY : ''

class Commentary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentary: [],
      error: null,
      bookName: this.props.bookName,
      bookNameList:[]
    }
    this.styles = styles(this.props.colorFile, this.props.sizeFile)
    this.alertPresent = false
  }
  // fetch bookname in perticular language of commenatry
  async fetchBookName() {
    try {
        let response = await vApi.get('booknames')
        this.setState({ bookNameList: response })
    } catch (error) {
        this.setState({ error: error, bookNameList: [] });
    }
  }
  componentDidMount(){
    const url = "commentaries/"+this.props.parallelLanguage.sourceId + "/" + this.props.bookId + "/" + this.props.currentVisibleChapter + commentaryKey
    this.props.vachanAPIFetch(url)
    this.fetchBookName()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.bookId != prevProps.bookId || prevProps.currentVisibleChapter != this.props.currentVisibleChapter) {
      const url = "commentaries/"+this.props.parallelLanguage.sourceId + "/" + this.props.bookId + "/" + this.props.currentVisibleChapter + commentaryKey
      this.props.vachanAPIFetch(url)
      this.fetchBookName()
    }
  }

  errorMessage() {
    if (!this.alertPresent) {
      this.alertPresent = true;
      if (this.props.error || this.state.error) {
        Alert.alert("", "Check your internet connection", [{ text: 'OK', onPress: () => { this.alertPresent = false } }], { cancelable: false });
        const url ="commentaries/"+this.props.parallelLanguage.sourceId + "/" + this.props.bookId + "/" + this.props.currentVisibleChapter + commentaryKey
        this.props.vachanAPIFetch(url)
      } else {
        this.alertPresent = false;
      }
    }
  }
  updateData = () => {
    this.errorMessage()
  }
  renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        {item.verse &&
          (item.verse == 0 ?
            <Text style={this.styles.commentaryHeading}>Chapter Intro</Text> :
            <Text style={this.styles.commentaryHeading}>Verse Number : {item.verse}</Text>
          )}
        <HTML
          baseFontStyle={this.styles.textString}
          tagsStyles={{ p: this.styles.textString }} html={item.text} />
      </View>
    )
  }
  ListHeaderComponent = () => {
    return (
      <View>
        { this.props.commentaryContent && this.props.commentaryContent.bookIntro == '' ? null :
          <View style={this.styles.cardItemBackground}>
            <Text style={this.styles.commentaryHeading}>Book Intro</Text>
            <HTML
              baseFontStyle={this.styles.textString}
              tagsStyles={{ p: this.styles.textString }} html={ this.props.commentaryContent && this.props.commentaryContent.bookIntro} />
          </View>}
      </View>
    )

  }
  render() {
    var bookName = null
    if (this.state.bookNameList) {
        for (var i = 0; i <= this.state.bookNameList.length - 1; i++) {
            if (this.state.bookNameList[i].language.name === this.props.parallelLanguage.languageName.toLowerCase()) {
              for (var j = 0; j <= this.state.bookNameList[i].bookNames.length - 1; j++) {
                    var bId = this.state.bookNameList[i].bookNames[j].book_code
                    if (bId == this.props.bookId){
                        bookName = this.state.bookNameList[i].bookNames[j].short
                    }
                }
            }
        }
    } else {
        return
    }

    return (
      <View style={this.styles.container}>
        <Header style={{ backgroundColor: Color.Blue_Color, height: 40, borderLeftWidth: 0.5, borderLeftColor: Color.White }} >
          <Body>
            <Title style={{ fontSize: 16,color:Color.White }}>{this.props.parallelLanguage.versionCode}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.toggleParallelView(false)}>
              <Icon name='cancel' color={Color.White} size={20} />
            </Button>
          </Right>
        </Header>

        {
          (this.props.error) ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ReloadButton
                styles={this.styles}
                reloadFunction={this.updateData}
              />
            </View>
            :
            <View style={{ flex: 1 }}>
              <Text style={[this.styles.commentaryHeading, { margin: 10 }]}>{bookName != null && bookName} {} {this.props.commentaryContent && this.props.commentaryContent.chapter}</Text>
              <FlatList
                data={this.props.commentaryContent && this.props.commentaryContent.commentaries}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, margin: 16 }}
                renderItem={this.renderItem}
                ListFooterComponent={<View style={{ height: 40, marginBottom: 40 }}></View>}
                ListHeaderComponent={this.ListHeaderComponent}
              />
            </View>
        }
      </View>
    )
  }
}


const mapStateToProps = state => {
  return {
    language: state.updateVersion.language,
    versionCode: state.updateVersion.versionCode,
    sourceId: state.updateVersion.sourceId,
    downloaded: state.updateVersion.downloaded,
    bookId: state.updateVersion.bookId,
    bookName: state.updateVersion.bookName,
    sizeFile: state.updateStyling.sizeFile,
    colorFile: state.updateStyling.colorFile,
    contentType: state.updateVersion.contentType,
    books: state.versionFetch.data,
    commentaryContent: state.vachanAPIFetch.apiData,
    error: state.vachanAPIFetch.error,
    baseAPI: state.updateVersion.baseAPI,
    parallelLanguage: state.selectContent.parallelLanguage,
  }

}
const mapDispatchToProps = dispatch => {
  return {
    vachanAPIFetch: (payload) => dispatch(vachanAPIFetch(payload)),
    fetchVersionBooks: (payload) => dispatch(fetchVersionBooks(payload)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Commentary)