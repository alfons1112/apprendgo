import { Course, YearLevel } from './types';

export const MOCK_COURSES: Course[] = [
  // --- LICENCE 1 ---
  {
    id: 'l1-hist-litt',
    title: 'Histoire de la littérature française',
    year: YearLevel.L1,
    category: 'Histoire Littéraire',
    description: 'Focus sur le XVIIe siècle et le théâtre classique, étude de l\'œuvre Andromaque de Jean Racine.',
    content: `
      # Histoire de la Littérature Française : Le XVIIe Siècle
      
      Le XVIIe siècle est souvent appelé le "Grand Siècle". Il est marqué par le règne de Louis XIV et l'apogée du Classicisme.

      ## 1. Le Classicisme
      Le classicisme repose sur l'ordre, la clarté, la mesure et la retenue. Il s'inspire des Anciens (Grecs et Latins).
      La doctrine classique impose des règles strictes au théâtre :
      - **La règle des trois unités** : Temps (24h), Lieu (un seul décor), Action (une seule intrigue principale).
      - **La bienséance** : Ne pas choquer le public (pas de mort sur scène).
      - **La vraisemblance** : L'histoire doit paraître croyable.

      ## 2. Œuvre au programme : Andromaque de Jean Racine (1667)
      *Andromaque* est une tragédie en cinq actes et en vers (1648 alexandrins).
      
      ### L'intrigue
      C'est une chaîne amoureuse à sens unique tragique : Oreste aime Hermione, qui aime Pyrrhus, qui aime Andromaque, qui aime Hector (son mari mort) et veut protéger son fils Astyanax.
      
      ### Thèmes principaux
      - **La fatalité passionnelle** : Les personnages sont prisonniers de leurs passions destructrices.
      - **Le chantage politique** : Pyrrhus utilise Astyanax pour forcer Andromaque au mariage.
      - **Le dilemme tragique** : Andromaque doit choisir entre sa fidélité à son époux mort et la vie de son fils.
    `
  },
  {
    id: 'l1-roman-xix',
    title: 'Le Roman au XIXe siècle',
    year: YearLevel.L1,
    category: 'Roman',
    description: 'Évolution du genre romanesque : du Romantisme au Naturalisme.',
    content: `
      # Le Roman au XIXe siècle
      
      Le XIXe siècle est considéré comme l'âge d'or du roman français. Le genre gagne en légitimité et devient le miroir de la société.

      ## 1. Le Romantisme (Début du siècle)
      Le roman romantique met en avant le "Moi", les sentiments, la mélancolie ("le mal du siècle") et l'histoire nationale.
      - Auteurs clés : Victor Hugo (*Notre-Dame de Paris*), Chateaubriand.

      ## 2. Le Réalisme (Milieu du siècle)
      En réaction contre l'idéalisme romantique, le Réalisme veut "faire vrai". Il décrit la réalité sociale, l'argent, et les classes moyennes et populaires.
      - **Balzac** et *La Comédie Humaine* : Il veut peindre tous les "types sociaux".
      - **Stendhal** : Le roman est un "miroir que l'on promène le long d'un chemin".

      ## 3. Le Naturalisme (Fin du siècle)
      Initié par **Émile Zola**, le naturalisme va plus loin que le réalisme en introduisant une méthode scientifique. Le romancier est un observateur et un expérimentateur qui étudie l'influence de l'hérédité et du milieu sur les personnages (*Les Rougon-Macquart*).
    `
  },
  {
    id: 'l1-methodo',
    title: 'Méthodologie de la lecture critique',
    year: YearLevel.L1,
    category: 'Méthodologie',
    description: 'Apprendre à analyser un texte littéraire. Support : La Nausée de Jean-Paul Sartre.',
    content: `
      # Méthodologie de la lecture critique
      
      Ce cours vise à donner les outils pour dépasser la simple lecture de plaisir et entrer dans l'analyse littéraire structurée.

      ## 1. Les outils de l'analyse
      - **L'énonciation** : Qui parle ? À qui ?
      - **La focalisation** : Point de vue zéro, interne ou externe.
      - **Le style** : Champs lexicaux, figures de style (métaphore, métonymie...), registres.

      ## 2. Œuvre d'application : La Nausée de Jean-Paul Sartre (1938)
      Ce roman est un manifeste de l'existentialisme.

      ### Analyse de l'incipit
      Le journal d'Antoine Roquentin commence par une difficulté à écrire et à comprendre le monde. Les objets perdent leur fonction utilitaire et révèlent leur existence brute, provoquant la "Nausée".
      
      ### Concepts clés
      - **L'existence précède l'essence** : L'homme existe d'abord, et se définit ensuite par ses actes.
      - **La contingence** : Le fait que les choses existent sans raison nécessaire. Elles sont "de trop".
      - **L'absurde** : Le sentiment qui naît de la confrontation entre la quête de sens de l'homme et le silence du monde.
    `
  },
  {
    id: 'l1-ex-litt',
    title: 'Exercice Littéraire',
    year: YearLevel.L1,
    category: 'Pratique',
    description: 'Maîtriser les exercices académiques : dissertation et commentaire composé.',
    content: `
      # L'Exercice Littéraire en L1
      
      La réussite en licence dépend de la maîtrise de deux exercices canoniques.

      ## 1. Le Commentaire Composé
      Il ne s'agit pas de raconter le texte (paraphrase), mais d'expliquer ce que le texte dit et *comment* il le dit.
      - **Introduction** : Amorce, présentation de l'auteur/œuvre, problématique, annonce du plan.
      - **Développement** : 2 ou 3 grandes parties (axes de lecture), divisées en sous-parties. Chaque idée doit être justifiée par une citation et une analyse stylistique.
      - **Conclusion** : Bilan et ouverture.

      ## 2. La Dissertation Littéraire
      C'est une réflexion argumentée sur un sujet général ou une citation.
      - **Analyse du sujet** : Définir les mots-clés.
      - **Problématique** : Quelle est la tension ou la question centrale soulevée par le sujet ?
      - **Plan** : Souvent dialectique (Thèse / Antithèse / Synthèse) ou thématique.
    `
  },
  {
    id: 'l1-phonetique',
    title: 'Phonétique articulatoire du français',
    year: YearLevel.L1,
    category: 'Linguistique',
    description: 'Étude des sons du français : production, classification et transcription (API).',
    content: `
      # Phonétique Articulatoire
      
      La phonétique étudie la face matérielle des sons du langage.

      ## 1. L'appareil phonatoire
      La production du son nécessite :
      - **La soufflerie** : Les poumons (flux d'air).
      - **Le vibrateur** : Les cordes vocales dans le larynx (voisement).
      - **Les résonateurs** : Pharynx, bouche, fosses nasales.

      ## 2. Classement des sons
      ### Les Voyelles
      Elles se définissent par :
      - L'aperture (ouverte / fermée).
      - Le lieu d'articulation (antérieure / postérieure).
      - La labialisation (arrondie / non arrondie).
      - La nasalité (orale / nasale).
      
      ### Les Consonnes
      Elles se définissent par :
      - Le mode d'articulation (occlusive / fricative).
      - Le point d'articulation (bilabiale, dentale, vélaire...).
      - Le voisement (sourde / sonore).

      ## 3. L'Alphabet Phonétique International (API)
      C'est un système de notation où un signe correspond à un seul son. C'est indispensable pour transcrire l'oral sans l'ambiguïté de l'orthographe.
    `
  },
  {
    id: 'l1-morphologie',
    title: 'Morphologie du français',
    year: YearLevel.L1,
    category: 'Linguistique',
    description: 'Structure des mots, dérivation, flexion et formation du vocabulaire.',
    content: `
      # Morphologie du Français
      
      La morphologie étudie la structure interne des mots et leur formation.

      ## 1. Le Morphème
      C'est la plus petite unité de sens.
      - **Morphème lexical (lexème)** : Porte le sens principal (ex: *chant-* dans chanter).
      - **Morphème grammatical** : Modifie le sens (ex: *-ons* indique la 1ère pers. du pluriel).

      ## 2. La Dérivation
      C'est la création de mots nouveaux par ajout d'affixes à une base.
      - **Préfixation** : Ajout avant la base (ex: *re-*faire). Ne change généralement pas la classe grammaticale.
      - **Suffixation** : Ajout après la base (ex: chant-*eur*). Peut changer la classe grammaticale (verbe -> nom).

      ## 3. La Composition
      Formation d'un mot à partir de deux mots existants (ex: *porte-manteau*, *pomme de terre*).

      ## 4. La Flexion
      Variation de la forme des mots selon le genre, le nombre (pour les noms/adjectifs) ou la personne, le temps, le mode (pour les verbes).
    `
  },

  // --- LICENCE 2 (Exemples conservés pour la structure) ---
  {
    id: 'l2-poesie',
    title: 'Poésie du XIXe : De Baudelaire à Mallarmé',
    year: YearLevel.L2,
    category: 'Poésie',
    description: 'Le Symbolisme, la modernité poétique et la dislocation du vers.',
    content: `
      # Poésie du XIXe siècle
      
      ## Charles Baudelaire
      Avec *Les Fleurs du Mal*, Baudelaire fait entrer la modernité en poésie. Il extrait la beauté du mal et de la laideur urbaine.
      
      ## Arthur Rimbaud
      Le poète voyant. Il dérègle tous les sens pour atteindre l'inconnu. *Une saison en enfer*, *Illuminations*.
      
      ## Le Symbolisme
      Courant qui préfère suggérer plutôt que nommer. Mallarmé pousse l'hermétisme et le travail sur la langue à son paroxysme.
    `
  },
  {
    id: 'l2-theatre',
    title: 'Le Théâtre du XXe siècle',
    year: YearLevel.L2,
    category: 'Théâtre',
    description: 'De Claudel à l\'Absurde (Beckett, Ionesco).',
    content: `
      # Le Théâtre au XXe siècle
      
      ## La crise du drame
      Le théâtre s'éloigne du réalisme.
      
      ## Le Théâtre de l'Absurde
      Dans les années 50, après les traumatismes de la guerre, des auteurs comme Beckett (*En attendant Godot*) et Ionesco (*La Cantatrice chauve*) mettent en scène l'incommunicabilité et le vide de l'existence. Le langage se disloque, l'action est circulaire.
    `
  },

  // --- LICENCE 3 (Exemples conservés pour la structure) ---
  {
    id: 'l3-critique',
    title: 'Théorie Littéraire et Critique',
    year: YearLevel.L3,
    category: 'Théorie',
    description: 'Structuralisme, narratologie, esthétique de la réception.',
    content: `
      # Théorie Littéraire
      
      ## Le Structuralisme
      Analyse du texte comme un système clos de signes. Figures majeures : Barthes, Genette (Narratologie : focalisation, temps du récit).
      
      ## L'Esthétique de la réception
      (Jauss, Iser). Le sens de l'œuvre n'est pas donné par l'auteur seul, il est co-construit par le lecteur. L'œuvre répond ou déçoit l'"horizon d'attente" du public.
    `
  },
  {
    id: 'l3-litt-comp',
    title: 'Littérature Comparée',
    year: YearLevel.L3,
    category: 'Comparée',
    description: 'Étude des mythes littéraires à travers l\'Europe (Don Juan, Faust).',
    content: `
      # Littérature Comparée
      
      La littérature comparée étudie les relations entre les littératures de différentes langues et cultures.
      
      ## Le Mythe de Don Juan
      De Tirso de Molina à Molière et Mozart. Comment le mythe du séducteur puni évolue-t-il selon les époques et les pays ?
    `
  }
];