import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Frete } from 'src/frete';
import { FreteService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  //criado uma propriedade chamada Frete, que 
  //será o frete retornando, e o construtor de 
  // da classe:
  
  frete: Frete;
  cep: string;

  /*
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Serviços',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Agendamento',
      url: '/agendamento',
      icon: 'calendar'
    },
    {
      title: 'Sobre',
      url: '/about',
      icon: 'help'
    }
  ];
  */

  //método no qual injetamos nosso serviço,
  //disponibilizando para uso em nosso componente na 
  //variável _freteService.

  constructor(private _freteService: FreteService){

  }

  //método para calcular o frete
  CalcularFrete(): void{
      this._freteService.getFrete(this.cep)
      .subscribe((data:Frete)=> this.frete = data,
      error => console.log(error));
  }

 /* constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  */
}
