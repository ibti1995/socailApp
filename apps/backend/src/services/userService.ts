import crudHandler from '../helpers/crudHandler';
import { IUser, User } from '../modules/user/userModel';
 
interface UserData {
  fullName: string;
}
class UserService {
  // Create a new user
  async createUser(userData: UserData) {
    try {
      const user = await crudHandler.create<IUser>({
        model: User,
        data: { ...userData },
      });
      return user;
    } catch (err) {
      return err
    }
  }

  // Get a list of users with optional filters, pagination, sorting, etc.
  async getUsers(
    populate?: string,
    filters: Partial<IUser> = {},
    limit?: number,
    offset?: number,
    sort?: string,
    select?: string
  ) {
    try {
      const users = await crudHandler.getList<IUser>({
        populate: populate,
        model: User,
        filters,
        limit: limit || 10,
        offset: offset || 0,
        sort: sort || '-createdAt',
        select: select,
      });
      return users;
    } catch (err) {
      return { error: err };
    }
  }

  // Get a user by their ID
  async getUserById(userId: string) {
    try {
      const user = await crudHandler.getById<IUser>({
        model: User,
        id: userId,
      });
      return user;
    } catch (err) {
      return { error: err };
    }
  }

  // Get a single user by filters (e.g. find by name)
  async getUserByName(fullName: string) {
    try {
      const user = await crudHandler.getOne<IUser>({
        model: User,
        filters: { fullName },
      });
      return user;
    } catch (err) {
      return  err ;
    }
  }

  // Update a user by their ID
  async updateUser(user: string, userData: Partial<UserData>) {
    try {
      const updatedUser = await crudHandler.update<IUser>({
        model: User,
        id: user,
        data: userData,
        populate: '',
        select: '-password',
      });
      return updatedUser;
    } catch (err) {
      return { error: err };
    }
  }

  // Delete a user by their ID
  async deleteUser(user: string) {
    try {
      const result = await crudHandler.delete<IUser>({
        model: User,
        filters: { _id: user },
      });
      return result;
    } catch (err) {
      return { error: err };
    }
  }

  // Count users with optional filters
  async countUsers(filters: Partial<IUser> = {}) {
    try {
      const count = await crudHandler.getCounts<IUser>({
        model: User,
        filters,
      });
      return count;
    } catch (err) {
      return { error: err };
    }
  }
}

export default new UserService();
