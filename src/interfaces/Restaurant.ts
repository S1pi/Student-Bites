type Point = {
  type: "Point";
  coordinates: number[];
};

type Restaurant = {
  _id: string;
  companyId: number;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  location: Point;
  company: string;
};

export type { Restaurant };
