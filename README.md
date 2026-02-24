# 🏎️ Tokyo Motors — Guide de déploiement complet

> **Pour Logan** — Ce guide te permet de mettre le site en ligne sans aucune connaissance en code.
> Suis les étapes dans l'ordre. Chaque étape prend 5 à 15 minutes.

---

## Ce que tu vas avoir à la fin

- ✅ Un site web Tokyo Motors en ligne (URL gratuite ou ton propre domaine)
- ✅ Une base de données pour stocker tes voitures
- ✅ Un panneau admin pour ajouter/modifier/supprimer des voitures
- ✅ Un formulaire de contact qui envoie les messages dans l'admin
- ✅ Le tout gratuitement (jusqu'à un certain volume de trafic)

**Durée totale estimée : 45 minutes à 1h30**

---

## ÉTAPE 1 — Préparer ton compte GitHub

GitHub = l'endroit où ton code est stocké. C'est comme un Google Drive mais pour du code.

1. Va sur [github.com](https://github.com) et crée un compte gratuit
2. Connecte-toi
3. Clique sur le bouton vert **"New"** (ou le "+" en haut à droite → "New repository")
4. Nomme ton dépôt : `tokyo-motors`
5. Laisse tout par défaut (Public ou Private, au choix)
6. Clique **"Create repository"**

---

## ÉTAPE 2 — Installer les outils sur ton ordinateur

### 2a. Installer Node.js

Node.js est le moteur qui fait tourner le code.

1. Va sur [nodejs.org](https://nodejs.org)
2. Télécharge la version **LTS** (la recommandée)
3. Lance l'installateur et clique "Next" partout

**Vérifie l'installation :** ouvre un terminal (Invite de commandes sur Windows, Terminal sur Mac) et tape :
```
node --version
```
Tu dois voir quelque chose comme `v20.x.x` ✅

### 2b. Installer Git

Git permet d'envoyer le code vers GitHub.

- **Mac** : Git est probablement déjà installé. Tape `git --version` dans le terminal.
- **Windows** : Télécharge [Git pour Windows](https://gitforwindows.org/) et installe avec les options par défaut.

---

## ÉTAPE 3 — Envoyer le code sur GitHub

Ouvre un terminal dans le dossier `tokyo-motors` et exécute ces commandes une par une :

```bash
# 1. Initialiser Git dans le dossier
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Créer le premier "snapshot" du code
git commit -m "Initial commit — Tokyo Motors"

# 4. Connecter ton dépôt GitHub (remplace TON_USERNAME par ton pseudo GitHub)
git remote add origin https://github.com/TON_USERNAME/tokyo-motors.git

# 5. Envoyer le code
git branch -M main
git push -u origin main
```

Rafraîchis la page GitHub — tu dois voir tous les fichiers apparaître. ✅

---

## ÉTAPE 4 — Créer ta base de données Supabase

Supabase = ta base de données en ligne (gratuite jusqu'à 500 Mo).

### 4a. Créer un projet Supabase

1. Va sur [supabase.com](https://supabase.com) et crée un compte gratuit
2. Clique **"New Project"**
3. Choisis ton **Organization** (ou crée-en une)
4. Remplis :
   - **Name** : `tokyo-motors`
   - **Database Password** : choisis un mot de passe fort et **note-le quelque part**
   - **Region** : choisis la région la plus proche de tes clients (US East pour USA, EU West pour France)
5. Clique **"Create new project"** — attends 1-2 minutes que ça se configure

### 4b. Configurer la base de données

1. Dans ton projet Supabase, clique sur **"SQL Editor"** dans le menu gauche
2. Clique **"New Query"**
3. Ouvre le fichier `SUPABASE_SETUP.sql` (dans le dossier tokyo-motors)
4. Copie **tout** le contenu de ce fichier
5. Colle-le dans l'éditeur SQL de Supabase
6. Clique **"Run"** (bouton vert)

Tu dois voir `Success. No rows returned` ou similaire. ✅

**Vérifie :** clique sur "Table Editor" dans le menu gauche — tu dois voir les tables `cars` et `contacts`.

### 4c. Créer ton compte admin

1. Dans Supabase, clique sur **"Authentication"** → **"Users"**
2. Clique **"Add user"** → **"Create new user"**
3. Entre :
   - **Email** : ton email (ex: `logan@gmail.com`)
   - **Password** : un mot de passe fort
4. Clique **"Create user"**

⚠️ **Note bien cet email et ce mot de passe** — c'est avec ça que tu te connectes à `/admin`.

### 4d. Récupérer tes clés API

1. Dans Supabase, clique sur **"Project Settings"** (icône engrenage en bas à gauche)
2. Clique sur **"API"**
3. Note ces deux valeurs (tu en auras besoin à l'étape suivante) :
   - **Project URL** : ressemble à `https://xxxxxxxxxxxx.supabase.co`
   - **anon public** (dans "Project API Keys") : une longue chaîne de caractères

---

## ÉTAPE 5 — Déployer sur Vercel

Vercel = l'hébergeur de ton site. Gratuit pour les petits projets.

### 5a. Créer un compte Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Clique **"Sign Up"** → choisis **"Continue with GitHub"**
3. Autorise Vercel à accéder à GitHub

### 5b. Importer ton projet

1. Sur le dashboard Vercel, clique **"Add New..."** → **"Project"**
2. Tu vois ta liste de dépôts GitHub — clique **"Import"** à côté de `tokyo-motors`
3. Vercel détecte automatiquement que c'est un projet Next.js ✅

### 5c. Configurer les variables d'environnement

**C'est l'étape la plus importante.** Avant de déployer, tu dois entrer tes clés.

Dans l'écran de configuration Vercel, trouve **"Environment Variables"** et ajoute ces variables une par une :

| Nom | Valeur |
|-----|--------|
| `NEXT_PUBLIC_TM_SUPABASE_URL` | L'URL de ton projet Supabase (ex: `https://xxxx.supabase.co`) |
| `NEXT_PUBLIC_TM_SUPABASE_ANON_KEY` | La clé `anon public` de Supabase |
| `NEXT_PUBLIC_TM_WHATSAPP_NUMBER` | Ton numéro WhatsApp SANS le `+` (ex: `33612345678` pour France ou `12125551234` pour USA) |
| `NEXT_PUBLIC_TM_CONTACT_EMAIL` | Ton email de contact (ex: `contact@tokyo-motors.com`) |
| `NEXT_PUBLIC_TM_SITE_URL` | L'URL de ton site une fois déployé (tu peux mettre `https://tokyo-motors.vercel.app` pour l'instant) |

Pour chaque variable :
1. Clique dans le champ "Key" et tape le nom
2. Clique dans le champ "Value" et colle la valeur
3. Clique **"Add"**

### 5d. Déployer !

Clique **"Deploy"** et attends 2-3 minutes.

À la fin tu verras un message "Congratulations!" et une URL comme `https://tokyo-motors-xxxx.vercel.app`. ✅

**Ton site est en ligne !** 🎉

---

## ÉTAPE 6 — Vérifier que tout fonctionne

1. **Site public** : va sur ton URL Vercel → tu dois voir la homepage avec les 6 voitures démo
2. **Inventory** : clique sur "Browse Inventory" → tu dois voir les 6 voitures en grille
3. **Admin** : va sur `ton-url.vercel.app/admin` → connecte-toi avec l'email/password créé à l'étape 4c
4. **Formulaire** : envoie un message via la page Contact → vérifie qu'il apparaît dans l'admin sous l'onglet "Messages"

---

## UTILISATION QUOTIDIENNE — L'Admin

### Accéder à l'admin

Va sur : `https://ton-site.com/admin`

Connecte-toi avec ton email et mot de passe Supabase.

### Ajouter une voiture

1. Admin Dashboard → bouton **"Add Car"**
2. Remplis tous les champs
3. Pour les photos : tu peux soit uploader depuis ton ordinateur, soit coller l'URL d'une image Unsplash
4. Clique **"Add Car to Inventory"**

### Modifier une voiture

1. Dans la liste des voitures, clique l'icône crayon (✏️)
2. Modifie ce que tu veux
3. Clique **"Save Changes"**

### Changer le statut d'une voiture

Dans l'édition d'une voiture, le champ **"Status"** permet de passer de :
- `Available` → en vente
- `Reserved` → réservée (client en cours)
- `Sold` → vendue (disparaît des filtres par défaut)

### Voir les messages de contact

Dans le Dashboard Admin, onglet **"Messages"** — les nouveaux messages ont un badge "New" doré.

---

## AJOUTER TON PROPRE DOMAINE

Si tu as acheté un domaine (ex: `tokyo-motors.com`) :

1. Dans Vercel Dashboard → ton projet → **"Settings"** → **"Domains"**
2. Clique **"Add"** et entre ton domaine
3. Vercel te donnera des instructions pour configurer les DNS chez ton registrar (OVH, GoDaddy, etc.)
4. Attends 24-48h pour la propagation DNS

---

## METTRE À JOUR LE SITE

Si tu modifies le code (ou si quelqu'un le modifie pour toi) :

```bash
# Dans le dossier tokyo-motors, dans un terminal :
git add .
git commit -m "Description de ce qui a changé"
git push
```

Vercel redéploie automatiquement à chaque `git push`. Nouveau déploiement en 2-3 minutes. ✅

---

## PERSONNALISER LE SITE

### Changer le numéro WhatsApp

Dans Vercel Dashboard → **"Settings"** → **"Environment Variables"** → modifie `NEXT_PUBLIC_TM_WHATSAPP_NUMBER`

### Changer l'email

Même chose pour `NEXT_PUBLIC_TM_CONTACT_EMAIL`

### Changer les textes, couleurs, logos

Il faut modifier les fichiers `.tsx` correspondants. Demande à un développeur ou à ton assistant IA.

---

## TARIFS (tout gratuit au départ)

| Service | Plan gratuit |
|---------|-------------|
| Vercel | 100 GB bande passante/mois, builds illimitées |
| Supabase | 500 MB base de données, 1 GB storage, 50 000 utilisateurs actifs/mois |

Pour un site e-commerce de supercars avec quelques dizaines de visiteurs par jour, le plan gratuit suffit largement.

---

## EN CAS DE PROBLÈME

### "Build failed" sur Vercel

- Vérifie que toutes les variables d'environnement sont bien renseignées
- Regarde les logs de build sur Vercel pour voir l'erreur précise

### "Error connecting to Supabase"

- Vérifie que `NEXT_PUBLIC_TM_SUPABASE_URL` et `NEXT_PUBLIC_TM_SUPABASE_ANON_KEY` sont correctes
- Le site fonctionne quand même avec les données de démo si Supabase est absent

### L'admin ne me laisse pas entrer

- Vérifie que tu utilises l'email/password créé dans Supabase Auth (pas le mot de passe de la DB)
- Si tu as oublié le mot de passe : Supabase → Authentication → Users → clique sur ton user → "Reset password"

### Je ne vois pas mes voitures ajoutées

- Vérifie que tu es bien connecté à Supabase
- Essaie de rafraîchir la page `/inventory`

---

## STRUCTURE DU PROJET (pour les développeurs)

```
tokyo-motors/
├── app/                      # Pages Next.js (App Router)
│   ├── page.tsx              # Homepage /
│   ├── inventory/page.tsx    # Liste voitures /inventory
│   ├── cars/[id]/page.tsx    # Détail voiture /cars/:id
│   ├── how-it-works/page.tsx # Process /how-it-works
│   ├── about/page.tsx        # À propos /about
│   ├── contact/page.tsx      # Contact /contact
│   └── admin/                # Panel admin /admin/*
│       ├── page.tsx          # Login
│       ├── dashboard/page.tsx
│       └── cars/
│           ├── new/page.tsx             # Ajouter une voiture
│           └── [id]/edit/page.tsx       # Modifier une voiture
├── components/               # Composants réutilisables
│   ├── Navbar.tsx            # Navigation principale
│   ├── Footer.tsx            # Pied de page
│   ├── Logo.tsx              # Logo SVG Tokyo Motors
│   ├── CarCard.tsx           # Carte voiture (grille)
│   ├── CarGallery.tsx        # Carousel de photos
│   └── ContactForm.tsx       # Formulaire de contact
├── lib/
│   ├── supabase.ts           # Client Supabase + types + données démo
│   └── config.ts             # Variables d'env (préfixe TM_)
├── SUPABASE_SETUP.sql        # Script SQL pour configurer Supabase
├── .env.example              # Template des variables d'environnement
├── tailwind.config.ts        # Configuration du design system
├── next.config.ts            # Configuration Next.js
└── README.md                 # Ce fichier
```

---

*Site construit avec ❤️ — Next.js 14, Tailwind CSS, Supabase*
*Variables d'environnement préfixées `NEXT_PUBLIC_TM_` / `TM_` pour isolation des projets*
