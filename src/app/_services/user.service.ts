import { HttpClient, HttpClientModule, HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl ='https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(`${this.apiUrl}?page=1`).pipe(
      map(response => response.data), // Extrait uniquement le tableau "data"
      retry(3),
      catchError((error) => this.handleError(error)),
     
      delay(1000)  // Ajoute un délai avant d'émettre la réponse, pour tester le spinner
    );
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data) // Extrait uniquement l'utilisateur
    );
  }

  public getUsersMock(): User[] {
    let x: User[] = [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://reqres.in/img/faces/9-image.jpg"
        },
        {
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": "https://reqres.in/img/faces/10-image.jpg"
        },
        {
            "id": 11,
            "email": "george.edwards@reqres.in",
            "first_name": "George",
            "last_name": "Edwards",
            "avatar": "https://reqres.in/img/faces/11-image.jpg"
        },
        {
            "id": 12,
            "email": "rachel.howell@reqres.in",
            "first_name": "Rachel",
            "last_name": "Howell",
            "avatar": "https://reqres.in/img/faces/12-image.jpg"
        }
    ];
    return x;
  }

  public toggleLikeUser(id: number): void {
    let likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    if (likedUsers.includes(id)) {
      likedUsers = likedUsers.filter((userId: number) => userId !== id);
    } else {
      likedUsers.push(id);
    }
    localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
  }

  public isUserLiked(id: number): boolean {
    const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    return likedUsers.includes(id);
  }
  
  public getLikedUsers(): number[] { 
    const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    return likedUsers;
  }


  private handleError(error: HttpErrorResponse) {  
    console.error('An error occurred:', error);
    return throwError(() => 'Something bad happened; please try again later.');
  }

}
