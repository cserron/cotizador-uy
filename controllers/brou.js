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
    
    // let url = 'https://www.brou.com.uy/cotizaciones';
    let url = 'https://www.brou.com.uy/c/portal/render_portlet?p_l_id=20593&p_p_id=cotizacionfull_WAR_broutmfportlet_INSTANCE_otHfewh1klyS&p_p_lifecycle=0&p_t_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=0&p_p_col_count=2&p_p_isolated=1&currentURL=%2Fcotizaciones';

    let currencyType = {
        'dolar': [0, 1],        // Dolar Estadounidense
        'dbrou': [4, 5],        // Dolar e-Brou
        'arg': [12, 13],          // Peso Argentino
        'real': [16, 17],         // Real
        'euro': [8, 9],       // Euro
        'libra': [20, 21],      // Libra Esterlina
        'franco': [24,25],      // Fraco Suizo
        'yxd': [28, 29],        // Yens por Dolar Estadounidense
        'idj': [37,37],         // Indice Dow Jones
        'ui': [36, 36],         // Unidades Indexadas
        'otdo': [38,38]         // Onza Troy de Oro
  
    };

    let currencies = new Promise(

        function (resolve, reject) {
            request(url, function (error, response, html) {
                
                if (!error && response.statusCode == 200) {
                    let currencies = [];
                    let parsedHTML = cheerio.load(html, { normalizeWhitespace: true });            
                    parsedHTML('.valor').each(function (i, elem) {
                        let cur = parsedHTML(this).text().trim();
                        
                        let parseCur = cur.replace('.','');
                        cur = parseCur.replace(',','.');
                        
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
        let buyValue = "-";
        if (buy !== sale) {
            buyValue = curArr[buy];
        }
        return { 'buy': buyValue, 'sale': curArr[sale] };
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