import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  async getAll() {
    try {
      return await userRepository.getAll();
    } catch (error) {
      throw new Error('Error getting all users');
    }
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  async create(userData) {
    try {
      return await userRepository.create(userData);
    } catch (error) {
      throw new Error('Error getting all users');
    }
  }

  async update(id, userData) {

    try {
      return await userRepository.update(id, userData);
    } catch (error) {
      throw new Error('Error getting all users');
    }
  }

  async delete(search) {

    try {
      return await userRepository.delete(search);
    } catch (error) {
      throw new Error('Error to delete user');
    }
  }

}

const userService = new UserService();

export { userService };
