import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

})
export class MenuComponent implements OnInit {

  dishes!: Dish[];
  errorMessage!: string;

  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL: string) { }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe({
        next: (dishes) => this.dishes = dishes,
        error: (errorMess) => this.errorMessage = <any>errorMess
      });
  }

}