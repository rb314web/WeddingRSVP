export interface Package {
  name: string;
  price: string;
  features: string[];
  isPremium: boolean;
  isBusiness?: boolean;
}
  
  export interface FeatureItem {
    title: string;
    text: string;
  }