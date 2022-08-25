
const Role = require("../models/role");
// Create and Save a new Role
exports.create = (req, res) => {
// let {role,status} = req.body;
  //Validate requests
  // if (!req.body.role) {
  //   res.status(400).send({ message: "Role can not be empty!" });
  //   return;
  // }

  Role.findOne({
    role: req.body.role
}, function(err, role) {
    if (err) {
        alert(err)
        if (role) {
            console.log('Role already exists.');
            return res.status(400).json({
              error: 'Role already exists'
          });

        }
    }
});
  // Create a role
  var role = new Role({
    role:req.body.role,
    status:req.body.status
  });
  // Save role in the database
  role
    .save(role)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Role."
      });
    });
};

// Retrieve all role from the database.
exports.findAll = (req, res) => {
    const role = req.query.role;
    var condition = role ? { role: { $regex: new RegExp(role), $options: "i" } } : {};
    Role.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err=>{
        res.status(500).send({
          message:
          err.message || "Some error occured while getting all roles."
        })
      });
      
};


// Find a single Role with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Role.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Role with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Role with id=" + id });
      });
};


// Update a Role by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Role.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Role with id=${id}. Maybe Role was not found!`
            });
          } else res.send({ message: "Role was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Role with id=" + id
          });
        });
};


// Delete a Role with the specified id in the request
exports.Delete = (req, res) => {
    const id = req.params.id;
    Role.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
          });
        } else {
          res.send({
            message: "Role was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Role with id=" + id
        });
      });
};
// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
    Role.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Role were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Role."
      });
    });
};
