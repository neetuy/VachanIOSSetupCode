import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Player from '../Audio/Player'
import Color from '../../utils/colorConstants'

const ChapterNdAudio = ({
    styles, audio,
    currentVisibleChapter, queryBookFromAPI, bookId, status,visibleParallelView,showBottomBar,
    totalChapters, languageCode, versionCode,
    })=>(
        <View style={{ justifyContent: (currentVisibleChapter != 1 && currentVisibleChapter == currentVisibleChapter != totalChapters) ? 'center' : 'space-around', alignItems: 'center' }}>
            {
                currentVisibleChapter == 1
                    ? null :
                    <View style={[styles.bottomBarPrevView,showBottomBar ? styles.showBottomBar : styles.hideBottomBar, visibleParallelView ? 
                    styles.bottomBarParallelPrevView : styles.bottomBarPosition]}>
                        <Icon name={'chevron-left'} color={Color.Blue_Color} size={visibleParallelView ? 16 : 32}
                            style={styles.bottomBarChevrontIcon}
                            onPress={() => queryBookFromAPI(-1)}
                        />
                    </View>
            }
            {
                audio && (
                    status && <View style={[styles.bottomBarAudioCenter,showBottomBar ? styles.showBottomBar : styles.hideBottomBar]}>
                        <Player
                            styles={styles}
                            languageCode={languageCode}
                            versionCode={versionCode}
                            bookId={bookId}
                            chapter={currentVisibleChapter}
                        />
                    </View>)
            }
            {
                currentVisibleChapter == totalChapters
                    ? null :
                    <View style={[styles.bottomBarNextView,showBottomBar ? styles.showBottomBar : styles.hideBottomBar, visibleParallelView ? 
                    styles.bottomBarNextParallelView : styles.bottomBarPosition]}>
                        <Icon name={'chevron-right'} color={Color.Blue_Color} size={visibleParallelView ? 16 : 32}
                            style={styles.bottomBarChevrontIcon}
                            onPress={() => queryBookFromAPI(1)}
                        />
                    </View>
            }
        </View>
    )

export default ChapterNdAudio


