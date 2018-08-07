import { Api, PathItemObject, ParameterObject, PathOperation, MediaTypeObject } from "../api/Api";
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from "constants";
import ExtApi, { IEndpoint, METHODS, IParameter, ILocation, IResponse, ISchema } from "../api/ExtApi";
import { schemaToInterface, generateEndpoints, extractEnum } from "./util";


export type Property = {
  name: string,
  type: string,
  required: boolean,
  in?: string,
  example?: string,
}
export type SchemaInterface = {
  name: string;
  extends?: string;
  properties?: Array<Property>,
};
export type ParamInterface = {
  name: string;
  properties?: Array<Property>,
};






export default class TransformerService{
	constructor(){
    this.extractSchemaInterfaces = this.extractSchemaInterfaces.bind(this);	
    this.extractEndpoints = this.extractEndpoints.bind(this);	
  }
  async extractSchemaInterfaces(api: Api) : Promise<Array<SchemaInterface>>{
    let parametersReferences = Object.keys(api.components.schemas).map(k => {
      let schema =  (<any>api.components.schemas)[k];
      let ret: SchemaInterface = {name: `I${k}`};
      if (schema.allOf && schema.allOf.length>0){
        ret.extends =  schema.allOf.map( (ext: any) => {return `I${ext.$ref.split('/').reverse()[0]}`}).join(', ');
      }
      if (schema.properties){
        ret.properties = Object.keys(schema.properties).map(prop => schemaToInterface(schema, prop))
      }else if (schema.type){
        //console.log(ref.type);
        throw new Error('not implemented');
      }else if(schema.$ref){
        //console.log(ref.$ref);
        throw new Error('not implemented');
      }
      return ret;
    });
    return Promise.resolve(parametersReferences);
  }

  async extractParamsInterfaces(api: Api) : Promise<Array<ParamInterface>>{
    let parametersReferences = Object.keys(api.components.parameters).map(k => {
      
      let paramSpec =  (<any>api.components.parameters)[k];
      let ret: ParamInterface = {name: `I${k}`};
      let schema = paramSpec.schema;
      if (schema.properties){
        ret.properties = Object.keys(schema.properties).map(prop => schemaToInterface(schema, prop));
      }else if (schema.type){
        let propType = schema.type;
        if (schema.enum){
          propType = extractEnum(schema.enum);
        }
        ret.properties = [{
            in: paramSpec.in,
            name: paramSpec.name, 
            type: propType, 
            required: paramSpec.required, 
            example: paramSpec.example, 
          }]
      }else if(schema.$ref){
        console.log(schema.$ref);
      }
      return ret;
    });
    return Promise.resolve(parametersReferences);
  }

  async extractEndpoints(api: Api) : Promise<ExtApi>{
    let schemas = await this.extractSchemaInterfaces(api);
    let params = await this.extractParamsInterfaces( api);
    let endpoints: Array<IEndpoint> = Object.keys(api.paths).reduce( 
        (prev: Array<IEndpoint> , key: string) =>{
            return prev.concat(generateEndpoints(key, <PathItemObject>(<any>api.paths)[key], api));
        }, []
    );
    return Promise.resolve(<ExtApi> {...api, endpoints: endpoints, params, schemas});
}
  
  
}
