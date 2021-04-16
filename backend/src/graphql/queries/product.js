import { ProductTC } from "../../models";

export const productById = ProductTC.getResolver("findById")
export const allProduct = ProductTC.getResolver("findMany")