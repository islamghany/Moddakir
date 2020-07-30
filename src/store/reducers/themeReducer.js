import  {Themes} from '../../utils/THEMES';
import FONTS from '../../utils/FONTS'
export const themeReducer= (state=Themes[0],action)=>{
     switch(action.type){
     	case 'SET_THEME':
     	  return action.payload;
     	default: return state;  
     }
}
export const fontReducer= (state={
	quran:FONTS[2],
	app:FONTS[1]
},action)=>{
     switch(action.type){
     	case 'SET_FONT':
     	  return action.payload;
     	default: return state;  
     }
}