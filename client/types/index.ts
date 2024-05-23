export interface IAd {
  email: string;
  title: string;
  description: string;
  imagesUrls: string[];
  tags: string[];
  highlighted: boolean;
  price: string;
  location: string;
  date: string;
}

export interface IUser {
  email: string;
  name: string;
  ads: IAd[];
}
