import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { propertyState } from "../../Atoms";
import { ownershipStructures, typeOfProperties } from "../../types/lists";
import { EconomicEntities, ownershipStructure, Property } from "../../types/property";
import Card from "../layout/Card";
import Input from "../ui/Input";

const PropertyDetailsMask = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

  const ownershipStructureTextState = useState<string>("");
  const [ownershipStructureText, setOwnershipStructureTextState] = ownershipStructureTextState;

  const ownershipStructureTextErrorState = useState<string>("");
  const ownershipStructureTextIsCorrectState = useState<string>("");

  const typeOfPropertyTextState = useState<string>("");
  const typeOfPropertyTextErrorState = useState<string>("");
  const typeOfPropertyTextIsCorrectState = useState<string>("");

  useEffect(() => {
    const index = ownershipStructures.indexOf(ownershipStructureText) as ownershipStructure;
    setProperty({ ...property, ownershipStructure: index });
  }, [ownershipStructureText, setProperty]);

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
        {property.economicEntityType !== EconomicEntities.undeveloped ? (
          <Input
            valueState={typeOfPropertyTextState}
            errorState={typeOfPropertyTextErrorState}
            isCorrectState={typeOfPropertyTextIsCorrectState}
            title="Art des Grundstücks"
            placeholder="Einfamilienhaus"
            allowedEndResults={typeOfProperties}
            suggestions={typeOfProperties}
            allowedCharsRegExp={/[^A-Za-zäöü -]/g}
            width={"min-w-[300px]"}
          />
        ) : null}

        {/*   <h1>TODO: Erstreckts sich über mehrere Gemeinden</h1> */}
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
