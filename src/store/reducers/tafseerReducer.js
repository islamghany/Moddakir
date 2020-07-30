import tafseer from '../tafseer';
import azkar from '../azkar'
export const tafseerReducer= (state={},action)=>{
	switch(action.type){
		case 'GET_TAFSEER':
		  return tafseer[action.payload.surah][action.payload.ayah];
		default : return state;
	}
}
export const  azkarReducer = (state=[],action)=>{
  switch(action.type){
		case 'GET_AZKAR':{
		  return azkar[action.payload];
		}
		default : return state;
	}
}