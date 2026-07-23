# Images manquantes — thibaut-reset.com

À coller dans Claude Code une fois les photos prêtes.
Chaque ligne indique : où placer le fichier dans le dépôt, quel nom lui donner, et à quoi il sert.

## Comment procéder

1. Renomme tes photos exactement comme indiqué ci-dessous (minuscules, tirets, extension `.jpg` ou `.png` selon le cas).
2. Sur GitHub, dans ton dépôt, utilise "Add file → Upload files" et dépose-les dans un dossier `images/` (crée les sous-dossiers `images/objects/`, `images/logos/` en tapant le chemin complet dans le nom de fichier au moment de l'upload, ex. `objects/heartmath.jpg`).
3. Une fois tout uploadé, dis à Claude Code : "Remplace les placeholders d'images par les vraies photos que j'ai uploadées dans le dossier images/, en te basant sur la liste thibaut-reset-images-a-fournir.md."

## 1. Hero — photo de fond plein cadre

- Fichier : `images/hero-bg.jpg`
- Contenu : photo de Thibault (ou une des photos plage/coucher de soleil déjà fournies), pleine largeur, ambiance calme.
- Dimensions minimum : 1920×1080px, format paysage. Plus grand = mieux (elle est étirée en plein cadre avec un voile sombre semi-transparent par-dessus).
- Format : JPG.

## 2. "The tools we'll be using" — mention légère (juste après Three Levers)

- HeartMath® Inner Balance → `images/tools/heartmath-device.jpg` — photo produit de l'appareil, fond neutre ou en contexte d'utilisation. Min 800×600px.
- The Breathing Box → `images/tools/breathing-box.jpg` — photo de la boîte/des outils. Min 800×600px.

## 3. "Everything that supports the journey" — nature morte flottante (5 objets)

Chaque photo doit être en bonne résolution car elle s'affiche en grand au survol (object-fit: cover). Min 800×600px chacune, format paysage de préférence.

- HeartMath → `images/objects/heartmath.jpg`
- Breathing Box → `images/objects/breathing-box.jpg`
- Movement Training (salle de sport/sauna) → `images/objects/movement-training.jpg`
- Contrast Therapy (sauna + bain glacé) → `images/objects/contrast-therapy.jpg`
- Rapé Ceremony → `images/objects/rape-ceremony.jpg` (photo neutre du rituel/de l'outil, PAS de photo de cérémonie ayahuasca — celle-ci reste exclue définitivement du site)

Astuce : si tu n'as qu'une photo par outil, les mêmes fichiers peuvent être réutilisés pour la section 4 ci-dessous (Tools Discount) — pas besoin de doublons.

## 4. "Tools Discount" — cartes de vente (tout en bas de page)

- HeartMath® Inner Balance → `images/discount/heartmath.jpg` (ou réutilise `images/tools/heartmath-device.jpg`). Min 600×400px.
- The Breathing Box → `images/discount/breathing-box.jpg` (ou réutilise `images/tools/breathing-box.jpg`). Min 600×400px.

## 5. "Who I am" — portrait de Thibault

- Fichier : `images/thibault-portrait.jpg`
- Contenu : portrait, cadrage visage/buste, sera affiché en cercle.
- Dimensions minimum : 600×600px (carré de préférence, sinon il sera recadré au centre).

## 6. Logos de certification

- Oxygen Advantage → `images/logos/oxygen-advantage.png`
- HeartMath → `images/logos/heartmath.png`
- Format : PNG avec fond transparent si possible. Si le fond n'est pas transparent, dis-le à Claude Code pour qu'il ajoute un léger encadré blanc (déjà prévu dans le spec).
- Dimensions : au moins 300px de large (affichés petits, ~120-150px, mais il faut de la marge pour un rendu net sur écran Retina).

## 7. Favicon (icône d'onglet du navigateur)

- Fichier : `favicon.png` (ou `.ico`)
- Dimensions : 512×512px (sera redimensionné automatiquement). Simple, reconnaissable en petit — initiales "TP" ou un symbole simple en doré sur fond sombre, par exemple.

## Récapitulatif rapide (à copier dans Claude Code une fois tout uploadé)

Remplace les placeholders d'images par les vraies photos que j'ai uploadées :

- images/hero-bg.jpg
- images/tools/heartmath-device.jpg
- images/tools/breathing-box.jpg
- images/objects/heartmath.jpg
- images/objects/breathing-box.jpg
- images/objects/movement-training.jpg
- images/objects/contrast-therapy.jpg
- images/objects/rape-ceremony.jpg
- images/discount/heartmath.jpg
- images/discount/breathing-box.jpg
- images/thibault-portrait.jpg
- images/logos/oxygen-advantage.png
- images/logos/heartmath.png
- favicon.png

Ne pas ajouter de photo de cérémonie ayahuasca nulle part sur le site (exclue définitivement, voir règles de contenu du spec principal).
