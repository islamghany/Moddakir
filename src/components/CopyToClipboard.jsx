import React from 'react';
import {View,Clipboard} from 'react-native';
import {Button,Toast } from 'native-base';
const CopyToClipBoard =({children,text,style})=>{
	const tackAcopy=async ()=> {
           try{
           	const res =  await Clipboard.setString(text);
           	Toast.show({
           		text:'تم النسخ بنجاح',
           		buttonText: "موافق",
              style:{
                flexDirection:'row-reverse'
              },
                position: "bottom",
                textStyle:{
                	fontFamily:'cairo',
                  textAlign:'right'
                },
                duration:1500
           	})
           	 // Toast.show({
             //    text: "Wrong password!",
             //    buttonText: "Okay",
             //    duration: 3000
             //  })
           }catch(err){
           	console.log(err);
           }
	}
	return <Button onPress={()=>tackAcopy()} style={style} transparent>
	{children}
	</Button>
}
export default CopyToClipBoard;