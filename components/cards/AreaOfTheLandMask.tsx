import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { propertyState } from "../../Atoms";
import { Property } from "../../types/property";
import Card from "../layout/Card";
import Input from "../ui/Input";

function AreaOfTheLandMask() {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

  const areaOfTheLandOneState = useState<String>("");
  const [areaOfTheLandOne, setAreaOfTheLandOne] = areaOfTheLandOneState;
  const areaOfTheLandOneErrorState = useState<String>("");
  const areaOfTheLandOneIsCorrectState = useState<String>("");

  const areaOfTheLandValueOneState = useState<String>("");
  const areaOfTheLandValueOneErrorState = useState<String>("");
  const areaOfTheLandValueOneIsCorrectState = useState<String>("");

  const areaOfTheLandTwoState = useState<String>("");
  const [areaOfTheLandTwo, setAreaOfTheLandTwo] = areaOfTheLandTwoState;

  const areaOfTheLandTwoErrorState = useState<String>("");
  const areaOfTheLandTwoIsCorrectState = useState<String>("");

  const areaOfTheLandValueTwoState = useState<String>("");
  const areaOfTheLandValueTwoErrorState = useState<String>("");
  const areaOfTheLandValueTwoIsCorrectState = useState<String>("");

  const areaOfTheLandThreeState = useState<String>("");
  const [areaOfTheLandThree, setAreaOfTheLandThree] = areaOfTheLandThreeState;

  const areaOfTheLandThreeErrorState = useState<String>("");
  const areaOfTheLandThreeIsCorrectState = useState<String>("");

  const areaOfTheLandValueThreeState = useState<String>("");
  const areaOfTheLandValueThreeErrorState = useState<String>("");
  const areaOfTheLandValueThreeIsCorrectState = useState<String>("");

  useEffect(() => {
    //set property areaofLandhere herer
  }, [setProperty]);

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
  }, [property]);

  return (
    <Card title="Flächenangaben">
      <div className="p-3 flex flex-col space-y-1">
        <div>
          <p className="font-medium">{"Fläche 1"}</p>
          <div className="flex flex-row space-x-1">
            <Input
              disabled
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
            />
          </div>
        </div>
        <div>
          <p className="font-medium">{"Fläche 2"}</p>
          <div className="flex flex-row space-x-1">
            <Input
              disabled
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
            />
          </div>
        </div>
        <div>
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
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AreaOfTheLandMask;
