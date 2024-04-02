 export interface ICoach {
    _id : string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    subscribe: string[];
    }

  export interface ApiResponse<T> {
    data : ICoach;
  }