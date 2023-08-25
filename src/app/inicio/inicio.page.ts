import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, Animation, AnimationController  } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage /*implements AfterViewInit*/ {
  /*anim: Animation;
  @ViewChild('square', { read:ElementRef, static: false }) square: ElementRef;*/

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




  ngOnInit() {
  }

  /*ngAfterViewInit() {
    const animation:  Animation = this.animationCtrl.create()
        .addElement(this.title.nativeElement)
        .duration(1500)
        .iterations(Infinity)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
        .fromTo('opacity', '1', '0.2');
    
        animation.play();
  }*/

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

  //Animaciones


}
