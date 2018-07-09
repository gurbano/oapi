import fs from 'fs';

export default class FetchService {
	constructor() {
	}
	async fetch(path: string): Promise<string>{
		try {
		  var doc = fs.readFileSync(path, 'utf8');
		  return doc;
		} catch (e) {
		  console.log(e);
		  return '';
		}
	}
}