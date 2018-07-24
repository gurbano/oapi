import ExtApi, { METHODS, IEndpoint, IParameter } from "../api/ExtApi";
import { Api, PathItemObject, ParameterObject, PathOperation, ParameterLocation } from "../api/Api";


const dupe :any = (o:any) => JSON.stringify(o);

const generateEndpoints = (url: string, spec: PathItemObject): Array<IEndpoint> => {
    const globalParams : Array<ParameterObject> = spec.parameters || [];
    return Object.keys(spec)
                .filter( a => METHODS[<any>a]!=undefined )
                .map( method => generateEndpoint(url, method, globalParams, (<any>spec)[method]))
}

const transformParameter = (gp: ParameterObject): IParameter => {
    let ret =  { 
        name: gp.name, 
        location: gp.in , 
        description: (gp.description || '!!desctiption missing!!!'),
        spec: gp.content || gp.schema || {error: 'no schema nor content defined'}
    };
    return ret;
}
const generateEndpoint = (
            url: string, 
            method: string, 
            globalParams : Array<ParameterObject>,
            spec: PathOperation, 
        ): IEndpoint => {
            let parameters: Array<IParameter> = [];
            let gps: Array<IParameter> = globalParams.map( (gp: ParameterObject) => { return transformParameter(gp) })
            let lps: Array<IParameter> = globalParams.map( (gp: ParameterObject) => { return transformParameter(gp) })
            let ret: IEndpoint = {
                method: method,
                url: url,
                parameters: gps
            };


            console.log(ret);
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

        return Promise.resolve(<ExtApi> api);
    }
}
