
function onClick(btnId, callback) {
    document.getElementById(btnId).addEventListener('click', () => {
        return callback();
    })
}


// serverからデータを取得
async function fetch_data() {
    key = document.getElementById("search").value
    const data = await fetch(`http://127.0.0.1:3000/foo/api?q=${key}`)
    return data.json()
}


async function main() {
    data = await fetch_data()
    data.forEach(element => {
        addMarker = L.geoJSON(
            element,
            {
                pointToLayer: function (feature, layer) {
                    return L.circleMarker(layer, {
                        color: 'red',
                        radius: 13, //半径
                        weight: 1, //線の太さ
                        opacity: 1, //線の透明度
                        fillOpacity: 0.5 //fillColorの透明度
                    });
                }
            }
        ).addTo(map)
            .bindPopup(JSON.stringify(element.geometry.coordinates)).openPopup()
    });

}

onClick("submit", main)