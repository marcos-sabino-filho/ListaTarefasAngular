import { ITarefaDto } from './../../interfaces/ITarefaDto';
import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  trigger,
  animate,
  style,
  transition,
  keyframes
} from '@angular/animations'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css'],
  animations: [trigger("moveInLeft", [transition("void=> *", [style({ transform: "translateX(300px)" }), animate(200, keyframes([style({ transform: "translateX(300px)" }), style({ transform: "translateX(0)" })]))]),
  transition("*=>void", [style({ transform: "translateX(0px)" }), animate(100, keyframes([style({ transform: "translateX(0px)" }), style({ transform: "translateX(300px)" })]))])])
  ]
})
export class ListaTarefasComponent {
  tarefasArray: string[] = [];
  tarefasTipado: ITarefaDto[] = [];

  tarefaNome: string = '';
  @ViewChild("tarefa") inputNomeTarefa!: ElementRef;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  adicionarTarefa(valor: any) {
    // this.tarefasArray.push(valor);
    // this.tarefaNome = '';
    // this.inputNomeTarefa.nativeElement.focus();
    // console.log(`Adicionando tarefa ${valor}`);

    let idCadastro: number = 0;
    this.SalvarTarefaNoBanco({
      "nome": valor
    })
      .subscribe((data) => {
        console.log(`Identificador do cadastro ${data}`);

        idCadastro = data as number;

        if (idCadastro > 0) {
          this.tarefasArray.push(valor);
          this.tarefaNome = '';
          this.inputNomeTarefa.nativeElement.focus();
          console.log(`Adicionando tarefa ${valor}`);
          this.tarefasTipado.push({ id: idCadastro, nome: valor });
        }
      });
  }

  removerTarefa(valor: string) {
    for (let i = this.tarefasArray.length; i >= 0; i--) {
      if (valor == this.tarefasArray[i]) {
        this.RemoverTarefaNoBanco(valor);
        this.tarefasArray.splice(i, 1);
      }
    }
  }

  removerTarefaPorId(id: number) {
    for (let i = 0; i < this.tarefasTipado.length; i++) {
      if (id == this.tarefasTipado[i].id) {
        this.RemoverTarefaNoBancoPorId(id);
        this.tarefasTipado.splice(i, 1);
      }
    }
  }

  submitFormularioTarefa(valorFormulario: any) {
    this.adicionarTarefa(valorFormulario.tarefa);
  }

  constructor(private http: HttpClient, private router: Router) {
    this.ListaTodasTarefas();
  }

  public ListaTodasTarefas() {
    this.http.get("https://localhost:7136/ListarTodas")
      .pipe(map((response: any) => {
        return Object.values(response);
      }))
      .subscribe((data) => {
        for (let index = 0; index < data.length; index++) {
          // console.log(`Retorno ${JSON.stringify(data[index])}`);
          let conteudoJson: any = data[index];
          let conteudoTipado: ITarefaDto = data[index] as ITarefaDto;
          // this.adicionarTarefa(conteudoJson.nome);
          this.tarefasArray.push(conteudoJson.nome);
          this.tarefasTipado.push({ id: conteudoTipado.id, nome: conteudoTipado.nome });
        }
        this.tarefaNome = '';
        this.inputNomeTarefa.nativeElement.focus();
      });
  }

  editarTarefa(id:number){
    this.router.navigate([`detalhe/${id}`]);
  }

  private SalvarTarefaNoBanco(valueToPost: any) {
    return this.http.post("https://localhost:7136/CriarTarefa", valueToPost, this.httpOptions);
  }

  public RemoverTarefaNoBanco(nome: string) {
    this.http.delete(`https://localhost:7136/ApagarTarefa/${nome}`, this.httpOptions)
      .subscribe((data) => {
        console.log(`Linhas executadas no método de remover do banco ${data}`);
      });
  }

  public RemoverTarefaNoBancoPorId(id: number) {
    this.http.delete(`https://localhost:7136/ApagarTarefaPorId/${id}`, this.httpOptions)
      .subscribe((data) => {
        console.log(`Linhas executadas no método de remover do banco ${data}`);
      });
  }
}
