# App Notícias

App simples utilizando Ionic 3 para visualização, cadastro e edição de notícias no banco local (sqlite).


## Sobre o projeto

### CRUD / Cadastro da notícia:

#### Funções:

* Cadastro
* Edição
* Exclusão


#### Campos:

* Título*
* Texto* (ilimitado)
* Autor* (chave estrangeira para a tabela Autor)
* Imagem

**Obrigatório.*


## Demo


<img alt="GIF exbindo abertura do app (Ícone, Splash, Home)" src="docs/gifs/app-noticias-icon-splash.gif" width="250">

<img alt="GIF abrindo pages da Tab" src="docs/gifs/app-noticias-pages.gif" width="250">

<img alt="GIF do fluxo de Cadastro" src="docs/gifs/app-noticias-cadastro.gif" width="250">

<img alt="GIF do fluxo de Detalhamento e Editar" src="docs/gifs/app-noticias-detalhe-editar.gif" width="250">

<img alt="GIF do fluxo de Pesquisa" src="docs/gifs/app-noticias-pesquisa.gif" width="250">


## Pacotes necessários

* [NodeJS](https://github.com/nodejs/node)
* [npm](https://github.com/npm/cli)
* [JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Gradle](https://docs.gradle.org/current/userguide/installation.html)
* [ionic, cordova](https://ionicframework.com/docs/intro/installation/)
* * Usando npm para instalar o _ionic_: `sudo npm install -g ionic cordova`

### Instalando as dependências no Arch Linux

Instalar o nodejs, npm, jdk8, gradle usando o gerenciador de pacotes (pacman): 
`pacman -S nodejs npm jdk8-openjdk gradle`

Então instalar o ionic e o cordova utilizando o npm:
`sudo npm install -g ionic cordova`


#### Build 

###### Android 

Para buildar o pacote **Android**:
```
npm install
ionic cordova prepare android
```

#### Run

###### Android

Para **rodar** o app no **Android**:
```
npm install
ionic cordova run android
```

## Versões utilizadas para o build

Do output do comando `ionic info`:

```
    @ionic/cli-utils  : 1.19.3
    ionic (Ionic CLI) : 3.20.1

global packages:

    cordova (Cordova CLI) : 8.1.2 (cordova-lib@8.1.1) 

local packages:

    @ionic/app-scripts : 3.2.3
    Cordova Platforms  : android 7.1.4
    Ionic Framework    : ionic-angular 3.9.2

System:

    Android SDK Tools : 26.1.1
    Node              : v8.10.0
    npm               : 5.6.0 
    OS                : xxxx

```
