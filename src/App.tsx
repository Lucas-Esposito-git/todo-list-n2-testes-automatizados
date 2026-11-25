import { useState, type FormEvent } from 'react';
import { criarTarefa, alternarConclusao, excluirTarefa, LIMITE_TITULO } from './services/tarefa.service';
import { carregarTarefas, salvarTarefas } from './services/armazenamento.service';
import type { Tarefa } from './types/tarefa';

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(carregarTarefas);
  const [titulo, setTitulo] = useState('');
  const [erro, setErro] = useState('');
  const concluidas = tarefas.filter(t => t.concluida).length;

  function atualizar(lista: Tarefa[]) {
    salvarTarefas(lista);
    setTarefas(lista);
  }
  function adicionar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    try {
      const tarefa = criarTarefa(titulo);
      atualizar([...tarefas, tarefa]);
      setTitulo('');
      setErro('');
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível cadastrar a tarefa.');
    }
  }
  function alterar(lista: Tarefa[]) {
    try { atualizar(lista); setErro(''); }
    catch { setErro('Não foi possível salvar a alteração.'); }
  }
  return <main className="container">
    <header><span className="eyebrow">ORGANIZAÇÃO PESSOAL</span><h1>Minhas tarefas</h1><p>Organize seu dia, uma tarefa de cada vez.</p></header>
    <section className="stats" aria-label="Resumo das tarefas">
      <div><strong>{tarefas.length}</strong><span>Total</span></div><div><strong>{tarefas.length-concluidas}</strong><span>Pendentes</span></div><div><strong>{concluidas}</strong><span>Concluídas</span></div>
    </section>
    <section className="panel">
      <form onSubmit={adicionar} noValidate>
        <label htmlFor="titulo">Nova tarefa</label>
        <div className="form-row"><input id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Ex.: Estudar testes automatizados" aria-describedby="limite"/><button type="submit">Adicionar</button></div>
        <small id="limite">{titulo.trim().length}/{LIMITE_TITULO} caracteres</small>
      </form>
      {erro && <p role="alert" className="erro">{erro}</p>}
      <h2>Lista de tarefas</h2>
      {tarefas.length === 0 ? <p className="empty">Nenhuma tarefa cadastrada. Adicione sua primeira tarefa!</p> : <ul aria-label="Tarefas">{tarefas.map(t => <li key={t.id} className={t.concluida ? 'done' : ''}>
        <label className="task"><input type="checkbox" checked={t.concluida} onChange={() => alterar(alternarConclusao(tarefas,t.id))}/><span>{t.titulo}</span></label>
        <button className="delete" aria-label={`Excluir ${t.titulo}`} onClick={() => alterar(excluirTarefa(tarefas,t.id))}>Excluir</button>
      </li>)}</ul>}
    </section>
    <footer>Projeto de estudo • Avaliação N2 — Testes de Software</footer>
  </main>;
}
