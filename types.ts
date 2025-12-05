export enum Tab {
  HOME = 'HOME',
  DEVICE = 'DEVICE',
  MODELS = 'MODELS',
  PDD = 'PDD',
  TIPS = 'TIPS',
  NEWS = 'NEWS'
}

export interface CarPart {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
}

export interface CarModel {
  id: number;
  make: string;
  model: string;
  year: string;
  type: string;
  imageSeed: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface NewsResult {
  content: string;
  sources: { title: string; uri: string }[];
}