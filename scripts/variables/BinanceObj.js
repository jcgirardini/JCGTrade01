class ClsTime {
    constructor() {
        this.serverTime = new Date();
    }
}

class ClsSymbol {
    constructor() {
        this.symbol = "ETHBTC";
        this.status = "TRADING";
        this.baseAsset = "ETH";
        this.baseAssetPrecision = 8;
        this.quoteAsset = "BTC";
        this.quotePrecision = 8; // will be removed in future api versions (v4+)
        this.quoteAssetPrecision = 8;
        this.baseCommissionPrecision = 8;
        this.quoteCommissionPrecision = 8;
        this.orderTypes = ["LIMIT", "LIMIT_MAKER", "MARKET", "STOP_LOSS", "STOP_LOSS_LIMIT", "TAKE_PROFIT", "TAKE_PROFIT_LIMIT"];
        this.icebergAllowed = true;
        this.ocoAllowed = true;
        this.quoteOrderQtyMarketAllowed = true;
        this.isSpotTradingAllowed = true;
        this.isMarginTradingAllowed = true;
        this.filters = [];
        this.permissions = ["SPOT", "MARGIN"];
    }
};

class ClsPrice {
    constructor() {
        this.symbol = "";
        this.price = 0;
    }
}

class ClsExchgInfo {
    constructor() {
        this.timezone = "UTC";
        this.serverTime = "1565246363776";
        this.rateLimits = [];
        this.exchangeFilters = [];
        this.symbols = [];
    }
}

class ClsOrderBook {
    constructor() {
        this.lastUpdateId = 1027024;
        this.bids = [];         // array of arrays [PRICE, QTY]
        this.asks = [];         // array of arrays [PRICE, QTY]
    }
}

class ClsCandel {
    constructor() {
        this.openTime = 0;
        this.open = 0;
        this.high = 0;
        this.low = 0;
        this.close = 0;
        this.volume = 0;
        this.closeTime = 0;
        this.quoteAssetVolume = 0;
        this.numberOfTrades = 0;
        this.takerBuyBaseVol = 0;
        this.takerBuyQuoteVol = 0;
        this.ignore = 0;
    }
}

class ClsCandels {
    constructor(candleArray = []) {
        this.candles = candleArray;
    }

}

export { ClsTime, ClsSymbol, ClsPrice, ClsExchgInfo, ClsOrderBook, ClsCandel, ClsCandels };           