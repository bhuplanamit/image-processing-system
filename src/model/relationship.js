const ProcessingRequest = require('./processingRequest.model');
const Product = require('./product.model');

ProcessingRequest.hasMany(Product, {
    foreignKey: 'processingRequestId',
    as: 'products'
});

Product.belongsTo(ProcessingRequest, {
    foreignKey: 'processingRequestId',
    as: 'processingRequest'
});

module.exports = { ProcessingRequest, Product };
