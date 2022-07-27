import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { propertyState } from "../Atoms";
import { Parcel, ParcelData, Property } from "../types/property";
import Button from "./Button";
import Input from "./Input";

const Built = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

  const [parcels, setParcels] = useState<Parcel[]>([]);

  const corrridorState = useState<string>("");
  const [corridor, setCorridor] = corrridorState;
  const corridorErrorState = useState<boolean>(false);
  const corridorIsCorrectState = useState<boolean>(false);

  const parcelsStringState = useState<string>("");
  const [parcelsString, setParcelsString] = parcelsStringState;
  const parcelsStringErrorState = useState<boolean>(false);
  const parcelsStringIsCorrectState = useState<boolean>(false);

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex-row flex space-x-1">
        {/* grundstücksfläche soll aus den flurstücken erstellt werden */}
        {/*    <Input
          title={
            <p>
              Grundstücksfläche in m<sup>2</sup>
            </p>
          }
        />
        <Input title="Bodenrichtwert in €" /> */}
      </div>
      <div className="flex-row flex space-x-1">
        <Input errorState={corridorErrorState} isCorrectState={corridorIsCorrectState} title={"Flur"} valueState={corrridorState} allowedCharsRegExp={/[^0-9]/g} />
        <Input
          errorState={parcelsStringErrorState}
          isCorrectState={parcelsStringIsCorrectState}
          title="Flurstücke"
          valueState={parcelsStringState}
          allowedCharsRegExp={/[^0-9/,-]/g}
        />
      </div>
      <Button
        name="Flurstücke erstellen"
        onClick={() => {
          const newParcels: Parcel[] = [];
          const parcelStrings: string[] = parcelsString.split(",");
          parcelStrings.forEach((parcelString) => {
            const parcel: Parcel = { community: property.community, parcelData: { counter: parseInt(parcelString), denominator: 0 } as ParcelData, corridor: parseInt(corridor) };
            newParcels.push(parcel);
          });
          setParcels(newParcels);
        }}
      />
      {parcels.length > 0 ? (
        <div className="space-y-1">
          <h1>{"Flurstücke"}</h1>
          {parcels.map((parcel, index) => (
            <div
              className="p-1 bg-gray-500"
              key={index}
            >{`Gemeinde: ${parcel.community} Flur: ${parcel.corridor} Flurstück ${parcel.parcelData.counter}/${parcel.parcelData.denominator} `}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Built;
