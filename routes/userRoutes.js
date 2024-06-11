import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.data = users;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }

}, responseMiddleware);

// Get user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.search(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Create new user
router.post("/", createUserValid, async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Update data user by ID
router.patch("/:id", updateUserValid, async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    if (!user) {
      throw new Error("User not found");
    }
    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Remove user by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await userService.delete(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
