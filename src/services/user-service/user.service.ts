import { User } from "@/shared/intreface/user.interface";
import { accessApi } from "@/$api/axios.api";

class UserService {
  async profile(): Promise<User> {
    const { data } = await accessApi<User>({
      method: "GET",
      url: "/user/info-profile",
    });
    return data;
  }
}

export default new UserService();
