import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Icon } from "native-base";

const RenderItemsList = ({ theme, onPress,font }) => {
  const filtedArray = useSelector((state) => state.keyword);
  return (
    <View style={{ flex: 1, backgroundColor: theme.BG }}>
      <FlatList
        keyExtractor={(item) => item.text}
        data={filtedArray}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 10,
              backgroundColor: theme.SECONDARY_BG,
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
              shadowColor: theme.SECONDARY_TEXT,
            }}
          >
            <View
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderColor: theme.BG,
                paddingBottom: 5,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
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
                  <Text style={{ color: theme.BG }}>{item.number+1}</Text>
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
                    {item.name}
                  </Text>
                </View>
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
                    fontSize: 16,
                  }}
                >
                  الاية رقم {item.numberInSurah}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.quran.fontName,
                  fontSize: 18,
                  textAlign: "right",
                }}
              >
                {item.text}
              </Text>
            </View>
            <Button
              rounded
              onPress={() =>
                onPress({...item,scrollTo:item.numberInPage})
              }
              style={{
                backgroundColor: theme.PRIMARY,
                marginTop: 10,
                paddingHorizontal: 10,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.BG,
                  fontFamily: font.app.fontName,
                  fontSize: 16,
                }}
              >
                أذهب الي الاية
              </Text>
              <Icon name="arrow-forward" style={{ color: theme.BG }} />
            </Button>
          </View>
        )}
      />
    </View>
  );
};
export default RenderItemsList;
