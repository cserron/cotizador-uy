cotizador-uy
===============
Currency exchange tables for the Uruguayan market implemented as a RESTful API in NodeJs.
Inspired by the great job done by these guys: http://brou-currencies.herokuapp.com

The response will be a json with the following structured:
```
{
    buy: "27.65000",
    sale: "28.35000"    
}
```
The  BROU currencies are:

| Resource | Currency |
| --------------|----------|
| /brou/dolar   | Dolar Estadounidense |
| /brou/dbrou   | Dolar e-Brou |
| /brou/arg     | Peso Argentino |
| /brou/real    | Real |
| /brou/euro    | Euro |
| /brou/libra   | Libra Esterlina |
| /brou/franco  | Fraco Suizo |
| /brou/yxd     | Yens por Dolar Estadouniden |
| /brou/idj     | Indice Dow Jones |
| /brou/ui      | Unidades Indexadas |
| /brou/otdo    | Onza Troy de Oro |



*Built By BROS  http://builtbybros.com
