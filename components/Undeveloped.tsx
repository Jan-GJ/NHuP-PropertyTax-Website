import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { propertyState } from "../Atoms";
import { Property } from "../types/property";
import Input from "./Input";

const Undeveloped = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

  const areaOfTheLandValueState = useState<string>("");
  const [areaOfTheLandValue, setAreaOfTheLandValue] = areaOfTheLandValueState;
  const areaOfTheLandValueErrorState = useState<string>("");
  const areaOfTheLandValueIsCorrectState = useState<boolean>(false);

  //make useffect to add areaoflandvalue to property
  useEffect(() => {
    setProperty({ ...property, areaOfTheLand: [{ areaOfTheLandValue: parseInt(areaOfTheLandValue), areaOfTheLand: 0 }] });
  }, [areaOfTheLandValue]);

  return (
    <div className="flex-row flex space-x-1">
      <Input
        errorState={areaOfTheLandValueErrorState}
        allowedCharsRegExp={/[^0-9,]/g}
        isCorrectState={areaOfTheLandValueIsCorrectState}
        valueState={areaOfTheLandValueState}
        title="Bodenrichtwert in €"
      />
    </div>
  );
};

export default Undeveloped;
