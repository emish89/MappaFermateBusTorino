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
