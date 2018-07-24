
var Handlebars = require("handlebars");
import fs from 'fs';
import { Api } from '../api/Api'

Handlebars.registerHelper( 'tojson', function ( m: any, block: any ) {
   var out = '';
   return JSON.stringify(m);
} );    


Handlebars.registerHelper( 'translate', function ( type: string) {
  switch (type) {
  	case "integer":
  		return "number";
  	default:
  		return type;
  }
} );  


Handlebars.registerHelper( 'eachInMap', function ( m: any, block: any ) {
   var out = '';
   Object.keys( m ).map(function( prop ) {
      out += block.fn( {key: prop, value: m[ prop ]} );
   });
   return out;
} );  

Handlebars.registerHelper('extractSchema', function(obj: any, context: any) {
	if (obj){
		return context.fn(extractSchema(obj, context));
	}else{
		return context.fn({});
	}
});

function extractSchema(obj: any, context: any) {
	if (obj && obj.content){
		let schema = obj.content['application/json'].schema;
		if (schema['$ref']){
			let refPath = schema['$ref'].split('/');
			refPath.shift(); 
			let data = context.data.root[refPath[0]][refPath[1]][refPath[2]];
			schema = data;
		}
		return schema;
	}else{
		return {properties:{}};
	}
}
Handlebars.registerHelper('extractResponses', function(obj: any, context: any) {
	if (obj){
		let responses = Object.keys(obj).map((k)=> Object.assign({},obj[k],
																{code:k}, 
																{schema: extractSchema(obj[k],context)}));
		//console.log(responses);
		return context.fn({responses: responses});
	}else{
		return context.fn(obj);
	}
});


export enum TemplateKey{
	SERVICE = 'service', 
	INTERFACE = 'interface',
	METHOD = 'method',
	README = 'readme'
}

export interface Generated{
	interfaces: Array<string>;
}

export default class GeneratorService{
	private templates: Map<TemplateKey, Function >;
	constructor(){
		this.templates = new Map();
		this.loadTemplates();
		this.generateService = this.generateService.bind(this);
	}
	loadTemplates(){ 
		/*this.templates.set(TemplateKey.INTERFACE, 
			Handlebars.compile(fs.readFileSync(__dirname+'/../../templates/interface.hbs', 'utf8')) );
		Handlebars.registerPartial(TemplateKey.INTERFACE.valueOf(), this.templates.get(TemplateKey.INTERFACE) );

		this.templates.set(TemplateKey.METHOD, 
			Handlebars.compile(fs.readFileSync(__dirname+'/../../templates/method.hbs', 'utf8')) );
		Handlebars.registerPartial(TemplateKey.METHOD.valueOf(), this.templates.get(TemplateKey.METHOD) );
		*/
		const registerTemplate = (temp: TemplateKey) => {
			console.log('registeing', temp);
			this.templates.set(temp, 
				Handlebars.compile(fs.readFileSync(__dirname + `/../../templates/${temp.valueOf()}.hbs`, 'utf8')) );
			Handlebars.registerPartial(temp.valueOf(), this.templates.get(temp) );
		}

		[	TemplateKey.SERVICE, 
			TemplateKey.README
		].map( t => registerTemplate(t));
	}


	async generateService(spec: Api): Promise<string>{
		const ret =  ( this.templates.get(TemplateKey.SERVICE) || function(){return '';} ) (spec);
		return ret;
	}

}
