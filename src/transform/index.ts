import ExtApi, { ILocation, METHODS, IEndpoint, IParameter, ISchema } from "../api/ExtApi";
import { Api, PathItemObject, ParameterObject, PathOperation, ParameterLocation, MediaTypeObject } from "../api/Api";

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
const generateEndpoint = (
            url: string, 
            method: string, 
            globalParams : Array<ParameterObject>,
            spec: PathOperation, 
        ): IEndpoint => {
            let parameters: Array<IParameter> = [];
            let gps: Array<IParameter> = globalParams.map( (gp: ParameterObject) => { return {...transformParameter(gp), source: 'endpoint'} })
            let lps: Array<IParameter> = (spec.parameters||[]).map( (gp: ParameterObject) => { return {...transformParameter(gp), source: 'local'} })
            let requestParams:  Array<IParameter> = [];
            if (spec.requestBody){
                let mto = <MediaTypeObject>(<any>spec.requestBody.content)[Object.keys(spec.requestBody.content)[0]];
                let schema = mto.schema || {};
                let mediaType = Object.keys(spec.requestBody.content)[0];
                if (schema && schema.properties){
                    let required = schema.required || [];
                    
                    Object.keys(schema.properties).map(
                        (prop: string) => {
                            let propSchema=  schema.properties[prop];
                            requestParams.push({ 
                                name: prop, 
                                location: (<any>ILocation.BODY) , 
                                description: propSchema.description,
                                schema: JSON.stringify(propSchema),
                                type: propSchema.type,          
                                mediaType: mediaType,
                                source: 'body',
                                required: required.indexOf(prop) > -1,
                                example: propSchema.example,
                            })
                        }
                    )
                }
                
            }
            
            let ret: IEndpoint = {
                operationId: spec.operationId || `${url.split('/').reverse()[1]}Method`,
                description: spec.description || 'description missing',
                method: method,
                url: url,
                parameters: [...gps, ...lps, ...requestParams],
                summary: spec.summary || 'summary missing',
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
        console.log(endpoints);
        return Promise.resolve(<ExtApi> {...api, endpoints: endpoints});
    }
}
