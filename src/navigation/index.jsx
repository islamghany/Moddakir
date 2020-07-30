import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import QuranScreen from '../screens/quran/'
import AyahsWithPages from '../screens/quran/AyahsWithPages.jsx'

import SettingsScreen from '../screens/settings/'
import FontScreen from '../screens/settings/FontsSetting'
import Stream from '../screens/stream'
import DoaaScreen from '../screens/Doaa/'
import AzkarScreen from '../screens/Doaa/AzkarScreen.jsx'
import TilawaScreen from '../screens/tilawa/'
import React from 'react'
import {AsyncStorage} from 'react-native';

import {useSelector} from 'react-redux';
import {Quran,Doaa,Mic,Settings,Radio} from '../assets/icons';
import SearchModal from '../screens/quran/SearchModal'
import Ayahs from '../screens/quran/Ayahs' ;
import RecorderScreen from '../screens/tilawa/RecorderScreen';
import NotificationScreen from '../screens/settings/NotificationsScreen';
import ThemeScreen from '../screens/settings/ThemeScreen'

import {isInit,init,safeOne,cancelAll,cancelNotification,setNotification,askForPermission} from '../utils/notification.js'
import azkar from '../store/azkar.js'
import moment from "moment";

import Constants from 'expo-constants';
const Tabs = createBottomTabNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const ModalStack = createStackNavigator();

const BottomTabs=()=>{
	const theme=useSelector(state=>state.theme)
  const font = useSelector(state=>state.font);
	return <Tabs.Navigator  tabBarOptions={{
		activeTintColor:theme.PRIMARY,
		inactiveTintColor:theme.SECONDARY_TEXT,
		labelStyle:{
			fontFamily:font.app.fontName,
		},
		tabStyle:{
			backgroundColor:theme.BG,
			
		}   
	}}>
   
	<Tabs.Screen name='المصحف' component={QuranScreen}options={{
	tabBarIcon:({color, size })=><Quran color={color} size={size} />
    }}
	/>
	<Tabs.Screen name='الاذكار' component={DoaaScreen} options={{
	tabBarIcon:({color, size })=><Doaa color={color} size={size} />
    }}
	/>
    <Tabs.Screen name='البث الاذاعي' component={Stream} options={{
  tabBarIcon:({color, size })=><Radio color={color} size={size} />
    }}
  />
		<Tabs.Screen name='تلاوتك' component={TilawaScreen} options={{
	tabBarIcon:({color, size })=><Mic color={color} size={size} />
    }} />
    <Tabs.Screen name='الاعدادات' component={SettingsScreen}  options={{
  tabBarIcon:({color, size })=><Settings color={color} size={size} />
    }}
  />
	
	</Tabs.Navigator>
}
const MainStackComp = ()=>{
	return <MainStack.Navigator>
	  <MainStack.Screen name='Tab' options={{headerShown:false}} component={BottomTabs} />
	  <MainStack.Screen name='Ayahs' options={{headerShown:false}} component={Ayahs} />
	  <MainStack.Screen name='Azkar' options={{headerShown:false}} component={AzkarScreen} />
	  <MainStack.Screen name='Record' options={{headerShown:false}} component={RecorderScreen} />
	  <MainStack.Screen name='Notification' options={{headerShown:false}} component={NotificationScreen} />
    <MainStack.Screen name='Theme' options={{headerShown:false}} component={ThemeScreen} />
    <MainStack.Screen name='font' options={{headerShown:false}} component={FontScreen} />

	</MainStack.Navigator>

}
const ModalComp =()=>{
return <ModalStack.Navigator>
    <ModalStack.Screen name='Search2' options={{headerShown:false}} component={SearchModal} />
    <MainStack.Screen name='Ayahs3' options={{headerShown:false}} component={Ayahs} />
  </ModalStack.Navigator>
}
const Main = ()=>{
  const check = async ()=>{
  	   try{
       const isNotificationsInitialized =await isInit();
        const isPermissionAccepted= await askForPermission();
        //await AsyncStorage.removeItem('isInit');
        //cancelAll();
       if(isPermissionAccepted){
           if(isNotificationsInitialized)return
           else{
            // console.log(true)
            // await AsyncStorage.removeItem('azkarElsbah')
            // await AsyncStorage.removeItem('elwird')
            // await AsyncStorage.removeItem('azkarElmsaa')
            // await AsyncStorage.removeItem('eltsbeh')
            //   console.log('done')
           // console.log('done')
             try{ 
                let x = await init();
                const sbah = {
                	title:'أذكار الصباح',
                	body:'اللّهُـمَّ إِنّـي أَعـوذُ بِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ.',
                	time:(new Date(moment({ hour: 7 }))).getTime(),
                	path:'azkarElsbah',
                	isEnabled:true,
                	id:null,
                 selected:15
                }
                const msaa={
                	title:'أذكار المساء',
                	body:'اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ الْمَصِيرُ.',
                	time: (new Date(moment({ hour: 20 })).getTime()),
                	path:'azkarElmsaa',
                	isEnabled:true,
                	id:null,
                  selected:12
                }
                const tsbeh={
                  title:'التسبيح',
                  body:'قَالَ صلى الله عليه وسلم مَنْ قَالَ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ فِي يَوْمٍ مِائَةَ مَرَّةٍ حُطَّتْ خَطَايَاهُ وَلَوْ كَانَتْ مِثْلَ زَبَدِ الْبَحْر.',
                  time: (new Date(moment({ hour: 11 })).getTime()),
                  path:'eltsbeh',
                  isEnabled:false,
                  id:null,
                  selected:6
                }
                const elwird ={
                  title:'الورد اليومي',
                  body:null,
                  time:(new Date(moment({ hour: 15 })).getTime()),
                  path:'elwird',
                  isEnabled:false,
                  id:null,
                  selected:0,
                  number:10
                }
               
              let y = await setNotification(sbah);
               sbah.id = y;
               let z = await setNotification(msaa);
               msaa.id=z;
               await safeOne(sbah)
               await safeOne(msaa)
               await safeOne(tsbeh)
               await safeOne(elwird)
           }catch(err){
           }

           }
       }
   }catch(err){
      alert('Failed to get push token for push notification!');
   } 
  }
React.useEffect(()=>{
	check();
},[])
	return <NavigationContainer>
	<RootStack.Navigator mode="modal">
	  <RootStack.Screen name='Main' options={{headerShown:false}} component={MainStackComp} />
      <RootStack.Screen name='Search' options={{headerShown:false}} component={ModalComp} />
	</RootStack.Navigator>
	</NavigationContainer>
}
export default Main;