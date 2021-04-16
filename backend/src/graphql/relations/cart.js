import { schemaComposer } from 'graphql-compose'
import { CartTC, ProductModel, ProductTC, UserTC } from '../../models'

CartTC.addRelation(
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

CartTC.addRelation(
    'productItem',
    {
        resolver: () => productItemResolver,
        prepareArgs: {
            productItem: (source) => source.productItem
        },
        projection: { productItem: true }
    }
)