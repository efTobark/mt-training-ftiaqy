import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Farm } from "./farm";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Consulta a endpoint con lista de granjas
   */
  getFarmsList(): Observable<Farm[]> {
    return this.http.post("/getFarms", {}).pipe(
      map((response: Farm[]) => {
        return response;
      })
    );
  }

  /**
   * Consulta a endpoint para generar error
   */
  generateException(): Observable<any> {
    return this.http.post("/throwException", {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        alert(err);
      })
    );
  }
}
