### MVP

Release 1:

1.  use react widgets for startDate and durationMinutes

- http://jquense.github.io/react-widgets/api/DateTimePicker/
- http://jquense.github.io/react-widgets/api/NumberPicker/
- https://redux-form.com/8.0.4/examples/react-widgets/

2.  deploy to mountainchallenge.herokuapp.com

---

Release 2:

Challenges

- add challenge - save mountains / mountain list

- list challenges - restrict to user, % complete

Misc

- Import: add mountain count, highest, lowest to mountainList collection (store in classificationKeys)
- forceUnregisterOnUnmount: true - do we need this in forms ?
- buttons disabled={pristine || submitting}

---

### Post MVP

Mapping

- show mountain selections on map ?

- investigate OpenStreetMap

- add route to map

- zoom to fit os map to markers (see thread)
  https://www.ordnancesurvey.co.uk/forums/discussion/1001031/zoom-level-to-accommodate-loaded-markers

- show number of os tiles remaining for download somewhere

Users

- add users to challenge / activity

Photos

- add instagram images to activity

Database

- indexes
- add challenges / activities sub documents to users
