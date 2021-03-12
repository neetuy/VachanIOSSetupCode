import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { buttonstyle } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons';


const ReloadButton = ({
  styles,
  reloadFunction
}) => (
    <View style={buttonstyle.buttonContainer}>
      <TouchableOpacity
        onPress={() => reloadFunction(null)}
        style={buttonstyle.reloadButton}>
        <Icon name='signal-cellular-connected-no-internet-4-bar' style={styles.emptyMessageIcon} />
        <Text style={buttonstyle.reloadText}>Offline. Content unavailable.</Text>
      </TouchableOpacity>
    </View>
  )

export default ReloadButton


