export interface ApiResponse<T> {
  items: T;
  msg?: string;
  status?:string
}

export interface IMeal {
  _id: string;
  title: string;
  category: string;
  description?: string;
  price: string;
  ingrediants?: Array<string>;
  imageFile: string
}

// export class Meal {
//   _id: string;
//   title: string;
//   category: string;
//   description: string;
//   price: string;
//   ingrediants: Array<string>;
//   imageFile: string
//   constructor(_id: string, title: string, category: string, description: string, price: string, ingrediants: Array<string>, imageFile: string) {
//       this._id = _id,
//       this.title = title,
//       this.category = category,
//       this.description = description,
//       this.price = price,
//       this.ingrediants = ingrediants,
//       this.imageFile = imageFile
//   }
// }
