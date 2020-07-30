import * as Animatable from 'react-native-animatable';
import React,{useEffect,useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {Audio} from 'expo-av';
import {useSelector,useDispatch} from 'react-redux';
import {Play,Pause} from '../../assets/icons/'

let timer;
const StreamPlayer = ({font,theme})=>{
   //const soundObject = new Audio.Sound();
	const dispatch = useDispatch();
	const channel = useSelector(state=>state.channel);
	//const [isPlaying,setIsPlaying] = useState(false)
	const [isBuffering,setIsBuffering] = useState(false)
    const [playbackInstance,setPlaybackInstance] =useState(null);
    const isPlayingState= useSelector(state=>state.isPlayingState)
     const initilizingAudio = async ()=>{
     		 try {
		   await Audio.setAudioModeAsync({
		    allowsRecordingIOS: false,
		    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		    playsInSilentModeIOS: true,
		    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
		    shouldDuckAndroid: true,
		    staysActiveInBackground: true,
		    playThroughEarpieceAndroid: true
		   })
		  // loadAudio();
		}catch(err){
			alert('something went wrong')
		}
     }
     const loadAudio = async ()=>{
     	 try {
		  const playbackInstance = new Audio.Sound()
		  const source = {
		   uri:channel.URL
		  }
		 
		  const status = {
		   shouldPlay: true,
		  }
		 
		  //playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)   
		  await playbackInstance.loadAsync(source, status, false)
		  //setIsPlaying(true)
		  dispatch({
		  	type:'PLAYING_STATE',
		  	payload:true
		  })
		  setPlaybackInstance(playbackInstance)
		  } catch (e) {
		   alert('check your internet connection')
		  }
     }
    const onPlaybackStatusUpdate = status => {
      setIsBuffering(status.isBuffering)
  }
  const handleNewChannel=async()=>{
  	if (playbackInstance) {
  		try{
  	  await playbackInstance.unloadAsync();
        }catch(err){
        	 alert('check your internet connection')
        }  
    }
     loadAudio()
  }
 
 const handleRep=()=>{
  	if(timer){
  		clearTimeout(timer);
  	}
  	timer=setTimeout(()=>{
  		handleNewChannel();
  	},100);
  }
useEffect(()=>{
	if(channel.URL)
     handleRep();
},[channel.URL])
const handlePlayPause = async () => {
  isPlayingState ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
  //setIsPlaying(e=>!e);
   dispatch({
		  	type:'PLAYING_STATE',
		  	payload:!isPlayingState
		  })
 }
     useEffect(()=>{
        initilizingAudio();
     },[]);
     useEffect(()=>{
         (async ()=>{
         	if(!isPlayingState && playbackInstance){
            await playbackInstance.pauseAsync()
            }
         })();
     },[isPlayingState])

     return <View>{channel && channel.Name ? <Animatable.View animation="slideInUp" style={{
		 	backgroundColor:theme.PRIMARY,
		 	flexDirection:'row',
		 	justifyContent:'space-between',
		 	alignItems:'center'
		 }}>
		  <TouchableOpacity onPress={handlePlayPause} style={{
		  	padding:10
		  }}>
		  {isPlayingState ?<Pause color={theme.BG} size={30} /> :<Play color={theme.BG} size={30} />}
		  </TouchableOpacity>
		  <Text style={{textAlign:'right',color:theme.BG,paddingRight:20}}>{channel.Name}</Text>
		 </Animatable.View>:null}</View>
}
export default StreamPlayer;