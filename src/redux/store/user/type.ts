export type UserType = {
  _id: String;
  email: String;
  name: String;
  role: String;
  department: String;
};

export interface GenerateResponse {
  status: String;
  message: String;
}
