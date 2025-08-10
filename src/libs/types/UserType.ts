interface UserData {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: "user" | "admin";
  id_number: string;
}

interface UserForm {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  id_number: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: UserData[];
  pagination: Pagination;
}
