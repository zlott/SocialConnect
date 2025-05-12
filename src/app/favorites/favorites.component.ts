import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  likedUsers: Number[] = [];

  constructor(private userService: UserService) { } 

  ngOnInit(): void {
    this.likedUsers = this.userService.getLikedUsers();
  }

}
