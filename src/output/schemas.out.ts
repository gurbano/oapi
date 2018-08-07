export interface INewsletterSubscription   {
      email: string; //look@you.lol ()
}
export interface IPrice   {
      amount: number; //10 ()
      currencyCode: "GBP"|"EUR"; //GBP ()
}
export interface IBasketSummary   {
      totalQuantity: number; //1 ()
      price: IPrice; // ()
}
export interface IAccessTokenResponse   {
      access_token?: string; //1319c1a7-b984-4765-b25e-1aafbcbd72b1 ()
      token_type?: string; //bearer ()
      scope?: string; //ct_store_uk ()
      role?: string; //REGISTERED ()
      expires_in?: number; //123456 ()
}
export interface IAuthData   {
      role?: "PUBLIC"|"REGISTERED"; //REGISTERED ()
      username?: string; //gb_customer@ct.com (Only needed for registered users)
      password?: string; //11111111 (Only needed for registered users)
}
export interface IQuantity   {
      quantity: number; //5 ()
}
export interface IRuntimeConfigurationSpace   {
      spaceId?: string; //uk-middle-tier ()
      configs?: Array<IRuntimeConfiguration>; // ()
}
export interface IRuntimeConfiguration   {
      key?: string; //use-bazaar-voice ()
      stringValue?: string; //hello world ()
      numberValue?: number; //123 ()
      booleanValue?: boolean; //false ()
}
export interface IFilter   {
      label?: string; //Colour ()
      options?: Array<IFilterOption>; // ()
      type?: "SUBCATEGORY"|"COLOUR"|"SHADE"|"PRICE"; //COLOUR ()
}
export interface IFilterOption   {
      label?: string; //Pink ()
      value?: string; //PINK ()
}
export interface ISku   {
      id?: string; //very_victoria_lipstick (you can use this id to perform product operations)
      href?: string; //# ()
      subtitle?: string; //Very Victoria ()
      shortDescription?: string; //Luminous, modern matte lipstick with a long-lasting hydrating formula to give you fuller, softer lips. ()
      sellLine?: string; //Award Winner ()
      detailedProductDescription?: IDetailedProductDescription; // ()
      price?: IPriceContainer; // ()
      featureBlock?: Array<IFeatureBlockItem>; // ()
      images?: Array<IImage>; // ()
      swatchImage?: IImage; // ()
      availability?: "BUNDLE"|"OUT_OF_STOCK"|"COMING_SOON"|"SOLD_OUT"|"AVAILABLE"; // ()
      widgets?: Array<IWidget>; // ()
}
export interface IWidget   {
      type: "CAROUSEL"|"CROSS_SELL"|"GALLERY"|"TWO_COLUMN"|"VIDEO_BLOCK"|"INFORMATION_MAP"; // ()
}
export interface ICarouselWidget  extends IWidget {
      backgroundColour?: string; //transparent ()
      items?: Array<IWidget>; // ()
}
export interface IGalleryWidget  extends IWidget {
      title?: string; //ON YOUR SKINTONE ()
      backgroundColour?: string; //transparent ()
      items?: Array<IImage>; // ()
}
export interface IInformationMapWidget  extends IWidget {
      content?: object; //[object Object] ()
}
export interface ITwoColumnWidget  extends IWidget {
      image?: IImage; // ()
      richDescription?: string; //#MY STORY ()
      descriptionPosition?: string; //RIGHT ()
      backgroundColour?: string; //transparent ()
}
export interface IVideoBlockWidget  extends IWidget {
      videoUrl?: string; //# ()
      actionLabel?: string; //WATCH NOW ()
      richDescription?: string; //#MY STORY ()
      descriptionPosition?: string; //RIGHT ()
      backgroundColour?: string; //transparent ()
}
export interface ICrossSellWidget  extends IWidget {
      title?: string; //CHARLOTTE RECOMMENDS ()
      skus?: Array<ICrossSellSku>; // ()
      backgroundColour?: string; //transparent ()
}
export interface ICrossSellSku  extends IWidget {
      id?: string; //very_victoria_lipstick ()
      href?: string; //# ()
      image?: IImage; // ()
      title?: string; //INSTANT LOOK IN A PALETTE ()
      subtitle?: string; //SMOKEY EYE BEAUTY ()
      description?: string; //Volume 2 Of the Best-Selling Volumising Mascara ()
      price?: IPriceContainer; // ()
}
export interface IDetailedProductDescription   {
      title?: string; //INSPIRED BY VICTORIA BECKHAM, PERFECT FOR EVERYDAY MAKEUP ()
      descriptionHead?: string; //Luminous, modern matte lipstick with a long-lasting hydrating formula to give you fuller, softer lips. ()
      descriptionTail?: string; //Exclusively enriched with Lipstick Tree extract which protects lips and is a natural anti-oxidant, and Orchid Extract which soothes and hydrates for a soft, buildable cashmere finish. Layer and build the color to create the intensity you want, from a light-as-air matte stain to dramatic full-velvet coverage. Color glides on easily and precisely, thanks to the specially shaped square-tip, inspired by the classic shape of a lip brush. ()
      backgroundColour?: string; //transparent ()
}
export interface IFeatureBlockItem   {
      icon?: IImage; // ()
      text?: string; //Free delivery ()
}
export interface IPriceContainer   {
      listingPrice?: IPrice; // ()
      purchasePrice?: IPrice; // ()
}
export interface IImage   {
      alt?: string; //Image alt text ()
      imageSrc?: string; ///placeholder/navigation/glow.png ()
      title?: string; //Image Title ()
}
export interface ILink   {
      href?: string; //# ()
      label?: string; //link label ()
}
export interface IListOfLinks   {
      topLevelLink?: string; //# ()
      childLinks?: Array<ILink>; // ()
}
export interface IExpandedLink   {
      label?: string; //Pretty Youth Glow ()
      content?: string; //Blush ()
      title?: string; //Pretty Youth Glow Blush ()
      href?: string; //# ()
      image?: IImage; // ()
}
export interface IImageLink   {
      href?: string; //# ()
      label?: string; //link label ()
      image?: IImage; // ()
}
export interface INavigationModel   {
      navigationItems?: Array<INavigationItem>; // ()
}
export interface INavigationItem   {
      subNavigationType: "EXPANDED_LINKS_WITH_BANNER"|"MULTI_LEVEL_WITH_BANNER"|"MULTI_LEVEL_WITH_IMAGE_GRID"|"MULTI_LEVEL_WITH_MEDIA_LINKS"|"SINGLE_LEVEL_IMAGE_LINKS"|"SINGLE_LEVEL_WITH_BANNER"; //EXPANDED_LINKS_WITH_BANNER ()
      topLevelLink: ILink; // ()
}
export interface ISingleLevelWithBanner  extends INavigationItem {
      banner?: IImageLink; // ()
      links?: Array<ILink>; // ()
      socialLinks?: boolean; //false ()
}
export interface ISingleLevelImageLinks  extends INavigationItem {
      links?: Array<ILink>; // ()
}
export interface IExpandedLinksWithBanner  extends INavigationItem {
      banner?: IImageLink; // ()
      links?: Array<IExpandedLink>; // ()
}
export interface IMultiLevelWithBanner  extends INavigationItem {
      banner?: IImageLink; // ()
      links?: Array<IListOfLinks>; // ()
}
export interface IMultiLevelWithImageGrid  extends INavigationItem {
      imageGridTitle?: string; // ()
      banner?: IImageLink; // ()
      links?: Array<IListOfLinks>; // ()
}
export interface IMultiLevelWithMediaLinks  extends INavigationItem {
      imageGridTitle?: string; // ()
      mediaLinks?: Array<IImageLink>; // ()
      links?: Array<IListOfLinks>; // ()
}
export interface IProductDetailsModel   {
      breadcrumbs?: Array<ILink>; // ()
      productName?: string; // ()
      skus?: Array<ISku>; // ()
}
export interface IProductListingModel   {
      description?: string; //Get eyes to hypnotise with Charlotte Tilbury&#x27;s array of eye makeup. The collection includes lengthening mascara, the perfect eyeshadow palette for a smokey eye, feline flick eyeliner &amp; eyebrow gel for gorgeous defined brows. ()
      title?: string; //EYESHADOW ()
      heroImage?: IImage; // ()
      breadcrumbs?: Array<ILink>; // ()
      links?: Array<ILink>; // ()
      heroLinks?: Array<ILink>; // ()
      filters?: Array<IFilter>; // ()
      products?: Array<IProductPreview>; // ()
}
export interface IProductPreview   {
      id?: string; //9as8dfhasikfdjhasfiodu (you can use this id to perform product operations)
      title?: string; //Matte Revolution ()
      subtitle?: string; //Very Victoria ()
      description?: string; //Luminous, modern matte lipstick with a long-lasting hydrating formula to give you fuller, softer lips. ()
      price?: string; //£32.00 ()
      sellLine?: string; //New In ()
      href?: string; //# ()
      image?: IImage; // ()
      rollOverImage?: IImage; // ()
      availability?: "BUNDLE"|"OUT_OF_STOCK"|"COMING_SOON"|"SOLD_OUT"|"AVAILABLE"; // ()
      wishList?: boolean; // ()
}
export interface IAddressBook   {
      billingAddress?: IAddress; // ()
      shippingAddress?: IAddress; // ()
      additionalAdresses?: Array<IAddress>; // ()
}
export interface IAddress   {
      firstName?: string; //John ()
      lastName?: string; //Doe ()
      company?: string; //yourcompany name ()
      telephone?: string; //+44 123 456 789 ()
      fax?: string; //+44 789 456 123 ()
      street?: string; //address street 1 ()
      city?: string; //London ()
      county?: string; //XX ()
      postCode?: string; //NW1 ()
      country?: string; //UK ()
}
