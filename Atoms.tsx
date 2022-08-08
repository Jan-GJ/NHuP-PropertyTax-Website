import { atom } from "recoil";
import { EconomicEntities, Parcel, Property } from "./types/property";

const defaultProperty: Property = {
  name: "Beispiel Straße 1, 12345 Beispielstadt",
  economicEntityType: EconomicEntities.built,
  federalStateUid: 9,
};

export const propertyState = atom<Property>({
  key: "propertyState",
  default: defaultProperty,
});
