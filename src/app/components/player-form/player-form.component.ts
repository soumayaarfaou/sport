import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm:FormGroup;
  title:string="Player-Form";
  teamsTab:any=[];
  teamId:any;
  imagePreview :string;

  constructor(private Y:FormBuilder , private teamService :TeamService , private playerService:PlayerService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((response)=>{
      console.log("here is response from BE",response);
      this.teamsTab  =response.teams;
    })
    this.playerForm=this.Y.group({
      namee:['',[Validators.required,Validators.minLength(3)]],
      age:[''],
      nbr:[''],
      position:[''],
       img :['']

      


    }

    )
  }

  addOrEditPlayer(){
    console.log('here  player ',this.playerForm.value);
     this.playerForm.value.tId=this.teamId;
     this.playerService.aadPlayer(this.playerForm.value,this.playerForm.value.img).subscribe((response)=>{
      console.log("here is response from BE :",response);
      
     })
  }
  selectTeamId(event){
     console.log("here event",event.target.value);
     this.teamId=event.target.value;
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
  //event.target pour acces a un fichier files[0]:un tableau:tu peut unpload plusieurs files
  //on peut pas envoyer un objet contenant un fichier
    console.log("here file selected",file);
    //inserer file dans l'attribut img dans signup form
    this.playerForm.patchValue({ img: file });
    //updateValueAndValidity()/faire mis ajout de formulaire puisque sabitlou 7aja jdida ili hiya file
    this. playerForm.updateValueAndValidity();
    //FileReader():lecteur de fichier :doner le path de fichier selectionné
    //pour l'afficher dans la fichier html <img src="[]="path""
    const reader = new FileReader();
    reader.onload = () => {
      //le path de fichier selectionner
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}