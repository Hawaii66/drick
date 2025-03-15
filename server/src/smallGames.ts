export type SmallGame =
  | {
      type: "group-question";
      question: string;
    }
  | {
      type: "group-challenge";
      challenge: string;
    }
  | {
      type: "person-question";
      question: string;
      person: string;
    }
  | {
      type: "person-challenge";
      challenge: string;
      person: string;
    }
  | {
      type: "write-something";
      text: string;
    }
  | {
      type: "2-truths-1-lie";
      truths: string[];
      lie: string;
    };

export const NeedsAnswers: SmallGame["type"][] = [
  "group-challenge",
  "group-question",
  "person-challenge",
  "person-question",
  "write-something",
  "2-truths-1-lie",
];
