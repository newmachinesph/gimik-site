export type Chapter = {
  id: "add" | "match" | "lock";
  number: string;
  title: string;
  body: string;
};

export const chapters: Chapter[] = [
  {
    id: "add",
    number: "01",
    title: "Add it",
    body: "Anything you have ever said “we should” about goes on your list. Bucket-list trips, small things, big things — if it deserves to happen, it belongs here.",
  },
  {
    id: "match",
    number: "02",
    title: "Match it",
    body: "Gora finds who else has it on their list — your friends, your groups, the people you actually know. The overlap was always there. Now you can see it.",
  },
  {
    id: "lock",
    number: "03",
    title: "Lock it",
    body: "Pick a date everyone can make. It leaves your list and lands on your calendar — and “sometime” stops being an answer.",
  },
];
