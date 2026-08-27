/* ============================================================
   QUIZZ VID — CONFIGURATION
   ============================================================

   C'EST LE SEUL FICHIER À MODIFIER.

   1. Les clés Supabase se collent juste en dessous.
   2. Les questions et les bonnes réponses sont plus bas.

   Pour changer une bonne réponse : la ligne "correct" donne la
   POSITION de la bonne réponse dans la liste "options", en
   commençant à 0.
       correct: 0  -> la 1re réponse est la bonne
       correct: 1  -> la 2e
       correct: 2  -> la 3e
       correct: 3  -> la 4e

   Rien d'autre à toucher ailleurs dans le code.
   ============================================================ */

window.QUIZZ_VID = {

  /* ---------- 1. SUPABASE ---------- */
  supabase: {
    url: 'https://ibnvlnaoovbxwjraadsx.supabase.co',
    anonKey: 'sb_publishable_W6X0NXM5OaC11zVHRlKGCg_284sOgFo',
    table: 'quizz_vid_responses'
  },

  /* ---------- 2. LES DEUX MANCHES ---------- */
  rounds: {

    1: {
      pill: 'ROUND 1',
      title: 'Amazon — Spend Less on Your Kids',
      questions: [
        {
          q: "What colour was the boy's water bottle?",
          options: ['Blue', 'Yellow', 'Red', 'Green'],
          correct: 1
        },
        {
          q: "What pattern was on the boy's shirt?",
          options: ['Stripes', 'Plain', 'Plaid / checkered', 'Dots'],
          correct: 2
        },
        {
          q: 'What colour were the school entrance doors?',
          options: ['Yellow', 'Black', 'Teal / turquoise', 'Red'],
          correct: 2
        },
        {
          q: 'Which of these objects appeared?',
          options: ['Skateboard', 'Bicycle', 'Guitar', 'Football goal'],
          correct: 1
        },
        {
          q: 'Which fruit appeared?',
          options: ['Banana', 'Orange', 'Apple', 'Pear'],
          correct: 2
        },
        {
          q: 'What was mentioned right after the water bottle?',
          options: ['Backpack', 'Shoes', 'Tablet', 'Notebook'],
          correct: 2
        },
        {
          q: 'What appeared in the very first shot?',
          options: ['A stroller', 'A wheelchair', 'A skateboard', 'A shopping cart'],
          correct: 1
        }
      ]
    },

    2: {
      pill: 'ROUND 2',
      title: 'Uber — On Our Way',
      questions: [
        {
          q: 'Where was the phone in the first scene?',
          options: ['On the floor', 'On a bedside table', 'Under the pillow', 'In her hand'],
          correct: 1
        },
        {
          q: 'What did the first text message say?',
          options: ['"Running late"', '"Can\'t make it"', '"I think I\'m gonna bail"', '"I\'ll call you later"'],
          correct: 2
        },
        {
          q: 'What was the man sitting on, next scene?',
          options: ['A bed', 'A couch', 'A chair', 'The floor'],
          correct: 2
        },
        {
          q: 'Which city did the woman mention?',
          options: ['New York', 'Chicago', 'Boston', 'Seattle'],
          correct: 1
        },
        {
          q: 'Why was she upset?',
          options: ['Missed a flight', 'Friend cancelled', 'Stood up on a first date', 'Lost her phone'],
          correct: 2
        },
        {
          q: 'What dessert did the man have?',
          options: ['Ice cream', 'Chocolate cake', 'Cheesecake', 'Cupcake'],
          correct: 1
        },
        {
          q: 'How many candles did he blow out?',
          options: ['One', 'Two', 'Three', 'Five'],
          correct: 0
        }
      ]
    }
  }
};
