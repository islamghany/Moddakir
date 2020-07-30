import surah from "../store/surah";
import juz from "../store/juz";

const calcAyahs = (number, ayahStoped, surahNumber) => {
  let numberOfAll = 0,
    flag = 0;
  if (surah[surahNumber].numberOfAyahs - ayahStoped >= number) {
    return {
      name: surah[surahNumber].name,
      ayahNumber: number + ayahStoped,
    };
  }
  numberOfAll = surah[surahNumber].numberOfAyahs - ayahStoped;

  for (let i = surahNumber + 1; i < 114; i++) {
    if (numberOfAll + surah[i].numberOfAyahs >= number) {
      return {
        name: surah[i].name,
        ayahNumber: number - numberOfAll,
      };
    }
  }
  return {
    name: "سورة الناس",
    ayahNumber: 6,
  };
};

export default (selected, stop, newData) => {
  let body;
  if(!stop || !stop.name || !stop.numberInSurah){
    stop={},
    stop.name='سورة الفاتحة',
    stop.numberInSurah=1,
    stop.juz=1,
    stop.surahNumber=1,
    stop.page=1
  }
   body = `اكمل تلاوتك من ${stop.name} الاية ${stop.numberInSurah} الجزء ${stop.juz}`;
  if (selected === 0) {
    const x = calcAyahs(
      newData.number,
      stop.numberInSurah,
      stop.surahNumber - 1
    );
    body += `الي ${x.name} - الاية ${x.ayahNumber}`;
  } else if (selected === 1) {
    body += `الي سورة ${
      stop.juz + newData.number > 30
        ? juz[29].surah
        : juz[stop.juz + newData.number].surah
    } الي الاية ${
      stop.juz + newData.number > 30
        ? juz[29].ayahNumber
        : juz[stop.juz + newData.number].ayahNumber
    }`;
  } else {
    body += `الي صفحة ${stop.page + newData.number}`;
  }
  return body;
};
