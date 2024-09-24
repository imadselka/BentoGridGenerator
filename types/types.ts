export type BentoItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  content: string;
  image?: string;
  link?: string;
  ingredients?: string[];
  cookingMethod?: string;
  venueDetails?: string;
  contactInfo?: string;
  attractions?: string[];
  travelTips?: string[];
  synopsis?: string;
  personalReview?: string;
  caption?: string;
  hashtags?: string[];
  keyPoints?: string[];
  colors?: string[];
  textures?: string[];
  date?: string;
  goal?: string;
  workout?: string;
  nutrition?: string;
  actionSteps?: string[];
  deadline?: string;
};

export type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Layouts = {
  lg: LayoutItem[];
  md?: LayoutItem[];
  sm?: LayoutItem[];
};

export type Layout = {
  name: string;
  items: BentoItem[];
};
