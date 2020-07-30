import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import { Play, Forward, Backward, Pause } from "../../assets/icons/";
import { Button,Text } from "native-base";
import quranWithPages from "../../store/quranByPages.js";

let timer;
let timerNext,
  num = 0;
let close = false;
let currentPage;
let d=false;
const PagePlayer = ({ theme,font }) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const quranPage = useSelector((state) => state.quranPage);
  const currentAyah = useSelector((state) => state.currentAyah);
  d = currentAyah.page 
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
     if(
        currentAyah.page === 604 &&
        currentAyah.numberInPage === currentAyah.pageLength - 1
      ) {
        setIsPlaying(false);
      }
       else if(!currentAyah || !currentAyah.number){
        setIsPlaying(false);
       }
       else if(close){
          dispatch({
            type: "PLAY_AYAH",
            payload: {},
          });
        }
        else if(quranPage.page !== currentAyah.page){
          setIsPlaying(false);
        }
        else if(quranPage.page === currentAyah.page){
          nextAyah(1);
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
        await playbackInstance.pauseAsync();
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
    }, 700);
  };

  const dispatchToPlay = (num, x) => {
    dispatch({
      type: "PLAY_AYAH",
      payload: {
        number: currentAyah.number + num,
        name: currentAyah.name,
        numberInSurah: currentAyah.numberInSurah + num,
        numberInPage: currentAyah.numberInPage + x,
        ayatsNumber: currentAyah.ayatsNumber,
        pageLength: currentAyah.pageLength,
        page: currentAyah.page,
      },
    });
  };
  const nextAyah = (num) => {
    if (num === -1) {
      if (
        (currentAyah.numberInPage === 1 &&
          quranWithPages[currentAyah.page - 1].ayahs[0].name) ||
        currentAyah.numberInPage === 0
      ) {
        const b = quranWithPages[currentAyah.page - 2];
        let y = b.ayahs[0].name ? b.ayahs[1] : b.ayahs[0];
        dispatch({
          type: "CHANGE_PAGE",
          payload: num,
        });
        dispatch({
          type: "PLAY_AYAH",
          payload: {
            name: b.firstSurahName,
            number: y.number,
            numberInSurah: y.numberInSurah,
            numberInPage: y.numberInPage,
            ayatsNumber: currentAyah.ayatsNumber,
            pageLength: b.ayahs.length,
            page: y.page,
          },
        });
      } else {
        let x = quranWithPages[currentAyah.page - 1].ayahs[
          currentAyah.numberInPage - 1
        ].name
          ? 2
          : 1;
        dispatchToPlay(num, x);
      }
    }
    if (num === 1) {
      
      if (
        (currentAyah.numberInPage + 2 === currentAyah.pageLength &&
          quranWithPages[currentAyah.page - 1].ayahs[
            quranWithPages[currentAyah.page - 1].ayahs.length - 1
          ].name) ||
        currentAyah.numberInPage + 1 === currentAyah.pageLength
      ) {
        const b = quranWithPages[currentAyah.page];
        let y = b.ayahs[0].name ? b.ayahs[1] : b.ayahs[0];
        dispatch({
          type: "CHANGE_PAGE",
          payload: num,
        });
        dispatch({
          type: "PLAY_AYAH",
          payload: {
            name: b.firstSurahName,
            number: y.number,
            numberInSurah: y.numberInSurah,
            numberInPage: y.numberInPage,
            ayatsNumber: currentAyah.ayatsNumber,
            pageLength: b.ayahs.length,
            page: y.page,
          },
        });
      } else {
        let x = quranWithPages[currentAyah.page - 1].ayahs[
          currentAyah.numberInPage + 1
        ].name
          ? 2
          : 1;

        dispatchToPlay(num, x);
      }
    }
  };
  const handleNextPrev = (num) => {
    nextAyah(num);
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
  let i=0;
  useEffect(() => {
    if (currentAyah && currentAyah.number) {
      handleRep();
      console.log(i++,' : ',currentAyah.page,' - ', quranPage.page);
    }
  }, [currentAyah.number]);
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
        ><Text style={{
          fontFamily:font.app.fontName,
          color:theme.PRIMARY_TEXT,
        }}> التالي</Text>
          <Button
            transparent
            onPress={() => handleNextAsync(1)}
            disabled={
              (currentAyah.page === 604 &&
                            currentAyah.numberInPage === currentAyah.pageLength - 1) || (currentAyah.numberInPage!==0 && !currentAyah.numberInPage )|| currentAyah.page !== quranPage.page
            }
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
                  (currentAyah.page === 604 && currentAyah.numberInPage === currentAyah.pageLength - 1) ||(currentAyah.numberInPage!==0 && !currentAyah.numberInPage ) ||
                  currentAyah.page !== quranPage.page
                  ? theme.SECONDARY_BG
                  : theme.SECONDARY_TEXT
              }
            />
          </Button>
          <Button
            transparent
            disabled={(currentAyah.numberInPage!==0 && !currentAyah.numberInPage ) || currentAyah.page !== quranPage.page}
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
            onPress={() => handleNextAsync(-1)}
            disabled={(currentAyah.page === 1 && currentAyah.numberInPage === 1) || (currentAyah.numberInPage!==0 && !currentAyah.numberInPage ) ||currentAyah.page !== quranPage.page}
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
                  (currentAyah.page === 1 && currentAyah.numberInPage === 1) || (currentAyah.numberInPage!==0 && !currentAyah.numberInPage ) || currentAyah.page !== quranPage.page
                  ? theme.SECONDARY_BG
                  : theme.SECONDARY_TEXT
              }
            />
          </Button>
          <Text style={{
          fontFamily:font.app.fontName,
          color:theme.PRIMARY_TEXT,
        }}>السابق</Text>
        </View>
      </View>
    </View>
  );
};

export default PagePlayer;
