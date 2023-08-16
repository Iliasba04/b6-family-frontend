import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  erreur!: string;

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // get current user token
    let currentToken = localStorage.getItem('access_token');
      if (currentToken) {
        let headers = request.headers
          .set('Access-Control-Allow-Origin', '*')
          .set('x-access-token', currentToken)
          .set('Accept', 'application/json')
        request = request.clone({ headers });
      } else {
        let headers = request.headers
          .set('Access-Control-Allow-Origin', '*')
          .set('Accept', 'application/json')
        request = request.clone({ headers });
      }
    return next.handle(request).pipe(
      tap({
        next : () => {},
        error : (err) => {

          if(err instanceof HttpErrorResponse){
                if(err.status === 401){
                  // delete user infos
                localStorage.clear();
                  // navigate to login page
                  this.router.navigate(['/']);
                  return
                }
                const message = err.error.message;
                switch (message) {

                  // USER HTTP ERRORS
                  case 'Cet utilisateur existe déja':
                      Swal.fire('Inscription', 'Cet utilisateur existe déja','error');
                    break;
                  
                  case 'Utilisateur introuvable':
                      Swal.fire('Connexion', 'Utilisateur introuvable','error');
                    break;
                  case 'Utilisateur non trouvé.':
                      Swal.fire('Modification', 'Utilisateur non trouvé.','error');
                    break;
                  
                  case 'Mot de passe invalide':
                      Swal.fire('Connexion', 'Mot de passe invalide','error');
                    break;
                  
                  case 'Ce nom d\'utilisateur existe déja':
                      Swal.fire('Modification', 'Ce nom d\'utilisateur existe déja','error');
                    break;
                  case 'Utilisateur bloqué.':
                      Swal.fire('Modification', 'Cet utilisateur est bloqué.','error');
                    break;

                  // DUE HTTP ERRORS
                  case 'Cet utilisateur a déjà cotisé':
                      Swal.fire('Cotisation', 'Cet utilisateur a déjà cotisé','error');
                    break;
                  
                  default :
                    Swal.fire('Erreur', 'Une erreur est survenue', 'error');
                    break
                }
              }
            }
        })
    );
  }
}
