import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  imports: [ CommonModule, UserCardComponent, MatProgressSpinnerModule ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$!: Observable<User[]>;
  // usersMock!: User[];
  isLoading = true; // Variable pour suivre l'état de chargement

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {  
    this.users$ = this.userService.getUsers();
    // this.usersMock = this.userService.getUsersMock();
    this.users$.subscribe(() => {
      this.isLoading = false; // Désactiver le chargement une fois les données récupérées
    });
  } 

}
