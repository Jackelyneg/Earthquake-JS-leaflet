let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

//magnitude size
function markerColor(mag){
    if (mag > 6 ) return "red";
    else if (mag > 5) return "FF8C00";
    else if (mag > 4) return "#Forange";
    else if (mag > 3) return "yellow";
    else if (mage>2) return "#FFFACD";
    else return "#9ACD32";

}


  d3.json(url).then(function(response) {
      L.geoJson(response,{
          style:function(feature){
              return{
              color:markerColor(feature.properties.mag),
              fillOpacity :0.5
              };
          },





      }).addTo(myMap);

  });
