# Google Contacts Manager 
Une application Web moderne et minimaliste qui aide les utilisateurs à gérer leurs contacts Google en formatant 
automatiquement les numéros de téléphone avec le préfixe de code de pays +229.


![Google Contacts Manager](https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&auto=format&fit=crop&q=80) 


## Fonctionnalités 

- 🔐 Authentification sécurisée Google OAuth 2.0
- 📱 Formatage automatique du numéro de téléphone pour l'indicatif de pays +229 
- 📊 Suivi de la progression en temps réel
- 🎯 Mises à jour par lots pour plusieurs contacts
- 💫 Interface utilisateur moderne et réactive
- 🔄 Intégration transparente avec l'API Google People

## Prérequis Avant de commencer, assurez-vous d'avoir :

- Node.js 18.x ou supérieur
- Un compte Google Cloud Platform
- Les informations d'identification Google OAuth 2.0

            
## Premiers pas

1. Clonez le référentiel : ```bash git clone https://github.com/yourusername/google-contacts-manager.git cd google-contacts-manager ```
2. Installer les dépendances : ```bash npm install ```
3. Créer un fichier `.env` dans le répertoire racine et ajouter vos identifiants Google OAuth : ```env VITE_GOOGLE_CLIENT_ID=your_client_id_here ```
4. Démarrer le serveur de développement : ```bash npm run dev ```

  
## Configuration 

1. Accédez à la [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet ou sélectionnez-en un existant
3. Activez l'API Google People
4. Configurez l'écran de consentement OAuth
5. Créez des identifiants OAuth 2.0
6. Ajoutez des origines JavaScript autorisées et des URI de redirection


## Tech Stack - ⚛️ React 18 - 🏃‍♂️ Vite - 🎨 Tailwind CSS - 📦 Zustand pour la gestion des états - 🔑 @react-oauth/google pour l'authentification - 🎯 TypeScript - 💅 Icônes Lucide React 

## Structure du projet 
```
src/
├── components/          # React components
│   ├── ContactsManager.tsx
│   ├── Header.tsx
│   └── LoginButton.tsx
├── store/              # State management
│   └── authStore.ts
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Construction pour la production 
Pour créer une construction de production : ```bash npm run build ``` 
Les fichiers compilés seront dans le répertoire `dist`. 

## Contribution 
1. Fork le référentiel
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Validez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request


## Licence Ce projet est sous licence MIT - consultez le fichier [LICENSE](LICENSE) pour plus de détails. 
## Remerciements - Documentation de l'API Google People - Documentation React OAuth2 - Équipe Tailwind CSS - Icônes Lucide 

## Assistance Pour obtenir de l'aide, veuillez ouvrir un problème dans le référentiel GitHub ou contacter 0195807568.
