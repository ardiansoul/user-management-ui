import type Pagination from "../interface/pagination";
import type User from "../interface/user";
import { api } from "../utils/api";

export default class UserService {
  static getUser(userId: string) {
    return api({
      path: {
        method: "GET",
        url: `/users/${userId}`,
      },
    });
  }

  static async getUsers(
    signal: AbortSignal,
    searchTerm: string,
    pagination: Pagination
  ): Promise<{
    data: User[];
    count: number;
  }> {
    const result = await api({
      signal,
      path: {
        method: "GET",
        url: "/users",
      },
      params: {
        name_like: searchTerm,
        _start: pagination?.page,
        _limit: pagination?.pageSize,
      },
    });

    return {
      data: result.data,
      count: result.headers["x-total-count"],
    };
  }

  static createUser(data: Pick<User, "name" | "email">) {
    return api({
      path: {
        method: "POST",
        url: "/users",
      },
      data,
    });
  }

  static updateUser(userId: string, data: Pick<User, "name" | "email">) {
    return api({
      path: {
        method: "PUT",
        url: `/users/${userId}`,
      },
      data,
    });
  }

  static deleteUser(userId: string) {
    return api({
      path: {
        method: "DELETE",
        url: `/users/${userId}`,
      },
    });
  }
}
