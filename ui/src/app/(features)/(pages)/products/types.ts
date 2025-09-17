export interface Product {
    id: string;
    product_name: string;
    price: number;
    images: string[];
    description: string;
    category: {
        id: string;
        name: string;
    };

}