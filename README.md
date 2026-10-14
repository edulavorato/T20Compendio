# T20 Compêndio

Compêndio digital de **Tormenta20** e **A Lenda de Ghanor**, com consulta de regras e criação de personagens diretamente no navegador.

A proposta é reunir informações em uma interface organizada, inspirada no 5etools e adaptada para computadores e celulares.

## Acesso online

O compêndio foi preparado para funcionar como um site pelo **GitHub Pages**.

Depois da publicação, basta acessar o endereço do site no navegador. **Não é necessário baixar o projeto, instalar programas ou executar comandos para usar o compêndio.**

> O endereço de acesso será incluído aqui quando a publicação estiver concluída.

## Funcionalidades

- Consulta de raças, classes, origens, perícias, poderes, magias, deuses, equipamentos, itens mágicos, ameaças e regras.
- Pesquisa por nome e conteúdo, com filtros por categoria e fonte.
- Páginas de raças e classes com descrições, características e opções relacionadas.
- Ilustrações associadas às entradas disponíveis.
- Favoritos e histórico de consultas.
- Criador de personagens com suporte à progressão do nível 1 ao 20, conforme as regras implementadas.
- Seleção de perícias, poderes, habilidades e magias.
- Cálculos automatizados de características da ficha.
- Visualização da ficha pronta.
- Exportação em PDF editável e importação/exportação em JSON.
- Interface responsiva para computadores, tablets e celulares.

A consulta e a criação de personagens acontecem no próprio site. Os downloads de PDF e JSON são opcionais, para guardar, imprimir ou transportar uma ficha.

## Tormenta20 e Ghanor

Os conteúdos estão separados para facilitar a consulta e evitar a mistura de regras dos dois jogos.

| Área | Conteúdo |
|---|---|
| **Tormenta20** | Livro Base — Jogo do Ano e suplementos de Arton incorporados ao projeto. |
| **Ghanor** | Conteúdo de A Lenda de Ghanor, preservando seus nomes, textos e particularidades de regras. |

O criador de personagens também permite escolher o sistema utilizado na ficha.

## Materiais incorporados

- Tormenta20 — Jogo do Ano.
- Atlas de Arton.
- Ameaças de Arton.
- Heróis de Arton.
- Deuses de Arton.
- A Lenda de Ghanor — Livro Base.

O projeto está em desenvolvimento contínuo. A presença de um material no compêndio não significa que todas as suas regras estejam automatizadas no criador.

## Como usar

1. Abra o site no navegador.
2. Escolha a área de **Tormenta20** ou **Ghanor**.
3. Selecione uma categoria ou utilize a pesquisa.
4. Abra uma entrada para consultar suas informações e referências.
5. Para montar uma ficha, acesse **Criar Personagem** e siga as etapas.

## Salvamento dos personagens

As fichas são salvas localmente no navegador utilizado. Atualmente, o projeto não possui contas de usuário nem sincronização automática entre dispositivos.

- Utilize o mesmo navegador e endereço do site para retomar suas fichas.
- Limpar os dados do navegador pode apagar personagens, favoritos e histórico.
- Para fazer uma cópia de segurança, exporte a ficha em **JSON**.
- Para continuar em outro dispositivo ou navegador, importe esse arquivo.
- Para imprimir ou utilizar uma ficha fora do site, exporte o **PDF editável**.

## Publicação no GitHub Pages

Esta seção é destinada à manutenção do projeto. Quem utiliza o site não precisa executar estas etapas.

O site utiliza arquivos estáticos, sem necessidade de compilação ou banco de dados.

Para publicar a versão preparada:

1. Coloque `index.html` e a pasta `assets` na raiz do repositório.
2. Preserve os caminhos e a organização dos arquivos.
3. Configure o GitHub Pages para servir a pasta em que esses arquivos estão.
4. Inclua o endereço publicado na seção **Acesso online** deste README.

No pacote de distribuição, o conteúdo destinado à hospedagem está em `01-site-para-publicar`. A pasta `02-manutencao` contém instruções e ferramentas auxiliares.

## Estrutura do projeto

| Caminho | Responsabilidade |
|---|---|
| `index.html` | Estrutura principal da interface. |
| `assets/css/` | Estilos do compêndio, do criador e dos dispositivos móveis. |
| `assets/js/compendio/` | Navegação, pesquisa, filtros, textos e imagens. |
| `assets/js/criador/` | Regras, cálculos, escolhas e interface de criação de personagens. |
| `assets/js/vendor/` | Bibliotecas externas utilizadas pelo projeto. |
| `assets/data/` | Conteúdos dos livros, regras e configuração de carregamento. |
| `assets/imagens/` | Imagens das páginas de consulta. |
| `assets/pdf/` | Modelo da ficha editável. |
| `assets/fontes/` | Fontes utilizadas na geração do PDF. |

A separação por responsabilidade facilita atualizações e correções sem editar um único arquivo HTML extenso.

## Relatar problemas

Abra uma **Issue** neste repositório e informe:

- A categoria ou etapa do criador afetada.
- O conteúdo ou opção envolvida.
- Os passos para reproduzir o problema.
- O comportamento esperado e o resultado observado.
- O navegador e o dispositivo utilizados.
- Uma captura de tela, quando possível.

Para correções de regras ou textos, informe também o livro, a edição e a página de referência.

## Apoie os materiais oficiais

Este é um projeto de fã, sem vínculo oficial com a Jambô Editora.

Adquira os livros e suplementos oficiais para conhecer os cenários, consultar as regras completas e apoiar seus autores e artistas.

**[Conheça os materiais da Jambô Editora](https://jamboeditora.com.br/)**

As referências de fonte e página ajudam na conferência das informações. Em caso de dúvida, consulte o material oficial e combine a interpretação com sua mesa.
