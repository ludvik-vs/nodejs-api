import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createFighterValid, updateFighterValid } from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

// Get all combats
router.get("/", async (req, res, next) => {
  try {
    const fights = await fightersService.getAll();
    res.data = fights;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Get combat by ID
router.get("/:id", async (req, res, next) => {
  try {
    const fight = await fightersService.getOne(req.params.id);
    res.data = fight;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Create new combat
router.post("/", createFighterValid, async (req, res, next) => {
  try {
    const fight = await fightersService.create(req.body);
    res.data = fight;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Update combat by ID
router.patch("/:id", updateFighterValid, async (req, res, next) => {
  try {
    const fight = await fightersService.update(req.params.id, req.body);
    res.data = fight;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Remove combat by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const fight = await fightersService.delete(req.params.id);
    res.data = fight;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
