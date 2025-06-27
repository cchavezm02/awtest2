import { Servidor } from "../models/servidor"

export class Aplicacion{
  idApp:number=0
  nameApp:string=""
  stateApp:boolean=false
  implementationDateApp:Date=new Date()
  amountApp:number=0
  typeApp:string=""
  server:Servidor=new Servidor()
}
