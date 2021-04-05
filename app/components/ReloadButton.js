import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { buttonstyle } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons';


const ReloadButton = ({
  styles,
  reloadFunction,message
}) => (
    <View style={buttonstyle.buttonContainer}>
      <TouchableOpacity
        onPress={() => reloadFunction(null)}
        style={buttonstyle.reloadButton}>
       {!message ? <Icon name='signal-cellular-connected-no-internet-4-bar' style={styles.emptyMessageIcon} />:null}
        <Text style={styles.reloadText}>{!message ? <Text>Offline. Content unavailable.</Text> : <Text>{message}</Text>}</Text>
      </TouchableOpacity>
    </View>
  )

export default ReloadButton