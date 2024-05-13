export interface UpdateInfoRequest {
  name: string;
}
export interface AddInfoRequest {
  name: string;
  age: number;
  birthday: DateObject;
  married: boolean;
}

export interface DateObject {
  day: number;
  month: number;
  year: number;
}
