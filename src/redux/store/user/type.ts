export type UserType = {
  _id: string;
  email: string;
  username: string;
  role: string;
  department: string;
};

export interface GenerateResponse {
  status: string;
  message: string;
}
