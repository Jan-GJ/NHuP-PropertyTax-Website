import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { propertyState } from "../../Atoms";
import { AreaOfTheLand, Property } from "../../types/property";
import Card from "../layout/Card";
import Input from "../ui/Input";

function AreaOfTheLandMask() {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

  const areaOfTheLandOneState = useState<string>("");
  const [areaOfTheLandOne, setAreaOfTheLandOne] = areaOfTheLandOneState;
  const areaOfTheLandOneErrorState = useState<string>("");
  const areaOfTheLandOneIsCorrectState = useState<string>("");

  const areaOfTheLandValueOneState = useState<string>("");
  const [areaOfTheLandValueOne, setAreaOfTheLandValueOne] = areaOfTheLandValueOneState;
  const areaOfTheLandValueOneErrorState = useState<string>("");
  const areaOfTheLandValueOneIsCorrectState = useState<string>("");

  const areaOfTheLandTwoState = useState<string>("");
  const [areaOfTheLandTwo, setAreaOfTheLandTwo] = areaOfTheLandTwoState;
  const areaOfTheLandTwoErrorState = useState<string>("");
  const areaOfTheLandTwoIsCorrectState = useState<string>("");

  const areaOfTheLandValueTwoState = useState<string>("");
  const [areaOfTheLandValueTwo, setAreaOfTheLandValueTwo] = areaOfTheLandValueTwoState;
  const areaOfTheLandValueTwoErrorState = useState<string>("");
  const areaOfTheLandValueTwoIsCorrectState = useState<string>("");

  const areaOfTheLandThreeState = useState<string>("");
  const [areaOfTheLandThree, setAreaOfTheLandThree] = areaOfTheLandThreeState;
  const areaOfTheLandThreeErrorState = useState<string>("");
  const areaOfTheLandThreeIsCorrectState = useState<string>("");

  const areaOfTheLandValueThreeState = useState<string>("");
  const [areaOfTheLandValueThree, setAreaOfTheLandValueThree] = areaOfTheLandValueThreeState;
  const areaOfTheLandValueThreeErrorState = useState<string>("");
  const areaOfTheLandValueThreeIsCorrectState = useState<string>("");

  //TODO: this doesnt work somehow
  useEffect(() => {
    let newAreaOfTheLand = [
      { areaOfTheLand: 0, areaOfTheLandValue: 0 },
      { areaOfTheLand: 0, areaOfTheLandValue: 0 },
      { areaOfTheLand: 0, areaOfTheLandValue: 0 },
    ] as AreaOfTheLand[];
    if (property.areaOfTheLand) {
      newAreaOfTheLand = [
        { areaOfTheLand: property.areaOfTheLand[0].areaOfTheLand, areaOfTheLandValue: parseInt(areaOfTheLandValueOne) ? parseInt(areaOfTheLandValueOne) : 0 },
        { areaOfTheLand: property.areaOfTheLand[1].areaOfTheLand, areaOfTheLandValue: parseInt(areaOfTheLandValueTwo) ? parseInt(areaOfTheLandValueTwo) : 0 },
        { areaOfTheLand: property.areaOfTheLand[2].areaOfTheLand, areaOfTheLandValue: parseInt(areaOfTheLandValueThree) ? parseInt(areaOfTheLandValueThree) : 0 },
      ] as AreaOfTheLand[];
    }
    setProperty({ ...property, areaOfTheLand: newAreaOfTheLand });
  }, [setProperty, areaOfTheLandValueOne, areaOfTheLandValueTwo, areaOfTheLandValueThree]);

  useEffect(() => {
    if (property.parcels) {
      const areaOneParcels = property.parcels.filter((parcel) => parcel.containedInArea === 1);
      const areaTwoParcels = property.parcels.filter((parcel) => parcel.containedInArea === 2);
      const areaThreeParcels = property.parcels.filter((parcel) => parcel.containedInArea === 3);
      let areaOne = 0;
      areaOneParcels?.forEach((parcel) => {
        areaOne += parcel.areaOfTheLand ? parcel.areaOfTheLand : 0;
      });
      setAreaOfTheLandOne(areaOne.toString());

      let areaTwo = 0;
      areaTwoParcels?.forEach((parcel) => {
        areaTwo += parcel.areaOfTheLand ? parcel.areaOfTheLand : 0;
      });
      setAreaOfTheLandTwo(areaTwo.toString());

      let areaThree = 0;
      areaThreeParcels?.forEach((parcel) => {
        areaThree += parcel.areaOfTheLand ? parcel.areaOfTheLand : 0;
      });
      setAreaOfTheLandThree(areaThree.toString());
    }
  }, [property, setAreaOfTheLandThree, setAreaOfTheLandTwo, setAreaOfTheLandOne]);

  return (
    <Card title="Flächenangaben">
      <div className="p-3 flex flex-col space-y-1">
        <div>
          <p className="font-medium">{"Fläche 1"}</p>
          <div className="flex flex-row space-x-1">
            <Input
              nonEditable
              valueState={areaOfTheLandOneState}
              errorState={areaOfTheLandOneErrorState}
              isCorrectState={areaOfTheLandOneIsCorrectState}
              title={
                <p>
                  {"Fläche in m"}
                  <sup>{"2"}</sup>
                </p>
              }
            />
            <Input
              valueState={areaOfTheLandValueOneState}
              errorState={areaOfTheLandValueOneErrorState}
              isCorrectState={areaOfTheLandValueOneIsCorrectState}
              title={"Bodenrichtwert in €"}
              allowedCharsRegExp={/[^0-9]/g}
              placeholder={"280"}
            />
          </div>
        </div>
        <div>
          <p className="font-medium">{"Fläche 2"}</p>
          <div className="flex flex-row space-x-1">
            <Input
              nonEditable
              valueState={areaOfTheLandTwoState}
              errorState={areaOfTheLandTwoErrorState}
              isCorrectState={areaOfTheLandTwoIsCorrectState}
              title={
                <p>
                  {"Fläche in m"}
                  <sup>{"2"}</sup>
                </p>
              }
            />
            <Input
              valueState={areaOfTheLandValueTwoState}
              errorState={areaOfTheLandValueTwoErrorState}
              isCorrectState={areaOfTheLandValueTwoIsCorrectState}
              title={"Bodenrichtwert in €"}
              allowedCharsRegExp={/[^0-9]/g}
              placeholder={"15"}
            />
          </div>
        </div>
        {/*   <div>
          <p className="font-medium">{"Fläche 3"}</p>
          <div className="flex flex-row space-x-1">
            <Input
              disabled
              valueState={areaOfTheLandThreeState}
              errorState={areaOfTheLandThreeErrorState}
              isCorrectState={areaOfTheLandThreeIsCorrectState}
              title={
                <p>
                  {"Fläche in m"}
                  <sup>{"2"}</sup>
                </p>
              }
            />
            <Input
              valueState={areaOfTheLandValueThreeState}
              errorState={areaOfTheLandValueThreeErrorState}
              isCorrectState={areaOfTheLandValueThreeIsCorrectState}
              title={"Bodenrichtwert in €"}
              allowedCharsRegExp={/[^0-9]/g}
              placeholder={"20"}
            />
          </div>
        </div> */}
      </div>
    </Card>
  );
}

export default AreaOfTheLandMask;
