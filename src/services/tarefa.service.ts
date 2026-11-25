import type { Tarefa } from '../types/tarefa';

export const LIMITE_TITULO = 100;

// Regra de negócio utilizada diretamente pelo formulário da aplicação.
export function validarTitulo(titulo: string): string {
  const tituloLimpo = titulo.trim();
  if (!tituloLimpo) throw new Error('O título da tarefa é obrigatório.');
  if (tituloLimpo.length > LIMITE_TITULO) {
    throw new Error('O título deve ter no máximo 100 caracteres.');
  }
  return tituloLimpo;
}

export function criarTarefa(titulo: string): Tarefa {
  return { id: crypto.randomUUID(), titulo: validarTitulo(titulo), concluida: false };
}

export function alternarConclusao(tarefas: Tarefa[], id: string): Tarefa[] {
  return tarefas.map(tarefa => tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa);
}

export function excluirTarefa(tarefas: Tarefa[], id: string): Tarefa[] {
  return tarefas.filter(tarefa => tarefa.id !== id);
}
