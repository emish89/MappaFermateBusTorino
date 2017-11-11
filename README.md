# MappaFermateBusTorino
GTT Bus Stops Map - Torino Italy

This repository will provide a map of the Torino bus stops and the next busses coming. 


API "pubbliche" di GTT **_(a)_**.

-  un meccansimo di login
-  una serie di webservices che
   -  ritorni un elenco di fermate dei mezzi pubblici, con numero/id, latitutine e longitudine **_(b)_**
   -  data una fermata nello specifico, ne ottenga i prossimi passaggi
- una vista di frontend
  -  framework js (utilizzato ejs)
  -  utilizzato Twitter Bootstrap per il layer di login
  -  mostri la lista delle fermate (mappa con dei marker)
  -  una volta cliccato su una fermata, ne mostri i passaggi



**_(a)_** utilizzato http://gpa.madbob.org/ per le chiamate API

**_(b)_** utilizzato http://overpass-turbo.eu 
con:
```
node
  [highway=bus_stop]
  ({{bbox}});
out;
```


Istruzioni:

- installare npm se non già presente
- installare tutti i moduli node del progetto (npm install)
- start del progetto dalla cartella: npm start
- login di prova (user:fede - pass:balla) -> http://localhost:8081/
- da lì in poi è possibile utilizzare le chiamate: 
    GET:
      - listStops che restituisce l'elenco di tutte le fermate se autenticati o status 401 altrimenti
      - id/N dove N è l'id della fermata che restituisce i passaggi (tramite le madbob API)
      - logout per terminare la sessione
      - / pagina di default 
    POST:
      - login con parametri di user e pass

- è possibile trovare una demo del progetto a: https://lit-stream-37674.herokuapp.com/



Next steps:
- creare modello per user in modo da utilizzarne i suoi metodi per il login (per prova)
- fare in modo che la lista fermate sia caricata dinamicamente a seconda della porzione visualizzata.

