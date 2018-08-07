import { MediaTypeObject, PathOperation, ParameterObject, PathItemObject, Api, ResponseObject } from "../api/Api";
import { IParameter, ILocation, ISchema, IEndpoint, IResponse, METHODS, IResponseParameters } from "../api/ExtApi";

const digReference = function(path: Array<string>, context: Api): any{
  let ret: any = context;
  while(path.length>0){
    ret = ret[path.shift() || 0];//remove # char from reference path
  } 
  return ret;
  //return {
  // type: `I${path.reverse()[0]}`,
  //}
}



const extractResponse = (code: string, respObj: ResponseObject): IResponse => {
  
  let ret = {};
  let mto: MediaTypeObject = {schema: {}};
  if (respObj.content){
    mto = <MediaTypeObject>(<any>respObj.content)[Object.keys(respObj.content)[0]];
    let mediaType = (Object.keys(respObj.content)|| ['???'])[0];
    let schema = mto.schema || {properties: []};
    if (schema.$ref){
      return{
        code: code,
        type: `I${refToIface(schema.$ref.split('/'))}`,
      }
    }else{
      let params: Array<IResponseParameters> = Object.keys(schema.properties || {}).map(
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
        type: 'object',
        parameters: params,
      }
    }
    
  }else{
    return{
      code: code,
      type: undefined,
    }
  }
}
const extractResponses = (spec: PathOperation): Array<IResponse> => {
  let ret: Array<IResponse> = Object.keys(spec.responses || {}).map(code => extractResponse(code,  (<any>spec.responses)[code]));
  if (ret.length>1){
    ret = [ret.reduce((prev: IResponse ,curr: IResponse )=>{return {code: `${prev.code}|${curr.code}`, type: `${prev.type}|${curr.type}` } }, {code:'',type:''})];
  }
  return ret;
}

export const extractRequestParameters = (spec: PathOperation, context: Api): Array<IParameter> => {
  if (spec.requestBody){
      let mto = <MediaTypeObject>(<any>spec.requestBody.content)[Object.keys(spec.requestBody.content)[0]];
      let schema = mto.schema || {};
      let mediaType = Object.keys(spec.requestBody.content)[0];
      if (schema && schema.$ref){
        let type =`I${refToIface(schema.$ref.split('/'))}`;;
        let refPath = schema.$ref.split('/');
        refPath.shift();//remove #
        schema = digReference(refPath, context);
        return[{ 
            name: 'requestBody', 
            location: (<any>ILocation.BODY) , 
            description: '',
            schema: JSON.stringify(schema),
            type: type,          
            mediaType: mediaType,
            source: 'body',
            required: false,
            example: '',
        }]
      }else if (schema){
          if (schema.properties){
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
          }else if(schema.type){
              //TODO:
              console.log('-----------');
              return [];
          }
          return [];
      }else{
        return [];
      }
  }else{
    return [];
  }
}

export const transformParameter = (gp: ParameterObject, api:any): IParameter => {
  let schema = <ISchema>{};
  let mediaType = '';
  let paramType = '';
  
  if (gp.$ref){
    let refPath = gp.$ref.split('/');
    refPath.shift();//remove #
    //console.log(gp, );
    let refObject = digReference(refPath, api);
    paramType = `I${refToIface(gp.$ref.split('/'))}`;
    return { 
      name: refObject.name, 
      location: refObject.in , 
      description: (refObject.description || '!!desctiption missing!!!'),
      schema: JSON.stringify(refObject.schema),
      mediaType: mediaType,
      type: paramType, // schema.type || 'any',
      required: refObject.required || true,
      example: refObject.example || '',
  };
  }else if(gp.schema){
    
    if (gp.schema.properties){
      //never?
      paramType = 'object';
    }else if (gp.schema.type){
      //single property
      paramType = gp.schema.type || '!!! TYPE MISSING !!!';
      //console.log('gp',gp, gp.schema.type);
    }    
  }
  let ret =  { 
      name: gp.name, 
      location: gp.in , 
      description: (gp.description || '!!desctiption missing!!!'),
      schema: JSON.stringify(gp.schema),
      mediaType: mediaType,
      type: paramType, // schema.type || 'any',
      required: gp.required || true,
      example: gp.example || '',
  };
  return ret;
}

export const generateEndpoint = (
  url: string, 
  method: string, 
  globalParams : Array<ParameterObject>,
  spec: PathOperation, 
  context: Api
): IEndpoint => {
  let parameters: Array<IParameter> = [];
  let globalParameters: Array<IParameter> = globalParams.map( (gp: ParameterObject) => { return {...transformParameter(gp, context), source: 'endpoint'} })
  let localParameters: Array<IParameter> = (spec.parameters||[]).map( (gp: ParameterObject) => { return {...transformParameter(gp, context), source: 'local'} })
  let requestParams:  Array<IParameter> = extractRequestParameters(spec, context);
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
      tags: spec.tags ? spec.tags.join(' ') : '',
  };
  // console.log(JSON.stringify(ret));
  return ret;
}

export const generateEndpoints = (url: string, spec: PathItemObject, context: Api): Array<IEndpoint> => {
  const globalParams : Array<ParameterObject> = spec.parameters || [];
  return Object.keys(spec)
              .filter( a => METHODS[<any>a]!=undefined )
              .map( method => generateEndpoint(url, method, globalParams, (<any>spec)[method], context))
}

export const schemaToInterface = (schema: any, prop: string) => {
  //console.log(prop);
  let fullProp = schema.properties[prop];
  let isRequired = schema.required!= undefined && schema.required.indexOf(prop)>-1;
  isRequired = isRequired || fullProp.required;
  let propType: string = fullProp.type;
  if (fullProp.enum){
    propType = extractEnum(fullProp.enum)
  } else if (fullProp.$ref){
    propType = `I${refToIface(fullProp.$ref.split('/'))}`;
  }else if (fullProp.type === 'array'){
    if (fullProp.items){
      if (fullProp.items.$ref){
        propType = `Array<I${refToIface(fullProp.items.$ref.split('/'))}>`
      }
    }
  }else if (fullProp.type ==='integer'){
    propType = 'number';
  }
  return {name: isRequired ? prop : `${prop}?`, type: propType, required: isRequired, example: fullProp.example, description: fullProp.description}
}
export const extractEnum = (enumSpecs: Array<any>) => {
  return enumSpecs.map(a => `"${a}"`).join('|');
};
const refToIface = (refPath: Array<string>) => {
  refPath.shift(); 
  return refPath.reverse()[0];
};