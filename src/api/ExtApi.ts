import {Api, ParameterLocation, Styles} from './Api';
import { ParamInterface, SchemaInterface } from '../transform';

/*
    Describes how the parameter value will be serialized depending on the type of the parameter value.
    Default values (based on value of in): 
    for query - form; for path - simple; for header - simple; for cookie - form.
*/
const defaultParamsStyle = {
    [ParameterLocation.COOKIE]: Styles.FORM,
    [ParameterLocation.HEADER]: Styles.SIMPLE,
    [ParameterLocation.PATH]: Styles.SIMPLE,
    [ParameterLocation.QUERY]: Styles.FORM,
}
export enum ILocation {
	QUERY= 'query',
	HEADER= 'header',
	PATH= 'path',
	COOKIE= 'cookie',
	BODY= 'body',
}
export enum METHODS {
    get,
    post,
    put,
    patch,
    delete
  }

export interface ISchema {
    type: string;
}

export interface IParameter{
    name: string;
    required: boolean;
    location?: keyof ILocation ;
    description: string;
    example: string;
    schema: ISchema | string;
    type: string;
    //
    mediaType?: string;
    source?: string; //endpoint, local, body 
}

export interface IResponseParameters {
  schema: ISchema | string;
  description: string;
  name: string;
  example: string;
  type: string;
  mediaType?: string;
}
export interface IResponse {
    code: string;
    type: string|undefined;
    parameters?: Array<IResponseParameters>;
}
export interface IEndpoint{
    operationId?: string;
    url: string;
    method: string;
    allParameters: Array<IParameter>;
    parameters:{
      query: Array<IParameter>;
      header: Array<IParameter>;
      path: Array<IParameter>;
      cookie: Array<IParameter>;
      body: Array<IParameter>;
    }
    responses: Array<IResponse>;
    description: string;
    summary: string;
    tags: string;
}

export default interface ExtApi extends Api{
    endpoints: Array<IEndpoint>;
    interfaces?: Array<ParamInterface>;
    schemas?: Array<SchemaInterface>;
}