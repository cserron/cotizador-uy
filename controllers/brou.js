// PENDIENTES
// ------------------------

// dxle   =>  Dolares USA por Libra esterlina
// fsxd   =>  Francos suizos por Dolar
// yxd    =>  Yens por Dolar
// dxe    =>  Dolares USA por Euro
// axd    =>  Pesos Argentinos por Dolar
// rxd    =>  Reales por Dolar
// gxd    =>  Guaranies por Dolar


module.exports = (function () {
    'use strict';

    let router = require('express').Router();
    let request = require('request');
    let cheerio = require('cheerio');

    let url = 'http://brou.com.uy/c/portal/render_portlet?p_l_id=123137&p_p_id=ExchangeLarge_WAR_ExchangeRate5121_INSTANCE_P2Af';

    let currencyType = {
        'dolar': [0, 1],        // Dolar Estadounidense
        'dbrou': [2, 3],        // Dolar e-Brou
        'arg': [4, 5],          // Peso Argentino
        'real': [8, 9],         // Real
        'euro': [12, 13],       // Euro
        'libra': [16, 17],      // Libra Esterlina
        'franco': [20,21],      // Fraco Suizo
        'yxd': [24, 25],        // Yens por Dolar Estadounidense
        'idj': [36,37],         // Indice Dow Jones
        'ui': [32, 33],         // Unidades Indexadas
        'otdo': [38,39]         // Onza Troy de Oro
    };

    let currencies = new Promise(

        function (resolve, reject) {
            request(url, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    let currencies = [];
                    let parsedHTML = cheerio.load(html, { normalizeWhitespace: true });

                    parsedHTML('.sale, .buy').each(function (i, elem) {
                        let cur = parsedHTML(this).text().trim();

                        if (cur && !isNaN(cur)) {
                            currencies.push(cur);
                        }
                    });

                    resolve(currencies);
                }
                else {
                    reject();
                }
            });
        }
    );


    function currencyFormat(curArr, buy, sale) {
        return { 'buy': curArr[buy], 'sale': curArr[sale] };
    }

    router.get('/', function (req, res) {
        currencies.then(res.send.bind(res));
    });

    router.get('/:type', function (req, res) {
        let param = req.params.type;

        currencies
        .then((val) => {
            return currencyFormat(val, currencyType[param][0], currencyType[param][1])
        })
        .then(res.send.bind(res));

    });



    return router;


})();