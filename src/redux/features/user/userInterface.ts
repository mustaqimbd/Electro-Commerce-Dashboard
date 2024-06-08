export type TUser = {
  _id: string;
  uid: string;
  permissions?: string[];
  role: string;
  phoneNumber: string;
  email: string;
  status: string;
  fullName: string;
  profilePicture?: string;
};

export type TUsersInitialState = {
  users: TUser[];
  isUsersLoading: boolean;
};
