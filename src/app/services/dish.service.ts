import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id));
  }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
  }

  getFeaturedDishes(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
}
