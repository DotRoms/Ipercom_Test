# Monolithic Web Application

Ce projet est une application monolithique, intégrant un **front-end** en **React** avec **TypeScript** et un **back-end** en **C#** avec **Entity Framework Core** (.NET). Le front-end et le back-end sont hébergés dans un même dépôt, et le lancement de l'application nécessite la configuration des deux parties.

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

-   [Node.js et npm](https://nodejs.org/) pour gérer les dépendances front-end
-   [Visual Studio](https://visualstudio.microsoft.com/) ou [Visuel Studio Code](https://code.visualstudio.com/)
-   [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (ou toute autre base de données compatible) pour l'utilisation d'Entity Framework Core.

## Structure du Projet

-   **Front-end** : `React` avec `TypeScript`
    -   Situé dans le dossier `/front`.
    -   Gérez les dépendances avec `npm`.
-   **Back-end** : API en `C#` avec `.NET` et `Entity Framework Core`
    -   Situé dans le dossier `/back`.
    -   Utilise Entity Framework Core pour les opérations de base de données.

Retrouvez l'architeture du projet ici `/conception/Architecture.md`.

## Installation et Lancement

### Étapes pour lancer l'application :

1. **Installer les dépendances front-end** :

    Depuis la racine du projet, naviguez vers le dossier "front" et installez les dépendances :

    ```bash
    $ cd client
    $ npm install
    ```

2. **Pour lancer le Client front-end en mode développement :**

    ```bash
    $ npm run dev
    ```

3. **Installer les dépendances back-end** :

    Depuis la racine du projet, naviguez vers le dossier "back" et installez les packages :

    ```bash
    $ cd back
    $ dotnet restore
    ```

4. **Pour utiliser l'application vous devez créer une base de donnée. L'application est configurer pour Postgresql, si vous souhaitez modifier la BDD veuillez renseigner les information suivantes dans le fichier `appsettings.json`:**



    ```bash"ConnectionStrings": {
        "DefaultConnection": "Host=localhost;Port=votrePort;Database=nomDeVotreDB;Username=votreUserName;Password=votrePassword"
    },
    ```

    Vous devrez ensuite modifier le fichier  `Program.cs` pour ajouter la ligne suivante. Dans notre cas avec Postgresql :

    ```bash
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
    ```

    Enfin vous pouvez lancer la migration pour créer la base de donnée :

    ```bash
    $ dotnet ef migrations add initialMigration
    $ dotnet ef database update
    ```

5. **Pour lancer le Backend en mode développement :**

    ```bash
    $ dotnet build
    $ dotnet run
    ```

