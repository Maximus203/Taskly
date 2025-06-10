![02-Taskly-logo-github](https://github.com/Maximus203/Taskly/assets/64066992/1436d91b-d7e0-4410-a4b2-cd0cc1f25c5a)


# Taskly: Gestion de Tâches

Une application de gestion de tâches élégante et efficace, avec un backend Express.js et un frontend React.

## Table des Matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Configuration](#configuration)
- [Fonctionnalités](#fonctionnalites-a-implementer)
- [Contributions](#contributions)
- [Auteurs](#auteurs)
- [Licence](#licence)
- [Contacts](#contacts)

## Installation

1. **Backend** :

```bash

cd backend
npm install

```

1.  **Frontend** :

```bash

cd frontend
npm install

```

## Utilisation

**Backend:**

```bash

cd backend
npm start

```

**Frontend:**

```bash

cd frontend
npm start

```

Visitez `http://localhost:3000` dans votre navigateur pour accéder à l'interface utilisateur de Taskly.

## Configuration

Assurez-vous de créer un fichier `.env` à la racine de backend et frontend pour définir toutes les variables d'environnement nécessaires.

## Fonctionnalités à implémenter

### Backend

- Gestion des utilisateurs : inscription, connexion, mise à jour et suppression.
- Gestion des tâches : création, suivi, mise à jour et suppression.
- Gestion des projets : création, modification et assignation des tâches.
- Attribution des rôles pour sécuriser les accès.
- Réponses uniformes au format `{ status: true, message: "Création réussi", error: [] }`.
- Mise en place de design patterns (services, repositories…) pour structurer le code.
- Refactorisation générale du backend pour améliorer la maintenabilité.

### Frontend

- Interfaces React pour la gestion des utilisateurs, des projets et des tâches.
- Consommation des API du backend et affichage des retours au format précédent.

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :

- Clonez le dépôt.
- Créez une nouvelle branche.
- Faites vos modifications.
- Soumettez une demande de pull.

## Auteurs

Cherif Diouf

## Licence

Ce projet est sous [licence](https://snyk.io/fr/learn/what-is-mit-license/) MIT. Voir le fichier `LICENCE` pour plus d'informations.

## Contacts

Si vous avez des questions ou des suggestions, n'hésitez pas à me contacter à [printf0cherif@gmail.com](mailto:printf0cherif@gmail.com).
