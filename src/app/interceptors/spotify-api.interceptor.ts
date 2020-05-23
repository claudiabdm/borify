import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, empty, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { SpotifyApiService } from '../services/spotify-api.service';
import { Router } from '@angular/router';

@Injectable()
export class SpotifyApiInterceptor implements HttpInterceptor {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private spotifyApi: SpotifyApiService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authUrl = 'https://accounts.spotify.com/api/token';
    const token = this.storage.get('token');

    if (request.url === authUrl || !token) {
      return next.handle(request);
    }

    return next.handle(this.addToken(request, token))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            window.alert('Invalid token, retrieving a new one.')
            location.reload();
          }
          return empty();
        })
      )
  }

  private addToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({ setHeaders: { Authorization: token } });
  }

}
