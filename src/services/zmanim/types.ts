export interface ZmanimData {
  alosHaShachar: Date | null;
  misheyakir: Date | null;
  sunrise: Date | null;
  sofZmanShmaGRA: Date | null;
  sofZmanShmaMGA: Date | null;
  sofZmanTefilaGRA: Date | null;
  chatzos: Date | null;
  minchaGedola: Date | null;
  minchaKetana: Date | null;
  plagHaMincha: Date | null;
  candleLighting: Date | null;
  sunset: Date | null;
  tzeis: Date | null;
}

export interface ZmanInfo {
  key: string;
  time: Date;
  nameEn: string;
  nameHe: string;
}
