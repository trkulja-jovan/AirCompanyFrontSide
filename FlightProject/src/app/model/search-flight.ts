export class SearchFlight{

    constructor(
        public idAerodromOd : number,
        public idAerodromDo : number,
        public tipPutovanja : number,
        public datumPolaska : Date,
        public datumPovratka : Date,
        public brPutnika : number,
        public brDece : number,
        public klasa : string
    ){

    }

    static createDefaultValues() : SearchFlight {
        return new SearchFlight(1, 2, 0, new Date(), new Date(), 1, 0, "Ekonomska klasa");
    }

}
