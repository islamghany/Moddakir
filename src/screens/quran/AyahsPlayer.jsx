import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import { Play, Forward, Backward, Pause } from "../../assets/icons/";
import { Button } from "native-base";

let timer;
let timerNext,
  num = 0;
let close = false;
const AyahPlayer = ({ theme }) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingState= useSelector(state=>state.isPlayingState)
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const currentAyah = useSelector((state) => state.currentAyah);

  const initilizingAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        playsInSilentLockedModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
    } catch (err) {
      alert("something went wrong");
    }
  };

  const loadAudio = async () => {
    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: `https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${currentAyah.number}`,
      };

      const status = {
        shouldPlay: true,
      };
      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      if (!isPlaying) setIsPlaying(true);
      setPlaybackInstance(playbackInstance);
    } catch (e) {
      alert("check your internet connection");
    }
  };
  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish && !status.isLooping && currentAyah.number) {
      if (currentAyah.ayatsNumber >= currentAyah.numberInSurah + 1) {
        if (close) {
          dispatch({
            type: "PLAY_AYAH",
            payload: {},
          });
        } else {
          dispatch({
            type: "PLAY_AYAH",
            payload: {
              number: currentAyah.number + 1,
              name: currentAyah.name,
              numberInSurah: currentAyah.numberInSurah + 1,
              ayatsNumber: currentAyah.ayatsNumber,
            },
          });
        }
      } else {
        setIsPlaying(false);
      }
    }
  };

  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    setIsPlaying((e) => !e);
  };
  const handleNewChannel = async () => {
    if (playbackInstance) {
      try {
        await playbackInstance.unloadAsync();
      } catch (err) {
        alert("check your internet connection");
      }
    }
    loadAudio();
  };
  const handleNextAsync = (num) => {
    if (timerNext) {
      clearTimeout(timerNext);
    }
    timerNext = setTimeout(() => {
      handleNextPrev(num);
    }, 300);
  };
  const handleNextPrev = (num) => {
    dispatch({
      type: "PLAY_AYAH",
      payload: {
        number: currentAyah.number + num,
        name: currentAyah.name,
        numberInSurah: currentAyah.numberInSurah + num,
        ayatsNumber: currentAyah.ayatsNumber,
      },
    });
  };

  const handleRep = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      handleNewChannel();
    }, 100);
  };
  useEffect(() => {
    close = false;
    initilizingAudio();
    return () => {
      close = true;
      dispatch({
        type: "PLAY_AYAH",
        payload: {},
      });
    };
  }, []);
  useEffect(() => {
    if (currentAyah && currentAyah.number) {
      if(isPlayingState){
          dispatch({
            type:'PLAYING_STATE',
            payload:false
          })
        }
      handleRep();
    }
  }, [currentAyah]);

  return (
    <View>
      <View
        style={{
          paddingTop: 10,
          minHeight: 50,
          backgroundColor: theme.SECONDARY_BG,

          shadowColor: theme.PRIMARY_TEXT,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={{
            padding: 10,
            paddingHorizontal: 15,
            paddingTop: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            transparent
            onPress={() => handleNextAsync(-1)}
            disabled={currentAyah.numberInSurah <= 1}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.BG,
            }}
          >
            <Backward
              size={25}
              color={
                currentAyah.numberInSurah > 1
                  ? theme.SECONDARY_TEXT
                  : theme.SECONDARY_BG
              }
            />
          </Button>
          <Button
            transparent
            disabled={!currentAyah.numberInSurah}
            onPress={handlePlayPause}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: theme.PRIMARY,
              marginHorizontal: 10,
            }}
          >
            {isPlaying ? (
              <Pause
                size={30}
                color={
                  currentAyah.numberInSurah ? theme.BG : theme.SECONDARY_BG
                }
              />
            ) : (
              <Play size={30} color={theme.BG} />
            )}
          </Button>
          <Button
            onPress={() => handleNextAsync(1)}
            disabled={currentAyah.numberInSurah >= currentAyah.ayatsNumber}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 25,
              backgroundColor: theme.BG,
            }}
          >
            <Forward
              size={25}
              color={
                currentAyah.numberInSurah < currentAyah.ayatsNumber
                  ? theme.SECONDARY_TEXT
                  : theme.SECONDARY_BG
              }
            />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AyahPlayer;
