import { Injectable } from '@angular/core';
import { iLeader } from '../shared/iLeader';
import { LEADERS } from '../shared/leaders';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): iLeader[] {
    return LEADERS;
  }

  getLeader(id: string): iLeader {
    return LEADERS.filter((leader) => leader.id === id)[0];
  }

  getFeaturedLeader(): iLeader {
    return LEADERS.filter((leader) => leader.featured)[0]
  }
}
