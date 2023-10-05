import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  title:string="Signup";
  errorMsg:string;
  imagePreview :string;

  path:any;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) {}
    
  ngOnInit() {
    this.path=this.router.url;
    //signupForm doit avoir tous le declarations des input

    this.signupForm=this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      pwd:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{5,10}$/)]]  ,
      confirmPwd :[''],
      img :['']

    
    },
    {
      validators:MustMatch("pwd","confirmPwd"),//naayt lel validators li sna3neh ahna 
    }
    )
  
  }
  signup(){
    console.log('here is signup chicked', this.signupForm.value);
    this.signupForm.value.role=(this.path=="/signup")? "user" : "admin";
    this.userService.signup(this.signupForm.value,this.signupForm.value.img).subscribe((response)=>{
      console.log("here response after signup ",response);
      if(response.msg){
        this.router.navigate(["login"]) ;
        
      }else{
        this.errorMsg  ="email exist";
      }
    });
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
  //event.target pour acces a un fichier files[0]:un tableau:tu peut unpload plusieurs files
  //on peut pas envoyer un objet contenant un fichier
    console.log("here file selected",file);
    //inserer file dans l'attribut img dans signup form
    this.signupForm.patchValue({ img: file });
    //updateValueAndValidity()/faire mis ajout de formulaire puisque sabitlou 7aja jdida ili hiya file
    this.signupForm.updateValueAndValidity();
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
