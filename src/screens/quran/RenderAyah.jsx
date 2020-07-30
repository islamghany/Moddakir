import * as React from "react";
import { Text, View, ImageBackground, AsyncStorage } from "react-native";
import {
  NameWrapper,
  Share,
  NumberWrapper,
  Help,
  Stop,
  Copy,
  Play,
  Forward,
  Backward,
} from "../../assets/icons/";
import { Button, Toast } from "native-base";
import { useDispatch } from "react-redux";
import TafseerModal from "./TafserrModal";
import CopyToClipboard from "../../components/CopyToClipboard";
import SharingTextAsImgae from "../../components/SharingTextAsImage.jsx";
import {
  cancelNotification,
  setNotification,
  askForPermission,
} from "../../utils/notification.js";
import calcWird from "../../utils/caculateWhereToStop.js";

export const AyahHeader = ({ theme, number, ayahsNumber, name,revelationType }) => {
  return (
    <View
      style={{
        minHeight: 60,
      }}
    >
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/images/checkerboard-cross.png")}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: `${theme.SECONDARY_BG}d1`,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: theme.PRIMARY,
              justifyContent: "center",
              alignContent: "center",
              shadowColor: theme.PRIMARY,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,

              elevation: 11,
            }}
          >
            <Text style={{ textAlign: "center", fontFamily: "hfs" }}>{ revelationType === "Meccan" ? "مكية" : "مدنية"}</Text>
            <Text style={{ textAlign: "center" }}>{number}</Text>
          </View>
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              position: "relative",
            }}
          >
            <View
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                //   top:'50%',
                //   left:'50%',
                //  transform:[{translateX:'-50%',translateY:'-50%'}]
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "hfs",
                  }}
                >
                  {name.slice(5).trim()}
                </Text>
              </View>
            </View>
            <NameWrapper height={70} color={theme.PRIMARY} />
          </View>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: theme.PRIMARY,
              justifyContent: "center",
              alignContent: "center",
              shadowColor: theme.PRIMARY,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,

              elevation: 11,
            }}
          >
            <Text style={{ textAlign: "center", fontFamily: "hfs" }}>ايات</Text>
            <Text style={{ textAlign: "center" }}>{ayahsNumber}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export const AyahContent = React.memo(
  ({
    ayah,
    juz,
    name,
    stopRead,
    markReadStop,
    numberInSurah,
    ayatsNumber,
    numberInQuran,
    number,
    theme,
    page,
    font
  }) => {
    const dispatch = useDispatch();
    const _storeData = async (data) => {

      const rowData = await AsyncStorage.getItem("elwird");
      const newData = JSON.parse(rowData);
      if (newData && newData.isEnabled && askForPermission()) {
        newData.body = calcWird(newData.selected, data, newData);
        await cancelNotification(newData.id);
        const id = await setNotification(newData);
        if (id) newData.id = id;
        try {
          await AsyncStorage.setItem("elwird", JSON.stringify(newData));
        } catch (err) {
          alert("something went wrong!");
        }
      }
      try {
        await AsyncStorage.setItem("islamghanyModdakir", JSON.stringify(data));
        dispatch({
          type: "SET_AYAY_STOP",
          payload: data,
        });
        Toast.show({
          text: "تم وضع علامة الوقوف",
          buttonText: "موافق",
          style: {
            flexDirection: "row-reverse",
          },
          position: "bottom",
          textStyle: {
            fontFamily: "cairo",
            textAlign: "right",
          },
          duration: 1500,
        });
      } catch (error) {}
    };
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingBottom: 15,
          borderBottomColor: theme.SECONDARY_BG,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            padding: 10,
          }}
        >
          <Text
            style={{
              textAlign: "right",
              fontSize: 20,
              lineHeight: 40,
              flex: 1,
              fontFamily: "hfs",
              color: theme.PRIMARY_TEXT,
            }}
          >
            {ayah}
          </Text>
          <View
            style={{
              alignItems: "center",
              position: "relative",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 0,
            }}
          >
            <View style={{ flex: 0.3, alignItems: "flex-start" }}>
              <Text
                style={{
                  fontSize: 14,
                  opacity: 0.5,
                  color: theme.PRIMARY_TEXT,
                  fontFamily: "hfs",
                }}
              >
                صفحة {page}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                position: "absolute",
              }}
            >
              <Text
                style={{
                  fontSize: numberInSurah.length === 3 ? 13 : 14,
                  color: theme.PRIMARY_TEXT,
                  fontFamily: "hfs",
                  textAlign: "center",
                }}
              >
                {numberInSurah}
              </Text>
            </View>
            <View style={{ flex: 0.4, alignItems: "center" }}>
              <NumberWrapper size={30} color={theme.PRIMARY} />
            </View>
            <View style={{ flex: 0.3, alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 14,
                  opacity: 0.5,
                  color: theme.PRIMARY_TEXT,
                  fontFamily: "hfs",
                }}
              >
                جزء {juz}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
        >
          <TafseerModal
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              marginRight: 10,

              elevation: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
            ayahNumber={ayatsNumber - numberInSurah}
            BG={theme.BG}
            PRIMARY_TEXT={theme.PRIMARY_TEXT}
            SECONDARY_BG={theme.SECONDARY_BG}
            surahNumber={number - 1}
            font={font}
            theme={theme}
          >
            <Help size={24} color={theme.SECONDARY_TEXT} />
          </TafseerModal>
          <Button
            transparent
            onPress={() => {
              dispatch({
                type: "PLAY_AYAH",
                payload: {
                  number: numberInQuran,
                  name,
                  numberInSurah,
                  ayatsNumber,
                },
              });
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              marginRight: 10,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Play size={24} color={theme.SECONDARY_TEXT} />
          </Button>
          <CopyToClipboard
            text={ayah}
            transparent
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              marginRight: 10,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Copy size={24} color={theme.SECONDARY_TEXT} />
          </CopyToClipboard>
          <Button
            onPress={() => {
              if (!stopRead) {
                _storeData({
                  numberInSurah,
                  surahNumber: number,
                  name,
                  juz,
                  page,
                  numberInQuran,
                });
              }
            }}
            transparent
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              marginRight: 10,
              backgroundColor: stopRead ? theme.PRIMARY : "transparent",
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
            }}
          >
            <Stop
              size={24}
              color={stopRead ? theme.SECONDARY_BG : theme.SECONDARY_TEXT}
            />
          </Button>
          <SharingTextAsImgae
            name={name}
            number={numberInSurah}
            text={ayah}
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Share size={24} color={theme.SECONDARY_TEXT} />
          </SharingTextAsImgae>
        </View>
      </View>
    );
  }
);
export const PlayerHeader = ({ theme }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        minHeight: 50,
        backgroundColor: theme.SECONDARY_BG,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
          paddingTop: 0,
          paddingHorizontal: 30,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "hfs",
            color: theme.SECONDARY_TEXT,

            textAlign: "center",
          }}
        >
          الحزء 1
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "hfs",
            color: theme.SECONDARY_TEXT,
          }}
        >
          (1)
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "hfs",
            color: theme.SECONDARY_TEXT,
            paddingBottom: 10,
          }}
        >
          سورة الفاتحة
        </Text>
      </View>
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
          style={{
            flexDirection: "column",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.BG,
          }}
        >
          <Backward size={25} color={theme.SECONDARY_TEXT} />
        </Button>
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
        >
          <Play size={30} color={theme.BG} />
        </Button>
        <Button
          style={{
            flexDirection: "column",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 25,
            backgroundColor: theme.BG,
          }}
        >
          <Forward size={25} color={theme.SECONDARY_TEXT} />
        </Button>
      </View>
    </View>
  );
};
