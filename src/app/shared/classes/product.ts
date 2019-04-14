import { Promotion } from './promotion';
export class Product {
    id: string;
    name: string;
    image_1: string;
    image_2: string;
    img_url: string;
    price: number;
    category: string;
    promotion: Promotion
}
