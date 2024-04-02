// Interface for the meal object within the order
export interface Meal {
    _id: string;
    title: string;
    price: string;
    cartQuantity: number;
}

// Interface for the shipping address
export interface ShippingAddress {
    city: string | null;
    country: string;
    line1: string | null;
    line2: string | null;
    postal_code: string | null;
    state: string | null;
}

// Interface for the shipping data
export interface ShippingData {
    email: string;
    name: string;
    phone: string;
    address: ShippingAddress;
    tax_exempt: string;
    tax_ids: any[]; // Adjust the type according to the actual data structure
}

// Interface for the entire order object
export interface IOrder {
    _id: string;
    userId: string;
    customerId?: string;
    userName?: string;
    paymentIntentId?: string;
    meals: Meal[];
    subtotal: number;
    total: number;
    shipping: ShippingData;
    delivery_status?: string;
    payment_status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Interface for the response containing orders
export interface ApiResponse<T> {
    data: IOrder[];
}
