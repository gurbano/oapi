import { Api } from '../api/Api'
import yaml from 'js-yaml';
export default class ApiParser{
	constructor(){

	}
	async parse(source: string) : Promise<Api>{
		return <Api> yaml.safeLoad(source);
	}
}