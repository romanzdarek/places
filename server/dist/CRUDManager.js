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
            this.db.run(`UPDATE ${this.dbTable} SET gps="${gps}", images="${images}", tags="${tags}", title=" ${title}", content="${content}" WHERE id=" ${id}"`, (err) => {
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