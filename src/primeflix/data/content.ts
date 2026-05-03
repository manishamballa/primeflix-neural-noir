// PRIMEFLIX — content matrix.
// Every item carries multi-dimensional theme vectors so that Movies <-> Books <-> Games
// can be bridged by the hybrid recommendation engine.

export type Domain = "movie" | "book" | "game" | "sport";

export type ContentItem = {
  id: string;
  domain: Domain;
  title: string;
  subtitle: string;
  language?: string;
  genre: string;
  themes: string[]; // shared semantic axis across domains
  year?: number;
  rating?: number;
  description: string; // ~100w movies, ~70-80w books/games
  accent: string; // hex tint used by the 3D node
  poster?: string; // imported image path for posters (movies)
};

// AI-generated cinematic poster artwork
import posterBladeRunner from "@/assets/posters/blade-runner-2049.jpg";
import posterDrive from "@/assets/posters/drive.jpg";
import posterParasite from "@/assets/posters/parasite.jpg";
import posterRRR from "@/assets/posters/rrr.jpg";
import posterOldboy from "@/assets/posters/oldboy.jpg";
import posterDune from "@/assets/posters/dune-2.jpg";
import posterAmelie from "@/assets/posters/amelie.jpg";
import posterJohnWick from "@/assets/posters/john-wick-4.jpg";
import posterHereditary from "@/assets/posters/hereditary.jpg";
import posterSpiderverse from "@/assets/posters/spiderverse.jpg";
import posterGodfather from "@/assets/posters/godfather.jpg";
import posterKnivesOut from "@/assets/posters/knives-out.jpg";
import posterLOTR from "@/assets/posters/lotr-rotk.jpg";
import posterFreeSolo from "@/assets/posters/free-solo.jpg";
import posterLaLaLand from "@/assets/posters/la-la-land.jpg";
import posterJojoRabbit from "@/assets/posters/jojo-rabbit.jpg";

// ────────── MOVIES (multi-language, multi-genre) ──────────
export const movies: ContentItem[] = [
  {
    id: "m1", domain: "movie", title: "Blade Runner 2049", subtitle: "Denis Villeneuve · 2017",
    language: "English", genre: "Noir / Sci-Fi", themes: ["cyberpunk", "noir", "identity", "dystopia"],
    year: 2017, rating: 8.0, accent: "#E8B73A", poster: posterBladeRunner,
    description:
      "Thirty years after the original, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former blade runner who has been missing for thirty years. Rain-soaked neon megacities, synthetic souls and a haunting Hans Zimmer score drag the viewer through a meditation on memory, love and what it means to be real. A philosophical noir wrapped in chrome and amber, slow as breath.",
  },
  {
    id: "m2", domain: "movie", title: "Drive", subtitle: "Nicolas Winding Refn · 2011",
    language: "English", genre: "Neo-Noir / Thriller", themes: ["noir", "minimalism", "violence", "loneliness"],
    year: 2011, rating: 7.8, accent: "#F2C744", poster: posterDrive,
    description:
      "A nameless Hollywood stunt driver moonlights as a getaway wheelman. When he falls for his quiet neighbour and her young son, a botched heist forces him to protect them from a ruthless mob. Refn paints Los Angeles in electric pink and black tar, weaponising silence and synthwave until each glance feels lethal. The Driver's scorpion jacket becomes legend; his violence, surgical. A modern fairy-tale noir about a gentle man with a monster sleeping behind his eyes — beautiful, brutal, and unforgettable.",
  },
  {
    id: "m3", domain: "movie", title: "Parasite", subtitle: "Bong Joon-ho · 2019",
    language: "Korean", genre: "Thriller / Dark Comedy", themes: ["class", "thriller", "satire", "twist"],
    year: 2019, rating: 8.5, accent: "#D4A02E", poster: posterParasite,
    description:
      "The Kim family, all unemployed, take peculiar interest in the wealthy Park family. They infiltrate the Parks' glass mansion one by one, tutoring, driving, housekeeping, building a precarious second life beneath a roof that is not theirs. Bong choreographs comedy and horror like a single staircase descending into the basement of capitalism. Every frame is a trap, every laugh a confession. Parasite collapses genres and households with the same surgical glee, ending on an image you cannot un-see.",
  },
  {
    id: "m4", domain: "movie", title: "RRR", subtitle: "S. S. Rajamouli · 2022",
    language: "Telugu", genre: "Action / Epic", themes: ["action", "epic", "rebellion", "brotherhood"],
    year: 2022, rating: 7.8, accent: "#E89B2A", poster: posterRRR,
    description:
      "1920s India. Two real revolutionaries, Komaram Bheem and Alluri Sitarama Raju, meet as strangers, become brothers, and are then torn apart by colonial duty. Rajamouli builds set-pieces like operas — flaming bridges, tiger-hurled chariots, dances that turn into uprisings. Beneath the spectacle is a mythic friendship and a fury at empire that Bollywood rarely permits itself. RRR is a three-hour cannonball: ridiculous, sincere, and gloriously alive. By the time the credits dance, the screen feels too small to contain it.",
  },
  {
    id: "m5", domain: "movie", title: "Oldboy", subtitle: "Park Chan-wook · 2003",
    language: "Korean", genre: "Neo-Noir / Thriller", themes: ["noir", "revenge", "twist", "mystery"],
    year: 2003, rating: 8.4, accent: "#C9982C", poster: posterOldboy,
    description:
      "Imprisoned in a single room for fifteen years without explanation, Oh Dae-su is suddenly released and given five days to find out who took his life from him, and why. Park Chan-wook's film is a hammer-blow of revenge, a corridor-fight ballet, and a Greek tragedy in a karaoke bar. It moves with the confidence of a man who already knows the ending, daring you to keep watching. Few thrillers have ever earned their final twist so cruelly, or filmed grief as if it were architecture.",
  },
  {
    id: "m6", domain: "movie", title: "Dune: Part Two", subtitle: "Denis Villeneuve · 2024",
    language: "English", genre: "Sci-Fi / Epic", themes: ["epic", "philosophy", "rebellion", "dystopia"],
    year: 2024, rating: 8.5, accent: "#EAB037", poster: posterDune,
    description:
      "Paul Atreides unites with the Fremen and walks the prophet's road, even as he sees the holy war it will unleash across the galaxy. Villeneuve's sand-coloured cathedrals, brutalist battle drums and total commitment to scale make Dune feel less like a film than a planetary event. Chalamet hardens, Zendaya doubts, and Austin Butler's Feyd-Rautha turns gladiatorial combat into chrome-toothed performance art. A blockbuster that asks whether worship is just slower destruction, told at the size of a small moon.",
  },
  {
    id: "m7", domain: "movie", title: "Amélie", subtitle: "Jean-Pierre Jeunet · 2001",
    language: "French", genre: "Romantic Comedy", themes: ["whimsy", "romance", "warmth", "minimalism"],
    year: 2001, rating: 8.3, accent: "#F0C24A", poster: posterAmelie,
    description:
      "Amélie is a shy Parisian waitress who decides, after a small discovery in her apartment, to spend her days quietly fixing the lives of strangers. From a Montmartre painted in pistachio and cherry red, Jeunet conjures a whole city of small kindnesses and stolen photo-booth pictures. There is mischief, melancholy, and a love story that depends on a man who collects discarded faces. A film as warm as fresh bread and as precise as clockwork — proof that whimsy, done well, is its own kind of courage.",
  },
  {
    id: "m8", domain: "movie", title: "John Wick: Chapter 4", subtitle: "Chad Stahelski · 2023",
    language: "English", genre: "Action / Thriller", themes: ["action", "noir", "revenge", "violence"],
    year: 2023, rating: 7.7, accent: "#E5A82F", poster: posterJohnWick,
    description:
      "John Wick uncovers a path to defeating the High Table, but before he can earn his freedom he must face a new enemy with powerful alliances across the globe. Stahelski stages gunfights as choreography, dragging Wick from Osaka neon to Berlin clubs to a stairway in Paris that has already entered the action canon. There is grief beneath the kinetic glamour, and a man who keeps standing simply because no one has told him he is allowed to fall. Pure, ritual cinema.",
  },
  {
    id: "m9", domain: "movie", title: "Hereditary", subtitle: "Ari Aster · 2018",
    language: "English", genre: "Horror", themes: ["horror", "occult", "dread", "family"],
    year: 2018, rating: 7.3, accent: "#B2862A", poster: posterHereditary,
    description:
      "After her secretive mother dies, Annie's family begins to unravel as a malign inheritance creeps from the attic into every room. Ari Aster directs grief like a séance: long, still shots that refuse to blink while something monstrous arrives at the edge of the frame. Toni Collette gives a performance that should have set every awards body on fire. A modern horror landmark — funereal, occult, and unbearably patient until the moment it finally is not.",
  },
  {
    id: "m10", domain: "movie", title: "Spider-Man: Across the Spider-Verse", subtitle: "Lord, Miller & dos Santos · 2023",
    language: "English", genre: "Animation / Adventure", themes: ["animation", "adventure", "identity", "color"],
    year: 2023, rating: 8.6, accent: "#F2C744", poster: posterSpiderverse,
    description:
      "Miles Morales is hurled across a Spider-Society that spans every dimension and art style ever drawn, only to discover that the multiverse has plans for him he refuses to accept. Each universe has its own line weight, palette and frame-rate, turning every cut into a rebellion. Beneath the kaleidoscope is a teenager fighting for the right to write his own story. The most visually inventive blockbuster in a generation, with a cliffhanger that earns the wait.",
  },
  {
    id: "m11", domain: "movie", title: "The Godfather", subtitle: "Francis Ford Coppola · 1972",
    language: "English", genre: "Crime / Drama", themes: ["crime", "drama", "family", "noir"],
    year: 1972, rating: 9.2, accent: "#C9982C", poster: posterGodfather,
    description:
      "The aging patriarch of an organised crime dynasty transfers control of his clandestine empire to his reluctant son. Coppola turns a gangster story into a domestic tragedy of immigration, succession and quiet rooms in which decisions rearrange the country. Brando murmurs, Pacino hardens, and Gordon Willis lights the whole film like a fading photograph. A foundation-stone of modern cinema; you cannot understand the language without it.",
  },
  {
    id: "m12", domain: "movie", title: "Knives Out", subtitle: "Rian Johnson · 2019",
    language: "English", genre: "Mystery / Comedy", themes: ["mystery", "comedy", "twist", "detective"],
    year: 2019, rating: 7.9, accent: "#E8B73A", poster: posterKnivesOut,
    description:
      "A celebrated novelist is found dead in his mansion the morning after his birthday, and a courtly Southern detective drifts through the suspects with a smile that hides a guillotine. Rian Johnson stitches Agatha Christie to class satire and lets Daniel Craig chew the scenery in a powder-blue suit. Plot reveals snap into place like cabinet locks, the ending is generous, and the whole film is the most fun you can have inside a manor on a stormy night.",
  },
  {
    id: "m13", domain: "movie", title: "The Lord of the Rings: Return of the King", subtitle: "Peter Jackson · 2003",
    language: "English", genre: "Fantasy / Adventure", themes: ["fantasy", "epic", "adventure", "rebellion"],
    year: 2003, rating: 9.0, accent: "#EAB037", poster: posterLOTR,
    description:
      "Frodo and Sam climb the last miles of Mount Doom while Aragorn rallies a continent's worth of armies for one final stand at the Black Gate. Jackson stages farewell after farewell — beacons, charges, eulogies — and earns each one with three films of patient world-building. Howard Shore's score is half the storytelling. A high-fantasy farewell so total it has dictated the shape of every blockbuster that has tried to follow it.",
  },
  {
    id: "m14", domain: "movie", title: "Free Solo", subtitle: "Chin & Vasarhelyi · 2018",
    language: "English", genre: "Documentary", themes: ["documentary", "focus", "minimalism", "exploration"],
    year: 2018, rating: 8.2, accent: "#D4A02E", poster: posterFreeSolo,
    description:
      "Climber Alex Honnold prepares to ascend the 3,000-foot face of El Capitan with no rope, no harness, no second chance. The film studies his strange calm and the equal terror of the camera crew who must film a friend who could die in front of them. Mountains have rarely felt this vertical or this intimate. A documentary about discipline, obsession and the small interior room a person builds to make the impossible look like a Sunday.",
  },
  {
    id: "m15", domain: "movie", title: "La La Land", subtitle: "Damien Chazelle · 2016",
    language: "English", genre: "Musical / Romance", themes: ["musical", "romance", "warmth", "melancholy"],
    year: 2016, rating: 8.0, accent: "#F0C24A", poster: posterLaLaLand,
    description:
      "An aspiring actress and a struggling jazz pianist fall in and out of love while Los Angeles refuses to let either of them rest. Chazelle stages dances on freeway overpasses and in twilight planetariums, then quietly counts the cost of every dream a city has ever sold. Hurwitz's score is gorgeous, Stone is luminous, and the closing montage hurts the right amount. A musical for people who think they don't like musicals.",
  },
  {
    id: "m16", domain: "movie", title: "Jojo Rabbit", subtitle: "Taika Waititi · 2019",
    language: "English", genre: "Comedy / Drama", themes: ["comedy", "drama", "satire", "warmth"],
    year: 2019, rating: 7.9, accent: "#E5A82F", poster: posterJojoRabbit,
    description:
      "A lonely German boy in the closing days of WWII discovers his mother is hiding a Jewish girl in their attic and must reconcile his cartoon imaginary friend Adolf with a reality the regime taught him to hate. Waititi handles the most dangerous tone in cinema — comedy inside catastrophe — with surprising grace, then breaks your heart in the third act. A tender, furious, deeply silly film about the size a child's courage can grow to.",
  },
];

// ────────── BOOKS (Productivity, Novels, Philosophy) ──────────
export const books: ContentItem[] = [
  {
    id: "b1", domain: "book", title: "Deep Work", subtitle: "Cal Newport",
    genre: "Productivity", themes: ["productivity", "focus", "minimalism", "philosophy"],
    year: 2016, rating: 4.2, accent: "#E8B73A",
    description:
      "Newport argues that the ability to focus without distraction on a cognitively demanding task is the superpower of the 21st century. Through case studies of programmers, writers and philosophers, he builds a practical discipline of scheduling, ritual and quiet, then defends it as the only honest way to do work that matters. Half manifesto, half manual.",
  },
  {
    id: "b2", domain: "book", title: "Atomic Habits", subtitle: "James Clear",
    genre: "Productivity", themes: ["productivity", "habits", "systems", "minimalism"],
    year: 2018, rating: 4.4, accent: "#F2C744",
    description:
      "Clear reframes self-improvement as architecture: tiny, repeatable choices stacked over years until identity itself shifts. He explains the four laws of behaviour change with disarming clarity, sketches the geometry of cue, craving, response and reward, and shows how environment quietly outvotes willpower. A short book that, applied seriously, becomes a long one.",
  },
  {
    id: "b3", domain: "book", title: "1984", subtitle: "George Orwell",
    genre: "Novel", themes: ["dystopia", "philosophy", "rebellion", "noir"],
    year: 1949, rating: 4.5, accent: "#D4A02E",
    description:
      "Winston Smith works for the Ministry of Truth, rewriting history under the gaze of Big Brother. He keeps a forbidden diary, falls in forbidden love, and slowly learns the price of an unowned thought. Orwell's London of grey rain and telescreens has become shorthand for every regime that mistakes language for reality. A novel that refuses to age.",
  },
  {
    id: "b4", domain: "book", title: "The Stranger", subtitle: "Albert Camus",
    genre: "Novel", themes: ["philosophy", "noir", "loneliness", "minimalism"],
    year: 1942, rating: 4.0, accent: "#E89B2A",
    description:
      "Meursault, a French Algerian clerk, attends his mother's funeral, drifts through a sun-stunned Algiers, and commits a murder he can barely explain. Camus writes in flat sentences that feel like noon light on bone, indicting a society that punishes a man for refusing to perform grief. A short, glaring novel, and the clearest doorway into the philosophy of the absurd.",
  },
  {
    id: "b5", domain: "book", title: "Meditations", subtitle: "Marcus Aurelius",
    genre: "Philosophy", themes: ["philosophy", "stoicism", "minimalism", "focus"],
    year: 180, rating: 4.6, accent: "#C9982C",
    description:
      "Private notes by a Roman emperor to himself, written by lamplight on military campaigns. Marcus rehearses gratitude, prepares for death, and reminds himself that the obstacle is the path. There is no audience, no argument to win, only a tired mind trying to be good tomorrow. Two thousand years later it still reads like advice from a steady older friend.",
  },
  {
    id: "b6", domain: "book", title: "Neuromancer", subtitle: "William Gibson",
    genre: "Novel", themes: ["cyberpunk", "noir", "dystopia", "identity"],
    year: 1984, rating: 4.1, accent: "#EAB037",
    description:
      "Case, a burnt-out console cowboy, is hired for one last impossible run through cyberspace by a patron whose motives glitter and shift like neon on wet asphalt. Gibson invented half the vocabulary the internet still speaks in — matrix, ICE, jacking in — and wrapped it around a noir as humid and paranoid as a Tokyo back alley. The book that lit the cyberpunk fuse.",
  },
  {
    id: "b7", domain: "book", title: "The Pragmatic Programmer", subtitle: "Hunt & Thomas",
    genre: "Productivity", themes: ["productivity", "systems", "focus", "craft"],
    year: 1999, rating: 4.3, accent: "#F0C24A",
    description:
      "A craftsman's manual for software, written as short, opinionated tips: don't repeat yourself, fix broken windows early, treat your career like a portfolio. Hunt and Thomas care less about any one language than about the habits of mind that outlast every framework. Read it once for the rules; reread it later, when you finally understand which ones to break.",
  },
  {
    id: "b8", domain: "book", title: "Beyond Good and Evil", subtitle: "Friedrich Nietzsche",
    genre: "Philosophy", themes: ["philosophy", "rebellion", "identity", "noir"],
    year: 1886, rating: 4.2, accent: "#E5A82F",
    description:
      "Nietzsche takes a hammer to the comforting morality of his century and asks what kind of person could live without it. Aphoristic, sarcastic, sometimes furious, the book sketches a future thinker who creates values rather than inherits them. It is a difficult, exhilarating walk along a cliff at night, with a guide who insists the cliff is the point.",
  },
];

// ────────── GAMES (RPG, Strategy, Cyberpunk) ──────────
export const games: ContentItem[] = [
  {
    id: "g1", domain: "game", title: "Cyberpunk 2077", subtitle: "CD Projekt Red",
    genre: "Cyberpunk RPG", themes: ["cyberpunk", "noir", "rpg", "dystopia"],
    year: 2020, rating: 8.4, accent: "#E8B73A",
    description:
      "Step into Night City as V, a mercenary outlaw chasing a one-of-a-kind implant that holds the key to immortality. Walk neon canyons of corporate spires, hack brains, drive too fast through chrome rain, and choose which version of yourself survives the next conversation. After years of patches, Night City finally feels as alive as its skyline always promised — a noir RPG built for getting wonderfully, dangerously lost.",
  },
  {
    id: "g2", domain: "game", title: "Disco Elysium", subtitle: "ZA/UM",
    genre: "RPG / Detective", themes: ["noir", "rpg", "philosophy", "identity"],
    year: 2019, rating: 9.1, accent: "#F2C744",
    description:
      "A washed-up detective wakes with no memory in a hotel room above a body hanging in a courtyard. There is no combat, only language: skills argue inside your skull while a half-drowned city stages strikes, séances and hangovers. Disco Elysium is a CRPG written like a great novel and painted like a fever, asking what kind of cop, lover, or human you are willing to become.",
  },
  {
    id: "g3", domain: "game", title: "Civilization VI", subtitle: "Firaxis",
    genre: "Strategy / 4X", themes: ["strategy", "epic", "systems", "history"],
    year: 2016, rating: 8.6, accent: "#D4A02E",
    description:
      "Lead a civilization from a single settler to a global power, balancing science, culture, religion, war and one extremely persistent neighbour. District placement turns map-painting into chess, and the famous 'one more turn' loop quietly steals entire weekends. Civ VI is the friendliest pure-strategy game on PC: deep enough to study, generous enough to learn through losing.",
  },
  {
    id: "g4", domain: "game", title: "Elden Ring", subtitle: "FromSoftware",
    genre: "Action RPG", themes: ["rpg", "epic", "exploration", "mystery"],
    year: 2022, rating: 9.5, accent: "#E89B2A",
    description:
      "Rise, Tarnished, and walk the Lands Between in search of the shattered Elden Ring. FromSoft pours its punishing combat and shrouded lore into a vast open world that rewards curiosity over checklists: every horizon hides a catacomb, a colossus, a god in mourning. Elden Ring is a difficult game made gentle by freedom — die anywhere, ride away anywhere, return changed.",
  },
  {
    id: "g5", domain: "game", title: "Hades", subtitle: "Supergiant",
    genre: "Roguelike RPG", themes: ["rpg", "rebellion", "mythology", "craft"],
    year: 2020, rating: 9.3, accent: "#C9982C",
    description:
      "Zagreus, prince of the Underworld, would like to leave home. Each escape attempt rebuilds him with new weapons and Olympian boons, and each death deepens his relationships back in his father's house. Supergiant fuses tight roguelike combat with a serialised family drama, so even your worst run advances a story. Endlessly replayable, endlessly kind to the player who keeps trying.",
  },
  {
    id: "g6", domain: "game", title: "Stellaris", subtitle: "Paradox",
    genre: "Grand Strategy", themes: ["strategy", "epic", "systems", "sci-fi"],
    year: 2016, rating: 8.3, accent: "#EAB037",
    description:
      "Design a species, settle a galaxy, and discover that diplomacy with a hive-mind of psychic mushrooms is harder than the manual implied. Stellaris turns every campaign into emergent science fiction, complete with crises, fallen empires and ethical knots about uplifted apes. A grand-strategy sandbox that treats the universe less like a map and more like a collaborative novel.",
  },
  {
    id: "g7", domain: "game", title: "Death Stranding", subtitle: "Kojima Productions",
    genre: "Action / Walking Sim", themes: ["loneliness", "philosophy", "exploration", "dystopia"],
    year: 2019, rating: 8.2, accent: "#F0C24A",
    description:
      "In a fractured America, courier Sam Bridges carries cargo across hostile terrain to reconnect a country that has stopped believing in itself. Kojima turns walking into a system of ladders, ropes and asynchronous kindness from other players' ghosts. It is slow, strange, and quietly devastating — a game about the weight on your back and the people you carry it for.",
  },
  {
    id: "g8", domain: "game", title: "Ghostrunner", subtitle: "One More Level",
    genre: "Cyberpunk Action", themes: ["cyberpunk", "action", "noir", "violence"],
    year: 2020, rating: 8.0, accent: "#E5A82F",
    description:
      "A cybernetic samurai climbs a tower city ruled by a tyrant, dying in a single hit and dishing them out the same way. Ghostrunner turns first-person platforming into clean, lethal flow: wall-run, slow time, slice, restart, slice again. Short, sharp and unmistakably cyberpunk, it understands that the best part of any neon dystopia is moving through it like rumour.",
  },
];

// ────────── SPORTS (Obsidian Arena · IPL) ──────────
export type IPLTeam = {
  team: string;
  short: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  nrr: number;
};

export const iplPointsTable: IPLTeam[] = [
  { team: "Mumbai Indians",      short: "MI",  played: 12, won: 9, lost: 3, points: 18, nrr: +0.84 },
  { team: "Royal Challengers",   short: "RCB", played: 12, won: 8, lost: 4, points: 16, nrr: +0.61 },
  { team: "Chennai Super Kings", short: "CSK", played: 12, won: 7, lost: 5, points: 14, nrr: +0.32 },
  { team: "Kolkata Knight Riders",short: "KKR",played: 12, won: 7, lost: 5, points: 14, nrr: +0.18 },
  { team: "Gujarat Titans",      short: "GT",  played: 12, won: 6, lost: 6, points: 12, nrr: +0.04 },
  { team: "Sunrisers Hyderabad", short: "SRH", played: 12, won: 6, lost: 6, points: 12, nrr: -0.11 },
  { team: "Rajasthan Royals",    short: "RR",  played: 12, won: 5, lost: 7, points: 10, nrr: -0.27 },
  { team: "Delhi Capitals",      short: "DC",  played: 12, won: 5, lost: 7, points: 10, nrr: -0.40 },
  { team: "Punjab Kings",        short: "PBKS",played: 12, won: 4, lost: 8, points:  8, nrr: -0.55 },
  { team: "Lucknow Super Giants",short: "LSG", played: 12, won: 3, lost: 9, points:  6, nrr: -0.72 },
];

export type Match = {
  id: string;
  home: string;
  away: string;
  date: string;
  venue: string;
  time: string;
};

export const upcomingMatches: Match[] = [
  { id: "x1", home: "MI",  away: "CSK", date: "May 06", venue: "Wankhede, Mumbai",       time: "19:30 IST" },
  { id: "x2", home: "RCB", away: "KKR", date: "May 08", venue: "Chinnaswamy, Bengaluru", time: "19:30 IST" },
  { id: "x3", home: "GT",  away: "SRH", date: "May 09", venue: "Narendra Modi, Ahmedabad",time:"19:30 IST" },
  { id: "x4", home: "RR",  away: "DC",  date: "May 11", venue: "Sawai Mansingh, Jaipur", time: "15:30 IST" },
  { id: "x5", home: "PBKS",away: "LSG", date: "May 12", venue: "Mullanpur, Mohali",      time: "19:30 IST" },
];

export const allContent: ContentItem[] = [...movies, ...books, ...games];