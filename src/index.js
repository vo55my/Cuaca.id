import "./component/list-bar.js";
import "./component/footer-bar.js";
import "./component/app-bar.js";
import "./style/style.scss";
import $ from "jquery";
import moment from "moment";

const displayTime = () => {
  moment.locale("id");
  $(".time").text(moment().format("LTS"));
  $(".date").text(moment().format("LL"));
};

const updateTime = () => {
  displayTime();
  setTimeout(updateTime, 1000);
};

updateTime();

// Garis Bujur dan Lintang Indonesia
let lat = -6.3730914;
let lon = 106.7116703;

const getWilayah = () => {
  fetch(`https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json`)
    .then((response) => response.json())
    .then((data) => {
      const items = [];
      const jumlah = data.length;

      //Menghitung jarak
      for (let n = 0; n < jumlah; n++) {
        data[n].jarak = distance(lat, lon, data[n].lat, data[n].lon, `K`);
      }

      //Mengurutkan berdasarkan jarak
      data.sort(urutkanJarak);

      //Ambil 5 wilayah terdekat
      for (let n = 0; n < jumlah; n++) {
        items.push(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <i class="bi bi-geo-alt-fill"></i> 
              ${data[n].propinsi}, ${data[n].kota}, ${data[n].kecamatan}
              <span class="badge rounded-pill text-bg-primary">${data[
                n
              ].jarak.toFixed(2)} km</span>
            </li>
            `);

        if (n > 4) break;
      }
      $("#judulTerdekat").html(`<p>Jarak terdekat dari</p> 
        <p>Latitude : ${lat}</p>
        <p>Longitude : ${lon}</p>`);
      $("#wilayahTerdekat").html(items.join(""));
      $("#judulCuaca").html(
        `<i class="bi bi-geo-alt-fill"></i> ${data[0].propinsi}, ${data[0].kota}, ${data[0].kecamatan}`
      );
      getCuaca(data[0].id);
    });
};

const getCuaca = (idWilayah) => {
  fetch(`https://ibnux.github.io/BMKG-importer/cuaca/${idWilayah}.json`)
    .then((response) => response.json())
    .then((data) => {
      const items = [];
      const jumlah = data.length;

      //Ambil 5 wilayah terdekat
      for (let n = 0; n < jumlah; n++) {
        items.push(
          `<div class="col-lg-2 col-md-4 col-sm-6">
            <div class="card text-center mb-4" id="cuaca">
              <img src="https://ibnux.github.io/BMKG-importer/icon/${data[n].kodeCuaca}.png" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${data[n].cuaca}</h5>
                <p class="card-text">${data[n].jamCuaca}</p>
              </div>
            </div>
          </div>`
        );
        if (n > 4) break;
      }
      $("#cuaca").html(items.join(""));
    });
};

// https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
const distance = (lat1, lon1, lat2, lon2) => {
  let radlat1 = (Math.PI * lat1) / 180;
  let radlat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return Math.round(dist * 1.609344 * 1000) / 1000;
};

const urutkanJarak = (a, b) => {
  if (a["jarak"] === b["jarak"]) {
    return 0;
  } else {
    return a["jarak"] < b["jarak"] ? -1 : 1;
  }
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, onErrorGPS);
  } else {
    getWilayah();
  }
};

const showPosition = (position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  getWilayah();
};

const onErrorGPS = () => {
  getWilayah();
};

getLocation();
