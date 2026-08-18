/* ============================================================
   RESET — Human Performance Audit
   Full-screen questionnaire modal, one question at a time.

   TO RECEIVE ANSWERS BY EMAIL:
   1. Go to https://web3forms.com (no account needed)
   2. Enter thibault.postel89@gmail.com, you get an access key by email
   3. Paste that key below, replacing PASTE_YOUR_KEY_HERE
   ============================================================ */

var WEB3FORMS_KEY = '3d8e2c89-e82d-479a-aa08-69727887bd39';
var CONTACT_EMAIL = 'thibault.postel89@gmail.com';
var CALENDLY_URL = 'https://calendly.com/thibault-postel89/new-meeting';
var BLUEPRINT_URL = 'https://wa.me/33613741584?text=' +
  encodeURIComponent("Hi Thibault, I've done the free audit and I'd like the RESET Blueprint.");

(function () {
  'use strict';

  /* ---------- shared option sets ---------- */
  var FREQ = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'];
  var FREQ_DAY = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost every day'];
  var FREQ_MORNING = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost every morning'];
  var FREQ_VERY = ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'];

  var SECTIONS = [
    { id: 'info', num: '', title: 'Your details', sub: '' },
    { id: 'focus', num: 'I', title: 'Performance & Focus', sub: 'Mental energy, attention and cognitive capacity' },
    { id: 'autonomic', num: 'II', title: 'Autonomic Regulation & Heart Coherence', sub: 'Your ability to shift from activation to recovery' },
    { id: 'breathing', num: 'III', title: 'Breathing & Respiratory Efficiency', sub: 'Breathing mechanics and CO₂ tolerance' },
    { id: 'biomech', num: 'IV', title: 'Biomechanics & Structure', sub: 'Posture, tension and body mechanics' },
    { id: 'somatic', num: 'V', title: 'Somatic Mapping & Interoception', sub: 'Your ability to feel, read and influence your body' },
    { id: 'recovery', num: 'VI', title: 'Recovery & Somatic Load', sub: 'What happens when you stop pushing' },
    { id: 'presence', num: 'VII', title: 'Presence & Connection', sub: 'What the whole system is meant to give you' },
    { id: 'goal', num: 'VIII', title: 'Your Goal', sub: 'What you actually want to change' }
  ];

  /* dim = which score it feeds · inv = higher answer means worse */
  var QUESTIONS = [
    { s: 'info', type: 'email', label: 'Your email', req: true },
    { s: 'info', type: 'text', label: 'Your name', req: true },

    /* I — Performance & Focus */
    { s: 'focus', type: 'scale', label: 'Focus', q: 'How well can you stay on one complex task without switching tabs, checking your phone or looking for another hit of stimulation?', lo: 'I lose focus almost immediately', hi: 'I can stay deeply focused for a long time', req: true, dim: 'cognitive' },
    { s: 'focus', type: 'scale', label: 'Brain fog', q: 'How much mental fog do you feel? Difficulty thinking clearly, or a sense that your brain is running slow.', lo: 'Very clear mind', hi: 'Almost constant fog', req: true, dim: 'cognitive', inv: true },
    { s: 'focus', type: 'choice', label: 'Energy crash', q: 'How often do you get a significant drop in energy or motivation between 2pm and 4pm?', opts: FREQ_DAY, req: true, dim: 'cognitive', inv: true },
    { s: 'focus', type: 'choice', label: 'Stimulants', q: 'How many coffees, energy drinks, nicotine hits or other stimulants do you typically have per day?', opts: ['0', '1', '2 to 3', '4 to 5', 'More than 5'], req: true, dim: 'cognitive', inv: true },
    { s: 'focus', type: 'scale', label: 'Stimulant dependence', q: 'How much do you feel you need stimulants to work, think or hold your energy up?', lo: 'I function fine without', hi: 'I really struggle without', req: true, dim: 'cognitive', inv: true },
    { s: 'focus', type: 'scale', label: 'Performance anxiety', q: 'Before a presentation, an important call or a high-stakes situation, how much does your body fire up?', lo: 'Very calm', hi: 'Strong physical activation', req: true, dim: 'coherence', inv: true },
    { s: 'focus', type: 'scale', label: 'Boredom', q: 'When you have nothing to do for a few minutes, how fast do you reach for something?', lo: 'I can sit with it', hi: 'Almost instantly', req: true, dim: 'stimulus', inv: true },
    { s: 'focus', type: 'multi', label: 'What you reach for', q: 'What do you usually reach for when you want to check out?', opts: ['Scrolling social media', 'Series or films', 'Porn', 'Sugar or snacking', 'Cigarettes or vaping', 'Alcohol', 'Other substances', 'News', 'Gaming', 'Online shopping', 'Work itself', 'Something else', 'Nothing in particular'], req: true, dim: 'stimulus', inv: true },
    { s: 'focus', type: 'scale', label: 'Urge intensity', q: 'When that urge hits, how hard is it to let it pass without acting on it?', lo: 'Easy to let pass', hi: 'Very hard to resist', req: true, dim: 'stimulus', inv: true },

    /* II — Autonomic Regulation & Heart Coherence */
    { s: 'autonomic', type: 'choice', label: 'Morning stress', q: 'How often do you wake up with mental pressure, a knot in your stomach, or thoughts firing immediately?', opts: FREQ_MORNING, req: true, dim: 'autonomic', inv: true },
    { s: 'autonomic', type: 'scale', label: 'Sensory sensitivity', q: 'How much do noise, light, notifications, conversations or movement around you disturb your state?', lo: 'Barely affected', hi: 'Very easily overstimulated', req: true, dim: 'coherence', inv: true },
    { s: 'autonomic', type: 'multi', label: 'Physical stress signs', q: 'Which signs show up regularly when you are stressed, focused or under pressure?', opts: ['Dry mouth', 'Cold hands', 'Cold feet', 'Racing heart', 'Short breath', 'Held breath', 'Chest tightness', 'Clenched jaw', 'Raised shoulders', 'Abdominal tension', 'Sweating', 'Trembling', 'Frequent urge to urinate', 'Other', 'None of these'], req: true, dim: 'load', inv: true },
    { s: 'autonomic', type: 'scale', label: 'Return to calm', q: 'After a stressful situation, how well do you come back to baseline?', lo: 'I can stay activated for hours', hi: 'I come down quickly', req: true, dim: 'autonomic' },
    { s: 'autonomic', type: 'scale', label: 'Autonomic flexibility', q: 'How well can you deliberately move yourself from a stressed, highly activated state into a calmer one?', lo: 'Very hard', hi: 'Very easy', req: true, dim: 'autonomic' },
    { s: 'autonomic', type: 'scale', label: 'Regulation under pressure', q: 'When things get hard, can you stay calm enough to keep breathing properly, think, and make good decisions?', lo: 'I lose my grip fast', hi: 'I stay stable under pressure', req: true, dim: 'autonomic' },
    { s: 'autonomic', type: 'scale', label: 'Emotional reactivity', q: 'When a strong emotion shows up, how fast does it take over your physical and mental state?', lo: 'Not very reactive', hi: 'Very strongly reactive', req: true, dim: 'autonomic', inv: true },
    { s: 'autonomic', type: 'number', label: 'HRV', q: 'If you use a Garmin, Oura, Whoop, Apple Watch or another tracker, what is your average HRV?', help: 'In milliseconds. Leave blank if you do not track it.', unit: 'ms' },
    { s: 'autonomic', type: 'choice', label: 'Real-time feedback', q: 'Have you ever watched your heart rhythm change in real time while you breathe?', opts: ['Yes, with a coherence device', 'Only nightly averages from a watch or ring', 'No, never', 'Not sure'], req: true, dim: 'coherence', vals: [1, 0.5, 0, 0.15] },
    { s: 'autonomic', type: 'scale', label: 'Blind or guided', q: 'When you deliberately try to calm yourself down, do you actually know whether it is working, or are you guessing?', lo: 'I am guessing', hi: 'I can feel it clearly', req: true, dim: 'coherence' },
    { s: 'autonomic', type: 'choice', label: 'Coherence response', q: 'When you practise slow breathing or a regulation technique, do you notice a clear shift in your state?', opts: ['Yes, quickly', 'Yes, but slightly', 'It depends on the day', 'Very little', 'I have never really tried'], req: true, dim: 'coherence', vals: [1, 0.7, 0.5, 0.2, 0.35] },

    /* III — Breathing */
    { s: 'breathing', type: 'choice', label: 'Night breathing', q: 'How do you generally breathe while you sleep?', opts: ['Mostly through the nose', 'Mostly nose, but sometimes dry mouth', 'Mixed nose and mouth', 'Mostly through the mouth', 'I do not know'], req: true, dim: 'breathing', vals: [1, 0.75, 0.45, 0.1, 0.4] },
    { s: 'breathing', type: 'choice', label: 'Dry mouth on waking', q: 'How often do you wake up with a dry mouth?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost every morning'], req: true, dim: 'breathing', inv: true },
    { s: 'breathing', type: 'multi', label: 'Breathing under stress', q: 'When you work intensely or get stressed, what changes do you notice in your breathing?', opts: ['It gets faster', 'It gets shallower', 'It moves up into my chest', 'I sometimes hold it', 'I sigh a lot', 'I need to take big breaths', 'I breathe more through my mouth', 'Little change', 'I do not know'], req: true, dim: 'breathing', inv: true },
    { s: 'breathing', type: 'choice', label: 'Air hunger', q: 'How often do you feel you cannot get a satisfying breath, or need to breathe deeply?', opts: FREQ_VERY, req: true, dim: 'breathing', inv: true },
    { s: 'breathing', type: 'number', label: 'BOLT score', q: 'Breathe calmly 2 or 3 times. Exhale normally, hold your breath, and stop at the first clear urge to breathe, before gasping. Then breathe normally again. How many seconds could you hold before feeling the urge to inhale?', help: 'Number of seconds. If you have never measured it, try it now.', unit: 'sec', req: true, dim: 'breathing', max: 40 },

    /* IV — Biomechanics */
    { s: 'biomech', type: 'scale', label: 'Posture', q: 'How far do your head and shoulders drift forward when you work or use your phone?', lo: 'Naturally good posture', hi: 'Strongly forward', req: true, dim: 'load', inv: true },
    { s: 'biomech', type: 'choice', label: 'Jaw', q: 'How often do you clench your jaw or teeth when focused, stressed, or asleep?', opts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost constantly'], req: true, dim: 'load', inv: true },
    { s: 'biomech', type: 'scale', label: 'Core stability', q: 'How stable and supported do you feel through your trunk, pelvis and lower back?', lo: 'Very unstable / frequent pain', hi: 'Very stable and solid', req: true, dim: 'load' },
    { s: 'biomech', type: 'multi', label: 'Tension zones', q: 'Where do you regularly feel tension, stiffness or a sense of blockage?', opts: ['Jaw', 'Neck', 'Traps', 'Shoulders', 'Chest', 'Diaphragm', 'Upper abdomen', 'Lower back', 'Psoas', 'Hips', 'Pelvis', 'Other', 'None'], req: true, dim: 'load', inv: true },

    /* V — Somatic Mapping */
    { s: 'somatic', type: 'scale', label: 'Body awareness', q: 'How naturally do you notice the sensations present in your body during the day?', lo: 'I barely notice my body', hi: 'Very fine body perception', req: true, dim: 'awareness' },
    { s: 'somatic', type: 'scale', label: 'Locating stress', q: 'When you get stressed, can you pinpoint exactly where it shows up in your body?', lo: 'I usually have no idea', hi: 'I locate it almost instantly', req: true, dim: 'awareness' },
    { s: 'somatic', type: 'scale', label: 'Reading emotions', q: 'How well do you recognise an emotion through what happens in your body, before you start analysing it mentally?', lo: 'I understand emotions intellectually', hi: 'I feel them in my body first', req: true, dim: 'awareness' },
    { s: 'somatic', type: 'scale', label: 'Voluntary release', q: 'When you notice a tight area, how well can you deliberately release it?', lo: 'Almost impossible', hi: 'I can easily change the tension', req: true, dim: 'awareness' },
    { s: 'somatic', type: 'choice', label: 'Body armour', q: 'Even after sport, stretching or massage, how often does the same tension come back?', opts: FREQ, req: true, dim: 'load', inv: true },
    { s: 'somatic', type: 'choice', label: 'Autopilot', q: 'How often do you feel you are running on automatic, without really feeling your body or the present moment?', opts: FREQ_VERY, req: true, dim: 'presence', inv: true },

    /* VI — Recovery */
    { s: 'recovery', type: 'choice', label: 'Irritability', q: 'How often do small problems trigger a bigger reaction than you would like?', opts: FREQ_VERY, req: true, dim: 'load', inv: true },
    { s: 'recovery', type: 'choice', label: 'Startle reflex', q: 'How often do you jump hard at an unexpected noise or movement?', opts: ['Almost never', 'Rarely', 'Sometimes', 'Often', 'Very often'], req: true, dim: 'load', inv: true },
    { s: 'recovery', type: 'choice', label: 'After training', q: 'After an intense workout, which best describes your usual experience?', opts: ['Calmer, clearer, more present', 'Physically tired but pleasantly relaxed', 'Discharged for a moment, then tension returns', 'Still wired and restless', 'More irritable or tense than before', 'Depends heavily on the type of training'], req: true, dim: 'load', vals: [1, 0.85, 0.4, 0.15, 0, 0.5] },
    { s: 'recovery', type: 'scale', label: 'Relationship to rest', q: 'How well can you do nothing, without guilt, restlessness or a need for stimulation?', lo: 'Rest is very uncomfortable', hi: 'I can deeply slow down', req: true, dim: 'autonomic' },
    { s: 'recovery', type: 'scale', label: 'End of day', q: 'How well can you mentally and physically close your day?', lo: 'My system keeps running for hours', hi: 'I switch off easily', req: true, dim: 'autonomic' },
    { s: 'recovery', type: 'multi', label: 'Sleep', q: 'Which of these do you currently run into?', opts: ['Hard to fall asleep', 'Racing thoughts at bedtime', 'Waking during the night', 'Waking around 3–5am', 'Hard to fall back asleep', 'Light sleep', 'Waking tired despite enough hours', 'No particular problem'], req: true, dim: 'load', inv: true },

    /* VII — Presence & Connection */
    { s: 'presence', type: 'scale', label: 'Presence with others', q: 'When you talk with someone, how much are you actually there rather than in your own head?', lo: 'Often mentally elsewhere', hi: 'Fully present', req: true, dim: 'presence' },
    { s: 'presence', type: 'scale', label: 'Presence in good moments', q: 'When something enjoyable happens, how well can you actually enjoy it without analysing, anticipating or drifting?', lo: 'My mind keeps running', hi: 'I get fully absorbed', req: true, dim: 'presence' },
    { s: 'presence', type: 'scale', label: 'Connection to yourself', q: 'How connected do you feel to what you feel, what you need, and your inner state?', lo: 'Very disconnected', hi: 'Very connected', req: true, dim: 'connection' },
    { s: 'presence', type: 'scale', label: 'Connection to others', q: 'How genuinely connected do you currently feel to the people around you?', lo: 'Very isolated / distant', hi: 'Deeply connected', req: true, dim: 'connection' },
    { s: 'presence', type: 'choice', label: 'Isolation under stress', q: 'When you go through a hard period, what do you usually do?', opts: ['I stay connected and ask for support easily', 'I keep my relationships but share little', 'I gradually reduce contact', 'I isolate heavily', 'It depends on the situation'], req: true, dim: 'connection', vals: [1, 0.65, 0.35, 0, 0.5] },
    { s: 'presence', type: 'multi', label: 'Relational impact', q: 'Which behaviours show up most when you are stressed or overloaded?', opts: ['Less patient', 'I listen less', 'Physically there but mentally elsewhere', 'I isolate', 'I reply to messages less', 'More reactive', 'I seek more validation', 'Less desire to see people', 'I shut down emotionally', 'Other', 'It barely affects my relationships'], req: true, dim: 'connection', inv: true },

    /* VIII — Your goal */
    { s: 'goal', type: 'longtext', label: 'Main transformation', q: 'If RESET worked exactly as you hope, what would concretely change in your life?', req: true },
    { s: 'goal', type: 'multi', label: 'Priority outcomes', q: 'What matters most to you right now?', opts: ['Lower my stress level', 'Find inner calm', 'Improve my focus', 'Reduce rumination', 'More mental clarity', 'Stabilise my energy', 'Sleep better', 'Breathe more efficiently', 'Reduce physical tension', 'Feel more connected to my body', 'Recover better', 'Handle emotions better', 'Come down faster after stress', 'Be more present', 'Feel more connected to others', 'Feel less isolated', 'Improve my relationships', 'Improve physical performance', 'Other'], req: true },
    { s: 'goal', type: 'text', label: 'Single priority', q: 'If you could only improve one thing over the coming weeks, which would it be?', req: true },
    { s: 'goal', type: 'choice', label: 'How long', q: 'How long have these difficulties been significantly affecting your daily life?', opts: ['Less than 3 months', '3 to 6 months', '6 to 12 months', '1 to 3 years', 'More than 3 years'], req: true },
    { s: 'goal', type: 'longtext', label: 'What you have tried', q: 'What have you already tried to improve your stress, energy, focus, body or nervous system?', help: 'Therapy, meditation, sport, breathwork, yoga, supplements, medication, coaching, massage, sauna, cold exposure, routine changes…' },
    { s: 'goal', type: 'scale', label: 'Motivation', q: 'How ready are you to build new practices into your daily life on a regular basis?', lo: 'Mostly curious', hi: 'Ready to commit seriously', req: true }
  ];

  /* The short (free) audit: two questions per dimension, ~3 minutes.
     The full 52 are kept for the paid Blueprint. Edit this list to
     change which questions appear in the free version. */
  var SHORT = [
    'Focus', 'Brain fog',
    'Boredom', 'What you reach for', 'Urge intensity',
    'Return to calm', 'Autonomic flexibility',
    'Blind or guided', 'Coherence response',
    'BOLT score',
    'Body awareness',
    'Tension zones',
    'Sleep',
    'Autopilot', 'Presence with others',
    'Connection to others', 'Relational impact',
    'Single priority', 'Motivation'
  ];
  QUESTIONS.forEach(function (q, i) {
    q._i = i;
    if (q.s === 'info' || SHORT.indexOf(q.label) > -1) q.short = true;
  });

  /* weight = how much this dimension counts towards the overall score.
     Outcomes (presence, connection, regulation) are weighted above the
     mechanisms used to fix them (breathing, somatic awareness). */
  var DIMS = {
    cognitive: { name: 'Cognitive Performance', desc: 'Focus, mental clarity, energy and reliance on stimulants.', weight: 1.1 },
    stimulus: { name: 'Stimulus Dependence', desc: 'How well you tolerate boredom, urges and the need for stimulation or escape.', weight: 1.2 },
    autonomic: { name: 'Autonomic Flexibility', desc: 'How effectively you shift from activation back to calm.', weight: 1.4 },
    coherence: { name: 'Heart Coherence Capacity', desc: 'Physiological stability and how well your nervous system responds to regulation.', weight: 1.0 },
    breathing: { name: 'Breathing Efficiency', desc: 'Breathing patterns, air hunger, night breathing and BOLT.', weight: 0.8 },
    awareness: { name: 'Somatic Awareness', desc: 'How clearly you notice, locate and voluntarily release tension in your body.', weight: 0.7 },
    load: { name: 'Somatic Load', desc: 'How much tension, guarding, irritability and recovery debt your body is carrying.', weight: 1.0 },
    presence: { name: 'Presence', desc: 'How consistently you stay in the moment instead of slipping into autopilot.', weight: 1.5 },
    connection: { name: 'Connection', desc: 'How connected you remain to yourself and others, especially under stress.', weight: 1.4 }
  };

  /* Overall verdict bands. The top band deliberately tells people they
     may not need coaching — an audit nobody can "fail" is worthless. */
  var BANDS = [
    { min: 0, label: 'Survival mode',
      text: 'Your nervous system looks like it is spending too much time in protection mode. The good news is that these patterns are trainable, and this is where the biggest gains are likely to come from.' },
    { min: 40, label: 'Running on reserve',
      text: 'Your nervous system is coping, but it is using too much energy just to keep you functioning instead of recovering, connecting and being fully present.' },
    { min: 60, label: 'Fine, but not fully present yet',
      text: 'Your nervous system is functioning fairly well, but there is still a gap between getting through the day and being fully present in it.' },
    { min: 81, label: 'Genuinely regulated',
      text: 'Your nervous system appears well regulated overall. At this point, the work is more about refining your lowest score than fixing a major problem.' }
  ];

  function bandFor(n) {
    var out = BANDS[0];
    BANDS.forEach(function (b) { if (n >= b.min) out = b; });
    return out;
  }

  /* ---------- reading the person's actual answers ---------- */
  function ansOf(label) {
    for (var i = 0; i < QUESTIONS.length; i++) {
      if (QUESTIONS[i].label === label) return answers[QUESTIONS[i]._i];
    }
    return undefined;
  }
  function num(label) {
    var v = ansOf(label);
    return (v === undefined || v === null || v === '') ? null : Number(v);
  }
  function has(label, opt) {
    var v = ansOf(label);
    return Array.isArray(v) && v.indexOf(opt) > -1;
  }
  function countOf(label) {
    var v = ansOf(label);
    return Array.isArray(v) ? v.length : 0;
  }
  function is(label) {
    var v = ansOf(label);
    for (var i = 1; i < arguments.length; i++) {
      if (v === arguments[i]) return true;
    }
    return false;
  }
  function sc(scores, key) {
    var f = scores.filter(function (d) { return d.key === key; })[0];
    return f ? f.score : null;
  }

  /* Written observations that only appear when the answers earn them.
     w = priority when more fire than we can show. */
  var INSIGHTS = [
    /* stimulus */
    { w: 9, t: function () { return num('Boredom') >= 4 && num('Urge intensity') >= 4; },
      x: 'Stillness gets uncomfortable fast, so you reach for stimulation almost automatically. That is less about willpower and more about how used your nervous system is to staying activated.' },
    { w: 8, t: function () { return has('What you reach for', 'Work itself'); },
      x: 'Work may be doing double duty: productivity on the surface, avoidance underneath. Because it looks useful, it is easy to miss when it becomes an escape.' },
    { w: 6, t: function () { return has('What you reach for', 'Scrolling social media') && num('Boredom') >= 4; },
      x: 'Scrolling may be less about entertainment and more about escaping the discomfort of having nothing to do. Your attention gets relief, but your nervous system never really settles.' },
    { w: 7, t: function () {
        return has('What you reach for', 'Porn') || has('What you reach for', 'Alcohol') ||
               has('What you reach for', 'Other substances') || has('What you reach for', 'Cigarettes or vaping');
      },
      x: 'Some of your fastest relief comes from external stimulation or substances. The risk is that your nervous system gets fewer opportunities to practise settling without them.' },
    { w: 4, t: function () { return has('What you reach for', 'Sugar or snacking'); },
      x: 'Afternoon sugar or snacking may be doing more than feeding hunger. It can also become a quick way to lift your energy or change your state when you feel flat or stressed.' },

    /* sleep */
    { w: 10, t: function () { return has('Sleep', 'Waking around 3–5am'); },
      x: 'Waking between 3 and 5am can be a sign that your nervous system is not fully settling overnight. You may be sleeping, but part of your body is still staying on alert.' },
    { w: 8, t: function () { return has('Sleep', 'Racing thoughts at bedtime'); },
      x: 'The moment your body stops, your mind takes over. It can feel like the mental load of the day finally catches up with you when you reach the pillow.' },
    { w: 7, t: function () { return has('Sleep', 'Waking tired despite enough hours'); },
      x: 'You may be getting enough hours without getting enough restoration. Sleep quantity and sleep quality are not the same thing.' },
    { w: 5, t: function () { return has('Sleep', 'Hard to fall asleep') && has('Sleep', 'Light sleep'); },
      x: 'Your nervous system seems to have trouble fully downshifting at night. The goal is not just more sleep, but a smoother transition into deeper rest.' },

    /* presence */
    { w: 10, t: function () { return has('Relational impact', 'Physically there but mentally elsewhere'); },
      x: 'You can be in the room without fully being in the moment. The people closest to you may feel that distance even when you are trying to connect.' },
    { w: 8, t: function (s) { return sc(s, 'presence') !== null && sc(s, 'presence') < 40; },
      x: 'A lot of your day seems to happen on autopilot. You are functioning, but not always fully experiencing what you are doing.' },
    { w: 6, t: function () { return is('Autopilot', 'Often', 'Very often'); },
      x: 'Parts of your day are happening with very little conscious presence. You are getting through them, but not fully registering them.' },

    /* connection */
    { w: 9, t: function () { return is('Isolation under stress', 'I isolate heavily', 'I gradually reduce contact'); },
      x: 'When things get hard you pull away, right when connecting with someone would calm you down fastest. It feels safe. It usually makes things worse.' },
    { w: 7, t: function (s) { return sc(s, 'connection') !== null && sc(s, 'connection') < 40; },
      x: 'You can be surrounded by people and still feel disconnected. Being around people is not the same as genuinely connecting with them.' },
    { w: 6, t: function () { return has('Relational impact', 'I shut down emotionally'); },
      x: 'Under pressure, you tend to pull inward and go emotionally quiet. It can look calm from the outside while feeling completely disconnected on the inside.' },

    /* breathing */
    { w: 9, t: function () { var b = num('BOLT score'); return b !== null && b < 15; },
      x: 'A BOLT under 15 seconds suggests your breathing control and tolerance to air hunger are worth working on. Stress and nervous system state can influence it too, so treat it as a starting point, not a diagnosis.' },
    { w: 5, t: function () { var b = num('BOLT score'); return b !== null && b >= 15 && b < 25; },
      x: 'Your BOLT gives you a decent starting point, with room to improve breathing control and tolerance to air hunger. It is a useful number to retest over time.' },
    { w: 6, t: function () {
        return is('Night breathing', 'Mostly through the mouth', 'Mixed nose and mouth') ||
               is('Dry mouth on waking', 'Often', 'Almost every morning');
      },
      x: 'You are probably breathing through your mouth at night. Nose breathing makes a gas called nitric oxide that helps your body absorb oxygen. Skip that for eight hours and you lose it right when you need to recover most.' },

    /* coherence */
    { w: 9, t: function () { var b = num('Blind or guided'); return b !== null && b <= 2; },
      x: 'You are trying to regulate without much feedback, so it is hard to know what actually changes your state. Seeing the shift in real time can make the practice much easier to trust.' },
    { w: 6, t: function () { return is('Coherence response', 'I have never really tried', 'Very little'); },
      x: 'Regulation has not felt convincing in your body yet. If you cannot feel a shift, it makes sense that the practice is hard to trust or stick with.' },
    { w: 4, t: function () { return is('Real-time feedback', 'No, never', 'Only nightly averages from a watch or ring'); },
      x: 'You have never watched your own heart rhythm change while you breathe. A sleep tracker tells you what happened last night. It cannot show you what is happening right now.' },

    /* autonomic */
    { w: 9, t: function () { var r = num('Return to calm'); return r !== null && r <= 2; },
      x: 'Once your nervous system gets activated, it tends to stay there. The priority is making the shift from stress back to recovery faster and more reliable.' },
    { w: 7, t: function () { return is('Morning stress', 'Often', 'Almost every morning'); },
      x: 'You wake up already stressed. Before anything has even happened, your body has decided today is going to be hard.' },
    { w: 6, t: function () { var e = num('Emotional reactivity'); return e !== null && e >= 4; },
      x: 'An emotion hits and your body reacts before your brain catches up. By the time you notice, you are already in it.' },
    { w: 5, t: function () { var e = num('End of day'); return e !== null && e <= 2; },
      x: 'You cannot switch off at the end of the day. The work stops, your nervous system keeps running, which is why evenings never actually feel restful.' },
    { w: 5, t: function () { var r = num('Relationship to rest'); return r !== null && r <= 2; },
      x: 'Doing nothing makes you uncomfortable. Your body treats rest like a threat, so you keep finding reasons to stay busy.' },

    /* cognitive */
    { w: 7, t: function () { var f = num('Focus'), b = num('Brain fog'); return f !== null && b !== null && f <= 2 && b >= 4; },
      x: 'Low focus plus heavy brain fog usually points to more than discipline. Sleep, stress, breathing, stimulation and recovery are all worth looking at.' },
    { w: 7, t: function () { return is('Stimulants', '4 to 5', 'More than 5') && num('Stimulant dependence') >= 4; },
      x: 'You are running on stimulants to keep a tired system going. That works great, until the day it does not.' },
    { w: 4, t: function () { return is('Energy crash', 'Often', 'Almost every day'); },
      x: 'That afternoon crash is not laziness, and more coffee will not fix it. It is what happens when an already stressed system finally runs out of gas.' },

    /* somatic load */
    { w: 7, t: function () { return countOf('Tension zones') >= 4; },
      x: 'You are carrying tension across several areas at once. That suggests a broader pattern of bracing, not just one tight muscle.' },
    { w: 6, t: function () { return is('Jaw', 'Often', 'Almost constantly'); },
      x: 'Your jaw is doing a job nobody asked it to do. It is one of the last places to relax, and one of the first signs your system is still switched on.' },
    { w: 6, t: function () { return is('Body armour', 'Often', 'Almost always'); },
      x: 'The tension keeps coming back no matter what you do to it. Massage and stretching work on the muscle. The real cause sits somewhere else.' },
    { w: 5, t: function () { return is('Startle reflex', 'Often', 'Very often'); },
      x: 'You jump easily at sudden noises. That means your threat detector is set way too high, before anything has even happened.' },

    /* awareness */
    { w: 6, t: function () { var b = num('Body awareness'); return b !== null && b <= 2; },
      x: 'You tend to notice stress once it is already loud. Better body awareness helps you catch the earlier signals before tension starts piling up.' },

    /* context */
    { w: 8, t: function () { return is('How long', '1 to 3 years', 'More than 3 years'); },
      x: 'This has been going on for years. Long enough that it stopped feeling like a problem and started feeling like just who you are.' },
    { w: 3, t: function () { var m = num('Motivation'); return m !== null && m >= 4; },
      x: 'You are ready to do something with these results, not just read them. That matters more than having a perfect score today.' },
    { w: 3, t: function () { var m = num('Motivation'); return m !== null && m <= 2; },
      x: 'Right now you are more curious than committed, and that is useful information too. Nothing here needs to change overnight, but change does require practice.' }
  ];

  function insightsFor(scores, max) {
    var out = [];
    INSIGHTS.forEach(function (r) {
      var ok = false;
      try { ok = r.t(scores); } catch (e) { ok = false; }
      if (ok) out.push(r);
    });
    out.sort(function (a, b) { return b.w - a.w; });
    return out.slice(0, max || 3).map(function (r) { return r.x; });
  }

  var STORE = 'reset_audit_v1';
  var answers = {};
  var idx = 0;
  var root = null;
  var mode = 'short';
  var active = [];

  function setMode(m) {
    mode = m === 'full' ? 'full' : 'short';
    active = mode === 'full'
      ? QUESTIONS.slice()
      : QUESTIONS.filter(function (q) { return q.short; });
  }
  function cur() { return active[idx]; }

  /* ---------- persistence ---------- */
  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify({ a: answers, i: idx, m: mode }));
    } catch (e) {}
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return null;
      var d = JSON.parse(raw);
      answers = d.a || {};
      idx = typeof d.i === 'number' ? d.i : 0;
      return d.m || null;
    } catch (e) { return null; }
  }
  function clear() {
    try { localStorage.removeItem(STORE); } catch (e) {}
  }

  /* ---------- scoring ---------- */
  function normalise(q, v) {
    if (v === undefined || v === null || v === '') return null;
    var n = null;
    if (q.type === 'scale') n = (Number(v) - 1) / 4;
    else if (q.type === 'choice') {
      var i = q.opts.indexOf(v);
      if (i < 0) return null;
      n = q.vals ? q.vals[i] : i / (q.opts.length - 1);
      if (q.vals) return clamp(n);
    } else if (q.type === 'multi') {
      var count = Array.isArray(v) ? v.length : 0;
      var none = Array.isArray(v) && v.some(function (x) {
        return /^(none|nothing|no particular)/i.test(x);
      });
      if (none) count = 0;
      n = 1 - Math.min(count, 6) / 6;
      return clamp(n);
    } else if (q.type === 'number') {
      var num = Number(v);
      if (isNaN(num)) return null;
      n = Math.min(num, q.max || 40) / (q.max || 40);
      return clamp(n);
    } else return null;
    if (q.inv) n = 1 - n;
    return clamp(n);
  }
  function clamp(n) { return Math.max(0, Math.min(1, n)); }

  function computeScores() {
    var acc = {};
    QUESTIONS.forEach(function (q, i) {
      if (!q.dim) return;
      var n = normalise(q, answers[i]);
      if (n === null) return;
      if (!acc[q.dim]) acc[q.dim] = [];
      acc[q.dim].push(n);
    });
    var out = [];
    Object.keys(DIMS).forEach(function (k) {
      if (!acc[k] || !acc[k].length) return;
      var avg = acc[k].reduce(function (a, b) { return a + b; }, 0) / acc[k].length;
      var w = DIMS[k].weight || 1;
      out.push({
        key: k, name: DIMS[k].name, desc: DIMS[k].desc, weight: w,
        score: Math.round(avg * 100),
        /* how much this weak spot actually costs, given its weight */
        deficit: (1 - avg) * w
      });
    });
    /* worst-and-most-important first, so the list reads as a priority order */
    out.sort(function (a, b) { return b.deficit - a.deficit; });
    return out;
  }

  function overallScore(scores) {
    var num = 0, den = 0;
    scores.forEach(function (d) {
      num += d.score * d.weight;
      den += d.weight;
    });
    return den ? Math.round(num / den) : 0;
  }

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function isAnswered(q) {
    var v = answers[q._i];
    if (!q.req) return true;
    if (q.type === 'multi') return Array.isArray(v) && v.length > 0;
    return v !== undefined && v !== null && String(v).trim() !== '';
  }

  /* ---------- rendering ---------- */
  function render() {
    if (!root) return;
    var body = root.querySelector('.audit-body');
    var q = cur();
    var sec = SECTIONS.filter(function (s) { return s.id === q.s; })[0];
    body.innerHTML = '';

    var pct = Math.round((idx / active.length) * 100);
    root.querySelector('.audit-bar-fill').style.width = pct + '%';
    root.querySelector('.audit-step').textContent =
      'Question ' + (idx + 1) + ' of ' + active.length;

    var head = el('div', 'audit-sec');
    head.innerHTML = (sec.num ? '<span class="audit-sec-num">' + sec.num + '</span>' : '') +
      '<span class="audit-sec-title">' + esc(sec.title) + '</span>';
    body.appendChild(head);

    if (q.label && q.q) body.appendChild(el('p', 'audit-label', esc(q.label)));
    body.appendChild(el('h3', 'audit-q', esc(q.q || q.label)));
    if (q.help) body.appendChild(el('p', 'audit-help', esc(q.help)));

    body.appendChild(buildInput(q));

    var err = el('p', 'audit-error');
    err.style.display = 'none';
    body.appendChild(err);

    root.querySelector('.audit-back').disabled = idx === 0;
    var next = root.querySelector('.audit-next');
    next.textContent = idx === active.length - 1 ? 'See my results' : 'Next';
  }

  function buildInput(q) {
    var wrap = el('div', 'audit-input');
    var i = q._i;

    if (q.type === 'scale') {
      var row = el('div', 'audit-scale');
      for (var n = 1; n <= 5; n++) {
        (function (n) {
          var b = el('button', 'audit-dot' + (Number(answers[i]) === n ? ' on' : ''), String(n));
          b.type = 'button';
          b.onclick = function () { answers[i] = n; save(); render(); };
          row.appendChild(b);
        })(n);
      }
      wrap.appendChild(row);
      var lab = el('div', 'audit-scale-labels');
      lab.innerHTML = '<span>' + esc(q.lo || '') + '</span><span>' + esc(q.hi || '') + '</span>';
      wrap.appendChild(lab);

    } else if (q.type === 'choice') {
      q.opts.forEach(function (o) {
        var b = el('button', 'audit-opt' + (answers[i] === o ? ' on' : ''), esc(o));
        b.type = 'button';
        b.onclick = function () { answers[i] = o; save(); render(); };
        wrap.appendChild(b);
      });

    } else if (q.type === 'multi') {
      if (!Array.isArray(answers[i])) answers[i] = [];
      q.opts.forEach(function (o) {
        var on = answers[i].indexOf(o) > -1;
        var b = el('button', 'audit-opt multi' + (on ? ' on' : ''), esc(o));
        b.type = 'button';
        b.onclick = function () {
          var a = answers[i];
          var p = a.indexOf(o);
          if (p > -1) a.splice(p, 1); else a.push(o);
          save(); render();
        };
        wrap.appendChild(b);
      });
      wrap.appendChild(el('p', 'audit-help', 'Select all that apply.'));

    } else if (q.type === 'longtext') {
      var ta = el('textarea', 'audit-field');
      ta.rows = 5;
      ta.value = answers[i] || '';
      ta.oninput = function () { answers[i] = ta.value; save(); };
      wrap.appendChild(ta);

    } else {
      var inp = el('input', 'audit-field');
      inp.type = q.type === 'email' ? 'email' : (q.type === 'number' ? 'number' : 'text');
      if (q.unit) inp.placeholder = q.unit;
      inp.value = answers[i] || '';
      inp.oninput = function () { answers[i] = inp.value; save(); };
      inp.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); next(); } };
      wrap.appendChild(inp);
    }
    return wrap;
  }

  function showError(msg) {
    var err = root.querySelector('.audit-error');
    if (!err) return;
    err.textContent = msg;
    err.style.display = 'block';
  }

  function next() {
    var q = cur();
    if (!isAnswered(q)) {
      showError(q.type === 'multi' ? 'Pick at least one option.' : 'This one is required.');
      return;
    }
    if (q.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(answers[q._i]).trim())) {
      showError('That email does not look right.');
      return;
    }
    if (idx === active.length - 1) { finish(); return; }
    idx++;
    save();
    render();
    root.querySelector('.audit-body').scrollTop = 0;
  }

  function back() {
    if (idx === 0) return;
    idx--;
    save();
    render();
  }

  /* ---------- submit + results ---------- */
  function finish() {
    var scores = computeScores();
    renderResults(scores, 'sending');
    submit(scores).then(function () {
      renderResults(scores, 'sent');
    }).catch(function () {
      renderResults(scores, 'failed');
    });
  }

  function payload(scores) {
    var lines = [];
    QUESTIONS.forEach(function (q, i) {
      var v = answers[i];
      if (v === undefined || v === '' || (Array.isArray(v) && !v.length)) return;
      lines.push((q.label || q.q) + ': ' + (Array.isArray(v) ? v.join(', ') : v));
    });

    /* Mirror what the person just read on screen, so the email is enough on
       its own to prep a call without re-running their answers by hand. */
    var overall = overallScore(scores);
    var band = bandFor(overall);
    var top = scores[0];
    var notes = insightsFor(scores, 3);

    var out = (mode === 'full' ? 'FULL AUDIT (55 questions)' : 'SHORT AUDIT (free)');
    out += '\n\nOVERALL\n' + overall + '/100 - ' + band.label + '\n' + band.text;
    if (top) {
      out += '\n\nSTART HERE\n' + top.name + ' (' + top.score + '/100)';
      if (top.desc) out += '\n' + top.desc;
    }
    if (notes.length) {
      out += '\n\nWHAT STOOD OUT\n' + notes.map(function (t) { return '- ' + t; }).join('\n');
    }
    out += '\n\nSCORES (priority order, worst first, weighted)\n' +
      scores.map(function (d) { return d.name + ': ' + d.score + '/100'; }).join('\n');
    out += '\n\nANSWERS\n' + lines.join('\n');
    return out;
  }

  function submit(scores) {
    var email = answers[0] || '';
    var name = answers[1] || '';
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'PASTE_YOUR_KEY_HERE') {
      return Promise.reject(new Error('not configured'));
    }
    /* score and verdict in the subject, so the inbox list is already triaged */
    var overall = overallScore(scores);
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: (mode === 'full' ? 'RESET Full Audit — ' : 'RESET Audit — ') + name +
          ' — ' + overall + '/100 ' + bandFor(overall).label,
        from_name: 'RESET Audit',
        email: email,
        name: name,
        message: payload(scores)
      })
    }).then(function (r) {
      if (!r.ok) throw new Error('bad status');
      return r.json();
    });
  }

  function renderResults(scores, state) {
    var body = root.querySelector('.audit-body');
    root.querySelector('.audit-bar-fill').style.width = '100%';
    root.querySelector('.audit-step').textContent = 'Your results';
    root.querySelector('.audit-nav').style.display = 'none';
    body.innerHTML = '';
    body.scrollTop = 0;

    body.appendChild(el('h3', 'audit-q', 'Your Human Performance Map'));

    var overall = overallScore(scores);
    var band = bandFor(overall);
    var headline = el('div', 'audit-overall band-' + Math.min(3, BANDS.indexOf(band)));
    headline.innerHTML =
      '<div class="audit-overall-num">' + overall + '<span>/100</span></div>' +
      '<div class="audit-overall-text">' +
        '<p class="audit-overall-label">' + esc(band.label) + '</p>' +
        '<p class="audit-overall-desc">' + esc(band.text) + '</p>' +
      '</div>';
    body.appendChild(headline);

    var notes = insightsFor(scores, 3);
    if (notes.length) {
      var box = el('div', 'audit-notes');
      box.innerHTML = '<p class="audit-notes-title">What stood out in your answers</p>' +
        notes.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
      body.appendChild(box);
    }

    body.appendChild(el('p', 'audit-help',
      'Higher is better. Your scores are ranked by what is most worth working on first, ' +
      'with extra weight given to what most affects presence and connection.'));

    var list = el('div', 'audit-scores');
    scores.forEach(function (d, n) {
      var row = el('div', 'audit-score' + (n === 0 ? ' weak' : ''));
      row.innerHTML =
        '<div class="audit-score-top"><span>' + esc(d.name) +
        (n === 0 ? ' <em>&larr; start here</em>' : '') +
        '</span><strong>' + d.score + '</strong></div>' +
        '<div class="audit-score-bar"><i style="width:' + d.score + '%"></i></div>' +
        '<p>' + esc(d.desc) + '</p>';
      list.appendChild(row);
    });
    body.appendChild(list);
    body.appendChild(el('p', 'audit-disclaimer',
      'This is a self-assessment designed to help identify useful starting points. It is not a medical diagnosis.'));

    var weakest = scores.length ? scores[0].name : 'your lowest score';
    var cta = el('div', 'audit-cta');

    if (state === 'sending') {
      cta.appendChild(el('p', 'audit-help', 'Saving your results…'));
    } else {
      var status = state === 'sent'
        ? '<p class="audit-sent">Sent. I personally review every audit.</p>'
        : '<p class="audit-sent">Here are your results.</p>';

      if (mode === 'full') {
        cta.innerHTML = status +
          '<p class="audit-help">I will build your written Blueprint from these answers ' +
          'and walk you through it on a call.</p>' +
          '<a class="btn btn-gold" href="' + CALENDLY_URL + '" target="_blank" rel="noopener">Book your call</a>';
      } else {
        var topBand = BANDS.indexOf(band) === BANDS.length - 1;
        cta.innerHTML = status +
          '<p class="audit-help">' + (topBand
            ? 'Nothing here looks urgent. If you still want to sharpen <strong>' +
              esc(weakest) + '</strong>, here are two ways to go further.'
            : 'Your clearest bottleneck right now is <strong>' + esc(weakest) +
              '</strong>. Here are two ways to work on it.') + '</p>' +
          '<div class="audit-choice">' +
            '<div class="audit-pick">' +
              '<p class="audit-pick-price">Free</p>' +
              '<p class="audit-pick-name">30-minute call</p>' +
              '<p class="audit-pick-desc">We go through your scores together, identify what matters ' +
              'most, and leave you with a clear next step you can apply on your own.</p>' +
              '<a class="btn btn-gold-outline" href="' + CALENDLY_URL + '" target="_blank" rel="noopener">Book your free call</a>' +
            '</div>' +
            '<div class="audit-pick featured">' +
              '<p class="audit-pick-price">&euro;80</p>' +
              '<p class="audit-pick-name">RESET Blueprint</p>' +
              '<p class="audit-pick-desc">The full 55-question assessment, a written plan built around ' +
              esc(weakest) + ', the protocols I would prioritise for you, and a 1-hour call ' +
              'to walk through it together.</p>' +
              '<a class="btn btn-gold" href="' + BLUEPRINT_URL + '" target="_blank" rel="noopener">Get my RESET Blueprint</a>' +
            '</div>' +
          '</div>' +
          '<p class="audit-micro">If you join RESET 12 within 30 days, the &euro;80 is deducted from the programme price.</p>';
      }
    }
    body.appendChild(cta);
    clear();
  }

  /* ---------- shell ---------- */
  function build() {
    root = el('div', 'audit-overlay');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML =
      '<div class="audit-panel">' +
        '<div class="audit-head">' +
          '<div class="audit-headline">' +
            '<span class="audit-title">Human Performance Audit</span>' +
            '<span class="audit-step"></span>' +
          '</div>' +
          '<button class="audit-close" type="button" aria-label="Close">&times;</button>' +
          '<div class="audit-bar"><div class="audit-bar-fill"></div></div>' +
        '</div>' +
        '<div class="audit-body"></div>' +
        '<div class="audit-nav">' +
          '<button class="audit-back" type="button">Back</button>' +
          '<button class="audit-next btn btn-gold" type="button">Next</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);

    root.querySelector('.audit-close').onclick = close;
    root.querySelector('.audit-back').onclick = back;
    root.querySelector('.audit-next').onclick = next;
    /* deliberately no click-outside-to-close */
    document.addEventListener('keydown', function (e) {
      if (!root || !root.classList.contains('open')) return;
      if (e.key === 'Escape') close();
    });
  }

  function open(m) {
    if (!root) build();
    var saved = load();
    m = (m === 'full' || m === 'short') ? m : (saved || 'short');
    /* a half-finished run of the other version should not leak into this one */
    if (saved && saved !== m) { answers = {}; idx = 0; }
    setMode(m);
    if (idx >= active.length) { idx = 0; }
    root.querySelector('.audit-nav').style.display = '';
    root.classList.add('open');
    document.body.style.overflow = 'hidden';
    render();
  }

  function close() {
    if (!root) return;
    /* On a standalone audit page there is nothing behind the modal,
       so closing sends the visitor back to the main site instead. */
    var home = document.body.getAttribute('data-audit-home');
    if (home) { location.href = home; return; }
    root.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- wire up ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-audit-open]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        open(b.getAttribute('data-audit-open'));
      });
    });
    /* Standalone audit pages declare which version to run on <body>. */
    var auto = document.body.getAttribute('data-audit-auto');
    if (auto) {
      open(auto);
      return;
    }

    /* Shareable links:
         ...?audit=short  opens the free audit straight away
         ...?audit=full   opens the 52-question version (send after payment)
       Anything else just loads the page normally. */
    var direct = /[?&]audit=(short|full)/.exec(location.search);
    if (direct) {
      open(direct[1]);
      return;
    }
    if (location.hash === '#audit') {
      open('short');
      return;
    }
    initPopup();
  });

  window.RESETAudit = { open: open, close: close };

  /* ============================================================
     Prompt shown once, when the reader reaches the bio section
     (after the offers). Desktop also gets an exit-intent trigger.
     ============================================================ */
  function initPopup() {
    var SEEN = 'reset_popup_v2';
    var isDesktop = window.innerWidth > 900 &&
      !('ontouchstart' in window || navigator.maxTouchPoints > 0);
    /* Add ?popup=test to the URL to force it to show again while testing.
       Normal visitors only ever see it once. */
    var testing = /[?&]popup=test/.test(location.search) || location.hash === '#popup';
    if (!testing) {
      try { if (localStorage.getItem(SEEN)) return; } catch (e) {}
    }

    var pop = el('div', 'promo-overlay');
    pop.innerHTML =
      '<div class="promo-panel">' +
        '<button class="promo-close" type="button" aria-label="Close">&times;</button>' +
        '<p class="promo-eyebrow">Still deciding?</p>' +
        '<h3 class="promo-title">Find out what is actually stuck first.</h3>' +
        '<p class="promo-text">A free Human Performance Audit: 21 questions, about 3 minutes. ' +
        'You get scored across 9 dimensions and see which one is your real bottleneck ' +
        'before you spend anything.</p>' +
        '<button class="btn btn-gold promo-cta" type="button">Take the free audit</button>' +
        '<p class="promo-micro">Free &middot; 3 min &middot; Your results on screen</p>' +
      '</div>';
    document.body.appendChild(pop);

    function seen() {
      if (testing) return;
      try { localStorage.setItem(SEEN, '1'); } catch (e) {}
    }
    function show() {
      if (pop.classList.contains('open')) return;
      pop.classList.add('open');
      seen();
      cleanup();
    }
    function hide() {
      pop.classList.remove('open');
    }
    pop.querySelector('.promo-close').onclick = hide;
    pop.querySelector('.promo-cta').onclick = function () { hide(); open('short'); };
    /* Unlike the questionnaire, this is a light teaser: tapping the dark
       backdrop dismisses it too, so it can never sit on top of the page
       trapping taps meant for a CTA underneath. */
    pop.addEventListener('click', function (e) {
      if (e.target === pop) hide();
    });

    function onExit(e) {
      if (e.clientY <= 0) show();
    }
    /* Fire based on how much of the bio has already scrolled off the top.
       Desktop: half the text gone. Mobile: nearly at the section below it. */
    var bio = document.getElementById('about');
    var TRIGGER = isDesktop ? 0.5 : 0.8;
    function onScroll() {
      if (!bio) return;
      var r = bio.getBoundingClientRect();
      if (r.height <= 0) return;
      var scrolledPast = -r.top / r.height;
      if (scrolledPast >= TRIGGER) show();
    }
    function cleanup() {
      document.removeEventListener('mouseout', onExit);
      window.removeEventListener('scroll', onScroll);
    }
    if (isDesktop) document.addEventListener('mouseout', onExit);
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
