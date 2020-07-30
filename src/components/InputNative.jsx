import React from 'react';
import {Input} from 'native-base'
import {useDispatch} from 'react-redux';
let timer;

const InputNative = ({theme,type})=>{
		const dispatch = useDispatch();
	
	 const filters = (text) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch({
            	type,
            	payload:text
            })
    }, 500);
  };
	return <Input placeholder="ابحث" style={{
            	textAlign:'right',
                color:theme.PRIMARY_TEXT,
                fontFamily:'cairo',
                fontSize:14,   
            }}
            onChangeText={text=>filters(text)}
             />
}
export default InputNative;