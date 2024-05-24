const { createOrder, allOrders, orderById, updateStatus, totalSales, totalOrders, totalCompleteOrders, totalPendingOrders, totalCancelledOrders, totalProcessingOrders, getLast5CompleteOrders, overview } = require('../Controller/OrderController');

const OrderRouter = require('express').Router();

OrderRouter.post('/create', createOrder);
OrderRouter.get('/', allOrders);
OrderRouter.get('/:id', orderById);
OrderRouter.put('/:id', updateStatus);
OrderRouter.get('/cal/totalOrders', totalOrders);
OrderRouter.get('/cal/totalSales', totalSales);
OrderRouter.get('/cal/totalCompleteOrders', totalCompleteOrders);
OrderRouter.get("/cal/totalPendingOrders", totalPendingOrders);
OrderRouter.get("/cal/totalCancelledOrders", totalCancelledOrders);
OrderRouter.get("/cal/totalProcessingOrders", totalProcessingOrders);
OrderRouter.get("/cal/getLast5CompleteOrders", getLast5CompleteOrders);
OrderRouter.get("/cal/overview", overview);





module.exports = OrderRouter;