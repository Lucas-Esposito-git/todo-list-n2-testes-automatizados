import type { Tarefa } from '../types/tarefa';
const CHAVE = 'n2-tarefas-v1';
export function carregarTarefas(): Tarefa[] {
  const dados = localStorage.getItem(CHAVE);
  if (!dados) return [];
  try {
    const lista: unknown = JSON.parse(dados);
    if (Array.isArray(lista) && lista.every(t => t && typeof t.id === 'string' && typeof t.titulo === 'string' && typeof t.concluida === 'boolean')) return lista;
  } catch { /* Dados inválidos: iniciar lista vazia. */ }
  return [];
}
export function salvarTarefas(tarefas: Tarefa[]): void {
  localStorage.setItem(CHAVE, JSON.stringify(tarefas));
}
