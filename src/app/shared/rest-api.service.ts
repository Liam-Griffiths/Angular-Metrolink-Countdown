import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TramTimes } from '../shared/models/tram-times';
import { StopNames } from '../shared/models/stop-names';
import { Msgs } from '../shared/models/Msgs';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RestApiService {

    // Define API
    apiURL = 'https://qk0y4g19n3.execute-api.eu-west-2.amazonaws.com/dev';

    constructor(private http: HttpClient) { }

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })
    }

    // HttpClient API get() method => Fetch employees list
    getStopData(search: String): Observable<TramTimes> {
        return this.http.get<TramTimes>(this.apiURL + '/stopData/' + search)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

        getStopNames(): Observable<StopNames> {
            return this.http.get<StopNames>(this.apiURL + '/stopNames/')
                .pipe(
                    retry(1),
                    catchError(this.handleError)
                )
        }

        
        getMsgs(): Observable<Msgs> {
            return this.http.get<StopNames>(this.apiURL + '/networkMsgs/')
                .pipe(
                    retry(1),
                    catchError(this.handleError)
                )
        }

    // Error handling 
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

}