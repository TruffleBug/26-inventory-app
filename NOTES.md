DATABASE TABLES
- class (id[PK], name)
    - fish
    - amphibian
    - reptile
    - bird
    - mammal
- color (id[PK], name)
    - green
    - grey
    - brown
    - white
    - black
    - yellow
- size (id[PK], name)
    - tiny (frog)
    - small (hawk)
    - medium (dog)
    - large (human)
    - giant (elephant)
- animals (id[PK], name, class[FK], color[FK], size, quantity)

DB
- pool.js
- populateDB.js
- queries.js

ROUTES
- index ('/')
- list ('/list')
- new ('/new')
- edit ('/edit')
- delete? ('/delete')

VIEWS
- index
    - title: 'Animal Farm'
    - h2: 'View by:'
    - ul of links: 'Class'. 'Color', 'Size', 'View All'
- list
    - title: 'Viewing by ${category}'
    - ul list sorted by groups within category
- new
    - form 
- edit
    - prefilled out form
- delete?
- navbar
    - contains list of categories
- subnav
    - contains list of types within categories

CONTROLLERS
- listController (references ../db/queries.js)
