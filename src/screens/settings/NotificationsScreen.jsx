import {
  ListItem,
  List,
  Left,
  Body,
  Picker,
  Content,
  Header,
  Icon,
  Container,
  Button,
  Right,
  Title,
  Spinner,
  Toast,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LeftArrowIOS } from "../../assets/icons";
import {
  Switch,
  StyleSheet,
  Dimensions,
  Text,
  AsyncStorage,
  View,
  Slider,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import azkar from "../../store/azkar";
import {
  isInit,
  init,
  safeOne,
  cancelAll,
  cancelNotification,
  setNotification,
  askForPermission,
} from "../../utils/notification.js";
import calcWird from "../../utils/caculateWhereToStop.js";

const { height, width } = Dimensions.get("window");
const LoadingComponent = ({ PRIMARY }) => {
  return (
    <View
      style={{
        position: "absolute",
        height: height,
        top: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        bottom: 0,
        width: width,
        zIndex: 4,
        backgroundColor: "transparent",
      }}
    >
      <Spinner color={PRIMARY} />
    </View>
  );
};
export const NotificationScreen = ({ navigation, route }) => {
  const { name, title } = route.params;
  const [isPermisionApprove, setIsPermisionApprove] = useState("null");
  const theme = useSelector((state) => state.theme);
  const font = useSelector((state) => state.font);  
  const stop = useSelector((state) => state.stop);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("null");
  const getDataFromStorage = async () => {
    try {
      const permision = await askForPermission();
      setIsPermisionApprove(permision);
      const item = await AsyncStorage.getItem(name);
      setData(JSON.parse(item));
     // console.log(JSON.parse(item));
    }catch (err) {
      alert("something went wrong!");
    }
  };
  // const del = async ()=>{ 
  //   await cancelNotification('FCE674F8-AA43-4B07-93FA-1881A911DF1F');
  // }
  //console.log(name);
  const changeDataWird = React.useCallback(async (newData) => {
    setIsLoading(true);
   // console.log(data)
    if (data.selected !== newData.selected || data.number !== newData.number) {
      newData.body = calcWird(newData.selected, stop, newData);
      ///console.log(newData.body,'body')
    }
    let id;
    if (data.isEnabled !== newData.isEnabled) {
      if (newData.isEnabled) {
        id = await setNotification(newData);
       // console.log('id',id)
      } else {
        await cancelNotification(data.id);
      }
    } else if (data.isEnabled) {
      await cancelNotification(data.id);
      id = await setNotification(newData);
       console.log('id2',id)
    }
    if (id) newData.id = id;
    try {
      await AsyncStorage.setItem(name, JSON.stringify(newData));
    } catch (err) {
      alert("something went wrong!");
    }
    Toast.show({
      text: "تم حفظ التغيرات بنجاح",
      buttonText: "موافق",
      style: {
        flexDirection: "row-reverse",
      },
      position: "bottom",
      textStyle: {
        fontFamily: font.app.fontName,
        textAlign: "right",
      },
      duration: 1500,
    });
    setData(newData);
    setIsLoading(false);
  }, [data]);
  const changeData = React.useCallback(async (newData) => {
    setIsLoading(true);
    if (data.isEnabled !== newData.isEnabled) {
      if (newData.isEnabled) {
        id = await setNotification(newData);
        //console.log(id)
      } else {
        await cancelNotification(data.id);
      }
    } else if (data.isEnabled) {
      await cancelNotification(data.id);
      id = await setNotification(newData);
    }
    if (id) newData.id = id;
    try {
      await AsyncStorage.setItem(name, JSON.stringify(newData));
    } catch (err) {
      alert("something went wrong!");
    }
    Toast.show({
      text: "تم حفظ التغيرات بنجاح",
      buttonText: "موافق",
      style: {
        flexDirection: "row-reverse",
      },
      position: "bottom",
      textStyle: {
        fontFamily: font.app.fontName,
        textAlign: "right",
      },
      duration: 1500,
    });
    setData(newData);
    setIsLoading(false);
  }, [data]);
  useEffect(() => {
    getDataFromStorage();
   // del();
  }, []);
  return (
    <Container>
      <Header noShadow style={{ backgroundColor: theme.PRIMARY }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <LeftArrowIOS color={theme.BG} size={24} />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              fontFamily: font.app.fontName,
              color: theme.BG,
            }}
          >
            {title}
          </Title>
        </Body>
        <Right />
      </Header>
      {isLoading && <LoadingComponent PRIMARY={theme.PRIMARY} />}
      {data === "null" || isPermisionApprove === "null" ? (
        <View
          style={{
            backgroundColor: theme.BG,
            flex: 1,
          }}
        >
          <Spinner color={theme.PRIMARY} />
        </View>
      ) : !isPermisionApprove || (!data.title && !data.time) ? ( <View 
            style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:theme.BG}}>
              <Text
              style={{
                      color: theme.PRIMARY_TEXT,
                      fontFamily: font.app.fontName,
                      fontSize: 16,
                      textAlign: "right",
                    }}
              >ييجب ان تفعل التنبيهات اولا حتي يمكنك استخدام هذه الخدمة</Text>
            </View>) : name === "elwird" ? (
        <Elwird
          changeData={changeDataWird}
          disabled={isPermisionApprove}
          theme={theme}
          data={data}
          font={font}
        />
      ) : (
        <NotificationList
          name={name}
          changeData={changeData}
          disabled={isPermisionApprove}
          theme={theme}
          data={data}
          font={font}
        />
      )}
    </Container>
  );
};
const NotificationList = ({ theme, name,font, changeData, data = {}, disabled }) => {
  const number = name === "azkarElsbah" ? 0 : name === "azkarElmsaa" ? 1 : 16;
  const [isActive, setIsActive] = useState(data.isEnabled);
  const [isVisibel, setIsVisibel] = useState(false);
  const [selected, setSelected] = useState(data.selected);
  const [time, setTime] = useState(moment(data.time));
  const showDateTimePicker = () => {
    setIsVisibel(true);
  };

  const hideDateTimePicker = () => {
    setIsVisibel(false);
  };

  const handleDatePicked = (date) => {
    hideDateTimePicker();
    setTime(moment(date));
  };
  const onValueChange = (value: string) => {
    setSelected(value);
  };
  return (
    <React.Fragment>
      <Content
        style={{
          backgroundColor: theme.BG,
        }}
      >
        {!disabled && (
          <View
            style={{
              padding: 5,
            }}
          >
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
                fontSize: 16,
                textAlign: "right",
              }}
            >
              يجب عليك اولا ان تنشط النتبها من الاعدادات
            </Text>
          </View>
        )}
        <DateTimePicker
          isVisible={isVisibel && disabled}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
          mode="time" // show only time picker
          is24Hour={false}
          date={new Date(time)}
          titleIOS="اختر الوقت المناسب لك"
        />

        <List
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <ListItem
            style={{
              backgroundColor: theme.SECONDARY_BG,
            }}
          >
            <Left>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.app.fontName,
                  fontSize: 18,
                }}
              >
                تفعيل
              </Text>
            </Left>
            <Right>
              <Switch
                value={isActive && disabled}
                onValueChange={(state) => setIsActive(state)}
                ios_backgroundColor={theme.SECONDARY_BG}
                trackColor={theme.SECONDARY_BG}
              />
            </Right>
          </ListItem>
          <ListItem
            onPress={showDateTimePicker}
            style={{
              backgroundColor: theme.SECONDARY_BG,
            }}
          >
            <Left>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.app.fontName,
                  fontSize: 18,
                }}
              >
                الوقت
              </Text>
            </Left>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.app.fontName,
                  fontSize: 18,
                }}
              >
                {moment(time).format("LT")}
              </Text>
            </View>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
                fontSize: 18,
              }}
            >
              اختر دعائك
            </Text>

            <Button
              style={{
                backgroundColor: theme.PRIMARY,
                
              }}
            >
              <Picker
                itemTextStyle={{
                  fontFamily: font.app.fontName,
                  textAlign: "right",
                }}
                headerStyle={{
                  backgroundColor: theme.PRIMARY,
                }}
                headerTitleStyle={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.app.fontName,
                }}
                headerBackButtonText={"عودة"}
                headerBackButtonTextStyle={{
                  color: theme.BG,
                  fontFamily: font.app.fontName,
                }}
                iosHeader={"اختر دعاء"}
                mode="dropdown"
                selectedValue={selected}
                onValueChange={onValueChange}
                enabled={disabled}
              >
                {azkar[number].azkar.map((item, index) => {
                  return (
                    <Picker.Item
                      key={item.zker + item.count}
                      label={item.zekr}
                      value={index}
                    />
                  );
                })}
              </Picker>
            </Button>
          </ListItem>
        </List>
      </Content>
      <Button
        onPress={() =>
          changeData({
            ...data,
            selected: selected,
            isEnabled: isActive,
            body: azkar[number].azkar[selected].zekr,
            time: new Date(time).getTime(),
          })
        }
        disabled={
          data.selected === selected &&
          data.isEnabled === isActive &&
          data.time === new Date(time).getTime()
        }
        style={{
          backgroundColor: theme.PRIMARY,
          alignItems: "center",
          justifyContent: "center",
          flexSelf: "flex-end",
          borderRadius: 0,
        }}
      >
        <Text
          style={{
            color: theme.BG,
            fontFamily: font.app.fontName,
            fontSize: 20,
          }}
        >
          حفظ
        </Text>
      </Button>
    </React.Fragment>
  );
};
const Elwird = ({ theme,font, data={}, changeData, disabled }) => {
  const [isActive, setIsActive] = useState(data.isEnabled);
  const [isVisibel, setIsVisibel] = useState(false);
  const [time, setTime] = useState(moment(data.time));
  const [number, setNumber] = useState(data.number);
  const [selected, setSelected] = useState(data.selected);
  const showDateTimePicker = () => {
    setIsVisibel(true);
  };

  const hideDateTimePicker = () => {
    setIsVisibel(false);
  };

  const handleDatePicked = (date) => {
    hideDateTimePicker();
    setTime(moment(date));
  };
  const onValueChange = (value: string) => {
    setSelected(value);
  };
  return (
    <React.Fragment>
      <Content
        style={{
          backgroundColor: theme.BG,
        }}
      >
        {!disabled && (
          <View
            style={{
              padding: 5,
            }}
          >
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
                fontSize: 16,
                textAlign: "right",
              }}
            >
              يجب عليك اولا ان تنشط النتبها من الاعدادات
            </Text>
          </View>
        )}
        <DateTimePicker
          isVisible={isVisibel && disabled}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
          mode="time" // show only time picker
          is24Hour={false}
          date={new Date(time)}
          titleIOS="اختر الوقت المناسب لك"
        />

        <List
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <ListItem
            style={{
              backgroundColor: theme.SECONDARY_BG,
            }}
          >
            <Left>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.app.fontName,
                  fontSize: 18,
                }}
              >
                تفعيل
              </Text>
            </Left>
            <Right>
              <Switch
                value={isActive && disabled}
                onValueChange={(state) => setIsActive(state)}
                ios_backgroundColor={theme.SECONDARY_BG}
                trackColor={theme.SECONDARY_BG}
              />
            </Right>
          </ListItem>
          <ListItem
            onPress={showDateTimePicker}
            style={{
              backgroundColor: theme.SECONDARY_BG,
            }}
          >
            <Left>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.app.fontName,
                  fontSize: 18,
                }}
              >
                الوقت
              </Text>
            </Left>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.app.fontName,
                  fontSize: 18,
                }}
              >
                {moment(time).format("LT")}
              </Text>
            </View>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View>
                <Text
                  style={{
                    color: theme.PRIMARY_TEXT,
                    fontFamily: font.app.fontName,
                    fontSize: 18,
                  }}
                >
                  اختر مقياس تلاوتك اليومية
                </Text>
              </View>
              <Button  style={{ backgroundColor: theme.PRIMARY }}>
                <Picker
                  itemTextStyle={{
                    fontFamily: font.app.fontName,
                    textAlign: "right",
                  }}
                  headerStyle={{
                    backgroundColor: theme.PRIMARY,
                  }}
                  headerTitleStyle={{
                    color: theme.PRIMARY_TEXT,
                    fontFamily: font.app.fontName,
                  }}
                  headerBackButtonText={"عودة"}
                  headerBackButtonTextStyle={{
                    color: theme.BG,
                    fontFamily: font.app.fontName,
                  }}
                  iosHeader={"اختر مقياسك"}
                  mode="dropdown"
                  selectedValue={selected}
                  onValueChange={onValueChange}
                  enabled={disabled}
                >
                  <Picker.Item label={"الايات"} value={0} />
                  <Picker.Item label={"الاجزاء"} value={1} />
                  <Picker.Item label={"الصفحات"} value={2} />
                </Picker>
              </Button>
            </View>
            <Slider
              maximumValue={selected === 1 ? 30 : 100}
              minimumValue={1}
              minimumTrackTintColor={theme.PRIMARY}
              onSlidingComplete={(value) => setNumber(value)}
              style={{ width: "100%" }}
              step={1}
              value={number}
              thumbTintColor={theme.PRIMARY}
            />
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: font.app.fontName,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {number}
              </Text>
            </View>
          </ListItem>
        </List>
        <Text
          style={{
            color: theme.PRIMARY,
            fontFamily: font.app.fontName,
            textAlign: "right",
          }}
        >
          ملاحظة : استخدم علامة الوقوف عندما تتوقف عن التلاوة حتي نعلم اين وقفت
          ونبلغك بتلاوتك اليومية
        </Text>
      </Content>
      <Button
        onPress={() =>
          changeData({
            ...data,
            number,
            selected: selected,
            isEnabled: isActive,
            time: new Date(time).getTime(),
          })
        }
        disabled={
          data.selected === selected &&
          number === data.number &&
          data.isEnabled === isActive &&
          data.time === new Date(time).getTime()
        }
        style={{
          backgroundColor: theme.PRIMARY,
          alignItems: "center",
          justifyContent: "center",
          flexSelf: "flex-end",
          borderRadius: 0,
        }}
      >
        <Text
          style={{
            color: theme.BG,
            fontFamily: font.app.fontName,
            fontSize: 20,
          }}
        >
          حفظ
        </Text>
      </Button>
    </React.Fragment>
  );
};
export default NotificationScreen;
