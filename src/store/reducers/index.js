import {combineReducers} from 'redux';
import {surahsReducer,searchReducer,currentAyah,quranPage,foregroundAyah} from './surahsReducer';
import recordsReducer from './recordsReducer';
 import {tafseerReducer,azkarReducer} from './tafseerReducer';
 import favsReducer from './favsReducer';
 import {streamReducer,radioReducer,isPlayingReducer} from './radioReducer'
import {themeReducer,fontReducer} from './themeReducer.js'
export default combineReducers({
	 surah: surahsReducer,
	 tafseer:tafseerReducer,
	 stop:favsReducer,
	 keyword:searchReducer,
	 azkar:azkarReducer,
	 records:recordsReducer,
	 quranPage:quranPage,
	 foregroundAyah,
	 font:fontReducer,
	 channel:radioReducer,
	// filterChannels,
	streams:streamReducer,
	currentAyah,
	isPlayingState:isPlayingReducer,
	theme:themeReducer
})