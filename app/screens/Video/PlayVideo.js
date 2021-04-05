import React, { Component } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { bookStyle } from './styles.js'
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'

class PlayVideo extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerTitle: params.theme
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.state.params ? this.props.navigation.state.params.url : null,
            title: this.props.navigation.state.params ? this.props.navigation.state.params.title : null,
            description:this.props.navigation.state.params ?  this.props.navigation.state.params.description: null,
            theme:this.props.navigation.state.params ? this.props.navigation.state.params.theme : null,
            playing:true,
            isLoading:false
        }
        this.styles = bookStyle(this.props.colorFile, this.props.sizeFile);

    }
    componentDidMount() {
        this.props.navigation.setParams({
            theme: this.state.theme
        })
        this.onChangeState()
    }
    onError = () => alert('Oh! ', error);
    onReady(){
      this.setState({playing:true})
    }
    onChangeState(event){
      if(event === undefined){
        this.setState({isLoading:true})
      }else{
        this.setState({isLoading:false})
      }
    }
    render() {
        return (
            <View style={this.styles.container}>
                <Text style={this.styles.title}>
                    {this.state.title}
                </Text>
                {this.state.isLoading ? <View style={{justifyContent:'center',alignItems:'center'}}><ActivityIndicator animate={true} size={'large'} /></View>: null}
                <YoutubePlayer
                    ref={'playerRef'}
                    height={'36%'}
                    width={'100%'}
                    videoId={this.state.url}
                    play={this.state.playing}
                    onChangeState={(event) =>this.onChangeState(event)}
                    onReady={() => this.onReady}
                    onError={this.onError}
                    volume={50}
                    playbackRate={1}
                    />
                <Text style={this.styles.description}>
                    {this.state.description}
                </Text>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        languageCode: state.updateVersion.languageCode,
        sizeFile: state.updateStyling.sizeFile,
        colorFile: state.updateStyling.colorFile,
    }
}

export default connect(mapStateToProps, null)(PlayVideo)
