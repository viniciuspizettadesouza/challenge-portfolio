# challenge-stormtech

## Para rodar a aplicação

Após clonar o repositório do github, por conta do arquivo .gitignore executar um dos comandos abaixo para carregar os modulos do node dentro da pasta do frontend

    yarn install
    ou
    npm install

Para executar o backend da aplicação:

Dentro da pasta backend, execute o comando abaixo para subir o servidor na porta 3333.

    yarn start
    ou
    npm run-script start
    onde "start" é o script criado no arquivo package.json

Para executar o frontend da aplicação:

Dentro da pasta frontend, execute o comando abaixo para iniciar a aplicação na porta 3000.

    yarn start
    ou
    npm react-script start

#### Test Cases

Dada a seguinte lista de livros:

|     | Título                                          | Author            | Edition Year |
| --- | ----------------------------------------------- | ----------------- | ------------ |
| 1   | Java How To Program                             | Deitel & Deitel   | 2007         |
| 2   | Patterns of Enterprise Application Architecture | Martin Fowler     | 2002         |
| 3   | Head First Design Patterns                      | Elisabeth Freeman | 2004         |
| 4   | Internet & World Wide Web: How to Program       | Deitel & Deitel   | 2007         |

Os seguintes casos de teste devem passar na implementação:

| Rules                                                  | Expected         | OutputNotes                             |
| ------------------------------------------------------ | ---------------- | --------------------------------------- |
| Title Ascending                                        | Books 3, 4, 1, 2 |                                         |
| Author Ascending, Title Descending                     | Books 1, 4, 3, 2 |                                         |
| Edition descending, Author descending, Title ascending | Books 4, 1, 3, 2 |                                         |
| Null                                                   | -                | Should throw an SortingServiceException |
| (empty set)                                            | (empty set)      |                                         |
