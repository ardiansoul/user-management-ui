import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export interface ApiObjectPath {
  method: string;
  url: string;
  baseURL?: string; // Optional baseURL for specific paths
}

export const api = async ({
  signal,
  path,
  data,
  params,
}: {
  signal?: AbortSignal;
  path: ApiObjectPath;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
}) => {
  try {
    const result = await instance({
      signal,
      baseURL: path.baseURL,
      method: path.method,
      url: path.url,
      data: data,
      params: params,
    });

    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Re-throw the error for further handling
  }
};
