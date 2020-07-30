import React,{useState,useEffect} from 'react';
import {TextInput,StyleSheet,View,Text} from 'react-native';
import {Search} from '../assets/icons/';
import {useDispatch} from 'react-redux';
let timer;
const Input = ({
	InputComponent=TextInput,
	containerStyle,
	inputStyle,
	label,
	labelStyle,
	disabled,
	inputContainerStyle,
	errorMessage,
	RightIcon,
	rightIconProps,
	LeftIcon,
	leftIconProps,
	onFocusColor,
	onChangeText,
	type,
	theme,
	...props
})=>{
	const dispatch = useDispatch();
	
	 const filters = (text) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch({
            	type:type,
            	payload:text
            })
    }, 500);
  };
	return <View style={StyleSheet.flatten([styles.container,containerStyle,{backgroundColor:theme.PRIMARY,
}])}>
		<View style={StyleSheet.flatten([
			styles.inputContainer,
			inputContainerStyle,
             {backgroundColor:theme.SECONDARY_BG}
			])}>
		
			<InputComponent 
			style={StyleSheet.flatten([
				styles.input,
				inputStyle,
				disabled && styles.disabledInput,

				])}
			onChangeText={text=>filters(text)}
			underlineColorAndroid="transparent"
			autoCapitalize="none"
            editable={!disabled}
            {...props}
			/>
			<View style={styles.iconContainer}>
				     <Search size={24} color={theme.PRIMARY}/>
				</View>		
		</View>
		{errorMessage && <Text style={styles.error}>
				{errorMessage}
			</Text>}
	</View>
}
const styles=StyleSheet.create({
	container:{
	  width: '100%',
      paddingHorizontal: 15,
      paddingVertical:5
     
	},
	error:{
        margin: 5,
       fontSize: 12,
       color:'red'
	},
	disabledInput:{
		opacity:.5
	},
	iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
    marginVertical: 2,
  },
  onFocusStyle:(isFocused,onFocusColor)=>({
  	 borderColor: isFocused ? onFocusColor:'#C9C9C9'
  	}),
	inputContainer:{
		flexDirection: 'row',
	       
         borderRadius:5,
	    alignItems: 'center',
	   
		},
	input:{
	alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    flex: 1,
    minHeight: 40,
	},
	label:{
		fontSize:16,
		fontWeight:'400',
		textTransform:'capitalize'
	}
})
export default Input;