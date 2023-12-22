import { CategoriesDTO } from "./category"

export type ProductDTO = {
    id: number,
    name: string,
    description: string,
    price: number, 
    imgUrl: string,
    categories: CategoriesDTO[]
}