import React,{useEffect} from 'react'
import {View,Text,FlatList,TouchableHighlight,Platform,TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import {Button} from 'native-base';
import {useSelector,useDispatch} from 'react-redux';
//import {Search,Heart,HeartFill,RightArrowIOS} from '../../assets/icons/'
const StreamItem = ({item,font,theme,onPress})=>{
	  const MainButton =
      Platform.OS === "ios"
        ? TouchableHighlight
        : Platform.OS === "web"
        ? TouchableOpacity
        : TouchableNativeFeedback;
        
  return <MainButton
          onPress={()=>onPress(item)}
          activeOpacity={0.8}
          underlayColor={theme.SECONDARY_BG}>
          <View style={{
  	padding:10,
  	borderBottomWidth:1,
  	borderColor:theme.SECONDARY_BG,
  }}>
  	<Text style={{
  		textAlign:'right',
  		fontSize:17,
  		color:theme.PRIMARY_TEXT,
  		fontFamily: font.app.fontName,
  	}}>{item.Name}</Text>
  </View>
  </MainButton>
}
const RenderStreams = ({font,theme})=>{
	const dispatch = useDispatch();
   const streams = useSelector(state=>state.streams);
  const onPress=(item)=>{
     dispatch({
     	type:'CHANGE_READER',
     	payload:item
     })
   }
   return <FlatList 
           data={streams}
           keyExtractor={(item=>item.URL)}
           renderItem={({item})=>{
           	return <StreamItem item={item} onPress={onPress} font={font} theme={theme} />
           }}
   />
}

const Streams = ({font,theme})=>{
	const dispatch = useDispatch();
    useEffect(()=>{
    	dispatch({type:'GET_STREAMS'})
    },[])
	return <View style={{flex:1}}>
		<RenderStreams font={font} theme={theme}/>
	</View>
}

export default Streams;