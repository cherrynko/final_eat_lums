const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../secrets/JWTsecret.js");
const Order = require("../models/Order");
const OrderItems = require("../models/Orderitems");
const jwtAuth = require("../middlewares/jwtAuth");

router.post("/checkout", jwtAuth, async (req, res) => {
  console.log("student_id ", req.id);
  console.log("body ", req.body);
  // res

  try {
    console.log(req.body, "checkout req");
    let last_order = await Order.find({})
    last_order = last_order[last_order.length - 1]
    console.log(last_order)
    // // .limit(1)[0];

    const order_id1 = Number(last_order.order_id) + 1
    console.log(order_id1);
    console.log(req.body.eatery_id);
    console.log(req.body.total);
    console.log(req.body.droplocation);
    console.log(req.body.paymentmethod);

    Order.create({
      order_id: Number(order_id1),
      eatery_id: req.body.eatery_id,
      student_id: req.id,
      totalprice: req.body.total,
      droplocation: req.body.droplocation,
      paymentmethod: "COD",
    });

    req.body.items.forEach((element) => {
      OrderItems.create({
        order_id: Number(order_id1),
        item: element.item,
        price: element.price,
        quantity: element.quantity,
      });
    });

    console.log("Sending");
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.get("/orders", jwtAuth, async (req, res) => {
  try {
    console.log("hi")
    let orders = await Order.find({}); // Wait for the Promise to resolve before assigning the value to menu
    let order
    let thisUsers = orders.filter(
      (item) => item.student_id == req.id
    );

    const orderIds = thisUsers.map((order) => Number(order.id)); // get array of order IDs
    const orderItems = await OrderItems.find({ order_id: { $in: orderIds } }); // find all order items whose order_id is in the orderIds array
    console.log(orderItems)
    res.json(thisUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
