const express = require("express");
const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/car-dealer.db3"
  },
  useNullAsDefault: true
});
const router = express.Router();

// GET returns an array of car objects
router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "failed to retrieve cars"
      });
    });
});
// GET returns car by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error retrieving car"
      });
    });
});

// POST posts a new car
router.post("/",validateCar, (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(newCar => [res.status(201).json(newCar)]);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error posting new car data"
      });
    });
});

//PUT updates car entry
router.put("/:id", validateCar,(req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("cars")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(201).json({
          message: `${count} car(s) updated`
        });
      } else {
        res.status(404).json({
          message: "car not found"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error updating car data"
      });
    });
});

//DELETE deletes a car
router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      count > 0
        ? res.status(200).json({
            message: `${count} car(s) deleted`
          })
        : res.status(404).json({
            message: "car not found"
          });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error deleting data"
      });
    });
});
function validateCar(req, res, next) {
  !req.body
    ? res.status(400).json({
        message: "missing car data"
      })
    : !req.body.VIN
    ? res.status(400).json({
        message: "missing car VIN"
      })
    : !req.body.make
    ? res.status(400).json({
        message: "missing car make"
      })
    : !req.body.model
    ? res.status(400).json({
        message: "missing car model"
      })
    : !req.body.mileage
    ? res.status(400).json({ errorMessage: "missing car mileage" })
    : next();
}
module.exports = router;
