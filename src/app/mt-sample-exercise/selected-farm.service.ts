import { Subject } from "rxjs";
import { Farm } from "./farm";

export class SelectedFarmService {
  selectedFarm = new Subject<Farm>();

  /** Actualiza observable para la granja seleccionada */
  setSelectedFarm(farm: Farm): void {
    this.selectedFarm.next(farm);
  }
}
