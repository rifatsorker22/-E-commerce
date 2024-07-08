const Order = require('../model/order.model');
const mongoose = require('mongoose');
const getByOrderId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json({
                message: 'Order Found',
                order: order,
                links: {
                    self: `${baseUrl}/orders/v1/${id}`,
                    update: `${baseUrl}/orders/v1/${id}`,
                    delete: `${baseUrl}/orders/v1/${id}`,
                    allOrder: `${baseUrl}/orders/v1`,
                    createOrder: `${baseUrl}/orders/v1`
                }
            });
        }
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 5;
        const skip = (page - 1) * limit;
        
        const orders = await Order.find().skip(skip).limit(limit);
        const totalOrders = await Order.countDocuments();
        const totalPage = Math.ceil(totalOrders / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        if (orders.length === 0) {
            res.status(200).json({ message: 'Order not found' });
        } else {
            res.status(200).json({
                message: 'All Orders',
                orders: orders,
                paginations: {
                    currentPage: page,
                    totalOrders: totalOrders,
                    totalPage: totalPage,
                    prev: (page > 1) ? page - 1 : null,
                    next: (page < totalPage) ? page + 1 : null
                },
                links: {
                    self: `${baseUrl}/orders?page=${page}&limit=${limit}`,
                    next: (page < totalPage) ? `${baseUrl}/orders?page=${page + 1}&limit=${limit}` : null,
                    prev: (page > 1) ? `${baseUrl}/orders?page=${page - 1}&limit=${limit}` : null
                }
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const postOrder = async (req, res, next) => {
    try {
        const { customarId, cartItems, shippingAddress, status } = req.body;

        // Calculate total price
        const totalPrice = cartItems.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);

        // Create a new order
        const newOrder = new Order({
            customarId,
            cartItems,
            totalPrice,
            shippingAddress,
            status
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Construct response
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const response = {
            message: "Order created Successfully",
            Orders: savedOrder,
            links: {
                self: `${baseUrl}/orders/v1/${savedOrder._id}`,
                allOrders: `${baseUrl}/orders/v1`,
                update: `${baseUrl}/orders/v1/${savedOrder._id}`,
                delete: `${baseUrl}/orders/v1/${savedOrder._id}`
            }
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

const patchOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json({
                message: 'Order updated',
                order: updatedOrder,
                links: {
                    self: `${baseUrl}/orders/v1/${updatedOrder._id}`,
                    allOrders: `${baseUrl}/orders/v1`,
                    createOrder: `${baseUrl}/orders/v1`,
                    deleteOrder: `${baseUrl}/orders/v1/${updatedOrder._id}`
                }
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        const deletedOrder = await Order.findByIdAndDelete(id);
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        if (!deletedOrder) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json({
                message: 'Order deleted successfully',
                links: {
                    allOrders: `${baseUrl}/orders/v1`,
                    createOrder: `${baseUrl}/orders/v1`
                }
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    getByOrderId,
    getOrder,
    postOrder,
    patchOrder,
    deleteOrder
};
