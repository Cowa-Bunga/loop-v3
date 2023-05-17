
## run a SA map valhalla in docker
docker run -dt --name valhalla_gis-ops -p 8002:8002 -v $PWD/custom_files:/custom_files -e tile_urls=https://download.geofabrik.de/africa/south-africa-latest.osm.pbf ghcr.io/gis-ops/docker-valhalla/valhalla:latest