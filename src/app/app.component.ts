import { Component } from '@angular/core';
import { tileLayer, latLng, latLngBounds, marker, icon } from 'leaflet';
import L = require('leaflet');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private corner1 = latLng(33.152892, -116.976444);
    private corner2 = latLng(32.837808, -117.190031);
    private bounds = latLngBounds(this.corner1, this.corner2)
    public layers = [];

    public options = {
        layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' })
        ],
        center: latLng(32.979654, -117.089007),
        maxBounds: this.bounds,
        zoom: 12,
        minZoom: 11,
        maxZoom: 15
    };

    markers = [
        { status: 'red', coordinates: latLng([32.880692, -117.109076])},
        { status: 'green', coordinates: latLng([32.893166, -117.115608])},
        { status: 'green', coordinates: latLng([32.903463, -117.116378])},
        { status: 'yellow', coordinates: latLng([32.917064, -117.116292])}
    ]

    constructor() {}

    ngOnInit() {
        this.layers.push(L.rectangle(this.bounds, {color: "#ff7800", weight: 1}));

        this.generateMarkers();
    }

    generateMarkers() {
        this.markers.forEach(each => {
            const layer = marker(each.coordinates, {
                icon: icon({
                   iconSize: [ 25, 25 ],
                   iconAnchor: [ 13, 41 ],
                   iconUrl: 'assets/marker_medium.png',
                })
            });

            layer.bindPopup('<div>Hello</div>', {closeOnClick: false, autoClose: false})

            this.layers.push(layer);
        });
    }
}
