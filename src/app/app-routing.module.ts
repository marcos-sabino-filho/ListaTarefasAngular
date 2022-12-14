import { ListaDetalheComponent } from './lista-detalhe/lista-detalhe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTarefasComponent } from './lista-tarefas/lista-tarefas.component';

const routes: Routes = [
  { path: 'lista', component: ListaTarefasComponent },
  { path: 'detalhe/:id', component: ListaDetalheComponent },
  { path: '**', redirectTo: 'lista' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
