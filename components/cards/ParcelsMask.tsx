import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { propertyState } from "../../Atoms";
import { Parcel, ParcelData, Property, ShareOfOwnership } from "../../types/property";
import Card from "../layout/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

const parcelModeSwitchHeader = (enabledState: any) => {
  const [enabled, setEnabled] = enabledState;
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium">{enabled ? "Komplex" : "Einfach"}</span>
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
          <div
            onClick={() => {
              setEnabled(!enabled);
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"
          />
        </label>
      </div>
    </div>
  );
};

export const ParcelsMask = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

  const corrridorState = useState<string>("");
  const [corridor, setCorridor] = corrridorState;
  const corridorErrorState = useState<boolean>(false);
  const corridorIsCorrectState = useState<boolean>(false);

  const parcelState = useState<string>("");
  const [parcel, setParcel] = parcelState;
  const parcelErrorState = useState<string>("");
  const parcelIsCorrectState = useState<string>("");

  const landRegisterSheetState = useState<string>("");
  const [landRegisterSheet, setLandRegisterSheet] = landRegisterSheetState;
  const landRegisterSheetErrorState = useState<string>("");
  const landRegisterSheetIsCorrectState = useState<string>("");

  const parcelCommunityState = useState<string>(property.community ? property.community : "");
  const [parcelCommunity, setParcelCommunity] = parcelCommunityState;
  const parcelCommunityErrorState = useState<string>("");
  const parcelCommunityIsCorrect = useState<string>("");

  const areaOfTheLandState = useState<string>("");
  const [areaOfTheLand, setAreaOfTheLand] = areaOfTheLandState;
  const areaOfTheLandErrorState = useState<string>("");
  const areaOfTheLandIsCorrectState = useState<string>("");

  const parcelsStringState = useState<string>("");
  const [parcelsString, setParcelsString] = parcelsStringState;
  const parcelsStringErrorState = useState<boolean>(false);
  const parcelsStringIsCorrectState = useState<boolean>(false);

  const parcelCounterState = useState<string>("");
  const [parcelCounter, setParcelCounter] = parcelCounterState;
  const parcelCounterErrorState = useState<boolean>(false);
  const parcelCounterIsCorrectState = useState<boolean>(false);

  const parcelDenominatorState = useState<string>("");
  const [parcelDenominator, setParcelDenominator] = parcelDenominatorState;
  const parcelDenominatorErrorState = useState<boolean>(false);
  const parcelDenominatorIsCorrectState = useState<boolean>(false);

  const parcelShareOfOwnerShipCounterState = useState<string>("");
  const [parcelShareOfOwnerShipCounter, setParcelShareOfOwnerShipCounter] = parcelShareOfOwnerShipCounterState;
  const parcelShareOfOwnerShipCounterErrorState = useState<boolean>(false);
  const parcelShareOfOwnerShipCounterIsCorrectState = useState<boolean>(false);

  const parcelShareOfOwnerShipDenominatorState = useState<string>("");
  const [parcelShareOfOwnerShipDenominator, setParcelShareOfOwnerShipDenominator] = parcelShareOfOwnerShipDenominatorState;
  const parcelShareOfOwnerShipDenominatorErrorState = useState<boolean>(false);
  const parcelShareOfOwnerShipDenominatorIsCorrectState = useState<boolean>(false);

  const [containedInArea, setContainedInArea] = useState<number>(1);

  const enabledState = useState<boolean>(false);
  const [complex, setComplex] = enabledState;
  //TODO: add another switch with option to keep values so you dont have to retype then again

  return (
    <Card title="Flurstücke hinzufügen" headerRight={parcelModeSwitchHeader(enabledState)}>
      <div className="p-3 space-y-2 flex flex-col">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2">
            <Input
              errorState={parcelCommunityErrorState}
              isCorrectState={parcelCommunityIsCorrect}
              title="Gemeinde / Kreis"
              valueState={parcelCommunityState}
              allowedCharsRegExp={/[^A-Za-zäöü -,]/g}
              placeholder="Lüdenscheid, Stadt"
            />
            <Input
              errorState={parcelErrorState}
              isCorrectState={parcelIsCorrectState}
              title="Gemarkung"
              valueState={parcelState}
              allowedCharsRegExp={/[^A-Za-zäöü -,]/g}
              placeholder="Lüdenscheid-Stadt"
            />
          </div>
          <div className="flex flex-row space-x-2">
            <Input
              errorState={corridorErrorState}
              isCorrectState={corridorIsCorrectState}
              title={"Flur"}
              valueState={corrridorState}
              allowedCharsRegExp={/[^0-9]/g}
              placeholder={"1"}
            />
            <Input
              errorState={landRegisterSheetErrorState}
              isCorrectState={landRegisterSheetIsCorrectState}
              title={"Grundbuchblatt"}
              valueState={landRegisterSheetState}
              allowedCharsRegExp={/[^0-9A-Za-z]/g}
              placeholder={"52124"}
            />
          </div>
          <Input
            errorState={areaOfTheLandErrorState}
            isCorrectState={areaOfTheLandIsCorrectState}
            title={
              <p>
                {"Fläche in m"}
                <sup>{"2"}</sup>
              </p>
            }
            valueState={areaOfTheLandState}
            allowedCharsRegExp={/[^0-9]/g}
            placeholder={"250"}
          />
          {!complex ? (
            <div className="flex flex-row space-x-2">
              <div className="flex space-x-2">
                <Input
                  errorState={parcelCounterErrorState}
                  isCorrectState={parcelCounterIsCorrectState}
                  title="Flurstück: Zähler"
                  valueState={parcelCounterState}
                  allowedCharsRegExp={/[^0-9]/g}
                  placeholder={"10"}
                />
                <Input
                  errorState={parcelDenominatorErrorState}
                  isCorrectState={parcelDenominatorIsCorrectState}
                  title="Flurstück: Nenner"
                  valueState={parcelDenominatorState}
                  allowedCharsRegExp={/[^0-9]/g}
                  placeholder={"5"}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-row space-x-2">
              <div className="flex flex-col">
                <Input
                  errorState={parcelsStringErrorState}
                  isCorrectState={parcelsStringIsCorrectState}
                  title="Flurstücke"
                  valueState={parcelsStringState}
                  allowedCharsRegExp={/[^0-9,-/]/g}
                  placeholder={"10/5,10/6,10-20"}
                />
              </div>
            </div>
          )}

          <div className="flex flex-row space-x-2">
            <Input
              errorState={parcelShareOfOwnerShipCounterErrorState}
              isCorrectState={parcelShareOfOwnerShipCounterIsCorrectState}
              title={"Zur W.E. geh. Anteil: Zähler"}
              valueState={parcelShareOfOwnerShipCounterState}
              allowedCharsRegExp={/[^0-9]/g}
              placeholder={"50"}
            />
            <Input
              errorState={parcelShareOfOwnerShipDenominatorErrorState}
              isCorrectState={parcelShareOfOwnerShipDenominatorIsCorrectState}
              title={"Zur W.E. geh. Anteil: Nenner"}
              valueState={parcelShareOfOwnerShipDenominatorState}
              allowedCharsRegExp={/[^0-9]/g}
              placeholder="100"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <h1>{"Enthalten in welcher Fläche?"}</h1>
          <div className="flex flex-col w-[201px] space-y-1">
            <Button
              name={`Fläche 1 ${property.areaOfTheLand ? `(${property.areaOfTheLand[0].areaOfTheLandValue}€ pro qm)` : ""}`}
              disabled={containedInArea === 1}
              onClick={() => {
                setContainedInArea(1);
              }}
            />
            <Button
              name={`Fläche 2 ${property.areaOfTheLand ? `(${property.areaOfTheLand[1].areaOfTheLandValue}€ pro qm)` : ""}`}
              disabled={containedInArea === 2}
              onClick={() => {
                setContainedInArea(2);
              }}
            />
            <Button
              name={`Fläche 3 ${property.areaOfTheLand ? `(${property.areaOfTheLand[2].areaOfTheLandValue}€ pro qm)` : ""}`}
              disabled={containedInArea === 3}
              onClick={() => {
                setContainedInArea(3);
              }}
            />
          </div>
        </div>
        <Button
          name="Hinzufügen"
          onClick={() => {
            if (!complex) {
              //Simple
              const newParcel = {
                community: parcelCommunity,
                parcel: parcel,
                landRegisterSheet: parseInt(landRegisterSheet) ? parseInt(landRegisterSheet) : 0,
                corridor: parseInt(corridor) ? parseInt(corridor) : 0,
                parcelData: {
                  counter: parseInt(parcelCounter) ? parseInt(parcelCounter) : 0,
                  denominator: parseInt(parcelDenominator) ? parseInt(parcelDenominator) : 0,
                } as ParcelData,
                areaOfTheLand: parseInt(areaOfTheLand) ? parseInt(areaOfTheLand) : 0,
                shareOfOwnership: {
                  counter: parseInt(parcelShareOfOwnerShipCounter) ? parseInt(parcelShareOfOwnerShipCounter) : 0,
                  denominator: parseInt(parcelShareOfOwnerShipDenominator) ? parseInt(parcelShareOfOwnerShipDenominator) : 0,
                } as ShareOfOwnership,
                containedInArea: containedInArea,
              } as Parcel;
              //TODO: add another switch with option to keep values so you dont have to retype then again
              const oldParcels = property.parcels ? property.parcels : ([] as Parcel[]);
              const newParcels = [...oldParcels, newParcel];
              setProperty({ ...property, parcels: newParcels });
              setParcelCommunity("");
              setParcel("");
              setLandRegisterSheet("");
              setCorridor("");
              setParcelCounter("");
              setParcelDenominator("");
              setAreaOfTheLand("");
              setParcelShareOfOwnerShipCounter("");
              setParcelShareOfOwnerShipDenominator("");
              setContainedInArea(1);
            } else {
              //complex
            }
          }}
        />
      </div>
    </Card>
  );
};

export default ParcelsMask;
