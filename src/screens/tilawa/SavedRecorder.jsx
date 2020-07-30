import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {loadRecords} from '../../store/actions';
import {Spinner,Accordion} from 'native-base';
import { Audio } from "expo-av";
import moment from 'moment'
import RecordPlayer from './RecordPlayer';
const _getMMSSFromMillis=(millis)=> {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

const SavedRecorders = ({theme,font})=>{
  const records = useSelector(state => state.records);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRecords());
  },[]);
  
  const renderContent = (item: ArrayContent)=>{
        return <View style={{
	    	marginHorizontal:15,
	    	marginBottom:10,
	    	padding:10,
        backgroundColor:theme.BG
	    }}>
        <RecordPlayer font={font} id={item.id} theme={theme} url={item.url} length={item.length} />
        </View>
  }
  const renderHeader= (item: ArrayContent)=>{
        return <View style={{
	    	marginHorizontal:10,
	    	marginVertical:5,
	    	borderRadius:5,
	    	backgroundColor:theme.SECONDARY_BG,
	    	padding:10,
	    	 shadowColor: theme.PRIMARY_TEXT,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
	    }}>
        <View>
            <Text numberOfLines={1} style={{
            	fontSize:17,
            	fontFamily:font.app.fontName,
            	fontWeight:'400',
              color:theme.PRIMARY_TEXT
            }}>
            	{item.name}
            </Text>
            </View>
            <View style={{
            	flexDirection:'row',
            	justifyContent:'space-between'
            }}>
            <Text style={{
            	color:theme.SECONDARY_TEXT,
            	fontFamily:font.app.fontName
            }}>{moment(item.date).startOf('minutes').fromNow()}
            </Text>
            <Text style={{
            	color:theme.SECONDARY_TEXT,
            	fontFamily:font.app.fontName
            }}>{_getMMSSFromMillis(item.length)}</Text>         	
            </View>
        </View>
  }
  if(records.length && records[0] == 'waiting'){
  	 return <View style={{flex:1}}><Spinner color={theme.Primary} />
	</View>
  }
	return <View style={{flex:1,backgroundColor:theme.BG}}>
	      <Accordion 
	      dataArray={records}
	        renderContent={renderContent}
	        renderHeader={renderHeader}
	        />
	</View>
}
export default SavedRecorders;