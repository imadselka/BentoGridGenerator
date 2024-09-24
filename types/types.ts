export type BentoItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  content: string;
};

export type Layout = {
  name: string;
  items: BentoItem[];
};
