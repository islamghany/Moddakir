import React from "react";
import {
  View,
  TouchableHighlight,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Text } from "native-base";

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 10,

    marginBottom: 10,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    height: 60,
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 5,
  },
});
const SurahItem = React.memo(
  ({ name, revelationType, number, ayahsLength, onPress, theme,font }) => {
    const MainButton =
      Platform.OS === "ios"
        ? TouchableHighlight
        : Platform.OS === "web"
        ? TouchableOpacity
        : TouchableNativeFeedback;
    return (
      <View
        style={{
          borderRadius: 10,
          marginHorizontal: 10,

          marginBottom: 10,

          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,

          height: 60,
          backgroundColor: theme.SECONDARY_BG,
          shadowColor: theme.SECONDARY_TEXT,
        }}
      >
        <MainButton
          onPress={onPress}
          activeOpacity={0.8}
          underlayColor={theme.SECONDARY_BG}
          style={{
            flex: 1,
            minHeight: 50,
            flexDirection: "row-reverse",
            alignItems: "stretch",
            overflow: "hidden",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                flex: 0.6,
              }}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.PRIMARY,
                }}
              >
                <Text style={{ color: theme.BG }}>{number}</Text>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "center",
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    color: theme.PRIMARY_TEXT,
                    fontFamily: font.quran.fontName,
                    fontSize: 19,
                  }}
                >
                  {name}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 0.4,
              }}
            >
              <Text
                style={{
                  color: theme.SECONDARY_TEXT,
                  fontFamily: font.quran.fontName,
                  fontSize: 16,
                }}
              >
                {revelationType}
              </Text>
              <Text
                style={{
                  color: theme.SECONDARY_TEXT,
                  fontFamily: font.quran.fontName,
                  fontSize: 18,
                }}
              >
                {ayahsLength}
              </Text>
            </View>
          </View>
        </MainButton>
      </View>
    );
  }
);

export default SurahItem;
