import { schemaComposer } from 'graphql-compose'
import { OrderTC, ProductModel, ProductTC, PromotionModel, PromotionTC, UserTC } from '../../models'

OrderTC.addRelation(
    'user',
    {
        resolver: () => UserTC.getResolver("findById"),
        prepareArgs: {
            _id: (source) => source.userId,
        },
        projection: { userId: true }
    }
)

const productItemTC = schemaComposer.createInputTC(`
    input ProductItemTC {
        productId: ID
        amount: Int
        price: Float
        promotionId: ID
    }
`)

const productItemResolver = schemaComposer.createResolver({
    name: "product",
    type: [ProductTC],
    args: {
        productItem: [productItemTC]
    },
    resolve: ({ source, args, context, info }) => {
        const { productItem } = args
        const productItemId = []
        productItem.forEach((product) => {
            productItemId.push(product.productId)
        })
        return ProductModel.find({ _id: { $in: productItemId } })
    }
})

// OrderTC.addRelation(
//     'productItem',
//     {
//         resolver: () => productItemResolver,
//         prepareArgs: {
//             productItem: (source) => source.productItem
//         },
//         projection: { productItem: true }
//     }
// )

const productPromotionResolver = schemaComposer.createResolver({
    name: "product",
    type: [PromotionTC],
    args: {
        productItem: [productItemTC]
    },
    resolve: ({ source, args, context, info }) => {
        const { productItem } = args
        const promotionItemId = []
        productItem.forEach((product) => {
            promotionItemId.push(product.promotionId)
        })
        return PromotionModel.find({ _id: { $in: promotionItemId } })
    }
})

OrderTC.addRelation(
    'productPromotion',
    {
        resolver: () => productPromotionResolver,
        prepareArgs: {
            productItem: (source) => source.productItem
        },
        projection: { productItem: true }
    }
)