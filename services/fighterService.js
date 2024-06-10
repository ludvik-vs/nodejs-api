import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  async getAll() {
    return fighterRepository.getAll();
  }

  async getById(id) {
    return fighterRepository.getById(id);
  }

  async create(fightData) {
    return fighterRepository.create(fightData);
  }

  async update(id, fightData) {
    return fighterRepository.update(id, fightData);
  }

  async delete(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
