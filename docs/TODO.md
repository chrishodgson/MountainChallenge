### MVP

1.  clear forms after save on review step
    https://redux-form.com/8.0.4/docs/faq/howtoclear.md/
    https://github.com/erikras/redux-form/issues/3560

import {reset} from 'redux-form';
dispatch(reset('myForm')); // requires form name

2.  disable next until one mountain selected

3.  use react widgets for startDate and durationMinutes

- http://jquense.github.io/react-widgets/api/DateTimePicker/
- http://jquense.github.io/react-widgets/api/NumberPicker/
- https://redux-form.com/8.0.4/examples/react-widgets/

4.  deploy to mountainchallenge.herokuapp.com

---

- forceUnregisterOnUnmount: true - do we need this
- destroyOnUnmount: false - do we need this

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

- zoom to fit os map to markers (see thread)
  https://www.ordnancesurvey.co.uk/forums/discussion/1001031/zoom-level-to-accommodate-loaded-markers

- show number of os tiles remaining for download somewhere

Users

- add users to challenge / activity

Photos

- add instagram images to activity
