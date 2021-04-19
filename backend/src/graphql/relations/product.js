import { ProductTC, ProductTypeTC, PromotionTC } from '../../models'

ProductTC.addRelation(
    'promotions',
    {
        resolver: () => PromotionTC.getResolver("findMany"),
        prepareArgs: {
            filter: (source) => ({ productId: source._id }),
        },
        projection: { _id: true }
    }
)

ProductTC.addRelation(
    'productTypes',
    {
        resolver: () => ProductTypeTC.getResolver("findMany"),
        prepareArgs: {
            filter: (source) => ({ _id: { $in: source.productType } })
        },
        projection: { productType: true }
    }
)