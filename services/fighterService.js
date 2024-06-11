import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  async getAll() {
    return fighterRepository.getAll();
  }

  async getOne(id) {
    return fighterRepository.getOne(id);
  }

  async create(fightData) {
    return fighterRepository.create(fightData);
  }

  async update(id, fightData) {
    return fighterRepository.update(id, fightData);
  }

  async delete(id) {
    try{
      return await fighterRepository.delete(id);
    } catch(error){
      throw new Error('Error to delete fighter');
    }
  }
}

const fighterService = new FighterService();

export { fighterService };
