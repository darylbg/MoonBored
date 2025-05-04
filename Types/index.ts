// types/index.ts
export type Climb = {
    // id: number;
    // name: string;
    // difficulty: string;
    message: string
  };

  export interface User {
    id: string;
    name: string;
    networkSsid: string;
    networkPassword: string;
    networkMacAddress: string;
    createdAt: Date;
    role: string;
    controllerIp: string;
  }

  export type PublicUser = Omit<User, "networkPassword" | "networkMacAddress">;

  export type UserCredentials = Pick<User, "networkSsid" | "networkPassword" | "role">;

  export type InsertUser = Omit<User, "id" | "createdAt">;

  export type UpdateUser = Partial<InsertUser>;
  