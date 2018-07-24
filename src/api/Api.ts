export interface ReferenceObject{
	$ref?: string;
}

export interface Api{
	openapi: string;
	info: InfoObject;
	paths: Map<string, PathItemObject>;
	servers?: Array<Server>;
	components?: Components;
	security?: any; 


};

export interface InfoObject{
	version: string;
	title: string;
	description?: string;
	termsOfService?: string;
	contact?: {
		name?: string;
		url?: string;
		email?: string;
	};
	license?: {
		name: string;
		url?: string;
	};
};

export interface Server{
	url: string;
	description?: string;
	variables: Map<String, ServerVariableObject>;
};
export interface ServerVariableObject{
	default: string;
	enum?: Array<string>;
	description?: string;
}

export interface PathItemObject extends ReferenceObject{
	summary?: string;
	description?: string;
	get?: PathOperation;
	put?: PathOperation;
	post?: PathOperation;
	delete?: PathOperation;
	options?: PathOperation;
	head?: PathOperation;
	patch?: PathOperation;
	trace?: PathOperation;
	servers?: Array<Server>;
	parameters?: Array<ParameterObject>;
};

//Describes a single API operation on a path.
//https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#operationObject	

export interface PathOperation{ 
	responses?: Map<string, ResponseObject >;
	requestBody?: RequestBodyObject ;
	tags?: Array<string>;
	summary?: string;
	description?: string;
	operationId?: string;
	externalDocs: any; // TODO
	parameters?: Array<ParameterObject>;
}

export enum ParameterLocation{
	QUERY= 'query',
	HEADER= 'header',
	PATH= 'path',
	COOKIE= 'cookie',
}
export enum Styles{
	MATRIX= 'matrix',
	LABEL= 'label',
	FORM= 'form',
	SIMPLE= 'simple',
	SPACE_DELIMITED= 'spaceDelimited',
	PIPE_DELIMITED= 'pipeDelimited',
	DEEP_OBJECT= 'deepObject',
}

/*
	https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameterObject
	The rules for serialization of the parameter are specified in one of two ways. 
	For simpler scenarios, a *schema* and *style* can describe the structure and syntax of the parameter.


*/
export interface ParameterObject extends ReferenceObject{
	name: string;
	in: keyof ParameterLocation;
	description?: string;
	required?: boolean;
	deprecated?: boolean;
	allowEmptyValue?: boolean;
	style?: Styles;
	explode?: boolean;
	allowReserved?: boolean;
	schema?: SchemaObject;
	example?: any;
	examples?: Map<string,ExampleObject >;
	content?: Map<string, MediaTypeObject>;
}

export interface ExampleObject extends ReferenceObject{ 
	summary: string;
	description: string;
	value: any;
	externalValue: string;
}
export interface ResponsesObject extends ReferenceObject{ 
	description: string;
	headers: Map<String, HeaderObject>;
	content: Map<string, MediaTypeObject>;

}
export interface HeaderObject extends ReferenceObject { 
	description?: string;
	required?: boolean;
	deprecated?: boolean;
	allowEmptyValue?: boolean;
	style?: string;
	explode?: boolean;
	allowReserved?: boolean;
	schema?: SchemaObject ;
	example?: any;
	examples?: Map<string,ExampleObject>;
	content?: Map<string, MediaTypeObject >;
}
export interface SchemaObject extends ReferenceObject{ 

}
export interface RequestBodyObject extends ReferenceObject{ 
	description?: string;
	content: Map<string, MediaTypeObject>; //key is 'application/json';
	required: boolean; //default false
}
export interface MediaTypeObject extends ReferenceObject{ 
	schema?: SchemaObject; 
}
export interface ResponseObject extends ReferenceObject{ 
	description?: string;
	content: Map<string, MediaTypeObject>; //key is 'application/json'
}




export interface Components{
	schemas?: Map<string, SchemaObject>;
	parameters?: Map<string, ParameterObject>;
}
