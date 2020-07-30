import React from 'react';
import {View,Dimensions,Share,Text} from 'react-native';
import {Button} from 'native-base';
import ViewShot,{captureRef} from 'react-native-view-shot';
import {LinearGradient} from 'expo-linear-gradient'
const {width} = Dimensions.get('window');
class SharingTextAsImage extends React.Component{
	 constructor(props){
    super(props);
    this.card = React.createRef();
    this.state = {snapshot:null}
   }  
   renderSnap = ()=>{
  return  (<ViewShot ref={this.card}>
    <LinearGradient colors={['#30cfd0','#330867']} location={[0,1]} start={[0,0]} end={[1,1]} style={{
         width:width,
         height:width
       }}>
       <View style={{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
         padding:10,
         paddingBottom:20,
         position:"relative"
       }}>
       <Text style={
         {fontSize:16,
         color:'#fff',
         textAlign:"center",
         fontFamily:'hfs'
         }}>{this.props.text}
       </Text>
       <View style={{position:"absolute",right:10,bottom:5}}>
       <Text style={{
         color:'#fff',
         textAlign:"right",
         fontFamily:'cairo'
       }}>
      {this.props.name} - {this.props.number}
       </Text>
       </View>
       </View>
       </LinearGradient>
    </ViewShot>)
   }
   takeSnapShot= async ()=>{
   
        if (this.card.current) {
         // console.log('hey')
    const snapshot = await captureRef(this.card, {
      result: 'data-uri',
    });
    this.setState({
      snapshot,
    });
   // console.log(snapshot)
    this.shareSnapshot();
    }
   }
   shareSnapshot = async () => {
  const {snapshot} = this.state;
  // if (snapshot) {
  //   Share.open({
  //     url: snapshot,
  //   })
  //     .then((res: any) => {
  //       console.log(res);
  //     })
  //     .catch((err: any) => {
  //       err && console.log(err);
  //     });
  // }
 try {
      const result = await Share.share({
        url:snapshot,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
};

	render(){
    return <>
    <View style={{opacity:0,zIndex:-1,position:'absolute'}}>
           {this.renderSnap()}
       </View>
    <Button onPress={this.takeSnapShot} style={this.props.style} transparent>
  {this.props.children}
	</Button>
  </>
}
}
export default SharingTextAsImage;