const baseUrl:string = "https://localhost:7071"
const service = {
  async request<T>(
    url: string,
    method: string = "GET",
    data?: any
  ): Promise<T> {
    try {
      console.log(`${baseUrl}${url}`)
      const response = await fetch(`${baseUrl}${url}`, {
        method: method,
        body: data ? JSON.stringify(data) : undefined,
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getItems<T>(endPoint:string): Promise<T[]> {
    const items = await service.request<T[]>(endPoint);
    return items;
  },
  async getSingleItem<T>(endPoint:string): Promise<T> {
    const item = await service.request<T>(endPoint);
    return item;
  },
  async getById<T>(id: string, endPoint:string): Promise<T> {
    const item = await service.request<T>(`${endPoint}/${id}`);
    return item;
  },
  async create<T>(data: any, endPoint:string): Promise<T> {
    const item = await service.request<T>(endPoint, "POST", data);
    return item;
  },
  async update<T>(id: string, data: any, endPoint:string): Promise<T> {
    const item = await service.request<T>(`${endPoint}/${id}`, "PUT", data);
    return item;
  },
  async delete(id: string, endPoint:string): Promise<void> {
    await service.request(`${endPoint}/${id}`, "DELETE");
  },
};

export default service;
