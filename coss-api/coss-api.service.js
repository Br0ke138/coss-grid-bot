"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = __importStar(require("request-promise-native"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var querystring_1 = __importDefault(require("querystring"));
var CossApiService = /** @class */ (function () {
    function CossApiService(publicKey, privateKey) {
        this.TRADE = "https://trade.coss.io/c/api/v1/";
        this.ENGINE = "https://engine.coss.io/api/v1/";
        this.EXCHANGE = "https://exchange.coss.io/api/";
        this.WEB = "https://trade.coss.io/c/";
        this.publicConfig = {
            json: true
        };
        this.privateConfig = {
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '',
                'Signature': '',
            },
            body: {}
        };
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.privateConfig.headers.Authorization = this.publicKey;
    }
    // Public
    CossApiService.prototype.publicRequest = function (url, payload) {
        var query = payload ? '?' + querystring_1.default.stringify(payload) : '';
        return request.get(url + query, this.publicConfig);
    };
    // Exchange
    CossApiService.prototype.getMarketSummaries = function () {
        return this.publicRequest(this.EXCHANGE + "getmarketsummaries", null);
    };
    // Trade
    CossApiService.prototype.getExchangeInfo = function () {
        return this.publicRequest(this.TRADE + "exchange-info", null);
    };
    CossApiService.prototype.getMarketPrice = function (pair) {
        if (pair === void 0) { pair = ""; }
        return this.publicRequest(this.TRADE + "market-price", { symbol: pair });
    };
    CossApiService.prototype.testConnection = function () {
        return this.publicRequest(this.TRADE + "ping", null);
    };
    CossApiService.prototype.getServerTime = function () {
        return request.get(this.TRADE + "time", { json: true });
    };
    // Engine
    CossApiService.prototype.getDepth = function (pair) {
        return request.get(this.ENGINE + "dp?symbol=" + pair, { json: true });
    };
    CossApiService.prototype.getHistory = function (pair) {
        return this.publicRequest(this.ENGINE + "ht", { symbol: pair });
    };
    CossApiService.prototype.getCandlestick = function (pair) {
        return request.get(this.ENGINE + "cs?symbol=" + pair + "&tt=15m", { json: true });
    };
    // Web
    CossApiService.prototype.getCoinsInfo = function () {
        return request.get(this.WEB + "coins/getinfo/all", { json: true });
    };
    CossApiService.prototype.getCoinsBaseList = function () {
        return request.get(this.WEB + "coins/get_base_list", { json: true });
    };
    CossApiService.prototype.getOrderSymbols = function () {
        return request.get(this.WEB + "order/symbols", { json: true });
    };
    // PRIVATE
    CossApiService.prototype.privateGet = function (url, payload) {
        var config = this.privateConfig;
        config.headers.Signature = crypto_js_1.default.HmacSHA256(querystring_1.default.stringify(payload), this.privateKey).toString(crypto_js_1.default.enc.Hex);
        delete config.body;
        return request.get(url + '?' + querystring_1.default.stringify(payload), config);
    };
    CossApiService.prototype.privatePost = function (url, payload) {
        var config = this.privateConfig;
        config.headers.Signature = crypto_js_1.default.HmacSHA256(JSON.stringify(payload), this.privateKey).toString(crypto_js_1.default.enc.Hex);
        config.body = payload;
        return request.post(url, config);
    };
    CossApiService.prototype.privateDelete = function (url, payload) {
        var config = this.privateConfig;
        config.headers.Signature = crypto_js_1.default.HmacSHA256(JSON.stringify(payload), this.privateKey).toString(crypto_js_1.default.enc.Hex);
        config.body = payload;
        return request.delete(url, config);
    };
    // Balance
    CossApiService.prototype.getBalance = function (timestamp) {
        return this.privateGet(this.TRADE + "account/balances", { timestamp: timestamp, recvWindow: 9999999999 });
    };
    // Account details
    CossApiService.prototype.getAccountDetails = function (timestamp) {
        return this.privateGet(this.TRADE + "account/details", { timestamp: timestamp, recvWindow: 9999999999 });
    };
    // Place Order
    CossApiService.prototype.placeOrder = function (order) {
        return this.privatePost(this.TRADE + "order/add", order);
    };
    // Cancel Order
    CossApiService.prototype.cancelOrder = function (order) {
        return this.privateDelete(this.TRADE + "order/cancel", order);
    };
    // Order Detail
    CossApiService.prototype.getOrderDetails = function (order) {
        return this.privatePost(this.TRADE + "order/details", order);
    };
    // Trade Details
    CossApiService.prototype.getTradeDetails = function (trade) {
        return request.post(this.TRADE + "order/trade-detail", { json: true });
    };
    // Open Orders
    CossApiService.prototype.getOpenOrders = function (orders) {
        return request.post(this.TRADE + "order/list/open", { json: true });
    };
    // Completed Orders
    CossApiService.prototype.getCompletedOrders = function (orders) {
        return request.post(this.TRADE + "order/list/completed", { json: true });
    };
    // All Orders
    CossApiService.prototype.getAllOrders = function (orders) {
        return request.post(this.TRADE + "order/list/all", { json: true });
    };
    return CossApiService;
}());
exports.CossApiService = CossApiService;
