# Quizz Vid — mise en route

Trois pages, indépendantes du reste du site :

| Page | Adresse | Pour qui |
|---|---|---|
| Manche 1 | `soma-roots.com/thibault-reset/quizz-vid/round-1/` | les participants, sur leur téléphone |
| Manche 2 | `soma-roots.com/thibault-reset/quizz-vid/round-2/` | les participants, sur leur téléphone |
| Résultats | `soma-roots.com/thibault-reset/quizz-vid/results/` | toi, sur le projecteur |

---

## 1. Créer le projet Supabase (5 minutes, gratuit, sans carte bancaire)

1. Va sur **https://supabase.com** → **Start your project** → connecte-toi avec GitHub.
2. **New project**.
   - **Name** : `quizz-vid`
   - **Database Password** : clique sur *Generate a password*. Tu n'en auras pas besoin, mais garde-le quelque part.
   - **Region** : choisis l'Europe (Frankfurt ou Ireland), c'est le plus proche de Lisbonne.
3. Clique **Create new project** et attends une minute que ça démarre.

## 2. Créer la table

Dans le menu de gauche, clique sur **SQL Editor**, puis **New query**.
Colle exactement ceci et clique **Run** :

```sql
create table quizz_vid_responses (
  id          bigint generated always as identity primary key,
  round       smallint    not null,
  first_name  text,
  answers     jsonb       not null,
  created_at  timestamptz not null default now()
);

alter table quizz_vid_responses enable row level security;

-- Atelier en présentiel, sans compte : on autorise l'écriture et la
-- lecture anonymes. Les données ne contiennent qu'un prénom facultatif.
create policy "anon insert" on quizz_vid_responses
  for insert to anon with check (true);

create policy "anon read" on quizz_vid_responses
  for select to anon using (true);
```

Tu dois voir **Success. No rows returned**.

## 3. Récupérer les deux clés

Menu de gauche → **Project Settings** (l'engrenage en bas) → **API**.

Tu as besoin de deux choses :

| Dans Supabase | À coller dans `config.js` |
|---|---|
| **Project URL** (ex. `https://abcdefgh.supabase.co`) | `url` |
| **Project API keys** → **anon** **public** | `anonKey` |

> Supabase a deux formats de clé publique selon l'ancienneté du projet :
> une longue chaîne commençant par `eyJ`, ou une clé `sb_publishable_...`.
> Les deux fonctionnent, le code gère les deux.
>
> Ne prends jamais la clé `service_role` ni une clé `sb_secret_...` : elles donnent
> tous les droits et ne doivent jamais se retrouver dans une page web.

## 4. Coller les clés

Ouvre `thibault-reset/quizz-vid/config.js` et remplace les deux lignes du haut :

```js
supabase: {
  url: 'https://abcdefgh.supabase.co',
  anonKey: 'eyJhbGciOi...',
  table: 'quizz_vid_responses'
},
```

Pousse le changement. Deux minutes plus tard c'est en ligne.

---

## Corriger une bonne réponse

Tout est dans `config.js`, à un seul endroit. Chaque question a une ligne `correct`
qui donne la **position** de la bonne réponse, en commençant à **0** :

```js
{
  q: 'Which fruit appeared?',
  options: ['Banana', 'Orange', 'Apple', 'Pear'],
  correct: 2          // 0=Banana, 1=Orange, 2=Apple, 3=Pear
}
```

Le tableau de bord recalcule tout automatiquement. Rien d'autre à modifier.

---

## Le jour de l'atelier

1. Ouvre la page **results** sur ton ordinateur, branche le projecteur. Ne la touche plus, elle se met à jour toute seule toutes les 4 secondes.
2. Diffuse la vidéo 1, puis donne l'adresse de **round-1** à la salle.
3. Quinze minutes plus tard, vidéo 2, puis **round-2**. Les deux manches s'affichent côte à côte dès qu'elles ont chacune une réponse.
4. Pendant la démo HeartMath, tape un prénom dans le champ de recherche en bas pour sortir le résultat individuel de la personne.

**Un téléphone ne peut envoyer qu'une fois par manche.** Si quelqu'un doit vraiment recommencer, ajoute `?again` au bout de l'adresse.

**Pour tout remettre à zéro avant un autre atelier**, dans le SQL Editor de Supabase :

```sql
delete from quizz_vid_responses;
```
