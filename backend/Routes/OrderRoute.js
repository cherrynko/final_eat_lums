const router = require("express").Router();
const Order = require("../models/Order");
const OrderItems = require("../models/Orderitems");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwtAuth = require("../middlewares/jwtAuth");
const { Socket } = require("socket.io");

// to fetch all the pending orders
router.get("/all", async (req, res) => {
  Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "student_id",
        foreignField: "id",
        as: "student_details",
      },
    },
    {
      $lookup: {
        from: "eateries",
        localField: "eatery_id",
        foreignField: "eatery_id",
        as: "eatery_details",
      },
    },
    {
      $match: {
        orderstatus: "",
      },
    },
    {
      $project: {
        order_id: 1,
        items: 1,
        "student_details.name": 1,
        "student_details.contact": 1,
        "student_details.id": 1,
        "eatery_details.name": 1,
        student_id: 1,
        totalprice: 1,
        droplocation: 1,
        paymentmethod: 1,
      },
    },
  ]).exec(function (err, orders) {
    if (err) {
      console.error(err);
    } else {
      // console.log(orders);
      res.send(orders);
    }
  });
});
// to get orders placed by a student
router.get("/usr", jwtAuth, async (req, res) => {
  const userId = parseInt(req.id);
  Order.aggregate([
    {
      $lookup: {
        from: "orderitems",
        localField: "order_id",
        foreignField: "order_id",
        as: "items",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "rider_id",
        foreignField: "id",
        as: "rider_details",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "student_id",
        foreignField: "id",
        as: "student_details",
      },
    },
    {
      $lookup: {
        from: "eateries",
        localField: "eatery_id",
        foreignField: "eatery_id",
        as: "eatery_details",
      },
    },
    {
      $match: {
        student_details: {
          $elemMatch: {
            id: userId,
          },
        },
      },
    },
    {
      $project: {
        order_id: 1,
        items: 1,
        // "student_details.name": 1,
        // "student_details.contact": 1,
        // "student_details.id": 1,
        "rider_details.name": 1,
        "rider_details.contact": 1,
        "rider_details.id": 1,
        "eatery_details.name": 1,
        student_id: 1,
        totalprice: 1,
        orderstatus: 1,
        droplocation: 1,
        paymentmethod: 1,
      },
    },
  ]).exec(function (err, orders) {
    if (err) {
      console.error(err);
    } else {
      // console.log(orders);
      res.send(orders);
    }
  });
});

// to get all orders accepted by student rider
router.get("/rider", jwtAuth, async (req, res) => {
  const riderId = parseInt(req.id);
  Order.aggregate([
    {
      $lookup: {
        from: "orderitems",
        localField: "order_id",
        foreignField: "order_id",
        as: "items",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "rider_id",
        foreignField: "id",
        as: "rider_details",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "student_id",
        foreignField: "id",
        as: "student_details",
      },
    },
    {
      $lookup: {
        from: "eateries",
        localField: "eatery_id",
        foreignField: "eatery_id",
        as: "eatery_details",
      },
    },
    {
      $match: {
        rider_details: {
          $elemMatch: {
            id: riderId,
          },
        },
      },
    },
    {
      $project: {
        order_id: 1,
        items: 1,
        "student_details.name": 1,
        "student_details.contact": 1,
        "student_details.id": 1,
        // "rider_details.name": 1,
        // "rider_details.contact": 1,
        "rider_details.id": 1,
        "eatery_details.name": 1,
        student_id: 1,
        orderstatus: 1,
        totalprice: 1,
        droplocation: 1,
        paymentmethod: 1,
      },
    },
  ]).exec(function (err, orders) {
    if (err) {
      console.error(err);
    } else {
      // console.log(orders);
      res.send(orders);
    }
  });
});

// to process the checkout
router.post("/checkout", jwtAuth, async (req, res) => {
  console.log("student_id ", req.id);
  console.log("body ", req.body);
  // res

  try {
    console.log(req.body, "checkout req");
    let last_order = await Order.find({});
    last_order = last_order[last_order.length - 1];
    console.log(last_order);
    // // .limit(1)[0];

    const order_id1 = Number(last_order.order_id) + 1;
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
      orderstatus:"",
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

// to update order status to Accepted
router.post("/accept", jwtAuth, async (req, res) => {
  const riderId = req.id;
  let query = { order_id: req.body.order_id };
  let values = { $set: { orderstatus: "Accepted", rider_id: riderId } };
  Order.updateOne(query, values, (err, data) => {
    if (err) throw err;
    else {
      res.send({ success: true });
    }
  });
});

// for admin to check all the orders
router.get("/eat_orders/:eat_id", async (req, res) => {
  try {
    console.log(req.params.eat_id, "id");

    const orders = await Order.find({ eatery_id: req.params.eat_id });
    const orderIds = orders.map((order) => order.order_id);
    const orderitems = await OrderItems.find({});
    const filteredOrderitems = orderitems.filter((orderitem) =>
      orderIds.includes(orderitem.order_id)
    );

    console.log(filteredOrderitems);

    res.json(filteredOrderitems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// to check the status of the order
router.post("/status", jwtAuth, async (req, res) => {
  console.log("here");
  let query = { order_id: req.body.order_id };
  const result = await Order.findOne(query);
  if (result) {
    console.log(result);
    res.send({ status: result?.orderstatus });
  }
});

module.exports = router;
