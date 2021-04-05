import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DbQueries from '../../utils/dbQueries.js'
import { getBookChaptersFromMapping, getBookNumberFromMapping, getResultText } from '../../utils/UtilFunctions'
import SearchTab from '../../components/SearchTab/SearchTab'
import { updateVersionBook, updateVersion, fetchVersionBooks, updateMetadata } from '../../store/action/'

import { searchStyle } from './styles'
import { connect } from 'react-redux'
import Color from '../../utils/colorConstants'
import vApi from '../../utils/APIFetch';
const width = Dimensions.get('window').width;


const SearchResultTypes = {
  ALL: 0,
  OT: 1,
  NT: 2
};

class Search extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {

      headerTitle: (
        <TextInput
          placeholder="Enter Search Text"
          underlineColorAndroid={Color.Transparent}
          style={{ color: Color.White, width: width - 90 }}
          onChangeText={(text) => params.onTextChange(text)}
          placeholderTextColor={Color.White}
          returnKeyType="search"
          multiline={false}
          numberOfLines={1}
          value={params.text}
          onSubmitEditing={() => params.onSearchText()}
        />
      ),
      headerRight: (
        <TouchableOpacity onPress={() => params.onSearchText()}>
          <Icon name={'search'} size={24} color={Color.White} style={{ marginHorizontal: 8 }} />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      searchedResult: [],
      activeTab: SearchResultTypes.ALL,
      isLoading: false,
      text: '',
      tabsData: [],
      sourceId: this.props.sourceId,
      languageName: this.props.languageName,
      versionCode: this.props.versionCode,
      downloaded: this.props.downloaded,
      languageCode: this.props.languageCode,
      bookName: this.props.bookName,
      bookId: this.props.bookId,
      books: this.props.books,
      metadata:null
    }

    this.onSearchText = this.onSearchText.bind(this)
    this.toggleButton = this.toggleButton.bind(this)
    this.clearData = this.clearData.bind(this)

    this.styles = searchStyle(props.colorFile, props.sizeFile);
  }

  onSearchText() {
    this.setState({ isLoading: true, searchedResult: [], tabsData: [] }, async () => {

      if (this.state.downloaded) {
        let searchResultByBookName = await DbQueries.querySearchBookWithName(this.state.versionCode, this.state.languageName, this.state.text);
        if (searchResultByBookName) {
          let reference = [{
            bookId: searchResultByBookName.bookId,
            bookName: searchResultByBookName.bookName,
            chapterNumber: 1,
            verseNumber: '1',
            text: '',
          }]
          this.setState({ searchedResult: reference })
          this.addRefListToTab(reference)
        }

        let searchResultByVerseText = await DbQueries.querySearchVerse(this.state.versionCode, this.state.languageName, this.state.text)
        if (searchResultByVerseText && searchResultByVerseText.length > 0) {
          this.setState({ searchedResult: [...this.state.searchedResult, ...searchResultByVerseText] })
          this.addRefListToTab(searchResultByVerseText)
        }
        this.setState({ isLoading: false })
      } else {
        
        var res = await vApi.get('search/' + JSON.parse(this.state.sourceId) + '?keyword=' + this.state.text)
        var data = []
        if (res.result.length > 0 && this.state.books) {
          for (var i = 0; i < res.result.length; i++) {
            for (var j = 0; j < this.state.books.length ; j++) {
              var bId = this.state.books[j].bookId
              var bName = this.state.books[j].bookName
              if (bId == res.result[i].bookCode) {
                data.push({
                  bookId: res.result[i].bookCode,
                  bookName: bName,
                  chapterNumber: res.result[i].chapter,
                  verseNumber: res.result[i].verse,
                  text: res.result[i].text,
                })
              }
            }
          }
          this.setState({ searchedResult: data })
          this.addRefListToTab(data)
        }
      }
    })
    this.setState({ isLoading: false })
  }


  clearData() {
    this.props.navigation.setParams({ text: '' })
    if (this.state.text) {
      this.setState({ text: "" })
    }
  }

  addRefListToTab(list) {
    switch (this.state.activeTab) {
      case SearchResultTypes.ALL: {
        this.setState({ tabsData: [...this.state.tabsData, ...list] })
        break;
      }
      case SearchResultTypes.OT: {
        let reflist = [];
        for (var i = 0; i < list.length; i++) {
          if (getBookNumberFromMapping(list[i].bookId) <= 39) {
            reflist.push(list[i])
          }
        }
        this.setState({ tabsData: [...this.state.tabsData, ...reflist] })
        break;
      }
      case SearchResultTypes.NT: {
        let reflist = [];
        for (var i = 0; i < list.length; i++) {
          if (getBookNumberFromMapping(list[i].bookId) >= 40) {
            reflist.push(list[i])
          }
        }
        this.setState({ tabsData: [...this.state.tabsData, ...reflist] })
        break;
      }
    }
  }

  renderDataOnPressTab(activeTab) {
    this.setState({ tabsData: [] }, () => {
      switch (activeTab) {
        case SearchResultTypes.ALL: {
          this.setState({ tabsData: this.state.searchedResult })
          break;
        }
        case SearchResultTypes.OT: {
          let data = [];
          for (var i = 0; i < this.state.searchedResult.length; i++) {
            if (getBookNumberFromMapping(this.state.searchedResult[i].bookId) <= 39) {
              data.push(this.state.searchedResult[i])
            }
          }
          this.setState({ tabsData: data })
          break;
        }
        case SearchResultTypes.NT: {
          let data = [];
          for (var i = 0; i < this.state.searchedResult.length; i++) {
            if (getBookNumberFromMapping(this.state.searchedResult[i].bookId) >= 40) {
              data.push(this.state.searchedResult[i])
            }
          }
          this.setState({ tabsData: data })
          break;
        }
      }
    })
  }

  onTextChange = (text) => {
    this.props.navigation.setParams({ text: text })
    this.setState({ text: text })
  }

   componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", async () => {
      const response = await vApi.get("booknames")
      for (var i = 0; i < response.length; i++) {
        var books = []
        if (this.state.languageName.toLowerCase() == response[i].language.name) {
          for (var j = 0; j < response[i].bookNames.length; j++) {
            books.push({
              bookId: response[i].bookNames[j].book_code,
              bookName: response[i].bookNames[j].short,
              bookNumber: response[i].bookNames[j].book_id,
            })
          }
          this.setState({ books })
        }
      }
      this.setState({
        tabsData: [], searchedResult: [], text: '', isLoading: false
      })
      this.props.navigation.setParams({
        onTextChange: this.onTextChange,
        onSearchText: this.onSearchText,
        onChangeText: this.onChangeText,
        clearData: this.clearData,
        headerStyle: this.styles.headerText,
        text: ''
      })

    })
  }
  componentWillUnmount() {
    this.subs.remove();
  }

  toggleButton(activeTab) {
    if (this.state.activeTab == activeTab) {
      return;
    }
    this.setState({ activeTab }, () => {
      this.renderDataOnPressTab(activeTab)
    })
  }

  goToBible = (bId, bookName, chapterNum, verseNum) => {
    this.props.updateVersionBook({
      bookId: bId,
      bookName: bookName,
      chapterNumber: chapterNum,
      totalChapters: getBookChaptersFromMapping(bId),
    })

    this.props.updateVersion({
      language: this.state.languageName, languageCode: this.state.languageCode,
      versionCode: this.state.versionCode, sourceId: this.state.sourceId, downloaded: this.state.downloaded
    })
    
    this.props.fetchVersionBooks({ language:  this.state.languageName, versionCode: this.state.versionCode, 
      downloaded: this.state.downloaded, sourceId: this.state.sourceId })
    if(this.state.metadata === null){
      this.props.updateMetadata({
        copyrightHolder: null,
        description: null,
        license: null,
        source: null,
        technologyPartner: null,
        revision: null,
        versionNameGL: null
      })
    } else{
      this.props.updateMetadata({
        copyrightHolder: this.state.metadata[0].copyrightHolder,
        description: this.state.metadata[0].description,
        license: this.state.metadata[0].license,
        source: this.state.metadata[0].source,
        technologyPartner: this.state.metadata[0].technologyPartner,
        revision: this.state.metadata[0].revision,
        versionNameGL: this.state.metadata[0].versionNameGL
      })
    }
     

    this.props.navigation.navigate('Bible')
  }

  ListEmptyComponent = () => {
    return (
      <View style={this.styles.ListEmptyContainer}>
        {this.state.isLoading == false && this.state.tabsData == null
          ? <Text>No Result Found</Text>
          : null
        }
      </View>
    )
  }

  ListFooterComponent = () => {
    return (
      <View>
        {this.state.isLoading
          ? <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', }} size="large" color={Color.Blue_Color} />
          : null
        }
      </View>
    )
  }

  searchedData = ({ item, index }) => {
    return (
      <TouchableOpacity style={this.styles.searchedDataContainer}
        onPress={() => { this.goToBible(item.bookId, item.bookName, item.chapterNumber, item.verseNumber, this.state.languageName) }}
      >
        <Text style={this.styles.searchedData}>
          {item.bookName} {item.chapterNumber} : {item.verseNumber}
        </Text>
        <Text style={this.styles.textStyle}>{getResultText(item.text)}</Text>
      </TouchableOpacity>
    )
  }
  updateLangVer = async (item) => {
    this.setState({
      tabsData: [], searchedResult: [],
      sourceId: item.sourceId, languageCode: item.languageCode,
      languageName: item.languageName, versionCode: item.versionCode,
      downloaded: item.downloaded, books: item.books,metadata:item.metadata
    })
  }
  render() {
    let text = this.state.isLoading == true ? "Loading..." : this.state.tabsData.length + " search results found"
    return (
      <View style={this.styles.container}>
        <View style={this.styles.toggleBibleTouchable}>
          <Text style={this.styles.headerStyle}>Bible</Text>
          <TouchableOpacity style={{ backgroundColor: Color.Blue_Color, padding: 8, borderRadius: 8 }} onPress={() => this.props.navigation.navigate('LanguageList', { updateLangVer: this.updateLangVer })}>
            <Text style={this.styles.text}>
              {this.state.languageName.charAt(0).toUpperCase() + this.state.languageName.slice(1)} {this.state.versionCode.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={this.styles.textLength}>{text}</Text>
        {
          this.state.searchedResult.length > 0 &&
          <View style={{flex:1}}>
            <SearchTab
              toggleFunction={this.toggleButton}
              activeTab={this.state.activeTab}
            />
            <FlatList
              contentContainerStyle={{paddingBottom:60}}
              ref={ref => this.elementIndex = ref}
              data={this.state.tabsData}
              renderItem={this.searchedData}
              ListEmptyComponent={this.ListEmptyComponent}
              ListFooterComponent={this.ListFooterComponent}
            />
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    languageName: state.updateVersion.language,
    languageCode: state.updateVersion.languageCode,
    versionCode: state.updateVersion.versionCode,
    downloaded: state.updateVersion.downloaded,
    sourceId: state.updateVersion.sourceId,
    bookName: state.updateVersion.bookName,
    books: state.versionFetch.data,
    sizeFile: state.updateStyling.sizeFile,
    colorFile: state.updateStyling.colorFile,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateVersionBook: (value) => dispatch(updateVersionBook(value)),
    updateVersion: (value) => dispatch(updateVersion(value)),
    fetchVersionBooks: (value) => dispatch(fetchVersionBooks(value)),
    updateMetadata: (payload) => dispatch(updateMetadata(payload)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
