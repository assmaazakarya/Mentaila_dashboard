import { JwtPayload } from "jwt-decode";

export interface IRegister {
    _id?: string; // Optional because Mongoose will add this field automatically
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    // createdAt?: Date; // Optional to include timestamps
    // updatedAt?: Date; // Optional to include timestamps
  }

  export interface ILogin{
    email:string,
    password: string
  }
  export interface ApiResponse<T> {
    data:[any];
    // success:boolean;
    // message:string;
    // status:number;
    // token : string
    }

    export interface CustomJwtPayload extends JwtPayload {
      isAdmin: boolean;
    }