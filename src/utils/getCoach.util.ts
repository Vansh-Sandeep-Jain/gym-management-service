import axios from "axios";
import { IUser } from "../types/users.types";
import { URL_user_management_service } from "../config/constants";

export const getAllCoaches = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get<IUser[]>(`${URL_user_management_service}/users`);
    const coaches = response.data.filter(
      (user: IUser) => user.role === "coach",
    );
    console.log(coaches);
    return coaches;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [] as IUser[];
  }
};

export const getCoachesById = async (id: string): Promise<IUser> => {
  try {
    const response = await axios.get<IUser>(
      `${URL_user_management_service}/users/${id}`,
    );
    if (response.data.role !== "coach") {
      throw new Error("User is not a coach");
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {} as IUser;
  }
};
