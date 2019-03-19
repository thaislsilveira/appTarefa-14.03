import { Frete } from './../frete';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {map} from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs';


//Uso de dependência para utilizar o serviço
//precisa-se apenas injetar uma instância no construtor
//que irá consumir esse serviço

@Injectable()
export class FreteService {
    //propriedade com a url com o arquivo JSON
    private _Url = 'http://127.0.0.1:8887/frete.json';

    constructor(private _http: Http) { }
    
    getFrete(cep: string): Observable<Frete> {
        return this._http.get(this._Url)
            .pipe(map((response: Response) => <Frete>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}