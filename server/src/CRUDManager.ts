export default class CRUDManager {
	private dbPath: string = 'db/data.db';
	private dbTable: string = 'locations';
	private db = null;

	constructor() {}

	private connectDB(): void {
		try {
			// Importing SQLite3 to our project.
			const sqlite3 = require('sqlite3').verbose();
			// Setting up a database for storing data.
			this.db = new sqlite3.Database(this.dbPath);
		} catch (err) {
			console.log(err);
		}
	}

	create(user: string, gps: string, images: string, tags: string, title: string, content: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.connectDB();
			this.db.run(
				`INSERT INTO ${this
					.dbTable} (user, gps, images, tags, title, content, date) VALUES("${user}", "${gps}", "${images}", "${tags}", "${title}", "${content}", "${Date.now()}" )`,
				(err: any) => {
					if (err) {
						console.log(err);
						reject(false);
					}
					resolve(true);
				}
			);
			this.db.close();
		});
	}

	update(id: number, user: string, gps: string, images: string, tags: string, title: string, content: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.connectDB();
			this.db.run(
				`UPDATE ${this.dbTable} SET gps="${gps}", images="${images}", tags="${tags}", title=" ${title}", content="${content}" WHERE id=" ${id}"`,
				(err: any) => {
					if (err) {
						console.log(err);
						reject(false);
					}
					resolve(true);
				}
			);
			this.db.close();
		});
	}

	readAll(): Promise<string> {
		return new Promise((resolve, reject) => {
			this.connectDB();
			this.db.all(`SELECT * FROM  ${this.dbTable}`, (err: any, res: any) => {
				if (err) {
					console.log(err);
					reject('Read err!');
				}
				resolve(res);
			});
			this.db.close();
		});
	}

	readOne(id: number): Promise<string> {
		return new Promise((resolve, reject) => {
			this.connectDB();
			this.db.get(`SELECT * FROM ${this.dbTable} WHERE id=${id}`, (err: any, res: any) => {
				if (err) {
					console.log(err);
					reject('Read err!');
				}
				resolve(res);
			});
			this.db.close();
		});
	}

	delete(id: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.connectDB();
			this.db.run(`DELETE FROM  ${this.dbTable} WHERE id=${id}`, (err: any) => {
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
