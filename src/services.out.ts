//this file is autogenerated
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
//INTERFACES
	//createSubscription
	export interface IcreateSubscriptionParameters{
			//body
			email: string; // - eg. look@you.lol 
	}
	export interface IcreateSubscriptionResponse{
		//TODO
	}
	//addProductToWishlist
	export interface IaddProductToWishlistParameters{
			//header
			Authorization: string; //Authorization token - eg. Bearer 1319c1a7-b984-4765-b25e-1aafbcbd72b1 
			//path
			storeCode: string; //Selected store code - eg. UK 
			//path
			productId: string; //Product id. - eg. qgqvhocdkrpwy2lqon2gsy3ll5vwszdnmfxhgx3lnfzxg&#x3D; 
	}
	export interface IaddProductToWishlistResponse{
		//TODO
	}
	//getNavigation
	export interface IgetNavigationParameters{
			//path
			storeCode: string; //Selected store code - eg. UK 
	}
	export interface IgetNavigationResponse{
		//TODO
	}
	//getProductListingPage
	export interface IgetProductListingPageParameters{
			//path
			storeCode: string; //Selected store code - eg. UK 
			//path
			productListingId: string; //Product Listing Page id. Should be human readable and can contain slashes. - eg.  
	}
	export interface IgetProductListingPageResponse{
		//TODO
	}
	//getProductPage
	export interface IgetProductPageParameters{
			//path
			storeCode: string; //Selected store code - eg. UK 
			//path
			productId: string; //Product id. Human readable and can contain slashes. - eg.  
	}
	export interface IgetProductPageResponse{
		//TODO
	}
	//getBasketSummary
	export interface IgetBasketSummaryParameters{
			//path
			storeCode: string; //Selected store code - eg. UK 
			//header
			Authorization: string; //Authorization token - eg. Bearer 1319c1a7-b984-4765-b25e-1aafbcbd72b1 
	}
	export interface IgetBasketSummaryResponse{
		//TODO
	}
	//addProductToBasket
	export interface IaddProductToBasketParameters{
			//header
			Authorization: string; //Authorization token - eg. Bearer 1319c1a7-b984-4765-b25e-1aafbcbd72b1 
			//path
			storeCode: string; //Selected store code - eg. UK 
			//path
			productId: string; //Product id. - eg. qgqvhocdkrpwy2lqon2gsy3ll5vwszdnmfxhgx3lnfzxg&#x3D; 
			//body
			quantity: number; // - eg. 5 
	}
	export interface IaddProductToBasketResponse{
		//TODO
	}
	//removeProductFromBasket
	export interface IremoveProductFromBasketParameters{
			//header
			Authorization: string; //Authorization token - eg. Bearer 1319c1a7-b984-4765-b25e-1aafbcbd72b1 
			//path
			storeCode: string; //Selected store code - eg. UK 
			//path
			basketId: string; //Basket identifier - eg. ha3tezrtmy2diljummztkljumi3&#x3D; 
			//path
			lineItemId: string; //Line item identifier - eg. meytimzsgiygkljumvrgkljumu&#x3D; 
	}
	export interface IremoveProductFromBasketResponse{
		//TODO
	}
	//authenticate
	export interface IauthenticateParameters{
			//path
			storeCode: string; //Selected store code - eg. UK 
			//header
			Authorization: string; //optional public token, if merge is needed during REGISTERED user login - eg. Bearer 1319c1a7-b984-4765-b25e-1aafbcbd72b1 
			//body
			role?: string; // - eg. REGISTERED 
			//body
			username?: string; //Only needed for registered users - eg. gb_customer@ct.com 
			//body
			password?: string; //Only needed for registered users - eg. 11111111 
	}
	export interface IauthenticateResponse{
		//TODO
	}
	//unauthorizeMethod
	export interface IunauthorizeMethodParameters{
			//header
			Authorization: string; //Authorization token - eg. Bearer 1319c1a7-b984-4765-b25e-1aafbcbd72b1 
	}
	export interface IunauthorizeMethodResponse{
		//TODO
	}

//httpActionCreator(`/resources/newsletter/subscription`, METHODS.post, FETCH_EMAIL, { body: { email: email }});

const httpActionCreator= (
	url: string,
	method: string,
	action: string,
	body: any,
	header: any,
): Promise<any> => {return Promise.resolve({})}

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
		
			return httpActionCreator(
				"/api/resources/newsletter/subscription", //url
				"post", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- addProductToWishlist: Add product to a wishlist ---
			description missing
		
			ENDPOINT: /api/resources/{storeCode}/wishlist/{productId}
			METHOD: put
			TAGS: []
		*/
		
		
		async addProductToWishlist(args: IaddProductToWishlistParameters): Promise<IaddProductToWishlistResponse> {
		
			const {  Authorization , storeCode , productId , } = args;
		
			return httpActionCreator(
				"/api/resources/{storeCode}/wishlist/{productId}", //url
				"put", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- getNavigation: Get navigation data model ---
			Returns data needed for navigation panel on charlotte&#x27;s webpage.
		
			ENDPOINT: /api/content/{storeCode}/navigation
			METHOD: get
			TAGS: []
		*/
		
		
		async getNavigation(args: IgetNavigationParameters): Promise<IgetNavigationResponse> {
		
			const {  storeCode , } = args;
		
			return httpActionCreator(
				"/api/content/{storeCode}/navigation", //url
				"get", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- getProductListingPage: Get product listing page model ---
			Returns data needed for PLP.
		
			ENDPOINT: /api/content/{storeCode}/productlisting/{productListingId}
			METHOD: get
			TAGS: []
		*/
		
		
		async getProductListingPage(args: IgetProductListingPageParameters): Promise<IgetProductListingPageResponse> {
		
			const {  storeCode , productListingId , } = args;
		
			return httpActionCreator(
				"/api/content/{storeCode}/productlisting/{productListingId}", //url
				"get", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- getProductPage: Get product data model ---
			Returns data needed for PDP.
		
			ENDPOINT: /api/content/{storeCode}/product/{productId}
			METHOD: get
			TAGS: []
		*/
		
		
		async getProductPage(args: IgetProductPageParameters): Promise<IgetProductPageResponse> {
		
			const {  storeCode , productId , } = args;
		
			return httpActionCreator(
				"/api/content/{storeCode}/product/{productId}", //url
				"get", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- getBasketSummary: Get basket summary ---
			Returns basket value and number of items.
		
			ENDPOINT: /api/resource/{storeCode}/basket/summary
			METHOD: get
			TAGS: []
		*/
		
		
		async getBasketSummary(args: IgetBasketSummaryParameters): Promise<IgetBasketSummaryResponse> {
		
			const {  storeCode , Authorization , } = args;
		
			return httpActionCreator(
				"/api/resource/{storeCode}/basket/summary", //url
				"get", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- addProductToBasket: Add product to the basket ---
			description missing
		
			ENDPOINT: /api/resources/{storeCode}/basket/{productId}
			METHOD: put
			TAGS: []
		*/
		
		
		async addProductToBasket(args: IaddProductToBasketParameters): Promise<IaddProductToBasketResponse> {
		
			const {  Authorization , storeCode , productId , quantity , } = args;
		
			return httpActionCreator(
				"/api/resources/{storeCode}/basket/{productId}", //url
				"put", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- removeProductFromBasket: Delete product from basket ---
			description missing
		
			ENDPOINT: /api/resources/{storeCode}/basket/{basketId}/{lineItemId}
			METHOD: delete
			TAGS: []
		*/
		
		
		async removeProductFromBasket(args: IremoveProductFromBasketParameters): Promise<IremoveProductFromBasketResponse> {
		
			const {  Authorization , storeCode , basketId , lineItemId , } = args;
		
			return httpActionCreator(
				"/api/resources/{storeCode}/basket/{basketId}/{lineItemId}", //url
				"delete", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- authenticate: Get auth token for public or registered user ---
			Returns authentication token
		
			ENDPOINT: /api/resources/oauth/authorize/{storeCode}
			METHOD: post
			TAGS: []
		*/
		
		
		async authenticate(args: IauthenticateParameters): Promise<IauthenticateResponse> {
		
			const {  storeCode , Authorization , role , username , password , } = args;
		
			return httpActionCreator(
				"/api/resources/oauth/authorize/{storeCode}", //url
				"post", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
		/*	--- unauthorizeMethod: summary missing ---
			Delete auth token
		
			ENDPOINT: /api/resources/oauth/unauthorize/
			METHOD: delete
			TAGS: []
		*/
		
		
		async unauthorizeMethod(args: IunauthorizeMethodParameters): Promise<IunauthorizeMethodResponse> {
		
			const {  Authorization , } = args;
		
			return httpActionCreator(
				"/api/resources/oauth/unauthorize/", //url
				"delete", //method
				"",//action
				{},//body
				{},//header
			);
		}
		
}


const service = new MothershipService();
