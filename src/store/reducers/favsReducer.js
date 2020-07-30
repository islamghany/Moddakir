
export default (state = {
	numberInSurah:1,
    surahNumber:1,
    name:'سورة الفاتحة',
    juz:1,
    page:1,
    numberInQuran:1,
    notReady:true,
}, action) => {
  switch (action.type) {
    case 'SET_AYAY_STOP':     
      return action.payload;
    default:
      return state;
  }
};