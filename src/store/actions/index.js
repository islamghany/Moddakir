import { insertRecord, fetchRecords, deleteRecord } from "../db";
import { Toast } from "native-base";
import * as FileSystem from "expo-file-system";

export const addRecord = (name, url, length, date) => {
  let newPath;
  return async (dispatch) => {
    const fileName = url.split("/").pop();
    newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: url,
        to: newPath,
      });
      const dbResult = await insertRecord(name, newPath, length, date);
      dispatch({
        type: "ADD_RECORD",
        payload: {
          id: dbResult.insertId,
          name: name,
          url: newPath,
          length,
          date,
        },
      });
      Toast.show({
        text: "تم حفظ التسجيل بنجاح",
        buttonText: "موافق",
        style: {
          flexDirection: "row-reverse",
        },
        position: "bottom",
        textStyle: {
          fontFamily: "cairo",
          textAlign: "right",
        },
        duration: 1500,
      });
    } catch (err) {
      alert("Unknowen error please try again later.");
    }
  };
};
export const removeRecord = (id, url) => {
  return async (dispatch) => {
    try {
      const res = await FileSystem.deleteAsync(url);
    } catch (err) {}
    try {
      const dbResult = await deleteRecord(id);
      dispatch({ type: "REMOVE_RECORD", payload: id });
      Toast.show({
        text: "لقد تم مسح التسجيل بنجاح",
        buttonText: "موافق",
        style: {
          flexDirection: "row-reverse",
        },
        position: "bottom",
        textStyle: {
          fontFamily: "cairo",
          textAlign: "right",
          fontSize: 15,
        },
        duration: 1500,
      });
    } catch (err) {
      alert("Unknowen error please try again later.");
    }
  };
};
export const loadRecords = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchRecords();
      dispatch({ type: "GET_RECORDS", payload: dbResult.rows._array });
    } catch (err) {
      alert("Unknowen error please try again later.");
    }
  };
};

export const getSurah = (number) => {
  return (dispatch) => {
    dispatch({ type: "SET_SURAH", payload: number });
  };
};
