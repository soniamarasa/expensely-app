import { ICategory } from './ICategory';
import { ITag } from './ITag';

export interface IExpense {
  id?: string;
  name?: string;
  value?: number;
  category?: ICategory;
  tag?: ITag;
  date?: Date;
  userId?: string;
  description: string;
  color: string;
}
