import { Model } from "jcc-express-mvc/Eloquent";

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