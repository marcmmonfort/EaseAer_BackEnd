export interface LocationEntity {
  uuid: string;
  nameLocation: string;
  latLocation: string;
  lonLocation: string;
  typeLocation: "shop" | "service";
  deletedLocation: boolean;
}
