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
-   **Base de données** : `Postgresql`
    -   Vous pouvez modifier la base de données dans le fichier `appsettings.json`.


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

## Choix technologiques

### Front-end

-   **React** : Bibliothèque JavaScript pour la création d'interfaces utilisateur.
-   **TypeScript** : Langage de programmation fortement typé et open-source développé par Microsoft.
- **TailwindCSS** : Framework CSS pour la création de design moderne. Rapide a mettre en place et facile à utiliser. L'utilisation de TailwindCSS permet de créer des composants réutilisables et de gagner du temps dans le développement.
- **zod** : Bibliothèque de validation de schémas TypeScript. Elle permet de valider les données entrantes et de garantir que les données sont correctes avant de les utiliser. Permet de réduire considérablement les failles de sécurité.
- **JWToken** : Pour l'authentification et la sécurisation des routes. Permet de vérifier a l'aide d'un token générer par le backend si l'utilisateur est bien authentifié.
- **Eslint** : Pour le respect des normes de codage.
- **Vite** : Pour le lancement rapide de l'application.

### Back-end

-   **C#** : Langage de programmation orienté objet développé par Microsoft. Utilisé pour le développement de l'API.
-   **.NET** : Plateforme de développement logiciel pour construire des applications plus rapidement. 
-   **Entity Framework Core** : Outil de mapping objet-relationnel (ORM) open source développé par Microsoft. Permet de simplifier l'accès aux bases de données.
-   **Postgresql** : Système de gestion de base de données relationnelle open source. Permet de stocker les données de l'application.
-   **JWT** : Pour l'authentification et la sécurisation des routes. Permet de vérifier a l'aide d'un token générer par le backend si l'utilisateur est bien authentifié.
-   **Swagger** : Pour la documentation de l'API.
- **Bcrypt** : Pour le hashage des mots de passe. Permet de sécuriser les mots de passe des utilisateurs.

### Tests

- **XUnit** : Framework de test pour .NET. Utilisé pour les tests unitaires.
- **Moq** : Bibliothèque de mock pour .NET. Utilisé pour les tests unitaires. Permet de simuler des objets et de tester les interactions entre les objets.
- **FluentAssertions** : Une bibliothèque pour écrire des assertions claires, lisibles et expressives dans les tests. Elle améliore la lisibilité et la maintenabilité des tests unitaires.
- **Microsoft.EntityFrameworkCore.InMemory :** Pour les tests unitaires. Permet de simuler une base de données en mémoire temporaire pour les tests.

## Autres

Ce projet est un exemple d'application monolithique. Il est possible de le découper en microservices pour une architecture plus évolutive et scalable. Pour cela, il faudra découper l'application en plusieurs services. 

Ce projet est un test technique réalisé dans le cadre d'une candidature pour un poste de développeur Fullstack.