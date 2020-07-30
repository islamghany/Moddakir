import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('records.db');

export const init = ()=>{
	const promise = new Promise((resolve,reject)=>{
		db.transaction(tx=>{
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY NOT NULL,url TEXT NOT NULL, name TEXT NOT NULL, length REAL NOT NULL,date TEXT NOT NULL );',
				[],
				()=>{
					resolve();
				},
				(_,err)=>{
					reject(err);
				}
			);	
		});
	});
		return promise;
}

export const insertRecord = (name,url,length,date)=>{
	const promise = new Promise((resolve,reject)=>{
		db.transaction(tx=>{
			tx.executeSql(
				'INSERT INTO records ( name, url , length ,date ) VALUES (?, ?, ? ,?);',
				[name,url,length,date],
				(_, result)=>{
					resolve(result);
				},
				(_,err)=>{
					reject(err);
				}
			);	
		});
	});
		return promise;
}

export const deleteRecord = (id)=>{
	const promise = new Promise((resolve,reject)=>{
		db.transaction(tx=>{
			tx.executeSql(
				'delete from  records where id= ?;',
				[id],
				(_, result)=>{
					resolve(result);
				},
				(_,err)=>{
					reject(err);
				}
			);	
		});
	});
		return promise;
}

export const fetchRecords = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM records',
            [],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};