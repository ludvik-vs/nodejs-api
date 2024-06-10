import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// Get all fighters
router.get("/", async (req, res, next) => {
  try {
    const fighters = await fighterService.getAll();
    res.data = fighters;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Get fighter by ID
router.get("/:id", async (req, res, next) => {
  try {
    const fighter = await fighterService.getById(req.params.id);
    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Create new fighter
router.post("/", createFighterValid, async (req, res, next) => {
  try {
    const fighter = await fighterService.create(req.body);
    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Update fighter by ID
router.patch("/:id", updateFighterValid, async (req, res, next) => {
  try {
    const fighter = await fighterService.update(req.params.id, req.body);
    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Remove fighter by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const fighter = await fighterService.delete(req.params.id);
    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
