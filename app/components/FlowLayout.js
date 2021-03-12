import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from 'react-native';

var {
	width,
} = Dimensions.get('window');
import { connect } from 'react-redux'

class FlowLayout extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let items = this.props.dataValue.verses.map((value, position) => {
			return (
				<View key={position}>
					<TouchableOpacity onPress={() => {
						this.props.openReference(value, position)
					}}>
						<View style={[styles.corner, { backgroundColor: 'transparent' }]}>
							<Text style={this.props.styles.textStyle}>{this.props.dataValue.bookName} {this.props.dataValue.chapterNumber}:{value}</Text>
							{/* {
						   this.props.dataValue.verses.length === 1 ? null :  <Icon name="clear" style={this.props.styles.iconReferClose}
						   onPress={()=> {this.props.deleteReference(position)}} />
					   } */}
						</View>
					</TouchableOpacity>
				</View>
			)
		});

		return (
			<View style={[styles.container, this.props.style]}>
				{items}
			</View>
		);
	};
}
const mapStateToProps = state => {
	return {
		language: state.updateVersion.language,
		sizeFile: state.updateStyling.sizeFile,
		colorFile: state.updateStyling.colorFile,
		bookName: state.updateVersion.bookName,

	}
}



export default connect(mapStateToProps, null)(FlowLayout)
const styles = StyleSheet.create({
	corner: {
		flexDirection: 'row',
		borderColor: 'gray',
		borderWidth: 1, 
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 4,
		padding: 10,
		marginRight: 10,
		marginTop: 10,
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		width: width,
	},

});