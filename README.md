
# Progress Management

Progress Management é uma aplicação full-stack feita com nextJs 14. Ela é um gerenciador de progresso, onde o usuário pode definir uma tarefa e a medida que for concluido ir relatando o progresso.


## Propósito
Com a chegada do next 13.4, foi introduzido as funcionalidades de server actions e server components, as server actions foram "oficializadas" na versão 14 do nextJs.

O propósito da aplicação foi estudar essas novas funcionalidades, cerca de 95% da aplicação foi feita utilizando server components, onde toda estrutura da pagina/componente é construida e hidratada no servidor, sendo enviado uma quantidade baixíssima de javascript para o client (navegador).

# Funcionalidades
- Autenticação com Github
- Criar, Atualizar, Vizualizar e Deletar Task.
- Criar e Deletar entrada da task.
- Paginação (4 tasks por pagina).
- Filtar task por nome.
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `
.env
`

Url do banco de postgreSQL:

`DATABASE_URL=` 

Secret para o nextJs (qualquer texto aleatorio):

`NEXTAUTH_SECRET=`

GITHUB_ID E GITHUB_SECRET para autentição usando Oauth (next-auth):

`GITHUB_ID=`

`GITHUB_SECRET=`


## Melhorias

- Adicionar testes unitários 
- Permitir compartilhar progresso de task com outras pessoas.



## Stack utilizada

**Back-end:** NextJs 14, Tailwind, Shadcn/ui, Prisma, PostgreSQL, Next-Auth, Zod.


## Observações
Atualmente na versão NextJs 14.1.0, não é possível realizar testes unitários utilizando jest, existe um próvavel erro de conflito de arquivos.