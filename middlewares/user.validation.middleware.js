import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

// Middleware to validate user creation
const createUserValid = async (req, res, next) => {
  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  // Validate required fields
  for (const key in USER) {
    if (key !== 'id' && !req.body[key]) {
      return res.status(400).json({ error: true, message: `${key} is required` });
    }
  }

  // Validate that ID is not present
  if (id) {
    return res.status(400).json({ error: true, message: "Id should not be present" });
  }

  // Validate all fields required except id
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: true, message: "All fields are required except id" });
  }

  // Validate no additional fields
  const allowedFields = Object.keys(USER);
  for (const key in req.body) {
    if (!allowedFields.includes(key)) {
      return res.status(400).json({ error: true, message: `Field ${key} is not allowed` });
    }
  }

  // Validate email format
  if (typeof email !== 'string' || !email.endsWith("@gmail.com")) {
    return res.status(400).json({ error: true, message: "Email must be a @gmail.com address" });
  }

  // Validate phone number format
  if (typeof phoneNumber !== 'string' || !phoneNumber.startsWith("+380") || phoneNumber.length !== 13) {
    return res.status(400).json({ error: true, message: "Phone number must be in format +380xxxxxxxxx" });
  }

  // Validate password length
  if (typeof password !== 'string' || password.length < 3) {
    return res.status(400).json({ error: true, message: "Password must be at least 3 characters long" });
  }

  // Check for unique email
  const existingUserByEmail = await userService.search(email);
  if (existingUserByEmail) {
    return res.status(400).json({ error: true, message: "Email is already in use" });
  }

  // Check for unique phone number
  const existingUserByPhoneNumber = await userService.search(phoneNumber);
  if (existingUserByPhoneNumber) {
    return res.status(400).json({ error: true, message: "Phone number is already in use" });
  }

  next();
};

// Middleware to validate user updates
const updateUserValid = async (req, res, next) => {
  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  // Validate that ID is not present
  if (id) {
    return res.status(400).json({ error: true, message: "Id should not be present" });
  }

  // Validate that at least one field is present
  const hasAtLeastOneField = Object.keys(USER).some(key => key !== 'id' && req.body[key]);
  if (!hasAtLeastOneField) {
    return res.status(400).json({ error: true, message: "At least one field must be present" });
  }

  // Validate no additional fields
  const allowedFields = Object.keys(USER);
  for (const key in req.body) {
    if (!allowedFields.includes(key)) {
      return res.status(400).json({ error: true, message: `Field ${key} is not allowed` });
    }
  }

  // Validate email format
  if (email && (typeof email !== 'string' || !email.endsWith("@gmail.com"))) {
    return res.status(400).json({ error: true, message: "Email must be a @gmail.com address" });
  }

  // Validate phone number format
  if (phoneNumber && (typeof phoneNumber !== 'string' || !phoneNumber.startsWith("+380") || phoneNumber.length !== 13)) {
    return res.status(400).json({ error: true, message: "Phone number must be in format +380xxxxxxxxx" });
  }

  // Validate password length
  if (password && (typeof password !== 'string' || password.length < 3)) {
    return res.status(400).json({ error: true, message: "Password must be at least 3 characters long" });
  }

  // Check for unique email
  if (email) {
    const existingUserByEmail = await userService.search(email);
    if (existingUserByEmail && existingUserByEmail.id !== req.params.id) {
      return res.status(400).json({ error: true, message: "Email is already in use" });
    }
  }

  // Check for unique phone number
  if (phoneNumber) {
    const existingUserByPhoneNumber = await userService.search(phoneNumber);
    if (existingUserByPhoneNumber && existingUserByPhoneNumber.id !== req.params.id) {
      return res.status(400).json({ error: true, message: "Phone number is already in use" });
    }
  }

  next();
};

export { createUserValid, updateUserValid };
