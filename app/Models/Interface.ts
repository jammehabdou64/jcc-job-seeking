import { Model } from "jcc-express-mvc/Eloquent";
import { User as UserModel } from "./User";

//
export interface JobInterface  extends Model{
 
id: string;
  title: string;
  description: string; 
  user_id: string;
  category_id: string;
  category?: {id:string,name:string, slug:string};
  type: string;
  budget_min: number;
  budget_max: number;
  tags: string;
  featured: boolean;
  status: string;
  applicants_count: number;
  views_count: number;
}



export interface UserInterface  extends UserModel{
  id?: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "employer" | "employee";
  created_at?: string;
  updated_at?: string;
}