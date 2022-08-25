const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api = require("../server/controllers/doc");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
var path = require("path");
const multer = require("multer");
const Sheet = require("./models/sheet");
const User = require("./models/user");
const pdfTemplate = require("./documents");
const pdf = require("html-pdf");
//Loads environment variables from .env file
require("dotenv").config();

const csv = require("csvtojson");

const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var sid = process.env.SID;
var auth_token = process.env.AUTH_TOKEN;
var twilio = require("twilio")(sid, auth_token);

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Connecting Database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const roleRoutes = require("./routes/role");
const inputformRoutes = require("./routes/inputform");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

//Upload file
app.post("/api/uploadfile", upload.single("csv"), (req, res) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        //   console.log(jsonObj);
        jsonObj.map(async (element) => {
          var sheet = await new Sheet({
            name: element.Name,
            email: element.Email,
            phone: element.Phone,
            interest: element.Interest,
            state: element.State,
            city: element.City,
            zip: element.Zip,
            address: element.Address,
          });
          const result = await sheet.save(sheet);
          console.log(result);
        });
        res.status(200).send("Successful!");
      });
  } catch (error) {
    console.log(error);
  }
});

//API to send text messages
app.post("/sendmsg", async (req, res) => {
  twilio.messages
    .create({
      from: "+18595493792",
      to: req.body.to,
      body: req.body.body,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//API to send Mail
app.post("/sendmail", async (req, res) => {
  const msg = {
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.text,
    // html: "<strong>Testing Mail</strong>",
  };
  sgMail
    .send(msg)
    .then((data) => {
      console.log("Email sent");
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

//PDF Create API
app.post(`/create-pdf/:id`, (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else {
        console.log(data.name);

        req.body = {
          name: data.name,
          employeeid: data.employeeid,
        };
        pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
          if (err) {
            return console.log("error");
          }
          res.send(Promise.resolve());
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
});

//PDF Download API
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", roleRoutes);
app.use("/api", api);
app.use("/api", inputformRoutes);

//Establishing server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
