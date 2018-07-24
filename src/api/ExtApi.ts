import {Api, ParameterLocation, Styles} from './Api';

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
export type ILocation = ParameterLocation;
export enum METHODS {
    get,
    post,
    put,
    patch,
    delete
  }

export interface ISchema {

}
export interface IContent {
    
}

export interface IParameter{
    name: string;
    location: keyof ILocation;
    description: string;
    spec: ISchema | IContent | any;
}
export interface IEndpoint{
    url: string;
    method: string;
    parameters: Array<IParameter>;
}

export default interface ExtApi extends Api{
    endpoints: Array<IEndpoint>;
}