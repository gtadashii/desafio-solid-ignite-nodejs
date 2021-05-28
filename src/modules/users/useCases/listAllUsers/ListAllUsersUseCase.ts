import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const search_user = this.usersRepository.findById(user_id);

    if (!search_user) {
      throw new Error("You must be a valid user to list all users!");
    }

    const isAdmin = search_user.admin;

    if (!isAdmin) {
      throw new Error("You must be an admin to list all users!");
    }

    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
