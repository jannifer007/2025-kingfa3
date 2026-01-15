
export interface Winner {
  name: string;
  department: string;
  avatar: string;
}

export interface AwardScripts {
  preReveal: string; // "Teaser" before opening the card
  reveal: string;    // The actual citation and name announcement (Spoken by Robot)
  postReveal: string; // Closing remark for this award
}

export interface Award {
  id: string;
  title: string;
  description: string;
  citation: string; // The formal text displayed on the overlay card
  icon: string;
  winners: Winner[];
  scripts: AwardScripts;
}

export enum BotState {
  IDLE = 'IDLE',          // Floating randomly
  MOVING = 'MOVING',      // Moving to target
  SPEAKING = 'SPEAKING',  // Speaking (lips moving)
  CELEBRATING = 'CELEBRATING' // Holding sign and waving
}

export enum CeremonyPhase {
  START_SCREEN = 'START_SCREEN',
  OPENING = 'OPENING',         // New Phase: Robot Opening Speech
  PRE_REVEAL = 'PRE_REVEAL',   // Robot moves to card, teases
  REVEAL = 'REVEAL',           // Card opens, Robot celebrates, reads citation
  POST_REVEAL = 'POST_REVEAL', // Card closes, Robot wraps up
  FINISHED = 'FINISHED'
}
