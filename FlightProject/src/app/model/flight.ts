import { Klasa } from './klasa';
import { AirCompany } from './aircomapny';
import { DataFlight } from './data-flight';

export class Flight {

    public idLet : number;
    public oznakaLeta : string;
    public cena : number;

    public klasa : Klasa[];
    public aviokompanija : AirCompany;
    public podaciLeta : DataFlight;

    public getKlasas() : Klasa[] {
        return this.klasa;
    }
}
