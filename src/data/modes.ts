export type Mode = {
  id: "solo" | "duo" | "group";
  label: string;
  heading: string;
  body: string;
  example: string;
  openToJoin?: string;
};

export const modes: Mode[] = [
  {
    id: "solo",
    label: "Solo",
    heading: "For you, by you.",
    body: "A solo plan is still a plan. Book the class, block the morning, keep the promise you made to yourself — Gora holds the date either way.",
    example: "Freedive a coral reef — Sunday, just you.",
  },
  {
    id: "duo",
    label: "Duo",
    heading: "One other calendar.",
    body: "Some plans only need two people to say yes. Gora finds the overlap between your list and theirs, then pins it to a day you can both make.",
    example: "Learn to surf — you and Sam, Saturday 9:00.",
  },
  {
    id: "group",
    label: "Group",
    heading: "Everyone in.",
    body: "The ideas your group chat keeps circling back to — Gora surfaces the ones you all share and finds the one date the whole group can make.",
    example: "Eat through a night market — six of you, Friday night.",
    openToJoin: "Some plans you can open up, so people already going can join.",
  },
];
