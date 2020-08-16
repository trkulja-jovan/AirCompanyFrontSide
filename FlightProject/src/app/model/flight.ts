import { Klasa } from './klasa';
import { AirCompany } from './aircomapny';
import { DataFlight } from './data-flight';

export class Flight {

    public idLet : number;
    public oznakaLeta : string;

    public aviokompanija : AirCompany;
    public podaciLeta : DataFlight;
}
