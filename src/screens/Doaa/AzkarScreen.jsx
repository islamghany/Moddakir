import React from "react";
import { View, FlatList, Text, Dimensions,ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Svg, { Path } from "react-native-svg";
import { LeftArrowIOS } from "../../assets/icons";
import { Spinner, Button } from "native-base";
import Constants from "expo-constants";
const { width } = Dimensions.get("window");
function Divider(props) {
  return (
    <Svg
      data-name="Layer 1"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      {...props}
    >
      <Path
        d="M0 0v7.23c0 58.29 268.63 105.54 600 105.54s600-47.25 600-105.54V0z"
        className="prefix__shape-fill"
      />
    </Svg>
  );
}

const AzkarScreen = ({ navigation, route }) => {
  const theme = useSelector((state) => state.theme);
  const azkar = useSelector((state) => state.azkar);
   const font = useSelector(state=>state.font);
  if (azkar.azkar && azkar.azkar.length) {
    return (
      <View style={{ flex: 1 ,backgroundColor:theme.BG}}>
                   <FlatList
            data={azkar.azkar}
            ListHeaderComponent={<View>
            	<View
          style={{
            backgroundColor: theme.PRIMARY,
            height: 80,
          }}
        >
          <Button
            transparent
            onPress={() => navigation.goBack()}
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              marginTop: Constants.statusBarHeight,
            }}
          >
            <LeftArrowIOS color={theme.BG} size={30} />
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.BG,
            position: "relative",
            paddingTop:100,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Divider fill={theme.PRIMARY} width={width} height={40} />
          </View>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: theme.BG,
                paddingHorizontal: 30,
                minHeight: 80,
                borderRadius: 20,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                justifyContent: "center",
                alignItems: "center",
                elevation: 2,
                shadowColor: theme.SECONDARY_TEXT,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: theme.PRIMARY_TEXT,
                  fontWeight: "400",
                  paddingBottom: 5,
                }}
              >
                {azkar.name}
              </Text>
              <Text
                style={{
                  color: theme.SECONDARY_TEXT,
                }}
              >
                عدد الادعية: {azkar.azkar.length}
              </Text>
            </View>
          </View>
          </View>
        </View>}
            keyExtractor={(item) => item.zekr}
            renderItem={({ item }) => <View
          style={{
            marginHorizontal: 10,
            marginBottom: 10,
            backgroundColor: theme.SECONDARY_BG,
            padding: 10,
            borderRadius: 20,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            justifyContent: "center",
           
            elevation: 2,
            shadowColor: theme.SECONDARY_TEXT,
          }}
        >
          <View>
            <Text
              style={{
                color: theme.PRIMARY,
                fontSize: 17,
                textAlign: "center",
                 fontFamily:font.app.fontName
              }}
            >
              {item.category}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              borderRightWidth: 2,
              borderColor: theme.SECONDARY_TEXT,
              paddingRight: 10,
              
            }}>
            <Text
              style={{
                fontSize: 17,
                textAlign: "right",
                 fontFamily:font.app.fontName,
                 color:theme.PRIMARY_TEXT
              }}
            >
              {item.zekr}
            </Text>
            {item.reference ? <Text
                style={{
                  textAlign: "right",
                  fontFamily:font.app.fontName
                }}
              >
                {item.reference}
              </Text> :null
            }
          </View>
         <View>
            {item.count  ?  <Text
                style={{
                  textAlign: "right",
                  color: theme.SECONDARY_TEXT,
                  fontFamily:font.app.fontName
                }}
              >
                مرات التكرار : {item.count}
              </Text>:null
            }
            {item.description ? <Text
                style={{
                  textAlign: "right",
                  color: theme.SECONDARY_TEXT,
                   fontFamily:font.app.fontName
                }}
              >
                فضل هذا الدعاء : {item.description}
              </Text> : null
            }
          </View>
        </View>}
          />
          </View>
    );
  }
  return <View style={{backgroundColor:theme.BG,flex:1}}><Spinner /></View>;
};


export default AzkarScreen;
