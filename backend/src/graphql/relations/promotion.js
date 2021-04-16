import { PromotionTC, ProductTC } from '../../models'

PromotionTC.addRelation(
    'product',
    {
        resolver: () => ProductTC.getResolver("findById"),
        prepareArgs: {
            _id: (source) => source.productId,
        },
        projection: { productId: true }
    }
)