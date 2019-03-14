import { Component } from "@angular/core";
import {
  AlertController,
  ToastController,
  ActionSheetController,
  IonItemSliding
} from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  tasks: any[] = [];

  constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController
  ) {
    let tarefasJson = localStorage.getItem("tarefasDb");
    if (tarefasJson != null) {
      this.tasks = JSON.parse(tarefasJson);
    }
  }

  //Método para exibir um AlertPrompt com input e dois botões (Cancelar e Adicoinar)
  async showAdd() {
    const alert = await this.alertController.create({
      header: "Adicionar Tarefa",
      message: "Informe a tarefa a ser adicionada.",
      inputs: [
        {
          name: "tarefa",
          type: "text",
          placeholder: "Tarefa"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Cancelar");
          }
        },
        {
          text: "Adicionar",
          handler: d => {
            this.adicionar(d.tarefa);
          }
        }
      ]
    });

    await alert.present();
  }

  async adicionar(tarefa: string) {
    //Verificando se o usuário digitou a tarefa.
    if (tarefa.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message: "Informe a tarefa!",
        color: "warning",
        duration: 1500,
        position: "bottom"
      });
      await toast.present();
      return;
    }
    //Se foi digitado, insere na lista.
    let task = { nome: tarefa, feito: false };
    this.tasks.push(task);
    //também atualiza a lista no storage local.
    this.updateLocal();
  }

  //Método para perguntar ao usuário qual a ação deverá executar.
  async openActions(task: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Qual função executar?",
      buttons: [
        {
          //mostrar texto de acordo com a tarefa pronta/nao pronta
          text: task.feito ? "Desmarcar" : "Marcar",
          icon: task.feito ? "radio-button-off" : "checkmark-circle",
          //Handler: o que será executado ao clicar no botão.
          handler: () => {
            this.changeTask(null, task);
            this.updateLocal();
          }
        },
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Ação cancelada!");
          }
        }
      ]
    });
    await actionSheet.present();
    return;
  }

  async changeTask(slidingItem: IonItemSliding, task: any) {
    task.feito = !task.feito;
    this.updateLocal();
    slidingItem.close();
  }

  //salvando o array em um armazenamento local dentro do próprio dispositivo.
  updateLocal() {
    //JSON.stringfy -> transforma qualquer objeto em json.
    localStorage.setItem("tarefasDb", JSON.stringify(this.tasks));
  }

  //método para deletar uma tarefa.
  async delete(slidingItem: IonItemSliding, task: any) {
    const confirm = await this.alertController.create({
      header: "Deseja realmente excluir?",
      buttons: [
        {
          text: "Sim",
          handler: () => {
            //filtra o array retornando todos os registros que não são iguais ao que vai ser excluído.
            this.tasks = this.tasks.filter(taskArray => task != taskArray);
            this.updateLocal;
            slidingItem.close();
          }
        },
        {
          text: "Não",
          role: "cancel",
          handler: () => {
            console.log("Ação cancelada!");
            slidingItem.close();
          }
        }
      ]
    });
    await confirm.present();
  }
}
