import surahs from "../../store/surah";
import React from "react";
import { View, FlatList } from "react-native";
import { Text, Button } from "native-base";
import SurahItem from "./SurahItem.jsx";
import { useSelector } from "react-redux";
import juz from "../../store/juz";
import { Book } from "../../assets/icons/";
const SurahsList = ({ onPress, listName = "not" }) => {
  const theme = useSelector((state) => state.theme);
  const font = useSelector((state) => state.font);
  const stop = useSelector((state) => state.stop);
  return (
    <View
      style={{
        backgroundColor: theme.BG,
        flex: 1,
      }}
    >
      <FlatList
        data={listName === "juz" ? juz : surahs}
        style={{ marginTop: 10, flex: 1 }}
        ListHeaderComponent={
          stop && !stop.notReady ? (
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
                backgroundColor: theme.PRIMARY,
                shadowColor: theme.SECONDARY_TEXT,
                elevation: 2,
                minHeight: 60,
              }}
            >
              <Button
                onPress={() => {
                 // console.log({...stop,scrollTo:stop.numberInPage})
                  onPress({...stop,scrollTo:stop.numberInPage,number:stop.surahNumber});
                }}
                transparent
                style={{
                  flex: 1,
                  minHeight: 50,
                  flexDirection: "row-reverse",
                  overflow: "hidden",
                  borderRadius: 10,
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <View>
                  <Book size={30} color={theme.BG} />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontFamily: font.quran.fontName,
                      color: theme.BG,
                    }}
                  >
                    اكمل تلاوتك من حيث وقفت{" "}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      fontFamily: font.quran.fontName,
                      color: theme.BG,
                    }}
                  >
                    {stop.name} - الاية {stop.numberInSurah} - جزء {stop.juz} -
                    صفحة {stop.page}
                  </Text>
                </View>
              </Button>
            </View>
          ) : null
        }
        keyExtractor={(item) =>
          listName === "juz" ? item.juz_name : item.name
        }
        renderItem={({ item }) => {
          return listName === "juz" ? (
            <SurahItem
            font={font}
              name={`جزء (${item.juz_name})`}
              number={item.juz}
              theme={theme}
              revelationType={null}
              ayahsLength={`${item.surah} - ${item.ayahNumber}`}
              onPress={() =>{
                              onPress({name:"سورة " + item.surah, number:item.surahNumber, numberInSurah:item.ayahNumber,page:item.page,scrollTo:item.ayahNumber})
                            }}
            />
          ) : (
            <SurahItem
              font={font}
              name={item.name}
              theme={theme}
              revelationType={
                item.revelationType === "Meccan" ? "مكية" : "مدنية"
              }
              number={item.number}
              ayahsLength={`${item.numberOfAyahs} ${
                item.numberOfAyahs < 10 ? "آيات" : "آية"
              }`}
              onPress={() => onPress({...item,scrollTo:item.numberInPage})}
            />
          );
        }}
      />
    </View>
  );
};

export default SurahsList;
