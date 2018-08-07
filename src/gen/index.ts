
import ExtApi, { IParameter } from '../api/ExtApi'
var Handlebars = require("handlebars");
import fs from 'fs';
import { Api } from '../api/Api'
import { SchemaInterface, ParamInterface } from '../transform';

Handlebars.registerHelper( 'tojson', function ( m: any, block: any ) {
   var out = '';
   return JSON.stringify(m);
} );    

Handlebars.registerHelper( 'eachInMap', function ( map: any, block: any ) {
  var out = '';
  Object.keys( map ).map(function( prop ) {
     out += block.fn( {key: prop, value: map[ prop ]} );
  });
  return out;
} );

Handlebars.registerHelper( 'variableType', function ( type: string) {
  switch (type) {
  	case "integer":
      return "number";
    case "array":
  		return "Array\<any\>";
  	default:
  		return type;
  }
} ); 

Handlebars.registerHelper( 'nullIfUndefined', function ( val: string) {
  if (val==undefined)return 'null';
  return val;
} ); 

Handlebars.registerHelper( 'extends', function ( val: string) {
  if (val==undefined)return '';
  return 'extends ' + val;
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
  INTERFACE_OUTPUT = 'interface_output',
  SCHEMA_INTERFACES = 'schemas',
  PARAMS_INTERFACES = 'parameters',
}


export default class GeneratorService{
  
	private templates: Map<TemplateKey, Function >;
	constructor(){
		this.templates = new Map();
		this.loadTemplates();
    this.generateService = this.generateService.bind(this);
    this.generateBaseInterfaces = this.generateBaseInterfaces.bind(this);
    this.generateParamsInterfaces = this.generateParamsInterfaces.bind(this);
	}
	loadTemplates(){ 
		const registerTemplate = (temp: TemplateKey) => {
			// console.log('registering', temp);
			this.templates.set(temp, 
				Handlebars.compile(fs.readFileSync(__dirname + `/../../templates/${temp.valueOf()}.hbs`, 'utf8')) );
			Handlebars.registerPartial(temp.valueOf(), this.templates.get(temp) );
		}

		[	TemplateKey.SERVICE, 
			TemplateKey.README,
			TemplateKey.METHOD,
      TemplateKey.INTERFACE_INPUT,
      TemplateKey.INTERFACE_OUTPUT,
      TemplateKey.SCHEMA_INTERFACES,
      TemplateKey.PARAMS_INTERFACES,
		].map( t => registerTemplate(t));
	}


	async generateService(spec: ExtApi): Promise<string>{
    //console.log(spec);
		const ret =  ( this.templates.get(TemplateKey.SERVICE) || function(){return '';} ) (spec);
		return ret;
  }
  async generateBaseInterfaces(schemas: Array<SchemaInterface>): Promise<string> {
    const ret =  ( this.templates.get(TemplateKey.SCHEMA_INTERFACES) || function(){return '';} ) ({schemas});
		return ret;
  }
  async generateParamsInterfaces(params: Array<ParamInterface>): Promise<string> {
    //console.log(params);
    const ret =  ( this.templates.get(TemplateKey.PARAMS_INTERFACES) || function(){return '';} ) ({params});
		return ret;
  }
  
}
