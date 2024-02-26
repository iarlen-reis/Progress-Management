<img src="/public/git-hub/home.png" alt="image da pagina inicial da aplicação">
<img src="/public/git-hub/task.png" alt="imagem de uma task da aplicação">

# Progress Management

Progress Management é uma aplicação full-stack feita com nextJs 14. Ela é um gerenciador de progresso, onde o usuário pode definir uma tarefa e a medida que for concluido ir relatando o progresso.


## Propósito
No nextJs 13.4 foram introduzidas as funcionalidades de server actions e server components, a server action foi "oficializada" na versão 14 do nextJs.

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


## Minhas considerações
No meu ponto de vista o NextJs/Vercel ainda tem muito o que melhorar nos server components, existem algumas coisas que me encomodaram bastante durante o desenvolvimento:

- As server actions só podem retornar `Promise<void>`, o que impede de fazer validações antes de efeituar qualquer comunicação com o banco de dados.

- Não é possível utilizar as rotas da `api routes` em componentes ou páginas de servidor, por exemplo, se você tem uma api routes `/api/tasks` você não pode utiliza-la em uma página de servidor já que as rotas de api do NextJs não estão disponivel no momento do build. 

- Se você chamar uma `api routes` dentro de uma página de servidor localmente na sua máquina, simplesmente funcionará.

- Atualmente na versão NextJs 14.1.0, não é possível realizar testes unitários utilizando jest, existe um próvavel erro de conflito de arquivos.

- Agora existe a possibilidade de revalidar os dados com os hooks `revalidatePath` e `revalidateTag`, acredito que não é a melhor forma para lidar com cache, mas é um bom começo, o `react-query` continua sendo a melhor opção para manipulação de cache.

## Considerações finais

O NextJs/Vercel parecem decididos á adotar o server side render como modelo de desenvolvimento, provavelmente muita coisa será alterada futuramente, principalmente em relação as server actions e api routes.

Se permitirem a utilização de api routes em páginas e componentes de servidor será muito bom para manter tudo organizado, já que JSX e Acesso ao banco de dados no mesmo arquivo torna as coisas muito confusa.

O desenvolvimento da aplicação foi bastante divertido, principalmente com as server actions, mas irei esperar um amadurecimento antes de usar em produção.