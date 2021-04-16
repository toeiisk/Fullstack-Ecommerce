import { OrderTC } from "../../models";

export const orderById = OrderTC.getResolver("findById")
export const allOrder = OrderTC.getResolver("findMany")