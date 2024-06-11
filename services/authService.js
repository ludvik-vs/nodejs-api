import { userRepository } from "../repositories/userRepository.js";

class AuthService {
  async search(search) {
    const item = await userRepository.getOne(search);
    return item;
  }

  async login(email, password) {
    // Validate email and password format
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Check if user with the provided email exists
    const user = await this.search({ email }); // Passing email as an object
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the provided password matches the user's password
    if (password !== user.password) {
      throw new Error("Incorrect password");
    }

    // If everything is valid, return the user
    return user;
  }
}

const authService = new AuthService();

export { authService };

