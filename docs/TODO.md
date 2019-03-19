### High Level Requirements 

purpose: log mountains climbed as part of a challenge or a simple activity log

screens: 
- challenge - select from existing challenges
- view challenge - show % completed, list mountains climbed by date, list mountains remaining   
- activities - select mountains climbed with filters on name, classification, region, 
- list activities - list mountains climbed grouped by activity 


### MVP - remaining

Styling - use bootstrap as stop gap

User Data

- add challenges / activities sub documents to users
- restrict activities and challenges by user

Challenges

- add challenge API - save mountains / mountain list
- list challenges screen - show % complete, mountains climbed, mountains not climbed
- Import: add meta mountain count, highest, lowest mountains onto mountainList collection ?


Activity Date/Times - how critical is this? 

- default values (00) for hours and minutes and suffixes hrs and mins
- hours and minutes specific renderers in Field component
- library for formatting dates and hours/minutes from database
- form validation of date, mins and hours


---

### Post MVP

Database optimisation - switch to MySQL / add indexes

Styling - custom theme

Login - via Facebook / Create an Account on site

Users - add users to challenge / activity

Photos - add instagram images to activity

Mapping - show mountains as selected on a map

Mapping - add route to map 


---

### Spikes

- find mountains by proximity to a grid ref (maths required)

- auto zoom to fit map to markers on OS map
  https://www.ordnancesurvey.co.uk/forums/discussion/1001031/zoom-level-to-accommodate-loaded-markers
