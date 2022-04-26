import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as olProj from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import VectorSource  from 'ol/source/Vector';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { UtilityService } from 'src/app/services/utility.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CancelCitaPopupData {
  destinatario: string;
}

@Component({
  selector: 'app-cita',
  templateUrl: './cita-generator.component.html',
  styleUrls: ['./cita-generator.component.css']
})
export class CitaGeneratorComponent implements OnInit {
  // ------------------ FORM ------------------ //
  lugar: string = "";
  plan: string = "";
  // ------------------ MAPA ------------------ //
  mouseOver: boolean = false;
  coordinate: any = [0,0];
  map!: Map;
  f!: Feature
  l!: VectorLayer<VectorSource<Geometry>>;
  projBuena!: olProj.Projection | null;

  constructor(public route: ActivatedRoute, public router: Router, public UtilityService: UtilityService) { }

  ngOnInit(): void {
    this.projBuena = olProj.get('EPSG:3857');
    if(this.projBuena == null) { return; }

    this.f = new Feature({
      geometry: new Point(olProj.fromUserCoordinate([-412447.5, 4927868.6],this.projBuena))
    });
    this.f.setStyle(new Style({
      image: new Icon({
        src: 'assets/pinpoint.png',
        scale: 0.07,
        anchor: [0.5, 1]
      })
    }));

    this.map = new Map({
      target: 'ol-map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        projection: this.projBuena,
        zoom: 6,
        center: olProj.fromUserCoordinate([-412447.5, 4927868.6],this.projBuena),
      })
    });
    
    this.l = new VectorLayer({
      source: new VectorSource({
        features: [
          this.f
        ]
      })
    });
  }

  getCoord(event: any){
    if(this.map.getLayers().getLength()==1) { //Primer doble click
      this.map.addLayer(this.l);
    }
    if(this.projBuena == null) { return; } //Nunca deberia pasar

    this.coordinate = this.map.getEventCoordinate(event);
    this.f.setGeometry(new Point(olProj.fromUserCoordinate(this.coordinate,this.projBuena)))
    // if(this.map.hasFeatureAtPixel(this.map.getPixelFromCoordinate(coordinate)) === true)
  }
}
