import  React,{useEffect,useState} from 'react';
import { Text,  Animated, View,Image, AsyncStorage,StyleSheet,ImageBackground,Dimensions,TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import {
  Container,
  Header,
  Button,
  Body,
  Tab,
  Tabs,
  Toast,
  Left,
  Right,
  Title,
  Content
} from "native-base";
import {LinearGradient} from 'expo-linear-gradient'
import {SurahNameContiner , NumberWrapper,LeftArrowIOS,RightArrowIOS,Share,
  Help,
  Stop,
  Copy,
  Play,} from '../../assets/icons/';
const {width,height}= Dimensions.get('window');
import { useSelector, useDispatch } from "react-redux";
import AyahsWithPageList from './AyahsWithPageList.jsx';
import TafseerModal from "./TafserrModal";
import CopyToClipboard from "../../components/CopyToClipboard";
import SharingTextAsImgae from "../../components/SharingTextAsImage.jsx";
import surah from '../../store/surah';
import * as Animatable from "react-native-animatable";
import calcWird from "../../utils/caculateWhereToStop.js";

const fadeIn = {
  from: {
    opacity: 0,
    zIndex:10
  },
  to: {
    opacity: 1,
    zIndex:10,
  },
}; 
const fadeOut = {
  from: {
    opacity: 1,
    zIndex:10
  },
  to: {
    opacity: 0,
    zIndex:-1
  },
}; 

let isMounted = false;
import {
  cancelNotification,
  setNotification,
  askForPermission,
} from "../../utils/notification.js";
const AyahModal=({theme,font})=>{
	const [isSelected,setIsSelected] = useState('false');
	const dispatch = useDispatch();
	const item = useSelector(state=>state.foregroundAyah);
	const closeModal= ()=>{
         dispatch({type:'SET_FOREGROUND',payload:{}})
	}
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
        setIsSelected(data.numberInPage);
        Toast.show({
          text: "تم وضع علامة الوقوف",
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
      } catch (error) {}
    };
    useEffect(()=>{
    	isMounted=true;
    	return ()=>{
    		isMounted=false
    	}
    },[])
	return <TouchableWithoutFeedback onPress={closeModal}>
	<Animatable.View animation={item && item.number ? fadeIn : isMounted ? fadeOut : null } duration={500}  style={{
		    ...StyleSheet.absoluteFill,
		    width:width,
		    height,
		    backgroundColor:'rgba(0,0,0,.1)',	  
		    zIndex:-1,
		    opacity:0,
		    justifyContent:'center',
		    alignItems:'flex-start'
	}}>
	<View style={{
		padding:10,
		borderRadius:20,
		backgroundColor:'#fff',
		marginLeft:10,		
	}}>
      <LinearGradient
      colors={['#344675','#263148', '#344675']}
      location={[0,.5,1]}
      start={[0,0]}
      end={[1,1]}
      style={{
        width: 65,
        height: 65,
        borderRadius: 32.5,
        marginVertical:5,
      }}
      ><TafseerModal
            font={font}
            style={{
              width: 65,
              height: 65,
               borderRadius: 32.5,
              flexDirection:'column',
              
              
              
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            ayahNumber={item.ayahsNumber - item.numberInSurah}
            BG={theme.BG}
            PRIMARY_TEXT={theme.PRIMARY_TEXT}
            SECONDARY_BG={theme.SECONDARY_BG}
            surahNumber={item.surahNumber - 1}
            theme={theme}
          >
            <Help size={24} color={'#fff'} />
             <Text style={{
              fontFamily:font.app.fontName,
              textAlign:'center',
              color:'#fff',
              fontSize:14
            }}>
                تفسير 
            </Text>
          </TafseerModal>
          </LinearGradient>
            <LinearGradient
      colors={['#fd5d93','#ec250d', '#fd5d93']}
      location={[0,.5,1]}
      start={[0,0]}
      end={[1,1]}
      style={{
        width: 65,
              height: 65,
               borderRadius: 32.5,
         marginVertical:5,
      }}
      ><Button
            transparent
            onPress={() => {
              dispatch({
                type: "PLAY_AYAH",
                payload: {
                  page:item.page,
                  number: item.number,
                  name:item.name,
                  numberInSurah:item.numberInSurah,
                  ayatsNumber:item.ayahsNumber,
                  pageLength:item.pageLength,
                  numberInPage:item.numberInPage,                 
                },
              });
              closeModal();
            }}
            style={{
              width: 65,
              height: 65,
               borderRadius: 32.5,
              
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection:'column'
            }}
          >
            <Play size={24} color={'#fff'} />
            <Text style={{
              fontFamily:font.app.fontName,
              textAlign:'center',
              fontSize:14,
              color:'#fff'
            }}>
               استماع
            </Text>
          </Button>
          </LinearGradient>
          <LinearGradient
      colors={['#1d8cf8','#3358f4', '#1d8cf8']}
      location={[0,.5,1]}
      start={[0,0]}
      end={[1,1]}
      style={{
        width: 65,
        height: 65,
        borderRadius: 32.5,
        marginVertical:5,
      }}
      >
          <CopyToClipboard
            text={item.text}
            transparent
            style={{
              width: 65,
              height: 65,
              borderRadius: 32.5,
              flexDirection:'column',
              
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Copy size={24} color={'#fff'} />
            <Text style={{
              fontFamily:font.app.fontName,
              textAlign:'center',
              fontSize:14,
              color:'#fff'
            }}>
               نسخ  
            </Text>
          </CopyToClipboard>
          </LinearGradient>
          <LinearGradient
      colors={['#ff8d72','#ff6491', '#ff8d72']}
      location={[0,.5,1]}
      start={[0,0]}
      end={[1,1]}
      style={{
        width: 65,
        height: 65,
        borderRadius: 32.5,
        marginVertical:5,
      }}
      ><Button
            onPress={() => {
              if (!item.stopRead && isSelected !== item.numberInPage){
                _storeData({
                  page:item.page,
                  numberInQuran: item.number,
                  name:item.name,
                  numberInSurah:item.numberInSurah,
                  ayatsNumber:item.ayahsNumber,
                  pageLength:item.pageLength,
                  numberInPage:item.numberInPage,
                  surahNumber: item.surahNumber,
                  juz:item.juz
                });
              }
            }}
            transparent
            style={{
               width: 65,
              height: 65,
              borderRadius: 32.5,
              flexDirection:'column',
              
              backgroundColor:item.stopRead || isSelected == item.numberInPage ? theme.PRIMARY :
              'transparent',
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Stop
              size={24}
              color={item.stopRead || isSelected == item.numberInPage ? theme.SECONDARY_BG : '#fff'}
            />
             <Text style={{
              fontFamily:font.app.fontName,
              textAlign:'center',
              fontSize:14,
              color:'#fff'
            }}>
             وقف
            </Text>
          </Button>
          </LinearGradient>
          <LinearGradient
      colors={['#e14eca','#ba54f5', '#e14eca']}
      location={[0,.5,1]}
      start={[0,0]}
      end={[1,1]}
      style={{
        width: 65,
        height: 65,
        borderRadius: 32.5,
        marginVertical:5,
      }}
      >
           <SharingTextAsImgae
            name={item.name}
            number={item.numberInSurah}
            text={item.text}
            style={{
             width: 65,
        height: 65,
        borderRadius: 32.5,
              flexDirection:'column',              
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Share size={24} color={'#fff'} />
             <Text style={{
              fontFamily:font.app.fontName,
              textAlign:'center',
              fontSize:14,
              color:'#fff'
            }}>
                مشاركة 
            </Text>
          </SharingTextAsImgae>
          </LinearGradient>
	</View>
	</Animatable.View>
	</TouchableWithoutFeedback>
}

export default function App({navigation,route}) {
	 const theme = useSelector((state) => state.theme);
   const font = useSelector(state=>state.font)
	 const dispatch = useDispatch();
	 const item = route.params;
     const goBack=()=>{
     	navigation.goBack();
     }
//background-image: background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
  return (
  	<Container style={{ backgroundColor: "transparent" }}>
      <AyahModal font={font} theme={theme} /> 
      <LinearGradient 
    start={[0,0]}
    end={[1,1]}
    colors={theme.gradient}
    locations={theme.locations}
    style={{
      flex:1, 
          }}>
    <View style={styles.container}>   
      <AyahsWithPageList goBack={goBack} font={font} theme={theme} number={item.number} name={item.name} scrollTo={item.scrollTo} page={item.page} numberInPage={item.numberInPage} />
    </View>
    </LinearGradient>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});
