import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

// Middleware to validate fighter creation
const createFighterValid = async (req, res, next) => {
  let { id, name, health = 85, power, defense } = req.body;

  // Validate required fields
  for (const key in FIGHTER) {
    if (key !== 'id' && key !== 'health' && !req.body[key]) {
      return res.status(400).json({ error: true, message: `${key} is required` });
    }
  }

  // Validate that ID is not present
  if (id) {
    return res.status(400).json({ error: true, message: "Id should not be present" });
  }

  // Validate no additional fields
  const allowedFields = Object.keys(FIGHTER);
  for (const key in req.body) {
    if (!allowedFields.includes(key)) {
      return res.status(400).json({ error: true, message: `Field ${key} is not allowed` });
    }
  }

  // Convert to numbers where necessary
  health = Number(health);
  power = Number(power);
  defense = Number(defense);

  // Validate health (must be a number between 80 and 120)
  if (isNaN(health) || health < 80 || health > 120) {
    return res.status(400).json({ error: true, message: "Health must be between 80 and 120" });
  }

  // Validate power (must be a number between 1 and 100)
  if (isNaN(power) || power < 1 || power > 100) {
    return res.status(400).json({ error: true, message: "Power must be between 1 and 100" });
  }

  // Validate defense (must be a number between 1 and 10)
  if (isNaN(defense) || defense < 1 || defense > 10) {
    return res.status(400).json({ error: true, message: "Defense must be between 1 and 10" });
  }

  // Check for unique name
  const existingFighterByName = await fighterService.getOne(name);
  if (existingFighterByName) {
    return res.status(400).json({ error: true, message: "Name is already in use" });
  }

  next();
};

// Middleware to validate fighter updates
const updateFighterValid = async (req, res, next) => {
  let { id, name, health, power, defense } = req.body;

  // Validate that ID is not present
  if (id) {
    return res.status(400).json({ error: true, message: "Id should not be present" });
  }

  // Validate that at least one field is present
  const hasAtLeastOneField = Object.keys(FIGHTER).some(key => key !== 'id' && req.body[key]);
  if (!hasAtLeastOneField) {
    return res.status(400).json({ error: true, message: "At least one field must be present" });
  }

  // Validate no additional fields
  const allowedFields = Object.keys(FIGHTER);
  for (const key in req.body) {
    if (!allowedFields.includes(key)) {
      return res.status(400).json({ error: true, message: `Field ${key} is not allowed` });
    }
  }

  // Convert to numbers where necessary
  if (health !== undefined) health = Number(health);
  if (power !== undefined) power = Number(power);
  if (defense !== undefined) defense = Number(defense);

  // Validate health (must be a number between 80 and 120)
  if (health !== undefined && (isNaN(health) || health < 80 || health > 120)) {
    return res.status(400).json({ error: true, message: "Health must be between 80 and 120" });
  }

  // Validate power (must be a number between 1 and 100)
  if (power !== undefined && (isNaN(power) || power < 1 || power > 100)) {
    return res.status(400).json({ error: true, message: "Power must be between 1 and 100" });
  }

  // Validate defense (must be a number between 1 and 10)
  if (defense !== undefined && (isNaN(defense) || defense < 1 || defense > 10)) {
    return res.status(400).json({ error: true, message: "Defense must be between 1 and 10" });
  }

  // Check for unique name
  if (name) {
    const existingFighterByName = await fighterService.getOne(name);
    if (existingFighterByName && existingFighterByName.id !== req.params.id) {
      return res.status(400).json({ error: true, message: "Name is already in use" });
    }
  }

  next();
};

export { createFighterValid, updateFighterValid };
