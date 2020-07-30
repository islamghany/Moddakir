import React,{useState} from 'react';
import {View,Text,FlatList,Dimensions,AsyncStorage} from 'react-native';
import {Header,Container,Spinner,Content,Title,Left,Picker,Right,Body,Button,Toast,Radio,List,ListItem} from 'native-base';
import { useSelector,useDispatch } from "react-redux";
import { LeftArrowIOS } from "../../assets/icons";
import  fonts from '../../utils/FONTS';

const {height,width} = Dimensions.get('window');

const Separator = ({ children, style }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

const LoadingComponent=({PRIMARY})=>{
  return <View style={{
    position:'absolute',
    height:height,
    top:0,
    left:0,right:0,
    justifyContent:'center',
    bottom:0,
    width:width,
    zIndex:4,
    backgroundColor:'transparent'
  }}>
     <Spinner color={PRIMARY} />
  </View>
}
//      {isLoading && <LoadingComponent PRIMARY={theme.PRIMARY} />}

const FonrScreen= ({navigation})=>{
    const [isLoading, setIsLoading] = useState(false);
const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme);
  const font = useSelector(state=>state.font);
    const {app,quran} = font;

  const [selectedApp,setSelectedApp]=useState(font.app.id)
  const [selectedQuran,setSelectedQuran]=useState(font.quran.id)
  const onValueChange1 = (value: string) => {
    setSelectedQuran(value);
  };
  const onValueChange2 = (value: string) => {
    setSelectedApp(value);
  };
   const setFont=async ()=>{
      setIsLoading(true);
      try{
        const data = {
          app:fonts[selectedApp],
          quran:fonts[selectedQuran]
        }
         await AsyncStorage.setItem('font',JSON.stringify(data));
         dispatch({type:'SET_FONT',payload:data});
           Toast.show({
        text: "تم حفظ التغيرات بنجاح",
        buttonText: "موافق",
        style: {
          flexDirection: "row-reverse",
        },
        position: "bottom",
        textStyle: {
          fontFamily: app.fontName,
          textAlign: "right",
        },
        duration: 1500,
      });
        }catch(err){
          alert('error')
        }
      setIsLoading(false);
    } 
	return <Container>
      <Header noShadow style={{ backgroundColor: theme.PRIMARY }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <LeftArrowIOS color={theme.BG} size={24} />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              fontFamily: app.fontName,
              color: theme.BG,
            }}
          >
          الخطوط
          </Title>
        </Body>
        <Right />
      </Header>
         <Content style={{
          backgroundColor: theme.BG,
         }}>
          {isLoading && <LoadingComponent PRIMARY={theme.PRIMARY} />}
           <List
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <Separator style={{
            backgroundColor:theme.BG
          }}>
            <Text style={{
              color:theme.PRIMARY_TEXT,
              fontSize:17,
              fontFamily:app.fontName
            }}>
               خط المصحف
            </Text>
          </Separator>
          <ListItem
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:theme.SECONDARY_BG,

            }}
          ><Button
              style={{
                backgroundColor: theme.PRIMARY,
              }}
              
            >
              <Picker
                itemTextStyle={{
                  fontFamily: app.fontFamily,
                  textAlign: "right",
                }}
                headerStyle={{
                  backgroundColor: theme.PRIMARY,
                }}
                headerTitleStyle={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: app.fontFamily,
                }}
                headerBackButtonText={"عودة"}
                headerBackButtonTextStyle={{
                  color: theme.BG,
                  fontFamily: app.fontFamily,
                }}
                iosHeader={"اختر خط"}
                mode="dropdown"
                selectedValue={selectedQuran}
                onValueChange={onValueChange1}
              >
                {fonts.map((item, index) => {
                  return (
                    <Picker.Item
                      key={item.id}
                      label={item.name}
                      value={index}
                    />
                  );
                })}
              </Picker>
            </Button>
          </ListItem>
          <Separator style={{
            backgroundColor:theme.BG,
            padding:5,
            justifyContent:'center',
          }}>
            <Text style={{
              color:theme.PRIMARY_TEXT,
              fontSize:25,
              fontFamily:fonts[selectedQuran].fontName,
              textAlign:'center'
            }}>
              الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
            </Text>
          </Separator>
           <Separator style={{
            backgroundColor:theme.BG
          }}>
            <Text style={{
              color:theme.PRIMARY_TEXT,
              fontSize:17,
              fontFamily:app.fontName
            }}>
               خط التطبيق
            </Text>
          </Separator>
          <ListItem
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:theme.SECONDARY_BG
            }}
          >

            <Button
              style={{
                backgroundColor: theme.PRIMARY,
                
              }}
              
            >
              <Picker
                style={{
                  flex:1
                }}
                itemTextStyle={{
                  fontFamily: app.fontFamily,
                  textAlign: "right",
                }}
                headerStyle={{
                  backgroundColor: theme.PRIMARY,
                }}
                headerTitleStyle={{
                  color: theme.PRIMARY_TEXT,
                  fontFamily: app.fontFamily,
                }}
                headerBackButtonText={"عودة"}
                headerBackButtonTextStyle={{
                  color: theme.BG,
                  fontFamily: app.fontFamily,
                }}
                iosHeader={"اختر خط"}
                mode="dropdown"
                selectedValue={selectedApp}
                onValueChange={onValueChange2}
              >
                {fonts.map((item, index) => {
                  return (
                    <Picker.Item
                      key={item.id}
                      label={item.name}
                      value={index}
                    />
                  );
                })}
              </Picker>
            </Button>
          </ListItem>
          <Separator style={{
            backgroundColor:theme.BG,
            padding:5,
            justifyContent:'center',
          }}>
            <Text style={{
              color:theme.PRIMARY_TEXT,
              fontSize:25,
              fontFamily:fonts[selectedApp].fontName,
              textAlign:'center'
            }}>
              الظلال أخفى القمر.

            </Text>
          </Separator>
        </List>
         </Content>
            <Button
        onPress={() =>
          setFont()
        }
        disabled={
          selectedApp === app.id &&
          selectedQuran === quran.id 
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
            fontFamily: app.fontName,
            fontSize: 20,
          }}
        >
          حفظ
        </Text>
      </Button>
      </Container>
}

export default FonrScreen;