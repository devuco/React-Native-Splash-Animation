import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useAnimatedValue,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SoundPlayer from 'react-native-sound-player';

const App = () => {
  const zoomAnim = useAnimatedValue(1);
  const translateAnim = useAnimatedValue(0);
  const [backgroundColor, setBackgroundColor] = useState('#000');

  const animateZoom = useCallback(() => {
    setTimeout(() => {
      setBackgroundColor('#e8e4c6');
    }, 5500);
    return Animated.timing(zoomAnim, {
      toValue: 75,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bezier(1, 0, 1, 0),
    });
  }, [zoomAnim]);

  const animateTranslate = useCallback(() => {
    const width = Dimensions.get('window').width / 3;
    return Animated.sequence([
      Animated.timing(translateAnim, {
        toValue: width,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.bezier(0, 1, 1, 0.5),
      }),
      Animated.timing(translateAnim, {
        toValue: width * 2,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.bezier(0, 1, 1, 0.5),
      }),
      Animated.timing(translateAnim, {
        toValue: width * 3,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.bezier(0, 1, 1, 0.5),
      }),
    ]);
  }, [translateAnim]);

  useEffect(() => {
    SoundPlayer.playSoundFile('sound', 'mp3');
    Animated.sequence([animateTranslate(), animateZoom()]).start();
  }, [animateZoom, animateTranslate]);

  return (
    <View style={styles.parent}>
      <StatusBar backgroundColor={backgroundColor} />
      <View style={styles.flex}>
        <Text style={styles.title}>{'Engage,\nEvolve, Excel.'}</Text>
      </View>
      <Image source={require('./girl.png')} style={styles.girl} />
      <Text style={styles.getStarted}>Get Started</Text>
      <Animated.Image
        source={require('./splash.png')}
        style={[styles.upload, {transform: [{scale: zoomAnim}]}]}
      />
      <Animated.View
        style={[styles.blackScreen, {transform: [{translateX: translateAnim}]}]}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: '#e8e4c6'},
  flex: {flex: 1},
  title: {
    textAlign: 'center',
    fontSize: 48,
    color: 'black',
    marginTop: 72,
    marginHorizontal: 18,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
  },
  girl: {
    alignSelf: 'center',
    height: Dimensions.get('window').height / 1.2,
  },
  getStarted: {
    fontSize: 24,
    color: 'white',
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 24,
    right: 0,
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
  },
  upload: {height: '100%', width: '100%', position: 'absolute'},
  blackScreen: {
    backgroundColor: 'black',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
