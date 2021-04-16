import { ProductTC, PromotionTC } from '../../models'

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