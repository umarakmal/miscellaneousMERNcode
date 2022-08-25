const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
let path = require("path");

// exports.upload = multer({storage:storage})

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  const user = req.query.user;
  // var condition = user ? { user: { $regex: new RegExp(user), $options: "i" } } : {};
  var condition = User.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "Role_details",
      },
    },
  ]);
  User.find(condition)
    .populate("role")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

//Retrive a user by ID
exports.findOne = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .populate("role")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      // user.hashed_password = undefined;
      // user.salt = undefined;
      res.json(user);
    });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  //  if(!req.file){
  //    return res.status(400).send({
  //      message:"File is empty"
  //    })
  //  }
  const id = req.params.id;

  const { name, employeeid, email, role, password } = req.body;
  // const name = req.body.name
  // const email = req.body.email
  // const employeeid = req.body.employeeid
  // const role = req.body.role
  // const password = req.body.password
  const photo = "";
  console.log(req.body);
  User.findByIdAndUpdate(
    id,
    { name, employeeid, email, role, password, photo },
    { useFindAndModify: false }
  )
    .populate("role")
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Employee was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id,
      });
    });
};

// exports.update = (req,res) =>{
//   if(!req.body){
//     res.status(400).send({
//       message: "Data updated can not be empty"
//     })
//   }
//   console.log(photo)
//   User.findById(req.params.id)
//   .then((user)=>{
//     user.name= req.body.name;
//     user.employeeid= req.body.employeeid;
//     user.email = req.body.email;
//     user.photo = req.file;
//     user.role = req.body.role;
//     user.password = req.body.password;

//     user.save()

//     .then(()=>res.json("User Updated Successfully"))
//     .catch((err)=>res.status(400).json(`Error:${err}`))
//   })
//   .catch((err)=>res.status(400).json(`Error:${err}`))
// }

// Delete a User with the specified id in the request
exports.Delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
