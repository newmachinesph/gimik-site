export type BucketItem = {
  number: string;
  title: string;
  social: string;
  image: { src: string; alt: string };
};

export const bucketItems: BucketItem[] = [
  {
    number: "014",
    title: "Learn to surf",
    social: "3 friends have this",
    image: {
      src: "/surf.jpg",
      alt: "A surfer crouched low inside the barrel of a breaking wave",
    },
  },
  {
    number: "027",
    title: "See the northern lights",
    social: "1 friend has this",
    image: {
      src: "/aurora.jpg",
      alt: "Green aurora curling over a lit cabin at the edge of a fjord",
    },
  },
  {
    number: "033",
    title: "Fly over Cappadocia at sunrise",
    social: "2 friends have this",
    image: {
      src: "/balloons.jpg",
      alt: "Dozens of hot-air balloons drifting over misty rock valleys at dawn",
    },
  },
  {
    number: "041",
    title: "Eat through a night market",
    social: "5 friends have this",
    image: {
      src: "/market.jpg",
      alt: "A cook tossing noodles in a steaming wok at a night street market",
    },
  },
  {
    number: "052",
    title: "Freedive a coral reef",
    social: "solo",
    image: {
      src: "/reef.jpg",
      alt: "A freediver gliding above a coral reef through shafts of sunlight",
    },
  },
  {
    number: "068",
    title: "Catch a summit sunset",
    social: "2 friends have this",
    image: {
      src: "/summit.jpg",
      alt: "A hiker standing on a rocky summit ridge facing the setting sun",
    },
  },
];
