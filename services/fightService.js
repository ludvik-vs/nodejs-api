import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  async getAll() {
    return fightRepository.getAll();
  }

  async getById(id) {
    return fightRepository.getById(id);
  }

  async create(fightData) {
    return fightRepository.create(fightData);
  }

  async update(id, fightData) {
    return fightRepository.update(id, fightData);
  }

  async delete(id) {
    return fightRepository.delete(id);
  }
}

const fightersService = new FightersService();

export { fightersService };
