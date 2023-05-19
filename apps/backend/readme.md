
# Loop Pro Backend
> WIP

## Getting started
- `nx serve backend`

## SQL access
- currently you will need to add your IP to the GCS SQL connection tab, 
  and be logged into the CLI locally on cb-dev

#

## Tech Stack:
- Nx
- NestJS
- Jest
- Cypress

## Add-ons:
- NestJS Resilience : https://github.com/SocketSomeone/nestjs-resilience
- NestJS Swagger
- TypeOrm

#

## Datastores
- GCS - Firestore / Firebase
- GCS - SQL (postgres + postgis + pgrouting)

#

# Advanced - PSQL

### Learn POSTGIS
- https://terragis.net/docs/other/MASTERING_POSTGIS.pdf
- http://postgis.net/workshops/postgis-intro/geometries.html

### POSTGIS / GEO data type spec:
https://datatracker.ietf.org/doc/html/rfc7946#section-1.4

#### PgRouting (xtra-advanced)
https://pgrouting.org

### Column types for postgres
int, int2, int4, int8, smallint, integer, bigint, decimal, numeric, real, float, float4, float8, double precision, money, character varying, varchar, character, char, text, citext, hstore, bytea, bit, varbit, bit varying, timetz, timestamptz, timestamp, timestamp without time zone, timestamp with time zone, date, time, time without time zone, time with time zone, interval, bool, boolean, enum, point, line, lseg, box, path, polygon, circle, cidr, inet, macaddr, tsvector, tsquery, uuid, xml, json, jsonb, int4range, int8range, numrange, tsrange, tstzrange, daterange, geometry, geography, cube, ltree

