import { Comment } from "./comment";

export class Dish {
    id!: string;
    name!: string;
    description!: string;
    image!: string;
    category!: string;
    featured!: boolean;
    label!: string;
    price!: string;
    comments!: Comment[];
}