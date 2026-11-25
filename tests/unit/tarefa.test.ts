import { describe, it, expect } from 'vitest';
import { validarTitulo } from '../../src/services/tarefa.service';

describe('Validação do título da tarefa', () => {
  it('U-01 — aceita título válido e remove espaços nas extremidades', () => {
    expect(validarTitulo('  Estudar testes  ')).toBe('Estudar testes');
  });
  it('U-02 — rejeita título composto somente por espaços', () => {
    expect(() => validarTitulo('   ')).toThrow('O título da tarefa é obrigatório.');
  });
  it('U-03 — aceita título com exatamente 100 caracteres', () => {
    const titulo = 'a'.repeat(100);
    expect(validarTitulo(titulo)).toBe(titulo);
    expect(validarTitulo(titulo)).toHaveLength(100);
  });
});
