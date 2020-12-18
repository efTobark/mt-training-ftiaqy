import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import { SelectedFarmService } from "./selected-farm.service";
import { Observable, Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Farm } from "./farm";

@Component({
  selector: "mt-sample-list",
  templateUrl: "./mt-sample-list-index.component.html"
})
export class MtSampleListIndexComponent implements OnInit, OnDestroy {
  /** Lista completa de granjas */
  farmsList: Farm[] = [];
  /** Bandera para aplicar filtro */
  filterFarms: "" | "no" | "date" = "";
  /** Lista filtrada de granjas */
  filteredList: Farm[] = [];
  /** Subscripción para obtener lista de granjas de servicio */
  dataSubs: Subscription;
  /** Llave y lista para relación de tablas ejs */
  key: string;
  detailList: Farm[];

  constructor(
    private dataService: DataService,
    private selectedService: SelectedFarmService
  ) {}

  ngOnInit() {
    this.dataSubs = this.dataService
      .getFarmsList()
      .subscribe((response: Farm[]) => {
        this.farmsList = response;
      });
  }
  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }

  /** Dispara cambio de selección en el servicio */
  changeSelectedFarm(farm: Farm): void {
    this.selectedService.setSelectedFarm(farm);
  }

  /** Genera alerta de excepción */
  triggerError(): void {
    this.dataService.generateException().subscribe();
  }

  /** Dispara cambio en filtro de tabla */
  activateFilter(): void {
    this.filteredList = [];
    if (this.filterFarms) {
      if (this.filterFarms === "no") {
        this.farmsList.forEach((f: Farm) => {
          const frag = f.farmNo.substring(0, 3);
          if (frag === "100") this.filteredList.push(f);
        });
      } else {
        this.farmsList.forEach((f: Farm) => {
          const year = f.activeDate.getFullYear();
          if (year === 2020) this.filteredList.push(f);
        });
      }
    }
  }

  /** Evento disparado en seleccion de fila en tabla master */
  onRowSelected(event: any) {
    this.key = event.data.farmNo;
    this.detailList = [event.data];
  }
}
