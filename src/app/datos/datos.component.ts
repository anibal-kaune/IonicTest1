import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import 'ionicons';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, AnimationController, IonTitle, IonItem, IonInput  } from '@ionic/angular';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
})
export class DatosComponent  implements OnInit {
  formularioInicio: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController, 
    private animationCtrl: AnimationController) { 
      this.formularioInicio = this.fb.group({
        'nombre': new FormControl("", Validators.required),
        'apellido': new FormControl("", Validators.required),
        'nivEdu': new FormControl("", Validators.required),
        'fecha': new FormControl("", Validators.required)
      });
    }

  ngOnInit() {}

  async guardar(){
    var f = this.formularioInicio.value;

    if(this.formularioInicio.invalid){
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Debes llenar todos los campos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    var cli = {
      nombre: f.nombre,
      apellido: f.apellido,
      nivEdu: f.nivEdu,
      fecha: f.fecha
    }

    localStorage.setItem('cli',JSON.stringify(cli));

    const elemento = localStorage.getItem('cli');
    const user = localStorage.getItem('usuario');

    //const userList = JSON.parse(user);
/*
    if (elemento) {
      console.log('Elemento encontrado:', elemento);
    } else {
      console.log('Elemento no encontrado en localStorage.');
    }*/

    if(this.formularioInicio.valid, elemento){
      const lista = JSON.parse(elemento);

      const alert = await this.alertController.create({
        header: 'Datos guardados ',
        message: ('Su nombre es ' + lista.nombre + ' ' + lista.apellido),
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
  }

  limpiar () {

    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('nivEdu');
    localStorage.removeItem('fecha');
    const nom = document.getElementById("nom") as HTMLInputElement;
    const ape = document.getElementById("ape") as HTMLInputElement;
    const edu = document.getElementById("edu") as HTMLSelectElement;
    const fech = document.getElementById("fech") as HTMLSelectElement;

    nom.value="";
    ape.value="";
    edu.value="";
    fech.value="";
    
    /*
    this.anim = this.animationCtrl
        .create()
        .addElement(this.input.nativeElement)
        .duration(1000)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(155px)')
        .fromTo('opacity', '1', '0.2');
    */

    //this.inputState = (this.inputState === 'inactive') ? 'active' : 'inactive';

  }


}
