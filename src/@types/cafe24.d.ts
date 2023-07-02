declare interface Info {
  [key: string]: string | undefined | string[];
  product_name: string;
  internal_product_name?: string;
  supply_product_name?: string;
  summary_description?: string;
  simple_description?: string;
  description?: string;
  product_tag?: string[];
}

declare interface Price {
  [key: string]: string;
  price: string;
  retail: string;
  supply: string;
}

declare interface Mark {
  [key: string]: string;
  display: string;
  selling: string;
  exposure: string;
  category: string;
  recommand: string;
  newProduct: string;
}
