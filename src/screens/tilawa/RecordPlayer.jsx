import { Audio } from "expo-av";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Slider,
  Share as ShareNative,
} from "react-native";
import { Button, Spinner } from "native-base";
import { Trash, Pause, Play, Check, Share } from "../../assets/icons/";
import { removeRecord } from "../../store/actions";
import { useDispatch } from "react-redux";
import Dialog from "react-native-dialog";

let isMounted = false;
const RecorderPlayer = ({ theme, url, length, id ,font}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [soundPosition, setSoundPosition] = useState();
  const [shouldPlay, setShouldplay] = useState(false);
  let isSeeking = false,
    shouldPlayAtEndOfSeek = false;
  const initilizingAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
        staysActiveInBackground: false,
      });
      loadAudio();
    } catch (err) {
      alert("something went wrong");
    }
  };

  const loadAudio = async () => {
    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: url,
        isLooping: true,
      };
      const status = {
        shouldPlay,
      };
      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      setPlaybackInstance(playbackInstance);
    } catch (e) {
      alert("check your internet connection");
    }
  };
  const onPlaybackStatusUpdate = (status) => {

     if (status.isLoaded) {
      setSoundPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
      setShouldplay(status.shouldPlay);
    } else {
      setSoundPosition(status.positionMillis);
    }

    if (status.error) {
      alert(`FATAL PLAYER ERROR: ${status.error}`);
    }
  };

  useEffect(() => {
    if (url) {
      initilizingAudio();
    }
  }, [url]);
  useEffect(()=>{
     return ()=>{
    	if(playbackInstance){
    		isMounted=true;
    		playbackInstance.setOnPlaybackStatusUpdate(null);
    		setPlaybackInstance(null);
    	}
    }
  },[])
  const _getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };
  const _onSeekSliderSlidingComplete = async (value) => {
    isSeeking = false;
    const seekPosition = value * length;
    if (shouldPlayAtEndOfSeek) {
      await playbackInstance.playFromPositionAsync(seekPosition);
    } else {
      await playbackInstance.setPositionAsync(seekPosition);
    }
  };
  const _onSeekSliderValueChange = async (value) => {
    if (!isSeeking) {
      isSeeking = true;
      shouldPlayAtEndOfSeek = shouldPlay;
      await playbackInstance.pauseAsync();
    }
  };
  const _getSeekSliderPosition = () => {
    if (soundPosition) {
      return soundPosition / length;
    }
    return 0;
  };

  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    setIsPlaying(!isPlaying);
  };
  if (!playbackInstance) {
    return <View style={{
      backgroundColor:theme.BG
    }}><Spinner color={theme.PRIMARY} /></View>;
  }
  return (
    <View>
      <Slider
        onValueChange={_onSeekSliderValueChange}
        onSlidingComplete={_onSeekSliderSlidingComplete}
        style={{
          height: 30,
          borderRadius: 5,
        }}
        value={_getSeekSliderPosition()}
        minimumTrackTintColor={theme.PRIMARY_TEXT}
        thumbTintColor={theme.PRIMARY_TEXT}
        disabled={!playbackInstance}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: font.app.fontName,
            color:theme.SECONDARY_TEXT,
          }}
        >
          {_getMMSSFromMillis(soundPosition)}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: font.app.fontName,
            color:theme.SECONDARY_TEXT,
          }}
        >
          {_getMMSSFromMillis(length)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <PlayerButtons
          id={id}
          url={url}
          theme={theme}
          handlePlayPause={handlePlayPause}
          disabled={!playbackInstance}
        />
      </View>
    </View>
  );
};

const PlayerButtons = React.memo(
  ({ theme, url, id, isPlaying, handlePlayPause, disabled }) => {
    return (
      <>
        <ShareButton
          url={url}
          disabled={disabled}
          PRIMARY_TEXT={theme.PRIMARY_TEXT}
        />
        <Button
          disabled={disabled}
          onPress={handlePlayPause}
          transparent
          style={{
            padding: 5,
          }}
        >
          {!isPlaying ? (
            <Play color={theme.PRIMARY_TEXT} size={28} />
          ) : (
            <Pause color={theme.PRIMARY_TEXT} size={28} />
          )}
        </Button>
        <DeleteRecord url={url} id={id} PRIMARY_TEXT={theme.PRIMARY_TEXT} />
      </>
    );
  }
);
const DeleteRecord = React.memo(({ url, id, PRIMARY_TEXT, disabled }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const showDialog = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };
  const handleDelete = () => {
    dispatch(removeRecord(id, url));
    setIsVisible(false);
  };
  return (
    <>
      <Button
        onPress={showDialog}
        disabled={disabled}
        transparent
        style={{
          padding: 10,
        }}
      >
        <Trash color={PRIMARY_TEXT} size={24} />
      </Button>
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>مسح التسجيل</Dialog.Title>
        <Dialog.Description>
          هل انت متاكد انك تريد ان تمسح التسجيل
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button color="#e74c3c" label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </>
  );
});

const ShareButton = React.memo(({ url, PRIMARY_TEXT, disabled }) => {
  const shareAudio = async () => {
    try {
      const result = await ShareNative.share({
        url: url,
      });
      if (result.action === ShareNative.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === ShareNative.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Button
      onPress={shareAudio}
      disabled={disabled}
      transparent
      style={{
        padding: 10,
      }}
    >
      <Share color={PRIMARY_TEXT} size={24} />
    </Button>
  );
});
export default RecorderPlayer;
