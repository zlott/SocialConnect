import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-user-card',
  imports: [CommonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() user!: User;
 
  constructor(private userService: UserService) { } 
 
  likeUser(id: number) {
    this.userService.toggleLikeUser(id);
  }

  isUserLiked(id: number): boolean {
    return this.userService.isUserLiked(id); 
  }

}
