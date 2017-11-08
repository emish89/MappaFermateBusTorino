# MappaFermateBusTorino
GTT Bus Stops Map - Torino Italy

This repository will provide a map of the Torino bus stops and the next busses coming. 


API "pubbliche" di GTT (http://gpa.madbob.org/).

-  un meccansimo di login
-  una serie di webservices che
   -  ritorni un elenco di fermate dei mezzi pubblici, con numero/id, latitutine e longitudine **_(a)_**
   -  data una fermata nello specifico, ne ottenga i prossimi passaggi
- una vista di frontend
  -  framework js (angularjs, vuejs, react) 
  -  utilizzi Twitter Bootstrap per il layer di presentazione
  -  mostri la lista delle fermate (mappa con dei marker)
  -  una volta cliccato su una fermata, ne mostri i passaggi




**_(a)_** utilizzato http://overpass-turbo.eu 
con:
```
node
  [highway=bus_stop]
  ({{bbox}});
out;
```


Istruzioni:

- installare npm 
- installare tutti i moduli node del progetto (express, express-session)
- start del server dalla cartella di progetto: npm server.js
- login di prova (user:fede - pass:balla) - http://127.0.0.1:8081/login?username=fede&password=balla
- da lì in poi è possibile utilizzare le chiamate: 
    - listStops che restituisce l'elenco di tutte le fermate
    - id/N dove N è l'id della fermata che restituisce i passaggi
    - logout per terminare la sessione