import React, { useRef, useEffect, useState, useCallback } from "react";
import { View, FlatList, Dimensions, AsyncStorage } from "react-native";
import SurahItem from "./SurahItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Button, Text, Content } from "native-base";
import { AyahContent, AyahHeader, PlayerHeader } from "./RenderAyah.jsx";
import AyahPlayer from "./AyahsPlayer";
 
const RenderList = ({ number, theme, scrollTo, name,font }) => {
  const flatListRef = useRef(null);
  const currentAyah = useSelector((state) => state.currentAyah);
  const stop = useSelector((state) => state.stop);
  const ayats = useSelector((state) => state.surah);
  useEffect(() => {
    if (currentAyah.numberInSurah && ayats.ayahs) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentAyah.numberInSurah - 1,
      });
    }
  }, [currentAyah.numberInSurah]);
  useEffect(() => {
    if (
      scrollTo &&
      ayats.name &&
      name === ayats.name &&
      flatListRef &&
      flatListRef.current
    )
      flatListRef.current.scrollToIndex({
        animated: false,
        index: scrollTo - 1,
      });
  }, [ayats.name]);
  if (!ayats || !ayats.name || name !== ayats.name) {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Spinner color={theme.PRIMARY} />
      </View>
    );
  }
  return (
    <FlatList
      ref={flatListRef}
      data={ayats.ayahs}
      style={{ flex: 1 }}
      initialNumToRender={5}
      maxToRenderPerBatch={4}
      updateCellsBatchingPeriod={50}
      windowSize={5}
      onEndReachedThreshold={5}
      ListHeaderComponent={
        <AyahHeader
          number={ayats.number}
          theme={theme}
          ayahsNumber={ayats.ayahs.length}
          name={ayats.name}
          revelationType={ayats.revelationType}
        />
      }
      keyExtractor={(item) => item.text}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              backgroundColor:
                currentAyah.number === item.number
                  ? theme.ACTIVE
                  : item.number % 2
                  ? theme.BG
                  : theme.SECONDARY_BG,
            }}
          >
            <AyahContent
              ayah={item.text}
              numberInQuran={item.number}
              name={ayats.name}
              theme={theme}
              page={item.page}
              stopRead={
                stop && stop.numberInQuran && item.number === stop.numberInQuran
              }
              juz={item.juz}
              numberInSurah={item.numberInSurah}
              ayatsNumber={ayats.ayahs.length}
              number={ayats.number}
              font={font}
            />
          </View>
        );
      }}
      onScrollToIndexFailed={(error) => {
        flatListRef.current.scrollToOffset({
          offset: error.averageItemLength * error.index,
          animated: true,
        });
        setTimeout(() => {
          if (flatListRef.current !== null) {
            flatListRef.current.scrollToIndex({
              index: error.index,
              animated: true,
            });
          }
        }, 100);
      }}
    />
  );
};

const AyahsList = ({ theme, scrollTo, number, name ,font}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_SURAH", payload: number });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.BG }}>
      <View style={{ flex: 1, backgroundColor: theme.BG }}>
        <RenderList scrollTo={scrollTo} font={font} name={name} theme={theme} />
      </View>
      <AyahPlayer font={font} theme={theme} />
    </View>
  );
};

/*
AyahContent 
    ayah={item} 
    numberInQuran={item.number} 
    name={ayats.name} 
    theme={theme}
        numberInSurah={ayats.numberInSurah}
    ayatsNumber={ayats.ayahs.length} 
    number={ayats.number} />

useEffect(()=>{
    if(flatListRef && flatListRef.current)
     flatListRef.current.scrollToIndex({animated: true, index: num});
  },[num])
    
   <FlatList 
          style={{ flex: 1 }}
          ref={flatListRef}
          keyExtractor={item => item.name}
          initialNumToRender={5}
          maxToRenderPerBatch={4}
          updateCellsBatchingPeriod={50}
          windowSize={5}
          onEndReachedThreshold={5}          
        data={d}
            onScrollToIndexFailed={(error) => {
            flatListRef.current.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
          setTimeout(() => {
            if (flatListRef.current !== null) {
              flatListRef.current.scrollToIndex({ index: error.index, animated: true });
            }
          }, 100);
        }}
          renderItem={({ item, index}) => (
              <RenderItem name={item.name} index={index} />
            )}
        />
*/
export default AyahsList;
