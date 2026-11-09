/* eslint-disable */
// Interactive article blocks for CAM — grounded in the articles' own claims.
// No invented statistics; every line comes from the CAM texts.

export type MythFact = { myth: string; fact: string };
export type ThisOrThat = { a: string; b: string; note: string };

export type InteractiveBlock =
  | { type: "mythfact"; heading: string; items: MythFact[] }
  | { type: "thisorthat"; heading: string; items: ThisOrThat[] }
  | { type: "guess"; heading: string; round: number; note: string };

export const CAM_INTERACTIVE: Record<string, InteractiveBlock[]> = {
  "the-question-you-were-asked-at-ten": [
    {
      type: "mythfact",
      heading: "Flip the menu",
      items: [
        { myth: "Doctor, engineer, teacher, CA, IAS — those are the options.", fact: "That is not a choice. That is a cage with six windows." },
        { myth: "YouTuber is the rebellious pick.", fact: "It feels brave, but it still comes from the same handful of options everyone has already heard." },
      ],
    },
    {
      type: "guess",
      heading: "One job nobody named at the wedding",
      round: 1,
      note: "Ten more clues are waiting in the game.",
    },
  ],
  "the-knowing-gap": [
    {
      type: "mythfact",
      heading: "Two flips, one gap",
      items: [
        { myth: "Interest is a personality trait you're born with.", fact: "Interest is a side-effect of exposure. You look first. Then interest has something to grow on." },
        { myth: "\"I don't know my passion\" means something is wrong with me.", fact: "It's a normal result of having only been shown a brochure." },
      ],
    },
    {
      type: "thisorthat",
      heading: "Pick one",
      items: [
        { a: "Choose from everything that exists", b: "Choose from what you've actually seen", note: "You can only ever do the second. So the real move is to widen what you've seen." },
      ],
    },
  ],
  "there-are-not-twelve-careers": [
    {
      type: "mythfact",
      heading: "Flip it",
      items: [
        { myth: "School should have shown you every career.", fact: "One adult can't carry the whole world of work in their head. Nobody can. So we build a wider map together." },
        { myth: "Jobs like Foley Artist are hobbies in a costume.", fact: "People file taxes doing them." },
      ],
    },
  ],
  "how-interest-actually-starts": [
    {
      type: "thisorthat",
      heading: "Which order is right?",
      items: [
        { a: "Wait until you know who you are, then explore", b: "Look first, and let identity catch up", note: "Identity comes last in the chain — exposure, curiosity, practice, identity. You can't skip to step four." },
      ],
    },
  ],
  "guess-the-job": [
    {
      type: "guess",
      heading: "A taste of the game",
      round: 0,
      note: "All ten rounds live on the play page — score included.",
    },
  ],
  "strange-real-paid-work": [
    {
      type: "mythfact",
      heading: "Real work check",
      items: [
        { myth: "These are hobbies with a costume.", fact: "People file taxes doing them." },
      ],
    },
    {
      type: "guess",
      heading: "Guess one from the tour",
      round: 2,
      note: "The full game has ten rounds like this.",
    },
  ],
  "the-future-is-already-hiring": [
    {
      type: "mythfact",
      heading: "Flip it",
      items: [
        { myth: "These jobs belong to science fiction.", fact: "They're grounded in today's work — people are hired and paid for them now." },
      ],
    },
  ],
  "six-lenses-for-choosing": [
    {
      type: "thisorthat",
      heading: "Two ways to choose",
      items: [
        { a: "Pick the loudest career", b: "Run the six tests", note: "Where passion, skill, market, lifestyle, purpose and growth overlap — that's fit. Not fame." },
      ],
    },
  ],
  "thirty-days-of-looking-part-1": [
    {
      type: "thisorthat",
      heading: "This or that",
      items: [
        { a: "Decide your life this week", b: "Spend thirty days looking", note: "You don't need to decide your life this week. You need thirty days of looking." },
      ],
    },
  ],
  "thirty-days-of-looking-part-2": [
    {
      type: "thisorthat",
      heading: "This or that",
      items: [
        { a: "Keep waiting for certainty", b: "Try a micro-shift this week", note: "The second half moves from noticing to trying: a club, a short course, a person, a volunteer day." },
      ],
    },
  ],
};
