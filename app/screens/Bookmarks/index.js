import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bookStyle } from './styles.js'
import { updateVersionBook } from '../../store/action/'
import { getBookChaptersFromMapping } from '../../utils/UtilFunctions';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

class BookMarks extends Component {
  static navigationOptions = {
    headerTitle: 'Bookmarks',
  };

  constructor(props) {
    super(props)
    this.state = {
      bookmarksList: [],
      isLoading: false,
      languageName: this.props.languageName,
      versionCode: this.props.versionCode,
      sourceId: this.props.sourceId,
      bookId: this.props.bookId,
      message: ''
    }

    this.styles = bookStyle(this.props.colorFile, this.props.sizeFile);
  }

  fecthBookmarks() {
    if (this.props.email) {
      this.setState({ isLoading: true }, () => {
        var firebaseRef = firebase.database().ref("users/" + this.props.uid + "/bookmarks/" + this.props.sourceId);
        firebaseRef.once('value', (snapshot) => {
          var data = []
          var list = snapshot.val()
          if (snapshot.val() != null) {
            for (var key in list) {
              data.push({ bookId: key, chapterNumber: list[key] })
            }
            this.setState({
              bookmarksList: data,
              isLoading: false
            })
          }
          else {
            this.setState({
              bookmarksList: [],
              message: 'No bookmark Added for ' + this.props.languageName,
              isLoading: false
            })
          }
        })
        this.setState({ isLoading: false })
      })
    }
    else {
      this.setState({ bookmarksList: [], message: 'Please login' })
    }
  }
  async componentDidMount() {
    this.fecthBookmarks()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.books.length != this.props.books.length) {
      this.fecthBookmarks()
    }
  }

  navigateToBible(bookId, bookName, chapter) {
    this.props.updateVersionBook({
      bookId: bookId,
      bookName: bookName,
      chapterNumber: chapter,
      totalChapters: getBookChaptersFromMapping(bookId),
    })
    this.props.navigation.navigate("Bible")
  }

  async onBookmarkRemove(id, chapterNum) {
    if (this.props.email) {
      var data = this.state.bookmarksList
      data.filter((a, i) => {
        if (a.bookId == id) {
          a.chapterNumber.filter((b, j) => {
            if (b == chapterNum) {
              var firebaseRef = firebase.database().ref("users/" + this.props.uid + "/bookmarks/" + this.props.sourceId + "/" + id);
              if (a.chapterNumber.length == 1) {
                data.splice(i, 1)
                firebaseRef.remove()
                return
              }
              else {
                a.chapterNumber.splice(j, 1)
              }
              firebaseRef.set(a.chapterNumber)
            }
          })
        }
      })
      this.setState({ bookmarksList: data })
    }
  }
  renderItem = ({ item, index }) => {
    var bookName = null
    if (this.props.books) {
      for (var i = 0; i <= this.props.books.length - 1; i++) {
        var bId = this.props.books[i].bookId
        if (bId == item.bookId) {
          bookName = this.props.books[i].bookName
        }
      }
    } else {
      this.setState({ bookmarksList: [] })
      return
    }
    var value = item.chapterNumber.length > 0 &&
      item.chapterNumber.map(e =>
        <TouchableOpacity style={this.styles.bookmarksView} onPress={() => { this.navigateToBible(item.bookId, bookName, e) }} >
          <Text style={this.styles.bookmarksText}>{this.props.languageName && this.props.languageName.charAt(0).toUpperCase() + this.props.languageName.slice(1)} {this.props.versionCode && this.props.versionCode.toUpperCase()} {bookName}  {e}</Text>
          <Icon name='delete-forever' style={this.styles.iconCustom}
            onPress={() => { this.onBookmarkRemove(item.bookId, e) }}
          />
        </TouchableOpacity>
      )
    return (
      <View>
        {bookName && value}
      </View>
    )
  }
  emptyMessageNavigation = () => {
    if (this.props.email) {
      this.props.navigation.navigate("Bible")
    } else {
      this.props.navigation.navigate("Login")
    }
  }
  render() {
    return (
      <View style={this.styles.container}>
        {this.state.isLoading && <ActivityIndicator animate={true} style={{ justifyContent: 'center', alignSelf: 'center' }} />}
        <FlatList
          data={this.state.bookmarksList}
          contentContainerStyle={this.state.bookmarksList.length === 0 && this.styles.centerEmptySet}
          renderItem={this.renderItem}
          ListEmptyComponent={
            <View style={this.styles.emptyMessageContainer}>
              <Icon name="collections-bookmark" style={this.styles.emptyMessageIcon} onPress={this.emptyMessageNavigation} />
              <Text
                style={this.styles.messageEmpty}>
                {this.state.message}
              </Text>
            </View>
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    languageName: state.updateVersion.language,
    versionCode: state.updateVersion.versionCode,
    sourceId: state.updateVersion.sourceId,
    bookName: state.updateVersion.bookName,

    email: state.userInfo.email,
    uid: state.userInfo.uid,

    bookId: state.updateVersion.bookId,
    sizeFile: state.updateStyling.sizeFile,
    colorFile: state.updateStyling.colorFile,

    books: state.versionFetch.data,

  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateVersionBook: (value) => dispatch(updateVersionBook(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookMarks)

