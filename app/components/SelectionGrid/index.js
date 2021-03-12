import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Color from '../../utils/colorConstants'



const SelectionGrid = ({
  styles,
  onNumPress,
  numbers,
  loader,
  heighlightedNumber

}) => (
    <View style={styles.chapterSelectionContainer}>
      {loader &&
        <Spinner
          visible={true}
          textContent={'Loading...'}
        />}
      <FlatList
        numColumns={4}
        data={numbers}
        renderItem={({ item, index }) =>
          <TouchableOpacity
            style={[styles.selectGridNum,
            { backgroundColor: Color.Transparent }]}
            onPress={() => { onNumPress(item, index) }}>
            <View>
              <Text style={[styles.chapterNum, { fontWeight: item == heighlightedNumber ? "bold" : "normal" }]}>{item}</Text>
            </View>
          </TouchableOpacity>
        }
      />
    </View>
  )
export default SelectionGrid;

