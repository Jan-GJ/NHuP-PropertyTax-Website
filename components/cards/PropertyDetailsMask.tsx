import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { propertyState } from "../../Atoms";
import { ownershipStructures, Property, typeOfProperties } from "../../types/property";
import Card from "../layout/Card";
import Input from "../ui/Input";

const PropertyDetailsMask = () => {
  const property = useRecoilValue<Property>(propertyState);

  const ownershipStructureTextState = useState<String>("");
  const ownershipStructureTextErrorState = useState<String>("");
  const ownershipStructureTextIsCorrectState = useState<String>("");

  const typeOfPropertyTextState = useState<String>("");
  const typeOfPropertyTextErrorState = useState<String>("");
  const typeOfPropertyTextIsCorrectState = useState<String>("");

  return (
    <Card title="Informationen zum Grundstück">
      <div className="p-3 space-y-2 flex flex-col">
        <Input
          valueState={ownershipStructureTextState}
          errorState={ownershipStructureTextErrorState}
          isCorrectState={ownershipStructureTextIsCorrectState}
          title="Eingentumsverhätnisse"
          placeholder="Alleineigentum einer natürlichen Person"
          allowedEndResults={ownershipStructures}
          suggestions={ownershipStructures}
          allowedCharsRegExp={/[^A-Za-zäöü -]/g}
          width={"min-w-[300px]"}
        />
        <Input
          valueState={typeOfPropertyTextState}
          errorState={typeOfPropertyTextErrorState}
          isCorrectState={typeOfPropertyTextIsCorrectState}
          title="Art des Grundstücks"
          placeholder=""
          allowedEndResults={typeOfProperties}
          suggestions={typeOfProperties}
          allowedCharsRegExp={/[^A-Za-zäöü -]/g}
          width={"min-w-[300px]"}
        />
        <h1>Erstreckts sich über mehrere Gemeinden</h1>
        {property.areaOfTheLand ? (
          property.areaOfTheLand[0].areaOfTheLand + property.areaOfTheLand[1].areaOfTheLand + property.areaOfTheLand[2].areaOfTheLand > 10000 ? (
            <div>
              <h1>TODO: zeig das an wenn mehr als 10000qm sind für befestigt</h1>
            </div>
          ) : null
        ) : null}
      </div>
    </Card>
  );
};

export default PropertyDetailsMask;
