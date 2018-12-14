### MVP

openspace.js - fit map to markers
http://openspace.ordnancesurvey.co.uk/docs/4.0.0/files/OpenLayers/Map-js.html#OpenLayers.Map.zoomToScale

redux form - how to clear forms after save on review step
https://redux-form.com/8.0.4/docs/faq/howtoclear.md/
https://github.com/erikras/redux-form/issues/3560

- forceUnregisterOnUnmount: true - do we need this
- destroyOnUnmount: false - do we need this

import {reset} from 'redux-form';
dispatch(reset('myForm')); // requires form name

---

Activities:

- save activity

  - mountains
  - startDate
  - durationMinutes

- review activity

  - reset form

- view activity

  - os map with markers, zoom to fit

- activity details
  - startDate : http://jquense.github.io/react-widgets/api/DateTimePicker/
  - durationMinutes : http://jquense.github.io/react-widgets/api/NumberPicker/

### Post MVP

---

Import

- add mountain count, highest, lowest to mountainList collection (store in classificationKeys)

---

Challenges

add challenge

- mountain save API

list challenges

- list challenges for just user
- total mountains, challenge name / mountain list, % complete
- link to view challenge

view challenge

- mountains climbed, duration etc, list activities with links

---

- mountain selections on map

- add route to map

- add users to challenge / activity

- add instagram images to activity
