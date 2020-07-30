export default (state=['wating'],action)=>{
    switch(action.type){
    	case 'GET_RECORDS':
    	   return action.payload.map(record=>({
    	   	id:record.id.toString(),
    	   	name:record.name,
            url:record.url,
    	   	length:record.length,
    	   	date:record.date
    	   })).reverse();
    	case 'ADD_RECORD':
    	   return [{
    	   	id:action.payload.id.toString(),
    	   	name:action.payload.name,
    	   	length:action.payload.length,
            url:action.payload.url,
    	   	date:action.payload.date},...state];
    	case 'REMOVE_RECORD':
    	   return state.filter(record=>record.id != action.payload);      
    	default : return state;  
    }
}