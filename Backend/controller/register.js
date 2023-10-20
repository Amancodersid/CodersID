const { registerModel } = require("../Models/userModel");
var jwt = require("jsonwebtoken");

let registration = async (req, res) => {
  try {
    // Destructuring user input
    let { firstname, lastname, email, password } = req.body;

    // Check if required fields are empty
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "All fields are required" });
    }

    // Perform any additional validation if needed

    // Example: Check if the email is already registered
    const existingUser = await registerModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .send({ status: false, message: "Email is already registered" });
    }

    // Create a new user
    let newuser = await registerModel.create(req.body);

    // Send success response
    res.status(201).send({
      status: true,
      message: "User registered successfully",
      user: newuser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

let login = async (req, res) => {
  try {
    // Destructuring user input
    let { email, password } = req.body;

    // Check if required fields are empty
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password are required" });
    }

    // Find user by email
    const user = await registerModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res
        .status(401)
        .json({ status: false, message: "Incorrect password" });
    }

    var token = await jwt.sign({ id: user._id }, "shhhhh");
    // Send success response

    // Add Authorization header with the JWT token
    res.setHeader("Authorization", token);

    res.status(200).json({
      status: true,
      message: "Login successful",
      user,
      token
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { registration, login };
