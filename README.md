# Tech Challenge 04 - FIAP Blog

## Acesso à documentação detalhada e demonstração de uso (video)
[Google Drive](https://drive.google.com/drive/folders/1VBJzdS7BMZR1wPOAjoKoWCTaJOzE7sgD?usp=sharing) <br>
[GitHub](https://github.com/Challenge-1FSDT/mobile-react)
[APK](https://expo.dev/accounts/anderson361163/projects/mobile-react/builds/a6944e3d-d063-4c4c-bc5a-8f2cae1ef789)

## Grupo 14 - Membros
- RM353230 Anelise Estevam
- RM355290 Anderson da Silva Machado 
- RM354725 Gustavo Fonseca
- RM354782 João Pedro Sanches Luciano 

## Data de entrega
- 03/12/2024

# Download do App
![QR Code para Download do APK](https://github.com/user-attachments/assets/b6f637b1-65de-47fd-b5c7-24d4a93bb292)
[Clique aqui para baixa](https://expo.dev/accounts/anderson361163/projects/mobile-react/builds/a6944e3d-d063-4c4c-bc5a-8f2cae1ef789)

## Requisitos
### Funcionais
Requisitos funcionais
A interface gráfica deve incluir as seguintes páginas e funcionalidades:

1. Página principal (lista de posts)
   - [X] - Exibir uma lista de todos os posts disponíveis.
   - [X] - Cada item da lista deve mostrar o título, autor e uma breve descrição do post.
   - [X] - Incluir um campo de busca para filtrar posts por palavras-chave.

2. Página de leitura de post
   - [X] - Exibir o conteúdo completo de um post selecionado.
   - [X] - Permitir comentários nos posts (opcional).

3. Página de criação de postagens
   - [X] - Formulário para que professores possam criar postagens.
   - [X] - Campos para título, conteúdo e autor.
   - [X] - Botão para enviar o post ao servidor.

4. Página de edição de postagens
   - [X] -Formulário para que docentes possam editar postagens existentes.
   - [X] - Carregar os dados atuais do post para edição.
   - [X] - Botão para salvar as alterações.

5. Página de criação de professores
   - [X] - Formulário para que professores possam cadastrar outros professores.
   - [X] - Botão para enviar o post ao servidor.

6. Página de edição de professores
   - [X] - Formulário para que professores possam editar docentes já cadastrados.
   - [X] - Botão para salvar as alterações.

7. Página de listagem de professores
   - [X] - Página para listagem paginada dos professores e, nas tabelas para cada professor, teremos um botão de editar que leva para a página
de edição e um botão de excluir que vai deletar o docente do
sistema.

8. Replique os requisitos 5, 6 e 7 para estudantes
   - [X] - Seguindo o padrão de páginas administrativas feitas para professores, faça o mesmo para alunos.

9. Página administrativa
   - [X] - Exibir uma lista de todas as postagens, com opções para editar e excluir cada post.
   - [X] - Botões para editar e excluir postagens específicas.

10. Autenticação e autorização
   - [X] - Implementar login para professores.
   - [X] - Garantir que apenas usuários autenticados possam acessar as páginas de criação, edição e administração de postagens.
   
<b>Requisitos técnicos</b>

1. Desenvolvimento em React Native
   - [X] - Utilizar React Native para desenvolver a interface gráfica do aplicativo.
   - [X] - Utilização de hooks e componentes funcionais.

2. Estilização
   - [X] -  Estilizar o projeto de acordo com layout definido pelo grupo.

3. Integração com Back-End
   - [X] -  Realizar chamadas aos endpoints REST para obter, criar, editar e excluir posts.
   - [X] -  Realizar chamadas aos endpoints REST para obter, criar, editar e excluir alunos.
   - [X] -  Realizar chamadas aos endpoints REST para obter, criar, editar e excluir professores.
   - [X] -  Realizar chamadas aos endpoints REST para autenticação.
   - [x] -  Validar permissão para professores e alunos, onde professores podem modificar/criar um post e os alunos podem apenas visualizar.
   - [x] -  Gerenciar o estado da aplicação com ferramentas como Context API ou Redux (opcional).

4. Documentação
   - [X] -  Documentação técnica detalhada do mobile no README do repositório, incluindo setup inicial, arquitetura da aplicação e guia
de uso.

# Principais Tecnologias

Arquitetura do Projeto em React Native

A arquitetura do nosso projeto em React Native foi pensada para facilitar o desenvolvimento e garantir uma boa performance. Utilizamos ferramentas como Expo, React Router, e outras bibliotecas para estruturar o app de maneira eficiente.

* Gerenciamento de Navegação com React Router</br>
Optamos por usar o React Router para navegação entre as telas. Ele foi a solução ideal para o nosso caso, já que oferece flexibilidade e uma configuração simples de rotas, tanto para iOS, Android, quanto para Web. A navegação foi organizada de forma modular, aproveitando a estrutura de pastas do projeto, o que torna a gestão das rotas mais clara e fácil de manter. Além disso, os layouts reutilizáveis permitem que partes da interface, como cabeçalhos ou menus, sejam compartilhadas entre diferentes rotas sem complicação.

* Expo</br>
A escolha do Expo foi fundamental para acelerar o desenvolvimento. Ele oferece uma série de ferramentas prontas para uso, como Expo-Icons, Expo-Constants, e Expo-Splash-Screen, que ajudam a reduzir o tempo de desenvolvimento. Além disso, usamos o Expo Router para configurar as rotas de maneira simples e prática, integrando bem com o React Router.

* Persistência de Dados com AsyncStorage </br>
Para garantir que dados importantes, como o token de autenticação ou preferências do usuário, sejam mantidos entre as sessões, usamos o AsyncStorage. Ele é simples de implementar e essencial para evitar que o usuário precise se autenticar novamente ou perder dados ao fechar o app.


## Entrega

- - [X] Código-Fonte: repositório GitHub com o código do projeto, incluindo Dockerfiles e scripts de CI/CD.
- - [X] Apresentação Gravada: demonstração em vídeo do funcionamento da aplicação, incluindo detalhes técnicos de implementação.
- - [X] Documentação: documento descrevendo a arquitetura do sistema, uso da aplicação e relato de experiências e desafios enfrentados pela equipe durante o desenvolvimento.

---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start

