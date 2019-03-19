import { Frete } from 'src/frete';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class FreteService {
    private _Url = 'http://127.0.0.1:8887/frete.json';

    constructor(private _http: Http) { }

    //Método possui o parâmetro
    //Observable sserve para emitir uma notificação toda vez
    //em que houver alteração em seu item, no caso, o frete.
    //Frete -> Objeto do tipo frete

    getFrete(cep: string): Observable<Frete> {
        return this._http.get(this._Url).pipe(map((res: Response) => res.json()));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}