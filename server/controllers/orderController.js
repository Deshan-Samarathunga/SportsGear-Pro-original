exports.getAllOrders = (req, res) => {
    res.json([{ _id: 1, status: "Pending", user: "User A", total: 1200 }]);
  };
  