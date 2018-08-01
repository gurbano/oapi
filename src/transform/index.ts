import ExtApi, { ILocation, METHODS, IEndpoint, IParameter, ISchema, IResponse, IResponseParameters } from "../api/ExtApi";
import { Api, PathItemObject, ParameterObject, PathOperation, ParameterLocation, MediaTypeObject, ResponseObject } from "../api/Api";

//TODO:
// EXTRACT PARAMS FROM SCHEMA
//      https://tools.ietf.org/html/draft-wright-json-schema-00
const generateEndpoints = (url: string, spec: PathItemObject): Array<IEndpoint> => {
    const globalParams : Array<ParameterObject> = spec.parameters || [];
    return Object.keys(spec)
                .filter( a => METHODS[<any>a]!=undefined )
                .map( method => generateEndpoint(url, method, globalParams, (<any>spec)[method]))
}

const transformParameter = (gp: ParameterObject): IParameter => {
    let schema = <ISchema>{};
    let mediaType = '';
    if (gp.content){
        //extract schema from content
        // content: A map containing the representations for the parameter. 
        // The key is the media type and the value describes it. The map MUST only contain one entry.
        let mto = <MediaTypeObject>(<any>gp.content)[Object.keys(gp.content)[0]];
        schema = <ISchema>mto.schema || {type: undefined};
        mediaType = Object.keys(gp.content)[0];
    }else if (gp.schema){
        schema = <ISchema>gp.schema;
    }
    let ret =  { 
        name: gp.name, 
        location: gp.in , 
        description: (gp.description || '!!desctiption missing!!!'),
        schema: JSON.stringify(schema),
        mediaType: mediaType,
        type: schema.type || 'any',
        required: gp.required || true,
        example: gp.example || '',
    };
    return ret;
}

const extractRequestParameters = (spec: PathOperation): Array<IParameter> => {
      if (spec.requestBody){
          let mto = <MediaTypeObject>(<any>spec.requestBody.content)[Object.keys(spec.requestBody.content)[0]];
          let schema = mto.schema || {};
          let mediaType = Object.keys(spec.requestBody.content)[0];
          if (schema && schema.properties){
              let required = schema.required || [];
              return Object.keys(schema.properties).map(
                  (prop: string) => {
                      let propSchema=  schema.properties[prop];
                      return { 
                          name: prop, 
                          location: (<any>ILocation.BODY) , 
                          description: propSchema.description,
                          schema: JSON.stringify(propSchema),
                          type: propSchema.type,          
                          mediaType: mediaType,
                          source: 'body',
                          required: required.indexOf(prop) > -1,
                          example: propSchema.example,
                      }
                  }
              )
          }else{
            return [];
          }
      }else{
        return [];
      }
}


const extractResponse = (code: string, respObj: ResponseObject): IResponse => {
  let ret = {};
  let mto: MediaTypeObject = {schema: {}};
  if (respObj.content){
    mto = <MediaTypeObject>(<any>respObj.content)[Object.keys(respObj.content)[0]];
    let mediaType = (Object.keys(respObj.content)|| ['???'])[0];
    let schema = mto.schema || {properties: []};
    let params: Array<IResponseParameters> = Object.keys(schema.properties).map(
      (prop: string) => {
          let propSchema=  schema.properties[prop];
          //console.log(JSON.stringify(propSchema));
          return { 
              name: prop, 
              description: propSchema.description,
              schema: JSON.stringify(propSchema),
              type: propSchema.type || 'any',          
              mediaType: mediaType,
              example: propSchema.example,
          }
      }
    );
    return {
      code: code,
      data: params,
    }
  }else{
    return{
      code: code,
      data: [],
    }
  }
}
const extractResponses = (spec: PathOperation): Array<IResponse> => {
  let ret: Array<IResponse> = Object.keys(spec.responses || {}).map(code => extractResponse(code,  (<any>spec.responses)[code]));
  return ret;
}
const generateEndpoint = (
            url: string, 
            method: string, 
            globalParams : Array<ParameterObject>,
            spec: PathOperation, 
        ): IEndpoint => {
            let parameters: Array<IParameter> = [];
            let globalParameters: Array<IParameter> = globalParams.map( (gp: ParameterObject) => { return {...transformParameter(gp), source: 'endpoint'} })
            let localParameters: Array<IParameter> = (spec.parameters||[]).map( (gp: ParameterObject) => { return {...transformParameter(gp), source: 'local'} })
            let requestParams:  Array<IParameter> = extractRequestParameters(spec)
            let allParameters: Array<IParameter> = [...globalParameters, ...localParameters, ...requestParams];
            let responses: Array<IResponse> = extractResponses(spec);
            let ret: IEndpoint = {
                operationId: spec.operationId || `${url.split('/').reverse()[1]}Method`,
                description: spec.description || 'description missing',
                method: method,
                url: url.split('{').join('${'),
                allParameters: allParameters,
                parameters: {
                  header: allParameters.filter( a => a.location==ILocation.HEADER.valueOf()),
                  body: allParameters.filter( a => a.location==ILocation.BODY.valueOf()),
                  cookie: allParameters.filter( a => a.location==ILocation.COOKIE.valueOf()),
                  path: allParameters.filter( a => a.location==ILocation.PATH.valueOf()),
                  query: allParameters.filter( a => a.location==ILocation.QUERY.valueOf()),
                },
                summary: spec.summary || 'summary missing',
                responses: responses,
            };
            return ret;
}

export default class TransformerService{
	constructor(){
		this.extractEndpoints = this.extractEndpoints.bind(this);	
  }
  async extractEndpoints(api: Api | ExtApi) : Promise<ExtApi>{
      let endpoints: Array<IEndpoint> = Object.keys(api.paths).reduce( 
          (prev: Array<IEndpoint> , key: string) =>{
              return prev.concat(generateEndpoints(key, <PathItemObject>(<any>api.paths)[key]));
          }, []
      );
     // console.log(endpoints);
      return Promise.resolve(<ExtApi> {...api, endpoints: endpoints});
  }
}
