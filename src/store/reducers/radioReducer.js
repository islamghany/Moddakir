import radio from '../radio';

export const streamReducer =(state=[], action)=>{
	switch(action.type){
		case 'GET_STREAMS':{
		 if(action.payload){
		 	return radio.filter(item=>item.Name.includes(action.payload))
		 }	
		 return radio
		}
        default : return state;  
	}
}
export const isPlayingReducer =(state=false,action)=>{
	switch(action.type){
		case 'PLAYING_STATE':
          return action.payload;
        default : return state;  
	}
}

export const radioReducer = (state={},action)=>{
	switch(action.type){
		case 'CHANGE_READER':
		  return action.payload;
		default : return state;  
	}
}