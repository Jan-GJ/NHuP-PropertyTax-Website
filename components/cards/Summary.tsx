import React from "react";
import { useRecoilState } from "recoil";
import { propertyState } from "../../Atoms";
import Card from "../layout/Card";
import { Property } from "../../types/property";
import { economicEntities, federalStates } from "../../types/lists";

const Summary = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);
  return (
    <Card title="Zusammenfassung">
      <div className="flex flex-col p-3">
        <h1>{`Bundesland: ${federalStates[property.federalStateUid] ? federalStates[property.federalStateUid] : ""}`}</h1>
        <h1>{`Aktenzeichen / EW-AZ: ${property.reference}`}</h1>
        <h1>{`Gemeinde: ${property.community}`}</h1>
        <h1>{`Straße: ${property.street}`}</h1>
        <h1>{`Hausnummer: ${property.houseNumber}`}</h1>
        <h1>{`PLZ: ${property.zip}`}</h1>
        <h1>{`Ort: ${property.city}`}</h1>
        <h1>{`Bezeichnung: ${property.name}`}</h1>
        <h1>{`Art der Wirtschaftlichen Einheit: ${economicEntities[property.economicEntityType - 1] ? economicEntities[property.economicEntityType - 1] : ""}`}</h1>
        <h1>{`Flurstücke: ${property.parcels?.length}`}</h1>
      </div>
    </Card>
  );
};

export default Summary;
