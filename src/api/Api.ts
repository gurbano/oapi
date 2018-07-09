
export interface ApiInfo{
	version: string;
	title: string;
	description?: string;
	termsOfService: string;
	contact?: {};
	license?: {};
};


export interface ResponsesObject{ 
}
export interface SchemaObject{ 
}
export interface MediaTypeObject{ 
	schema?: SchemaObject | ReferenceObject; 
}
export interface RequestBodyObject{ 
	description?: string;
	content: Map<string, MediaTypeObject>; //key is 'application/json'
}
export interface ReferenceObject{ 
}
//Describes a single API operation on a path.
//https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#operationObject	

export interface PathOperation{ 
	responses: ResponsesObject;
	requestBody?: RequestBodyObject | ReferenceObject;

	tags?: Array<string>;
	summary?: string;
	description?: string;
	operationId?: string;

}
export interface Path{
	post?: PathOperation;
	get?: PathOperation;

	parameters?: Array<any>;
};

export interface ServerVariableObject{
	default: string;
	enum?: Array<string>;
	description?: string;
}
export interface Server{
	url: string;
	description?: string;
	variables: Map<String, ServerVariableObject>;
};
export interface Components{
	schemas?: Map<string, Component>;
}
export interface Component{

};
export interface Api{
	openapi: string;
	info: ApiInfo;
	paths: Map<string, Path>;
	servers?: Array<Server>;
	components?: Components;
	security?: any; 


};