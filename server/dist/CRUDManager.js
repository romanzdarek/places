"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CRUDManager {
    constructor() {
        this.dbPath = 'db/data.db';
        this.dbTable = 'locations';
        this.db = null;
    }
    connectDB() {
        try {
            // Importing SQLite3 to our project.
            const sqlite3 = require('sqlite3').verbose();
            // Setting up a database for storing data.
            this.db = new sqlite3.Database(this.dbPath);
        }
        catch (err) {
            console.log(err);
        }
    }
    create(user, gps, images, tags, title, content) {
        return new Promise((resolve, reject) => {
            this.connectDB();
            this.db.run(`INSERT INTO ${this
                .dbTable} (user, gps, images, tags, title, content, date) VALUES("${user}", "${gps}", "${images}", "${tags}", "${title}", "${content}", "${Date.now()}" )`, (err) => {
                if (err) {
                    console.log(err);
                    reject(false);
                }
                resolve(true);
            });
            this.db.close();
        });
    }
    update(id, user, gps, images, tags, title, content) {
        return new Promise((resolve, reject) => {
            this.connectDB();
            this.db.run(`UPDATE ${this.dbTable} SET gps="${gps}", images="${images}", tags="${tags}", title="${title}", content="${content}" WHERE id="${id}"`, (err) => {
                if (err) {
                    console.log(err);
                    reject(false);
                }
                resolve(true);
            });
            this.db.close();
        });
    }
    readAll() {
        return new Promise((resolve, reject) => {
            this.connectDB();
            this.db.all(`SELECT * FROM  ${this.dbTable}`, (err, res) => {
                if (err) {
                    console.log(err);
                    reject('Read err!');
                }
                resolve(res);
            });
            this.db.close();
        });
    }
    readOne(id) {
        return new Promise((resolve, reject) => {
            this.connectDB();
            this.db.get(`SELECT * FROM ${this.dbTable} WHERE id=${id}`, (err, res) => {
                if (err) {
                    console.log(err);
                    reject('Read err!');
                }
                resolve(res);
            });
            this.db.close();
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this.connectDB();
            this.db.run(`DELETE FROM  ${this.dbTable} WHERE id=${id}`, (err) => {
                if (err) {
                    console.log(err);
                    reject(false);
                }
                resolve(true);
            });
            this.db.close();
        });
    }
}
exports.default = CRUDManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1JVRE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ1JVRE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFxQixXQUFXO0lBSy9CO1FBSlEsV0FBTSxHQUFXLFlBQVksQ0FBQztRQUM5QixZQUFPLEdBQVcsV0FBVyxDQUFDO1FBQzlCLE9BQUUsR0FBRyxJQUFJLENBQUM7SUFFSCxDQUFDO0lBRVIsU0FBUztRQUNoQixJQUFJO1lBQ0gsb0NBQW9DO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QywwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO0lBQ0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsR0FBVyxFQUFFLE1BQWMsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLE9BQWU7UUFDN0YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQ1YsZUFBZSxJQUFJO2lCQUNqQixPQUFPLDREQUE0RCxJQUFJLE9BQU8sR0FBRyxPQUFPLE1BQU0sT0FBTyxJQUFJLE9BQU8sS0FBSyxPQUFPLE9BQU8sT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFDM0osQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDWixJQUFJLEdBQUcsRUFBRTtvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixNQUFNLENBQUMs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