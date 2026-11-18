/* ============================================================
   YOUR DAILY RESET — EXERCISE LIBRARY
   ============================================================

   DRAFT CONTENT. Every practice below is a placeholder written
   to make the product work end to end. None of it is approved.
   Thibault reviews and rewrites all of it before publication.

   This file holds content only. No logic lives here, so
   practices can be added, edited or removed without touching
   the application. engine.js picks from whatever is in here.

   Shape of a practice:
     id       unique, never reused
     title    what the user sees
     goal     relax | recharge | focus | reconnect
     minutes  total, must equal the sum of the steps
     purpose  one plain sentence, no promises
     steps    [{ min, text }]
     gentler  a softer variant offered beside it
     breathFree  true when the practice needs no breath focus
     safety   shown under the practice
     tags     for filtering later

   Rules that must hold for every entry:
     - no breath holding
     - no claim that a pattern produces a given state
     - nothing that needs equipment
     - nothing that cannot be stopped at any moment
   ============================================================ */

window.DAILY_EXERCISES = [

  /* ---------------- RELAX ---------------- */
  {
    id: 'relax-2', title: 'Two minutes to settle', goal: 'relax', minutes: 2,
    purpose: 'A short pause to let the body come off high alert.',
    steps: [
      { min: 1, text: 'Let your eyes travel slowly around the room. No staring, no hurry. Let them land wherever they want and stay a few seconds.' },
      { min: 1, text: 'Unclench your teeth so they stop touching, and let your tongue fall away from the roof of your mouth. Breathe easily through your nose.' }
    ],
    gentler: 'If looking around feels like too much, close your eyes and simply notice the places where your body is supported.',
    breathFree: false,
    safety: 'Keep the breath comfortable throughout. Stop if anything feels unpleasant.',
    tags: ['desk', 'discreet', 'short']
  },
  {
    id: 'relax-5', title: 'Five minutes to come down', goal: 'relax', minutes: 5,
    purpose: 'A slower sequence for when the day has not let go of you.',
    steps: [
      { min: 1, text: 'Look around the room without hurrying. Let your attention arrive where you actually are.' },
      { min: 2, text: 'Slow shoulder rolls backwards, as slow as you can stand. Then let your head tip gently to one side and rest there. Swap sides. Nothing forced.' },
      { min: 2, text: 'Breathe through your nose and let each out-breath be a little longer than the in-breath. Stay comfortable. If you are gasping at the end, shorten it.' }
    ],
    gentler: 'Skip the breathing step and stay with the shoulders and neck for the full five minutes.',
    breathFree: false,
    safety: 'Never stretch into pain. Keep the breath easy and stop if you feel light-headed.',
    tags: ['desk', 'evening']
  },
  {
    id: 'relax-10', title: 'Ten minutes to unwind', goal: 'relax', minutes: 10,
    purpose: 'Time enough to work through the places a working day tends to collect.',
    steps: [
      { min: 1, text: 'Orient: let your eyes move around the room and settle.' },
      { min: 3, text: 'Shoulders and neck. Slow rolls, then gentle side tilts, breathing easily in each position.' },
      { min: 3, text: 'Reach one arm overhead and lean gently to the other side. Breathe into the side you have opened so the lower ribs move. A few breaths, then swap.' },
      { min: 2, text: 'Let the out-breath lengthen a little. Nose breathing, comfortable throughout.' },
      { min: 1, text: 'Sit still and name one thing that is different in your body now.' }
    ],
    gentler: 'Do everything seated, and leave out the overhead reach if your shoulders object.',
    breathFree: false,
    safety: 'Nothing here should hurt. Stop any movement that does.',
    tags: ['evening', 'home']
  },
  {
    id: 'relax-20', title: 'Twenty minutes to let the day go', goal: 'relax', minutes: 20,
    purpose: 'A longer practice for the end of a demanding day.',
    steps: [
      { min: 2, text: 'Orient. Let your eyes find the room, slowly, with no task attached.' },
      { min: 3, text: 'Stand and let your arms, hands and legs shake loose. Then stop and feel what is buzzing.' },
      { min: 4, text: 'Shoulders and neck: slow rolls, gentle tilts, easy breathing in each position.' },
      { min: 4, text: 'Open the ribcage. Reach overhead, lean gently to the side, breathe into the opened side. Swap.' },
      { min: 5, text: 'Settle and let the out-breath lengthen gently. Comfortable, nasal, no strain.' },
      { min: 2, text: 'Rest. Notice what changed, without deciding whether it was enough.' }
    ],
    gentler: 'Leave out the shaking and give those minutes to the shoulders instead.',
    breathFree: false,
    safety: 'Keep everything within an easy range. Stop if you feel dizzy or sore.',
    tags: ['evening', 'home', 'long']
  },

  /* ---------------- RECHARGE ---------------- */
  {
    id: 'recharge-2', title: 'Two minutes to wake the body', goal: 'recharge', minutes: 2,
    purpose: 'A short break from stillness, for when sitting has flattened you.',
    steps: [
      { min: 1, text: 'Spread your fingers wide, hold a moment, then make a loose fist. Repeat slowly. Then turn each wrist both ways.' },
      { min: 1, text: 'Roll your shoulders backwards, slowly, and let your ribs lift a little as you do.' }
    ],
    gentler: 'Stay with the hands alone and do them more slowly.',
    breathFree: true,
    safety: 'Keep the movements small and easy. Nothing should click painfully.',
    tags: ['desk', 'discreet', 'short']
  },
  {
    id: 'recharge-5', title: 'Five minutes to come back online', goal: 'recharge', minutes: 5,
    purpose: 'Gentle movement for the middle of a long sitting day.',
    steps: [
      { min: 1, text: 'Hands and forearms. Spread, soften, turn the wrists. Hours of typing live here.' },
      { min: 2, text: 'Stand if you can. Slow shoulder rolls, then reach overhead and lean gently to each side.' },
      { min: 2, text: 'Walk, even a few steps, breathing only through your nose at an easy pace.' }
    ],
    gentler: 'Do all of it seated and leave out the walking.',
    breathFree: false,
    safety: 'If nose breathing while moving feels like a struggle, slow down or breathe normally.',
    tags: ['midday', 'desk']
  },
  {
    id: 'recharge-10', title: 'Ten minutes to lift the energy', goal: 'recharge', minutes: 10,
    purpose: 'A longer movement break for a flat afternoon.',
    steps: [
      { min: 2, text: 'Hands, forearms, wrists. Slow and deliberate.' },
      { min: 3, text: 'Shoulders and ribcage. Rolls, then overhead reaches to each side, breathing into the open side.' },
      { min: 4, text: 'Walk at an easy pace, nose breathing. Match the breath loosely to your steps.' },
      { min: 1, text: 'Stop and notice what is different.' }
    ],
    gentler: 'Replace the walk with standing and swaying gently from foot to foot.',
    breathFree: false,
    safety: 'Keep the walk easy. This is not exercise and should not leave you out of breath.',
    tags: ['midday', 'outside']
  },
  {
    id: 'recharge-20', title: 'Twenty minutes to properly reset', goal: 'recharge', minutes: 20,
    purpose: 'A full break from the desk, when the afternoon has gone.',
    steps: [
      { min: 2, text: 'Hands and forearms, slowly.' },
      { min: 3, text: 'Stand and shake the arms and legs loose. Then stop and feel it.' },
      { min: 4, text: 'Shoulders, neck and ribcage. Rolls, tilts, overhead reaches.' },
      { min: 8, text: 'Walk outside if you can, nose breathing, at a pace you could hold a conversation at.' },
      { min: 3, text: 'Sit or stand still. Let the breath settle on its own. Notice what changed.' }
    ],
    gentler: 'Halve the walk and spend the rest of the time sitting quietly.',
    breathFree: false,
    safety: 'Stay well within an easy effort. Stop if anything hurts.',
    tags: ['midday', 'outside', 'long']
  },

  /* ---------------- FOCUS ---------------- */
  {
    id: 'focus-2', title: 'Two minutes before you start', goal: 'focus', minutes: 2,
    purpose: 'A short reset of the eyes and the jaw before concentrated work.',
    steps: [
      { min: 1, text: 'Look at the furthest thing you can see, out of a window if there is one, and let your eyes rest there. Blink properly.' },
      { min: 1, text: 'Unclench the jaw, drop the tongue, let the shoulders fall away from your ears.' }
    ],
    gentler: 'If there is no distance to look at, close your eyes and rest them instead.',
    breathFree: true,
    safety: 'Nothing here should be effortful.',
    tags: ['desk', 'discreet', 'short']
  },
  {
    id: 'focus-5', title: 'Five minutes to clear the head', goal: 'focus', minutes: 5,
    purpose: 'For when attention keeps sliding off what you are trying to do.',
    steps: [
      { min: 1, text: 'Let the eyes go long. Furthest point you can find, and rest there.' },
      { min: 2, text: 'Slow shoulder rolls and a gentle neck tilt each way. Unclench the jaw as you go.' },
      { min: 2, text: 'Breathe evenly through the nose, in for about five seconds and out for about five. Rest your attention in the middle of your chest.' }
    ],
    gentler: 'Skip the counted breathing and simply let the breath be slow and nasal.',
    breathFree: false,
    safety: 'If counting the breath makes you tense, stop counting.',
    tags: ['desk', 'before']
  },
  {
    id: 'focus-10', title: 'Ten minutes to settle into work', goal: 'focus', minutes: 10,
    purpose: 'A longer preparation when the work ahead needs you steady.',
    steps: [
      { min: 1, text: 'Orient to the room. Let your eyes arrive.' },
      { min: 2, text: 'Eyes long, then blink properly. A screen holds focus at one fixed distance all day.' },
      { min: 2, text: 'Shoulders, neck, jaw. Slow and small.' },
      { min: 4, text: 'Even nasal breathing, roughly five seconds in and five out, attention in the chest.' },
      { min: 1, text: 'Name the one thing you are about to do. Just one.' }
    ],
    gentler: 'Replace the counted breathing with sitting quietly and letting the breath find its own pace.',
    breathFree: false,
    safety: 'Keep the breath comfortable. Stop counting if it creates effort.',
    tags: ['before', 'desk']
  },
  {
    id: 'focus-20', title: 'Twenty minutes to prepare properly', goal: 'focus', minutes: 20,
    purpose: 'For before something that matters, when you have the time to arrive well.',
    steps: [
      { min: 2, text: 'Orient. Eyes around the room, unhurried.' },
      { min: 3, text: 'Eyes long and blinking, then shoulders and neck, slowly.' },
      { min: 3, text: 'Open the ribcage: overhead reach, gentle side lean, breathe into the open side.' },
      { min: 8, text: 'Even nasal breathing, five in and five out, attention resting in the chest. Let thoughts come and go without chasing them.' },
      { min: 4, text: 'Sit still. Name what you are about to do, and one way you would like to be while doing it.' }
    ],
    gentler: 'Halve the breathing section and spend the rest sitting quietly.',
    breathFree: false,
    safety: 'Comfortable throughout. If the counted rhythm is unpleasant, abandon it.',
    tags: ['before', 'long']
  },

  /* ---------------- RECONNECT ---------------- */
  {
    id: 'reconnect-2', title: 'Two minutes to arrive', goal: 'reconnect', minutes: 2,
    purpose: 'A short return to where your body actually is.',
    steps: [
      { min: 1, text: 'Feel your feet on the floor and your weight on the chair. Let your attention go to the contact itself, not to the idea of it.' },
      { min: 1, text: 'Look around. Let the room be a place you are in, rather than a backdrop.' }
    ],
    gentler: 'Stay with the feet alone for the whole two minutes.',
    breathFree: true,
    safety: 'Nothing here is effortful. Stop if it feels uncomfortable.',
    tags: ['desk', 'discreet', 'short']
  },
  {
    id: 'reconnect-5', title: 'Five minutes to come back', goal: 'reconnect', minutes: 5,
    purpose: 'For when you have been present online and absent from yourself.',
    steps: [
      { min: 1, text: 'Feet, seat, contact. Let the body report where it is.' },
      { min: 2, text: 'Slow movement of your choosing: shoulders, neck, a gentle stretch. Keep your attention inside the movement rather than on how it looks.' },
      { min: 2, text: 'Sit and let the breath be easy and nasal. Notice one sensation that was there all along.' }
    ],
    gentler: 'Leave out the movement and stay with contact and breath.',
    breathFree: false,
    safety: 'Keep everything easy. Stop if anything feels unpleasant.',
    tags: ['desk', 'evening']
  },
  {
    id: 'reconnect-10', title: 'Ten minutes to feel present', goal: 'reconnect', minutes: 10,
    purpose: 'A longer practice for genuinely landing back in the body.',
    steps: [
      { min: 2, text: 'Contact. Feet, seat, hands. Where is the body being held up?' },
      { min: 2, text: 'Orient to the room slowly, letting the eyes land and rest.' },
      { min: 3, text: 'Move gently: shoulders, ribs, neck. Follow what the body seems to want rather than a sequence.' },
      { min: 2, text: 'Sit still. Easy nasal breathing. No counting, no managing.' },
      { min: 1, text: 'Name one thing that is different, without judging it.' }
    ],
    gentler: 'Do it all seated and keep the movement very small.',
    breathFree: false,
    safety: 'Nothing should hurt. Stop anything that does.',
    tags: ['home', 'evening']
  },
  {
    id: 'reconnect-20', title: 'Twenty minutes to be here', goal: 'reconnect', minutes: 20,
    purpose: 'Time enough to stop performing presence and actually have some.',
    steps: [
      { min: 3, text: 'Contact and weight. Feet, seat, hands, the whole underside of the body.' },
      { min: 3, text: 'Orient slowly. Let the room become somewhere you are.' },
      { min: 5, text: 'Move the way the body asks: shoulders, ribs, spine, neck. No sequence to follow.' },
      { min: 6, text: 'Sit still with easy nasal breathing. When attention wanders, bring it back to a physical sensation rather than to a thought.' },
      { min: 3, text: 'Rest. Notice what is here now. Resist deciding whether it was a good session.' }
    ],
    gentler: 'Shorten the stillness to two minutes and give the rest to gentle movement.',
    breathFree: false,
    safety: 'Keep it all comfortable. Stop if you feel dizzy or distressed.',
    tags: ['home', 'long']
  }
];

/* Where the user tapped on the body map does not choose the practice.
   It only adds an optional, clearly separate suggestion. This is a
   presentation layer, never a diagnosis. */
window.DAILY_AREA_NOTES = {
  jaw:       'You marked the jaw. During any step, check whether your teeth are touching, and let them part.',
  neck:      'You marked the neck. Keep every head movement slow and small, and never push into a stretch.',
  shoulders: 'You marked the shoulders. See if they can drop away from your ears each time you breathe out.',
  chest:     'You marked the chest. Let the breath stay easy here rather than trying to breathe more deeply.',
  upperback: 'You marked the upper back. An overhead reach with a gentle side lean often reaches this area.',
  lowerback: 'You marked the lower back. Prefer sitting or standing to anything that asks you to bend.',
  abdomen:   'You marked the abdomen. Keep the belly soft and unbraced throughout.',
  arms:      'You marked the arms. The hands and forearms step is worth doing slowly.',
  legs:      'You marked the legs. Standing or a short walk may suit you better than sitting still.'
};
