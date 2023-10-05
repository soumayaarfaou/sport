import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
playerURL:string="http://localhost:3000/api/players"
  constructor(private http:HttpClient) { }

 //request : Array of Objects 
 displayAllPlayers(){
  return this.http.get(this.playerURL);
 }
//request :one object 
 getPlayerById(id:number){
  return this.http.get(`${this.playerURL}/${id}`);

 }
//request : Boolean 
aadPlayer(obj:any,file:File){
  let formData= new FormData()
  //append tsob 3ibra push
  formData.append(" namee",obj.namee);
  formData.append("age",obj.age);
  formData.append("position",obj.position);
  formData.append("nbr",obj.nbr);
  formData.append("img",file);
  // formData.append("teamId",obj.teamId);
  return this.http.post<{isAdded:boolean}>(this.playerURL,formData);
}
//request : Boolean 
deletePlayerById(id:number){
  return this.http.delete(`${this.playerURL}}/${id}`);
}
//request : Boolean /String 
editPlayer(obj:any){
  return this.http.put(this.playerURL,obj);
}



}
