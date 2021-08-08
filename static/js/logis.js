let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



//magnitude size
// function markerSize(mag){
//     return mag * 2
// }


d3.json(url).then(function (response) {
    function styleInfo(feature){
        return {
            color: "#000000",
            opacity: 1,
            fillOpacity: 1,
            stroke: true,
            weight: 0.5,
            radius: getRadius(feature.properties.mag),
            fillColor: markerColor(feature.properties.mag)
        }
    }
    function getRadius(mag){
        if (mag === 0){
            return 1;
        }
        return mag * 2
    }
    function markerColor(mag) {
        if (mag > 6) return "#98ee00";
        else if (mag > 5) return "#d4ee00";
        else if (mag > 4) return "#eecc00";
        else if (mag > 3) return "#ee9c00";
        else if (mag > 2) return "#ea822c";
        else return "ea2c2c";



    }
    L.geoJson(response, {
        pointToLayer: function(feature,latlong){
            return L.circleMarker(latlong);
        },
        style: styleInfo,
            
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h5>  magnitude size: ${feature.properties.mag} <br> location: ${feature.properties.place}`)
        }


    }).addTo(myMap);

    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function(){
        let div = L.DomUtil.create("div", "info legendStyle");

        let mag = [6, 5, 4, 3, 2,1];
        
        var colors = ["#98ee00", "#d4ee00",  "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
    

        for(i=0;i<mag.length;i++){
            div.innerHTML += "<icolor style='background: " + colors[i] + "'></icolor> "
            + mag[i] + (mag[i + 1] ? "&ndash;" + mag[i + 1] + "<br>" : "+");

        }
        return div;
        
    };

    legend.addTo(myMap);





})


// let mag = [6, 5, 4, 3, 2, "<=2"];
// var colors = [
//   "#98ee00",
//   "#d4ee00",
//   "#eecc00",
//   "#ee9c00",
//   "#ea822c",
//   "#ea2c2c"
// ];

// for(i=0;i<mag.length;i++){
//     div.innerHTML += "<icolor style='background: " + colors[i] + "'></icolor> "
//     + mag[i] + (mag[i + 1] ? "&ndash;" + mag[i + 1] + "<br>" : "+");
