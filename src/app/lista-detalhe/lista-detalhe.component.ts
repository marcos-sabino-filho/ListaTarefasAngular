import { ITarefaDto } from './../../interfaces/ITarefaDto';
import {
  Component,
  OnInit,
} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-lista-detalhe',
  templateUrl: './lista-detalhe.component.html',
  styleUrls: ['./lista-detalhe.component.css']
})
export class ListaDetalheComponent implements OnInit {
  tarefaParaEditar: ITarefaDto = { id: 0, nome: '' };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.CarregarTarefa(Number(params.get('id')));
    });
  }

  public CarregarTarefa(id: number) {
    this.http.get(`https://localhost:7136/ListarPorId/${id}`)
      .subscribe((data) => {
        this.tarefaParaEditar = data as ITarefaDto;
        console.log(`Objeto para editar: ${JSON.stringify(this.tarefaParaEditar)}`);
      });
  }

  public AtualizarTarefaNoBanco() {
    this.http.patch("https://localhost:7136/AtualizarTarefa", this.tarefaParaEditar, this.httpOptions)
      .subscribe((data) => {
        console.log(`Linhas executadas no método de remover do banco ${data}`);
        this.router.navigate([`lista`]);
      });
  }

}
