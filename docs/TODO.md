### MVP

1. clear forms after save on review step
https://redux-form.com/8.0.4/docs/faq/howtoclear.md/
https://github.com/erikras/redux-form/issues/3560

import {reset} from 'redux-form';
dispatch(reset('myForm')); // requires form name

- forceUnregisterOnUnmount: true - do we need this
- destroyOnUnmount: false - do we need this

2. use react widgets for startDate and  durationMinutes
- http://jquense.github.io/react-widgets/api/DateTimePicker/
- http://jquense.github.io/react-widgets/api/NumberPicker/

3. zoom to fit os map to markers


---

### Post MVP

Import

- add mountain count, highest, lowest to mountainList collection (store in classificationKeys)

Challenges

- add challenge - save mountains / mountain list

- list challenges - restrict to user, % complete

Mapping

- show mountain selections on map

- add route to map

Users

- add users to challenge / activity

Photos

- add instagram images to activity
