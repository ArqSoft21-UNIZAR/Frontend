import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { toStringXY, createStringXY } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { UtilityService } from '../utility.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CancelCitaPopupData {
  destinatario: string;
}

@Component({
  selector: 'cita-popup',
  templateUrl: 'cancel-cita-popup.component.html',
  styleUrls: ['cancel-cita-popup.component.css']
})
export class CancelCitaPopup {
  constructor(public dialogRef: MatDialogRef<CancelCitaPopup>, public router: Router, public UtilityService: UtilityService, @Inject(MAT_DIALOG_DATA) public data: CancelCitaPopupData) {}
  
  noCita(): void {
    //TODO: Hacer desmatch con la persona
    this.UtilityService.openSnack("Contacto eliminado")
    this.router.navigateByUrl("/home");
    this.dialogRef.close();
  }

  siCita(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  profileID!: string | null;
  // ------------------ FORM ------------------ //
  lugar: string = "";
  plan: string = "";
  // ------------------ MAPA ------------------ //
  mouseOver: boolean = false;
  map!: Map;
  f!: Feature
  l!: VectorLayer<VectorSource<Geometry>>;
  projBuena!: olProj.Projection | null;

  constructor(public dialog: MatDialog, public route: ActivatedRoute, public router: Router, public UtilityService: UtilityService) { }

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

    this.profileID = this.route.snapshot.paramMap.get('id'); //Parametro de la url
    if (this.profileID == null) { this.router.navigateByUrl("/404"); return;  }
  }

  getCoord(event: any){
    if(this.map.getLayers().getLength()==1) { //Primer doble click
      this.map.addLayer(this.l);
    }
    if(this.projBuena == null) { return; } //Nunca deberia pasar

    var coordinate = this.map.getEventCoordinate(event);
    this.f.setGeometry(new Point(olProj.fromUserCoordinate(coordinate,this.projBuena)))
    // if(this.map.hasFeatureAtPixel(this.map.getPixelFromCoordinate(coordinate)) === true)
  }

  openPopupCita(): void {
    const dialogRef = this.dialog.open(CancelCitaPopup, {
        width: "50%",
        panelClass: 'default',
        data: {destinatario: this.profileID},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result: '+result);
    });
  }
}
