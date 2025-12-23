# Jacques.dev - Portfolio Personnel

Site portfolio moderne et responsive développé pour présenter mes compétences, projets et expériences en développement informatique.

## 🌟 Fonctionnalités

### ✨ Interface
- **Design moderne et responsive** - Compatible desktop, tablette et mobile
- **Mode sombre/clair** - Changement de thème avec sauvegarde des préférences
- **Animations fluides** - Effets au scroll et transitions élégantes
- **Navigation smooth** - Défilement fluide entre les sections

### 🌍 Multilingue
Support de 4 langues avec sélecteur intuitif :
- 🇫🇷 Français
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇷🇺 Русский

## 🏗️ Structure du site

### Sections principales
1. **À propos** - Présentation personnelle avec liens réseaux sociaux
2. **Compétences** - Compétences techniques actuelles et technologies en apprentissage
3. **Expérience & Éducation** - Timeline avec parcours professionnel et académique
4. **Projets** - Portfolio de projets réalisés avec liens GitHub
5. **Contact** - Formulaire de contact et informations

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec variables CSS et media queries
- **JavaScript (Vanilla)** - Interactivité sans framework
- **Font Awesome** - Icônes pour l'interface
- **SVG** - Logos personnalisés des technologies

## 🚀 Démarrage rapide

1. **Cloner le projet**
```bash
git clone https://github.com/JacquesLucas07/Jacques.dev.git
cd Jacques.dev
```

2. **Lancer le site**
   - Ouvrir `index.html` dans un navigateur
   - Ou utiliser Live Server dans VS Code pour le rechargement automatique

## 💡 Fonctionnalités techniques

### Mode sombre
- Basculement entre thème clair et sombre
- Sauvegarde de la préférence dans `localStorage`
- Variables CSS pour une transition fluide

### Système de traduction
- Chargement dynamique des fichiers JSON
- Traduction automatique des éléments avec attribut `data-translate`
- Support des placeholders de formulaire
- Mémorisation de la langue choisie

### Responsive Design
Media queries pour :
- Desktop (>1024px)
- Tablette (768px - 1024px)
- Mobile (<768px)
- Très petits écrans (<480px)

### Animations
- Scroll reveal pour les sections
- Barres de progression animées pour les compétences
- Effets de survol sur les cartes
- Header qui se cache au scroll vers le bas

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans les variables CSS :
```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #8b5cf6;
    --accent-color: #f59e0b;
    /* ... */
}
```

### Traductions
Ajouter une nouvelle langue en :
1. Créant un fichier `translation/xx.json`
2. Ajoutant l'option dans le menu du HTML
3. Mettant à jour le JavaScript si nécessaire

## 📫 Contact

- **Email** : jacqueslucas.m2101@gmail.com
- **GitHub** : [@JacquesLucas07](https://github.com/JacquesLucas07)
- **LinkedIn** : [Lucas Jacques](https://www.linkedin.com/in/lucas-jacques-76226434a)

## 📝 Licence

© 2025 Jacques.dev - Tous droits réservés.

## 🔧 Développement futur

- [ ] Intégration d'un blog
- [ ] Système de gestion de contenu (CMS)
- [ ] API pour le formulaire de contact
- [ ] Analytics et statistiques
- [ ] Version PWA (Progressive Web App)
