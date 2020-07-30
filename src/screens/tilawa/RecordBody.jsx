import { Audio } from "expo-av";
import React, { useState } from "react";
import { View, Text, Slider, Dimensions } from "react-native";
import { Button, Toast, Spinner } from "native-base";
import { Trash, Pause, Play, Check } from "../../assets/icons/";
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { addRecord } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "react-native-dialog";
let info, url;

const DialogComponent = ({ theme,font, recordingDuration, isLoading }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState(false);
  const showDialog = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };
  const handleSave = () => {
    dispatch(addRecord(name, url, recordingDuration, new Date().toISOString()));
    setIsVisible(false);
  };

  return (
    <View>
      <Button
        disabled={!recordingDuration || isLoading}
        transparent
        onPress={showDialog}
        style={{
          height: 60,
          width: 60,
          backgroundColor: theme.BG,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: theme.PRIMARY_TEXT,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <Check color={theme.PRIMARY_TEXT} size={24} />
      </Button>
      <Dialog.Container visible={isVisible}>
        <Dialog.Title
          style={{
            fontFamily: font.app.fontName
          }}
        >
          حفظ التسجيل
        </Dialog.Title>
        <Dialog.Input
          label="Name"
          style={{ fontFamily: font.app.fontName }}
          onChangeText={(email: string) => setName(email)}
        ></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Save" onPress={handleSave} />
      </Dialog.Container>
    </View>
  );
};

const AccentButtons = {
  from: {
    top: 0,
  },
  to: {
    top: 100,
  },
};
const AccentButtonsRef = {
  from: {
    top: 100,
    opacity: 0,
  },
  to: {
    top: 0,
    opacity: 1,
  },
};
const RecordButtonAnimation = {
  from: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  to: {
    height: 30,
    width: 30,
    borderRadius: 8,
  },
};
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const RecordButtonAnimationRev = {
  from: {
    height: 30,
    width: 30,
    borderRadius: 8,
  },
  to: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
};
class RecordBody extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: "loading",
      isLoading: false,
      isPlaybackAllowed: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      isSoundPuase: false,
    };
    this.recordingSettings = JSON.parse(
      JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)
    );
    // // UNCOMMENT THIS TO TEST maxFileSize:
    // this.recordingSettings.android['maxFileSize'] = 12000;
  }
  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === "granted",
    });
  };

  componentDidMount() {    
    this._askForPermissions();
  }
 
  _updateScreenForSoundStatus = (status) => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        alert(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = (status) => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };
  async _beginPlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    url = this.recording.getURI();
    info = await FileSystem.getInfoAsync(this.recording.getURI());
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
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }
  async _beginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  _getMMSSFromMillis(millis) {
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
  }
  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  deleteRecordFromSystem = async (upper) => {
    if (upper === "upper") {
      if (this.sound !== null) {
        await this.sound.unloadAsync();
        this.sound.setOnPlaybackStatusUpdate(null);
        this.sound = null;
      }
      if ((this.recording = null)) {
        this.recording.setOnRecordingStatusUpdate(null);
        this.recording = null;
      }
      this.setState({
        recordingDuration: null,
      });
    }
  };

  _onRecordPressed = async () => {
    if (info && !this.state.isRecording) {
      this.deleteRecordFromSystem();
    }
    if (this.state.isRecording) {
      this._beginPlayback();
    } else {
      this._beginRecording();
    }
  };
  _onSeekSliderSlidingComplete = async (value) => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };
  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
        this.setState({
          isSoundPuase: false,
        });
      } else {
        this.sound.playAsync();
        this.setState({
          isSoundPuase: true,
        });
      }
    }
  };
  _onSeekSliderValueChange = (value) => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };
  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.soundPosition
      )} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
    }
    return "";
  }

  render() {
    const { theme,font } = this.props;
    const { isRecording } = this.state;
    if (this.state.haveRecordingPermissions === "loading") {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:theme.BG
          }}
        >
          <Spinner color={theme.PRIMARY} />
        </View>
      );
    }
    if (!this.state.haveRecordingPermissions) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" ,backgroundColor:theme.BG}}
        >
          <View />
          <Text style={{color:theme.PRIMARY_TEXT}}> 
            You must enable audio recording permissions in order to use this
            app.
          </Text>
          <View />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: theme.SECONDARY_BG }}>
        <View
          style={{
            flex: 0.6,
            justifyContent: "center",
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: font.app.fontName,
                color:theme.PRIMARY_TEXT
              }}
            >
              {this._getPlaybackTimestamp()}
            </Text>
          </View>
          <View>
            <Slider
              minimumTrackTintColor={theme.PRIMARY}
              onValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              style={{}}
              value={this._getSeekSliderPosition()}
              thumbTintColor={theme.PRIMARY}
              disabled={
                this.state.isRecording ||
                !this.state.isPlaybackAllowed ||
                this.state.isLoading
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              transparent
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: theme.PRIMARY,
                marginHorizontal: 10,
              }}
              onPress={this._onPlayPausePressed}
              disabled={this.state.isRecording || this.state.isLoading}
            >
              {!this.state.isSoundPuase ? (
                <Play color={theme.BG} size={30} />
              ) : (
                <Pause color={theme.BG} size={30} />
              )}
            </Button>
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: theme.BG,
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
          <View>
            <Text
              style={{ fontSize: 18, fontFamily: font.app.fontName, textAlign: "center", color:theme.PRIMARY_TEXT }}
            >
              {this._getRecordingTimestamp()}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Animatable.View
              duration={700}
              style={{
                opacity: 0,
              }}
              animation={this.sound ? AccentButtonsRef : AccentButtons}
            >
              <Button
                onPress={() => this.deleteRecordFromSystem("upper")}
                disabled={!this.state.recordingDuration || this.state.isLoading}
                transparent
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: theme.BG,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: theme.PRIMARY_TEXT,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Trash color={theme.PRIMARY_TEXT} size={24} />
              </Button>
            </Animatable.View>
            <Button
              transparent
              onPress={this._onRecordPressed}
              disabled={this.state.isLoading}
              style={{
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: theme.PRIMARY_TEXT,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Animatable.View
                  easing="ease-out-circ"
                  duration={700}
                  animation={
                    !isRecording
                      ? RecordButtonAnimationRev
                      : RecordButtonAnimation
                  }
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: theme.RECORD,
                  }}
                ></Animatable.View>
              </View>
            </Button>
            <Animatable.View
              style={{
                opacity: 0,
              }}
              duration={700}
              animation={this.sound ? AccentButtonsRef : AccentButtons}
            >
              <DialogComponent
              font={font}
                theme={theme}
                recordingDuration={this.state.recordingDuration}
                isLoading={this.state.isLoading}
              />
            </Animatable.View>
          </View>
        </View>
      </View>
    );
  }
}

export default RecordBody;
