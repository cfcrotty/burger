const express = require("express");

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  burger.select(data => {
    const hbsObject = {
      burgers: data
    };
    //console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.insert(["burger_name", "description"], [req.body.burger_name, req.body.description], result => {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;
  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    result => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );

});

router.put("/api/burgers/fav/:id", (req, res) => {
  const condition = "id = " + req.params.id;
  let fav = false;
  if (req.body.favorite == 1) {
    fav = true;
  }

  burger.update(
    {
      favorite: fav
    },
    condition,
    result => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );

});

router.put("/api/burgers/update/:id", (req, res) => {
  const condition = "id = " + req.params.id;
    burger.update(
      {
        burger_name: req.body.burger_name,
        description: req.body.description
      },
      condition,
      result => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
  
      }
    );
});

router.delete("/api/burgers/:id", (req, res) => {
  burger.delete("id", req.params.id, (data) => {
    res.json(data);
  });
});

// Export routes for server.js to use.
module.exports = router;
