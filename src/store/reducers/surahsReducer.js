import quran from '../quran.js';
import quranWithPages from '../../store/quranByPages.js'

export const foregroundAyah = (state={},action)=>{
       switch(action.type){
        case 'SET_FOREGROUND':
           return action.payload;
        default : return state;  
    }
}

export const searchReducer = (state=[],action)=>{
	switch(action.type){
    	case 'MAKE_SEARCH':{
    	   let result=[];
           let name;
    	   if(action.payload.length ===0) return [];
    	   quran.map(surah=>{               
    	   	 surah.ayahs.map(ayah=>{
    	   	 	const keyword = ayah.text.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618), "g"), "");
    	   	 	if(keyword.includes(action.payload))
    	   	 		result.push({...ayah,name,number:surah.number-1,name:surah.name});
    	   	 })
    	   });
    	   return result;
    	}
    	default : return state;  
    }
}
export const quranPage = (state={},action)=>{
     switch(action.type){
        case 'CHANGE_PAGE':{
            if((state.page ===1 && action.payload === -1) || (state.page === 604 && action.payload === 1)) return state
            else if(state.page){
                return {...quranWithPages[state.page+action.payload-1],change:true,pageLength:quranWithPages[state.page+action.payload-1].ayahs.length}
            }
            else return  {...quranWithPages[action.payload],change:true,pageLength:quranWithPages[action.payload].ayahs.length}
        }
       case 'GO_PAGE':{
        return  {...quranWithPages[action.payload],pageLength:quranWithPages[action.payload].ayahs.length}
       }
       case 'PAGE_BACK': return {}
       default : return state; 
     }
}
export const currentAyah = (state={},action)=>{
    switch(action.type){
        case 'PLAY_AYAH':
          return action.payload;
         case 'CLOSE_PLAY':
           return {}; 
        default :return state;  
    }
}
export const surahsReducer =(state={},action)=>{
    switch(action.type){
    	case 'SET_SURAH':
    	   return quran[action.payload];
    	default : return state;  
    }
}