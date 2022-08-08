import React from "react";
import { useRecoilState } from "recoil";
import { propertyState } from "../../Atoms";
import Card from "../layout/Card";
import { Property, federalStates, economicEntities } from "../../types/property";

const Summary = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);
  return (
    <Card title="Zusammenfassung">
      <div className="flex flex-col p-3">
        <h1>{`Bundesland: ${federalStates[property.federalStateUid] ? federalStates[property.federalStateUid] : ""}`}</h1>
        <h1>{`Aktenzeichen / EW-AZ: ${property.reference}`}</h1>
        <h1>{`Gemeinde / Kreis: ${property.community}`}</h1>
        <h1>{`Straße: ${property.street}`}</h1>
        <h1>{`Hausnummer: ${property.houseNumber}`}</h1>
        <h1>{`PLZ: ${property.zip}`}</h1>
        <h1>{`Ort: ${property.city}`}</h1>
        <h1>{`Bezeichnung: ${property.name}`}</h1>
        <h1>{`Art der Wirtschaftlichen Einheit: ${economicEntities[property.economicEntityType - 1] ? economicEntities[property.economicEntityType - 1] : ""}`}</h1>
        <h1>{`Flurstücke: ${property.parcels?.length}`}</h1>
        {property.parcels?.map((parcel, index) => (
          <h1 key={index}>{`Flur: ${parcel.corridor} Flurstück Zähler: ${parcel.parcelData.counter} Flurstück Nenner: ${parcel.parcelData.denominator}`}</h1>
        ))}
      </div>
    </Card>
  );
};

export default Summary;
