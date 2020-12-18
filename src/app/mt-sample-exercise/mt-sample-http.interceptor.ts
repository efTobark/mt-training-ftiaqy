import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { MOCK_DATA } from "./mock-data";

export class MtSampleHttpInterceptor implements HttpInterceptor {
  /** Interceptor para simular peticiones a API */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === "/getFarms") {
      const data = [];
      MOCK_DATA.forEach(d => {
        data.push({
          id: d.Id,
          farmNo: d.FarmNo,
          farmName: d.FarmName,
          address: d.Address,
          activeDate: new Date(d.ActiveDate)
        });
      });
      return new Observable(observer => {
        observer.next(new HttpResponse<any>({ body: data, status: 200 }));
        observer.complete();
      });
    } else if (req.url === "/throwException") {
      throw new Error("An intentional exception has been thrown.");
    } else {
      return next.handle(req);
    }
  }
}
