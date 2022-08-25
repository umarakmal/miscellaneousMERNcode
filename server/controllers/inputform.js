const Agent = require("../models/agent");
const State = require("../models/state");
const City = require("../models/city");
const Sheet = require("../models/sheet");

exports.input = (req, res) => {
  // Create a role
  var agent = new Agent({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    interest: req.body.interest,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
    address: req.body.address,
  });
  // Save role in the database
  agent
    .save(agent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Input Form.",
      });
    });
};

exports.getAll = (req, res) => {
  console.log("aaya2");
  var startDate = req.body.date1;
  var endDate = req.body.date2;
  Agent.find({ createdAt: { $gte: startDate, $lt: endDate } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while getting all roles.",
      });
    });
};

exports.postAll = (req, res) => {
  var startDate = req.body.date1;
  var endDate = req.body.date2;
  Agent.find({ createdAt: { $gte: startDate, $lt: endDate } })
    .populate("city")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while getting all roles.",
      });
    });
};

exports.getState = (req, res) => {
  // Create a role
  var state = new State({
    state: req.body.state,
  });
  // Save role in the database
  state
    .save(state)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Input Form.",
      });
    });
};

exports.getCity = (req, res) => {
  // Create a role
  var city = new City({
    city: req.body.city,
  });
  // Save role in the database
  city
    .save(city)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Input Form.",
      });
    });
};

exports.cityAll = (req, res) => {
  City.find()

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while getting all Cities.",
      });
    });
};

exports.stateAll = (req, res) => {
  State.find()
    .populate("state")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while getting all States.",
      });
    });
};

// exports.inputAll = (req, res) => {
//   // Create a role
//   var sheet = new Sheet({
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     interest: req.body.interest,
//     state: req.body.state,
//     city: req.body.city,
//     zip: req.body.zip,
//     address: req.body.address,
//   });
//   // Save role in the database
//   sheet
//     .save(sheet)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Input Form.",
//       });
//     });
// };
