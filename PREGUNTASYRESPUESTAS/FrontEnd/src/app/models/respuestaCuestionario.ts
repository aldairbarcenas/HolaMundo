import { RepuestaCuestionarioDetalle } from "./respuestaCuestionarioDetalle";

export class respuestaCuestionario{
  id: number ;
  fecha: Date | null;
  activo: number;
  cuestionarioId:number | null;
  nombreParticipante:string;
  listRtaCuestionarioDetalle: RepuestaCuestionarioDetalle[];

  constructor(cuestionarioId: number | null, nombreParticipante: string,
    listRtaCuestionarioDetalle: RepuestaCuestionarioDetalle[],
    id: number ,
    fecha: Date | null,
    activo: number,) {
      this.cuestionarioId = cuestionarioId;
      this.nombreParticipante = nombreParticipante;
      this.listRtaCuestionarioDetalle = listRtaCuestionarioDetalle;
      this.id = id;
      this.fecha = fecha;
      this.activo = activo;
  }

}
