import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  user$!: Observable<User>;

  constructor(private userService: UserService, private route: ActivatedRoute) { } 

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de l'utilisateur depuis la route
    if (userId) {
      this.user$ = this.userService.getUserById(+userId); // Convertir l'ID en nombre
    } else {
      console.error('User ID is not provided in the route.');
    }
  }

}
