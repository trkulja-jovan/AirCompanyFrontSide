export class SearchFlight{

    constructor(
        public idAerodromOd : number,
        public idAerodromDo : number,
        public datumPolaska : Date,
        public datumPovratka : Date
    ){

    }

    static createDefaultValues() : SearchFlight {
        return new SearchFlight(1, 2, new Date(), new Date());
    }

}
