import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Close, Help } from "../../assets/icons/";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "native-base";
import { Text } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'

const RenderText = ({quran,color }) => {
  const tafseer = useSelector((state) => state.tafseer);
  return (
    <View style={{ paddingHorizontal: 10 }}>
      {tafseer ? (
        <Text
          style={{
            textAlign: "right",
            fontSize: 18,
            color: color,
            fontFamily: quran,
          }}
        >
          {tafseer.text}
        </Text>
      ) : (
        <ActivityIndicator color="#000" size={40} />
      )}
    </View>
  );
};

const TafseerModal = ({
  BG,
  SECONDARY_BG,
  PRIMARY_TEXT,
  ayahNumber,
  style,
  surahNumber,
  theme,
  children,
  font
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <View>
      <Button
        onPress={() => {
          dispatch({
            type: "GET_TAFSEER",
            payload: {
              surah: surahNumber,
              ayah: ayahNumber,
            },
          });
          setIsVisible(true);
        }}
        style={style}
        transparent
      >
        {children}
      </Button>
      <Modal style={{ marginHorizontal: 0 }} isVisible={isVisible}>
        <View
          style={{
            marginHorizontal: 5,
            marginTop: Constants.statusBarHeight,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
              flex: 1,
            }}
          >
            <View
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                top: 0,
                zIndex: 2,
              }}
            >
              <Button
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: theme.PRIMARY,
                  borderRadius: 20,
                }}
                onPress={() => setIsVisible(false)}
              >
                <Close color={BG} size={35} />
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: theme.PRIMARY,
                  marginHorizontal: 20,
                  borderRadius: 20,
                  marginTop: 50,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#fff",
                    fontFamily:font.quran.fontName,
                    color: BG,
                  }}
                >
                  التفسير الميسر{" "}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 15,
                  marginHorizontal: 10,
                  flex: 1,
                  borderRadius: 15,
                }}
              >
                <LinearGradient
      colors={theme.gradient}
      location={theme.location}
      start={[0,0]}
      end={[1,1]}
      style={{
        flex:1,
        borderRadius: 15
      }}
      >
                <ScrollView style={{ flex: 1 }}>
                  <RenderText  quran={font.quran.fontName} PRIMARY_TEXT={PRIMARY_TEXT} color={theme.color} />
                </ScrollView>
                  </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default TafseerModal;
