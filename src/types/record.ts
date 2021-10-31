import { ThunkDispatch } from "redux-thunk";
import { Category } from "../types/category";

export interface Record {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}
export interface RecordState {
  data: Record[];
  loading: boolean;
  error: string;
}
export interface RecordForm {
  title: string;
  amount: number;
  category_id: number;
}

interface GET_START {
  type: "GET_RECORDS_START";
}
interface GET_SUCCESS {
  type: "GET_RECORDS_SUCCESS";
  payload: Record[];
}
interface GET_ERROR {
  type: "GET_RECORDS_ERROR";
}
interface ADD_START {
  type: "ADD_RECORD_START";
}
interface ADD_SUCCESS {
  type: "ADD_RECORD_SUCCESS";
  payload: Record;
}
interface ADD_ERROR {
  type: "ADD_RECORD_ERROR";
}
// interface UPDATE_START {
//   type: "UPDATE_CATEGORY_START";
// }
// interface UPDATE_SUCCESS {
//   type: "UPDATE_CATEGORY_SUCCESS";
//   payload: Category;
// }
// interface UPDATE_ERROR {
//   type: "UPDATE_CATEGORY_ERROR";
// }
// interface DELETE_START {
//   type: "DELETE_CATEGORY_START";
// }
// interface DELETE_SUCCESS {
//   type: "DELETE_CATEGORY_SUCCESS";
//   payload: number;
// }
// interface DELETE_ERROR {
//   type: "DELETE_CATEGORY_ERROR";
// }
export type RecordAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR;

export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;
