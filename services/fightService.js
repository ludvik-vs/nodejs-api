import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  async getAll() {
    return fightRepository.getAll();
  }

  async getOne(id) {
    return fightRepository.getOne(id);
  }

  async create(fightData) {
    return fightRepository.create(fightData);
  }

  async update(id, fightData) {
    return fightRepository.update(id, fightData);
  }

  async delete(id) {
    try{

      return await fightRepository.delete(id);
    } catch(error){
      throw new Error('Error to delete fighter');
    }
  }
}

const fightersService = new FightersService();

export { fightersService };
