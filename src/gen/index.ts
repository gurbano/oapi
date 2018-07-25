
import {IParameter} from '../api/ExtApi'
var Handlebars = require("handlebars");
import fs from 'fs';
import { Api } from '../api/Api'

Handlebars.registerHelper( 'tojson', function ( m: any, block: any ) {
   var out = '';
   return JSON.stringify(m);
} );    


Handlebars.registerHelper( 'variableType', function ( type: string) {
  switch (type) {
  	case "integer":
  		return "number";
  	default:
  		return type;
  }
} ); 

Handlebars.registerHelper('variableName', function(obj: IParameter) {
    if (!obj.required) {
        return new Handlebars.SafeString(`${obj.name}?`);
    }
    else {
		return new Handlebars.SafeString(`${obj.name}`);
    }
});
export enum TemplateKey{
	SERVICE = 'service', 
	METHOD = 'method',
	README = 'readme',
	INTERFACE_INPUT = 'interface_input',
	PARAMETER = 'parameter',
}


export default class GeneratorService{
	private templates: Map<TemplateKey, Function >;
	constructor(){
		this.templates = new Map();
		this.loadTemplates();
		this.generateService = this.generateService.bind(this);
	}
	loadTemplates(){ 
		const registerTemplate = (temp: TemplateKey) => {
			console.log('registeing', temp);
			this.templates.set(temp, 
				Handlebars.compile(fs.readFileSync(__dirname + `/../../templates/${temp.valueOf()}.hbs`, 'utf8')) );
			Handlebars.registerPartial(temp.valueOf(), this.templates.get(temp) );
		}

		[	TemplateKey.SERVICE, 
			TemplateKey.README,
			TemplateKey.METHOD,
			TemplateKey.INTERFACE_INPUT,
			TemplateKey.PARAMETER
		].map( t => registerTemplate(t));
	}


	async generateService(spec: Api): Promise<string>{
		const ret =  ( this.templates.get(TemplateKey.SERVICE) || function(){return '';} ) (spec);
		return ret;
	}

}
