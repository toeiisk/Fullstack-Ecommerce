import { ProductTypeTC } from "../../models";

export const productTypeById = ProductTypeTC.getResolver("findById")
export const allProductType = ProductTypeTC.getResolver("findMany")