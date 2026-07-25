# Plan de modernisation OnekiJS

## Décisions validées
- Release majeure : React 19 exclusivement, sans prise en charge de React 18.
- `onekijs-next` vise uniquement le Next App Router moderne ; le Pages Router et `_app` sont retirés.
- Les répertoires `archives/` restent non migrés et sont documentés comme obsolètes.
- La cible React Router est la majeure 8 demandée ; les versions exactes « latest » sont verrouillées au démarrage par l’audit de registre et le lockfile.

## État constaté
- Monorepo Lerna/npm workspaces, packages publiés v0.22.0.
- `onekijs-framework` est le noyau partagé, `onekijs` encapsule/react-exporte React Router 6.14.1, `onekijs-next` est actuellement un adaptateur Pages Router.
- `onekijs-next/src/app.tsx` repose sur les props `_app`; `NextRouter` importe `next/router`; `Link` emploie `passHref`, `shallow` et un enfant `<a>` legacy.
- `onekijs-ui` dépend notamment de styled-components 5.3.10, react-window 1.8.5 et react-virtualized-auto-sizer 1.0.2.
- Racine : React 18.2, Next 13.4, TypeScript 5.1, Babel 7.22; moteurs Node >=10. L’intégration de tests des packages est insuffisante.

## Plan d’implémentation

### Phase 0 — Baseline et contrat de support
1. Créer une branche majeure et produire une matrice des versions réellement publiées à cet instant : React/React DOM 19, React Router 8, Next App Router, Node requis par Next, TypeScript, Vite, Babel/Rollup, Redux/React Redux/Redux Saga et dépendances UI. Exécuter l’audit de vulnérabilités sur le lockfile npm puis classer chaque correction : patch compatible, migration API ou remplacement.
2. Définir et publier le contrat de compatibilité : React/React DOM `>=19 <20` en peer dependencies, Node au minimum exigé par le Next retenu, navigateurs supportés, App Router only, et une major unique pour tous les packages publiés.
3. Établir les baselines : construction de chaque package, typecheck, taille des artefacts, navigation/formulaires/i18n/auth, SSR/hydratation App Router, composants virtualisés. Ajouter les tests ciblés avant toute réécriture.

### Phase 1 — Métadonnées, dépendances et build
4. Mettre à jour tous les manifests sous `packages/*`, la racine, les exemples actifs et le lockfile. Déplacer les paquets de types hors des dépendances runtime; aligner les dépendances internes sur la nouvelle major; conserver `onekijs-framework` et React Router comme dépendances transitives de `onekijs` afin qu’un consommateur Vite n’installe qu’`onekijs` en plus de React/React DOM; garder `onekijs-ui` et `onekijs-theme-clarity` optionnels.
5. Moderniser le packaging : vérifier `exports`, ESM/CJS et les externals Rollup afin de ne pas embarquer React, React DOM, Next ou React Router. Conserver explicitement la réexportation de l’API React Router voulue par `onekijs`, mais retirer les exports `UNSAFE_*` de la surface publique ou les rendre explicitement non supportés.
6. Actualiser le pipeline TypeScript/Babel/ESLint/Jest/Vite/Rollup et la configuration Babel JSX automatique. Remplacer les plugins Babel proposés/obsolètes lorsqu’une alternative stable existe, et rendre les builds reproductibles avec npm ci.

### Phase 2 — Noyau React 19 et contrat de routeur
7. Adapter `onekijs-framework` à React 19 : corriger les types React 19, confirmer que les error boundaries à classes restent valides, protéger tous les accès `window`/`sessionStorage` de l’exécution serveur, et auditer les notifications de magasin/formulaires déclenchées pendant le rendu concurrent. Ne remplacer le mécanisme `useReducer` de rafraîchissement forcé que si les tests révèlent une incohérence concurrente.
8. Faire évoluer `BaseRouter`, `Router`, `LinkProps` et les types de location vers un contrat indépendant de `history` et des APIs React Router. Ce contrat doit définir `push`, `replace`, `back`, `forward`, historique, paramètres, état et notifications sans exposer les types internes d’un fournisseur ; il sera consommé tant par l’adaptateur navigateur que par l’adaptateur Next.
9. Migrer `onekijs` vers React Router 8 avec le modèle de routeur de données : construire le routeur navigateur et son provider, traduire les routes Oneki en routes `element`/route objects, synchroniser l’adaptateur avec les changements de location et les navigations, puis conserver la gestion i18n/basename. Remplacer les wrappers JSX `Route`/`SecureRoute` incompatibles avec un point d’extension de routes qui produit des éléments/guards valides ; convertir la redirection d’authentification en route guard et stocker la destination de retour de manière sûre.
10. Stabiliser l’API Vite publique : maintenir `App`, `Link`, `useRouter` et les helpers réexportés documentés; redessiner `Routes`, `Route` et `SecureRoute` si nécessaire pour le routeur de données; fournir une table de migration de l’API v0.22 vers la major. Tester séparément navigation programmatique, paramètres, query/hash, liens actifs, guard, back/forward et i18n.

### Phase 3 — `onekijs-next` App Router uniquement
11. Remplacer l’entrée `NextApp` fondée sur `_app` par un provider client App Router qui monte `AppState`, initialise l’i18n/settings/services et injecte l’adaptateur Oneki. Définir l’intégration dans `app/layout` et les limites client/serveur; aucune importation de hooks client dans un Server Component.
12. Remplacer `NextRouter` et `useRouterSync` par un adaptateur client alimenté par `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`). Conserver les invariants de `BaseRouter`, mapper push/replace/back/forward et préciser les limites App Router : pas de `shallow`, pas de `locale` Pages Router, et pas d’état arbitraire d’historique Next.
13. Moderniser `Link` pour le contrat Next actuel : supprimer `passHref`, le wrapper `<a>`, et les props Pages Router. Raccorder les props Oneki compatibles au composant Link Next et maintenir l’accessibilité/ref. Mettre à jour les externals Rollup pour `next/navigation`.
14. Retirer/réécrire les utilitaires Pages Router tels que `withNotFound`, le hack sessionStorage 404 et les types `AppProps` hérités de `_app`. Fournir les exemples `app/not-found` et `app/error`/`global-error` correspondants et documenter la responsabilité de `notFound()` dans les composants serveur.

### Phase 4 — UI, thème et dépendances de présentation
15. Migrer styled-components vers sa version compatible React 19, supprimer les types séparés devenus fournis par le paquet, valider le plugin Babel et vérifier les thèmes/règles CSS/SSR. Couvrir visuellement les widgets à forte complexité, dont table, select, tree et context menu.
16. Évaluer puis adopter les dernières versions compatibles de Popper, Clarity City, react-window, infinite-loader et auto-sizer. Si la dernière version de virtualisation impose une API ou une compatibilité React 19 insuffisante, remplacer la pile par une alternative maintenue ; encapsuler le changement derrière les composants Oneki sans exposer la lib de virtualisation.
17. Tester rendu concurrent, redimensionnement, défilement et chargement incrémental sur de grands jeux de données; mesurer les régressions de performance et d’accessibilité clavier.

### Phase 5 — Exemples actifs, CI, documentation et publication
18. Migrer uniquement `examples/` et `getting-started/` actifs vers React 19/React Router 8/Next App Router. Convertir les montages historiques actifs vers `createRoot`, adapter les définitions de routes, et créer un exemple Next App Router qui ne dépend que de `onekijs-next` comme package Oneki core. Marquer clairement chaque projet sous `archives/` comme non supporté, avec sa dernière pile compatible, sans le modifier.
19. Remplacer les workflows de déploiement seuls par une CI qui exécute npm ci, audit avec seuil convenu, lint sans `--fix`, typecheck, build de chaque package, tests unitaires/intégration et smoke builds Vite/Next. Actualiser les actions GitHub et la version Node selon le contrat.
20. Écrire un guide de migration v0.22 vers la major : nouvelles peer dependencies, nouvelle installation Vite/Next, breaking changes de routing, remplacement de `NextApp`, `Link` et 404, limites des Server Components et tableau de compatibilité. Publier changelogs par paquet, versionner avec Lerna et exécuter une publication dry-run avant release.

## Vérification
1. `npm ci`, audit sans vulnérabilité critique/haute non acceptée, puis `npm run build` pour tous les artefacts et contrôle des `exports` ESM/CJS dans un projet consommateur minimal.
2. Typecheck et tests React 19 pour `onekijs-framework` : services Redux/Saga, formulaires, erreurs, i18n et absence d’accès browser pendant SSR.
3. Tests d’intégration React Router 8 : deep link, rendu route, route protégée, redirection et retour, paramètres/query/hash, changement de langue/basename, reexports publics.
4. Smoke test Next App Router : build production, hydratation sans mismatch, navigation Link/programmatique, 404/error, changement de query et absence d’import `next/router`/`next/head`/`_app` dans `onekijs-next`.
5. Tests et captures visuelles UI : thème Clarity, table/liste virtualisée avec grands volumes, select/tree/context menu, interaction clavier et rendu SSR.
6. Installer dans trois consommateurs vierges : Vite + `onekijs`, Next App Router + `onekijs-next`, Vite + `onekijs-ui`/`onekijs-theme-clarity`; vérifier que chacun ne référence qu’un package Oneki core direct.

## Hors périmètre
- Migration fonctionnelle des applications sous `archives/`.
- Compatibilité React 18, Next Pages Router ou Next <= 13.
- Remplacement systématique de Redux/Redux-Saga : ils sont mis à jour/audités et ne sont remplacés qu’en cas de vulnérabilité ou de défaut React 19 démontré.
