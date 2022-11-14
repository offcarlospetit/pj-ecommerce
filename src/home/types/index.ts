
export interface Product {
    amiiboSeries: string;
    character: string;
    gameSeries: string;
    head: string;
    image: string;
    name: string;
    release: Record<string, string>,
    tail: string;
    type: string;
    price: number;
    formatPrice: string;
}
export interface Products {
    products: Product[];
}
