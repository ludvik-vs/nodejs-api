import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  // Validate all fields required 
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: "All fields are required except id" });
  }

  // Validate no include ID field
  if (id) {
    return res.status(400).json({ message: "Id should not be present" });
  }

  // Validate email format
  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Email must be a @gmail.com address" });
  }

  // Validate phone number
  if (!phoneNumber.startsWith("+380") || phoneNumber.length !== 13) {
    return res.status(400).json({ message: "Phone number must be in format +380xxxxxxxxx" });
  }

  // Validate password length
  if (password.length < 3) {
    return res.status(400).json({ message: "Password must be at least 3 characters long" });
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  // Validate field ID no include
  if (id) {
    return res.status(400).json({ message: "Id should not be present" });
  }

  // Validate that at least one field is present
  if (!firstName && !lastName && !email && !phoneNumber && !password) {
    return res.status(400).json({ message: "At least one field must be present" });
  }

  // Validate email format
  if (email && !email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Email must be a @gmail.com address" });
  }

  // Validate phone number format
  if (phoneNumber && (!phoneNumber.startsWith("+380") || phoneNumber.length !== 13)) {
    return res.status(400).json({ message: "Phone number must be in format +380xxxxxxxxx" });
  }

  // Validate password length
  if (password && password.length < 3) {
    return res.status(400).json({ message: "Password must be at least 3 characters long" });
  }
  next();
};

export { createUserValid, updateUserValid };
