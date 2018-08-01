import { Api } from '../api/Api'
import yaml from 'js-yaml';
export default class ApiParser{
	constructor(){
		this.extractReference = this.extractReference.bind(this);
		this.parse = this.parse.bind(this);
	}
	
	
	async extractReference(api: Api) : Promise<Api>{
		const digReference = function(path: Array<string>, context: Api): any{
			let ret: any = context;
			while(path.length>0){
				ret = ret[path.shift() || 0];//remove # char from reference path
			} 
			return ret;
		}
		let self = this;
		function iterObj(obj: any, context: Api){
			let ret: any = {};
			if (typeof obj != "object"){
				return obj;
			}
			for (var key in obj) {
				if (obj.hasOwnProperty(key)){
					if (key==='$ref'){
						let refPath = obj['$ref'].split('/');
				  		refPath.shift(); 
						ret = digReference(refPath, api);
						ret.originalRef = obj['$ref'];
					}else if (obj[key] !== null && typeof obj[key] == "string") {
						ret[key] = <string> obj[key];
					}else if (obj[key] !== null && Array.isArray(obj[key])) {
						ret[key] = obj[key].map((item: any) => iterObj(item, api));
					}else if (obj[key] !== null && typeof obj[key] == "object") {
						ret[key] = iterObj(obj[key], api);
					}else{
						ret[key] = obj[key];
					}
				}
			}
			return ret;
		}
		let ret = iterObj(api, api);
		return ret;
	}
	async parse(source: string) : Promise<Api>{
		let api = <Api> yaml.safeLoad(source);
		return api;
	}

	
}