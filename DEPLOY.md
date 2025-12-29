# Guide de Déploiement

Ce guide vous explique comment déployer votre portfolio en utilisant **Docker**.

## Prérequis

- Avoir [Docker](https://www.docker.com/) installé sur votre machine ou votre serveur.

## Instructions

### 1. Construire l'image Docker

Ouvrez un terminal dans le dossier du projet et lancez la commande suivante :

```bash
docker build -t portfolio .
```

Cette étape peut prendre quelques minutes la première fois (téléchargement de Node.js, installation des dépendances, etc.).

### 2. Lancer le site

Une fois l'image construite, lancez le conteneur avec cette commande :

```bash
docker run -d -p 3000:3000 --name mon-portfolio portfolio
```

Explication des options :
- `-d` : Lance le conteneur en arrière-plan (mode "détaché").
- `-p 3000:3000` : Rend le site accessbile sur le port 3000 de votre machine.
- `--name mon-portfolio` : Donne un nom facile à retenir à votre conteneur.

### 3. Accéder au site

Ouvrez votre navigateur et allez sur :
[http://localhost:3000](http://localhost:3000)

(Si vous êtes sur un serveur distant, remplacez `localhost` par l'adresse IP de votre serveur).

## Mettre à jour le site

Si vous faites des modifications dans votre code, voici comment mettre à jour le site en ligne :

1.  **Reconstruire l'image** (pour inclure les modifications) :
    ```bash
    docker build -t portfolio .
    ```

2.  **Arrêter et supprimer l'ancien conteneur** :
    ```bash
    docker rm -f mon-portfolio
    ```

3.  **Relancer le nouveau conteneur** :
    ```bash
    docker run -d -p 3000:3000 --name mon-portfolio portfolio
    ```


## Scripts d'automatisation

Pour vous simplifier la vie, utilisez les scripts inclus :

-   **Mettre à jour le site** (après une modif) :
    ```bash
    ./update.sh
    ```
    *Cela reconstruit l'image et relance le conteneur.*

-   **Arrêter le site** :
    ```bash
    ./stop.sh
    ```

-   **Démarrer le site** (sans reconstruire) :
    ```bash
    ./start.sh
    ```

> Note : Si vous avez une erreur de permission, lancez `chmod +x *.sh` une seule fois.

## Problèmes courants

### Port déjà utilisé
Si vous avez une erreur `bind: address already in use`, changez le premier numéro du port (celui de votre machine) :
```bash
# Exemple : utiliser le port 3001 sur votre machine
docker run -d -p 3001:3000 --name mon-portfolio portfolio
```
**Note** : Ne changez pas le deuxième numéro (3000), c'est celui utilisé par le serveur à l'intérieur du conteneur.

### Nom de conteneur déjà utilisé
Si vous avez une erreur `Conflict. The container name... is already in use`, supprimez l'ancien conteneur avant de relancer :
```bash
docker rm -f mon-portfolio
```
