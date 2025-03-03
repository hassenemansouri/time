# TimeForge Frontend

🚀 **TimeForge** est une application de gestion du temps et de la productivité, construite avec **Angular** et **PrimeNG** pour offrir une expérience utilisateur moderne et performante.

## 📌 Fonctionnalités principales
✅ Gestion des tâches et des projets 📋  
✅ Collaboration en temps réel 🧑‍🤝‍🧑  
✅ Automatisation des workflows ⚡  
✅ Synchronisation Cloud ☁️  
✅ Statistiques et analyses avancées 📊  

---

## 🛠️ Technologies utilisées
- **Angular** - Framework frontend
- **TypeScript** - Langage de programmation
- **PrimeNG** - Composants UI
- **Bootstrap** - Design responsive
- **RxJS** - Gestion des événements asynchrones

---

## 📥 Installation et Exécution

### 1️⃣ Prérequis
Assurez-vous d'avoir installé **Node.js** et **Angular CLI** :
```sh
node -v  # Vérifier Node.js
npm install -g @angular/cli  # Installer Angular CLI
```

### 2️⃣ Cloner le projet
```sh
git clone https://github.com/ton-repo/timeforge-frontend.git
cd timeforge-frontend
```

### 3️⃣ Installer les dépendances
```sh
npm install
```

### 4️⃣ Lancer l'application
```sh
ng serve
```
Ensuite, ouvrez **http://localhost:4200/** dans votre navigateur.

---

## 🔧 Configuration

🔹 Modifier les variables d'environnement dans **src/environments/** :
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
};
```

🔹 Remplacez `apiUrl` par l'URL de votre backend.

---

## 📁 Structure du projet
```
timeforge-frontend/
│── src/
│   ├── app/
│   │   ├── components/  # Composants UI
│   │   ├── pages/       # Pages principales
│   │   ├── services/    # Services API
│   │   ├── models/      # Modèles de données
│   ├── assets/          # Images, styles
│   ├── environments/    # Configuration
│── angular.json         # Configuration Angular
│── package.json         # Dépendances
│── README.md            # Documentation
```

---

## 🚀 Déploiement
Pour construire l'application en production :
```sh
ng build --prod
```
Les fichiers seront générés dans `dist/timeforge-frontend/`.

---

## 👥 Contributeurs
👤 **Ton Nom** - [GitHub](https://github.com/ton-profil)  
💡 Contributions, idées ou améliorations ? Ouvrez une **issue** ou faites une **pull request** !

---

## 📜 Licence
Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser et de le modifier.

🔹 **Made with ❤️ by TimeForge Team** 🚀
