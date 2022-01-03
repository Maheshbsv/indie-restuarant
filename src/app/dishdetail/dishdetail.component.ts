import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from "../shared/dish"
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment'
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dishIds!: string[];
  dish!: Dish;
  prev!: string;
  next!: string;
  commentsForm!: FormGroup;
  comment!: Comment;
  errorMessage!: string;

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL: string) {
    this.commentsForm = this.fb.group({
      "author": ["", [Validators.required, Validators.minLength(2)]],
      "rating": 5,
      "comment": ["", Validators.required]
    });

    this.commentsForm.valueChanges
      .subscribe({
        next: data => this.onValueChanged(data),
        error: errMess => this.errorMessage = <any>errMess
      });

    this.onValueChanged();
  }
  // TODO: How is this inbuilt activated route working with prev and next buttons
  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe({
        next: dish => {
          this.dish = dish;
          this.setPrevNext(dish.id);
        },
        error: errMess => this.errorMessage = <any>errMess
      });
  }

  formErrors: any = {
    'author': '',
    'comment': ''
  };

  validationMessages: any = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long.',

    },
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'Comment must be at least 2 characters long.',
    }
  };

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    console.log('index: ' + index);
    console.log('dishIds length ' + this.dishIds.length)
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentsForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);

    console.log(this.comment);
    //Reset the values once stored into data storage
    this.commentsForm.reset({
      'author': '',
      'comment': '',
      'rating': 5
    });

  }

  onValueChanged(data?: any) {
    if (!this.commentsForm) { return; }
    const form = this.commentsForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    this.comment = form.value;
  }

}
