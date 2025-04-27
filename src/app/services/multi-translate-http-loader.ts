import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private resources: { prefix: string; suffix: string }[]
  ) {}

  getTranslation(lang: string): Observable<any> {
    const requests = this.resources.map(resource => {
      const path = `${resource.prefix}${lang}${resource.suffix}`;
      return this.http.get<any>(path).pipe(
        catchError(() => of({})) // if a file doesn't exist, ignore it
      );
    });

    return forkJoin(requests).pipe(
      map(response => Object.assign({}, ...response)) // merge all responses
    );
  }
}
