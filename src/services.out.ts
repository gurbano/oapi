//this file is autogenerated
//COMMON UTILS - (TO REFACTOR)
const toQueryString = (paramsMap: any ) => {
  let ret = Object.keys(paramsMap || {}).map(k => `${k}=${paramsMap[k]}`).join('&');
  return encodeURI(ret);
};
const ApiCallWrapper= (
	url: string,
	method: string,
	action: string,
	body: {},
	header: {},
  cookie: {},
): Promise<any> => {return Promise.resolve({})}

//COMMON INTERFACES
export interface IService{
	info: IServiceInfo;
	servers: Array<IServer>;
}
export interface IServiceInfo{
	version: string;
	title: string;
	description?: string;
}
export interface IServer{
	url: string;
	description?: string;
	variables?: Map<String, any>;
};
export interface IMothershipService{
	info: IServiceInfo;
	servers: Array<IServer>;
}

//ENDPOINTS INTERFACES
  // createSubscription input
	export interface IcreateSubscriptionParameters{
			email: string; // - eg. look@you.lol (found in body)
	}

  // createSubscription output
  export interface IcreateSubscriptionResponse{
  	//TODO
  }

  // getProductListingPage input
	export interface IgetProductListingPageParameters{
			storeCode: string; //Selected store code - eg. UK (found in path)
			productListingId: string; //Product Listing Page id. Should be human readable and can contain slashes. - eg.  (found in path)
	}

  // getProductListingPage output
  export interface IgetProductListingPageResponse{
  	//TODO
  }


//SERVICE CLASS
export default class MothershipService implements IMothershipService{
	public info: IServiceInfo;
	public servers: Array<IServer>;
	constructor(){
		this.info =  {version: '1.0.0', title: 'Mothership',  };
		this.servers = [ 
		{  url: 'http://mothership-516381200.eu-west-1.elb.amazonaws.com', description: 'staging environment' },
	 ];
	}
	/* METHODS */
		/*	--- createSubscription: Create a subscription ---
			Creates customer newsletter subscription.
		
			ENDPOINT: /api/resources/newsletter/subscription
			METHOD: post
			TAGS: []
		*/
		
		
		async createSubscription(args: IcreateSubscriptionParameters): Promise<IcreateSubscriptionResponse> {
		
			const {  email , } = args;
		  const body = {  email,  }
		  const header = {  }
		  const cookie = {  }
		  const query = {  }
		  //query
		  const queryString = toQueryString(query);
		
			return ApiCallWrapper(
				`/api/resources/newsletter/subscription?${queryString}`, //url
				"post", //method
				"",//action
				body,
				header,
		    cookie,
			);
		}
		
		/*	--- getProductListingPage: Get product listing page model ---
			Returns data needed for PLP.
		
			ENDPOINT: /api/content/${storeCode}/productlisting/${productListingId}
			METHOD: get
			TAGS: []
		*/
		
		
		async getProductListingPage(args: IgetProductListingPageParameters): Promise<IgetProductListingPageResponse> {
		
			const {  storeCode , productListingId , } = args;
		  const body = {  }
		  const header = {  }
		  const cookie = {  }
		  const query = {  }
		  //query
		  const queryString = toQueryString(query);
		
			return ApiCallWrapper(
				`/api/content/${storeCode}/productlisting/${productListingId}?${queryString}`, //url
				"get", //method
				"",//action
				body,
				header,
		    cookie,
			);
		}
		
}


const service = new MothershipService();
