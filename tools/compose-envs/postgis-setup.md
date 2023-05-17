
# PSQL console setup commands
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_raster;
CREATE EXTENSION postgis_topology;
CREATE EXTENSION fuzzystrmatch;
CREATE EXTENSION postgis_sfcgal;
CREATE EXTENSION pgrouting;

# terminal for map files
osm2pgsql -U postgres -W -d osmDatabase -H 192.168.0.195 --number-processes 24 -C 20480 south-africa.osm.pbf
