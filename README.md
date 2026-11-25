# Minhas tarefas — Avaliação N2

SENAI FATESG | ADS 4 | Teste de Software | Professor Allan Braga

Aplicação de estudo independente, versão inicial 1.0.0. Cadastro, listagem, conclusão e exclusão de tarefas com persistência no navegador. React, TypeScript, Vite e Vitest.

## Instalação e execução

Pré-requisitos: Node.js 22 LTS e npm, conexão com o registro npm.

```bash
npm install
npm run dev
```

Abra http://localhost:5173 (ou o endereço indicado pelo Vite). Cadastre uma tarefa, marque como concluída, recarregue a página e confirme a persistência; exclua a tarefa. Tente também título vazio e título acima de 100 caracteres.

```bash
npm test
npm run build
```

O comando `npm test` executa os três testes unitários. Para gravar evidência no PowerShell:

```powershell
npm test 2>&1 | Tee-Object -FilePath evidencias/unitarios.txt
```

Guarde também uma captura do terminal com os identificadores dos casos (para exibição detalhada, use `npm test -- --reporter=verbose`). Após a instalação, preserve o package-lock.json no Git; outros integrantes poderão usar `npm ci`.

## Regras e casos unitários

O formulário chama `criarTarefa`, que utiliza `validarTitulo`, em `src/services/tarefa.service.ts`. A regra elimina espaços externos e exige 1 a 100 unidades de comprimento de string JavaScript. Não há cópia da função no código de teste.

| Caso | Tipo | Entrada / ação | Esperado |
|---|---|---|---|
| U-01 | Unitário | validarTitulo('  Estudar testes  ') | Retorna 'Estudar testes' |
| U-02 | Unitário | validarTitulo('   ') | Lança erro de título obrigatório |
| U-03 | Unitário | validarTitulo('a'.repeat(100)) | Retorna o título intacto, comprimento 100 |
| C-01 | E2E proposto, pendente | Cadastrar tarefa, marcar concluída, recarregar | Tarefa visível e checkbox ainda marcado |

Vitest foi escolhido por integração com TypeScript/Vite e por permitir testar funções isoladas sem navegador. O complementar deverá usar navegador e armazenamento reais, sem simulações. Fora do escopo inicial: acessibilidade completa, múltiplos navegadores, falhas de armazenamento e testes de carga.

## Próximos passos e versionamento

Confirme com o professor a aceitação desta aplicação nova de estudo: o enunciado pede uma aplicação já funcionando. Valide a aplicação antes da execução formal dos testes. Para registrar a versão base, em um repositório novo:

```bash
git init
git add src index.html package.json package-lock.json tsconfig.json vite.config.ts .gitignore
git commit -m "feat: aplicação de tarefas funcional"
git rev-parse HEAD
git add .
git commit -m "test: três casos unitários e documentação"
git rev-parse HEAD
```

Registre ambos os hashes reais no roteiro, além do commit efetivamente testado após a integração do C-01. Não retrodate commits. Publique em repositório acessível ao professor.

## Situação da execução

A instalação neste ambiente foi bloqueada pelo erro de resolução DNS EAI_AGAIN ao acessar registry.npmjs.org. Vitest e build não foram executados; não há resultados ou evidências de aprovação. Execute localmente e preencha o roteiro com data, ambiente e resultados reais. O teste E2E fica a cargo do segundo integrante.
