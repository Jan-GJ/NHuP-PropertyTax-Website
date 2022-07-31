import React, { useState } from "react";
import { Parcel } from "../../types/property";
import Card from "../layout/Card";
import Input from "../ui/Input";

export const ParcelsMask = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);

  const corrridorState = useState<string>("");
  const corridorErrorState = useState<boolean>(false);
  const corridorIsCorrectState = useState<boolean>(false);

  const parcelState = useState<string>("");
  const parcelErrorState = useState<string>("");
  const parcelIsCorrectState = useState<string>("");

  const landRegisterSheetState = useState<string>("");
  const landRegisterSheetErrorState = useState<string>("");
  const landRegisterSheetIsCorrectState = useState<string>("");

  const parcelCommunityState = useState<string>("");
  const parcelCommunityErrorState = useState<string>("");
  const parcelCommunityIsCorrect = useState<string>("");

  const areaOfTheLandState = useState<string>("");
  const areaOfTheLandErrorState = useState<string>("");
  const areaOfTheLandIsCorrectState = useState<string>("");

  const parcelCounterState = useState<string>("");
  const parcelCounterErrorState = useState<boolean>(false);
  const parcelCounterIsCorrectState = useState<boolean>(false);

  const parcelDenominatorState = useState<string>("");
  const parcelDenominatorErrorState = useState<boolean>(false);
  const parcelDenominatorIsCorrectState = useState<boolean>(false);

  const parcelShareOfOwnerShipCounterState = useState<string>("");
  const parcelShareOfOwnerShipCounterErrorState = useState<boolean>(false);
  const parcelShareOfOwnerShipCounterIsCorrectState = useState<boolean>(false);

  const parcelShareOfOwnerShipDenominatorState = useState<string>("");
  const parcelShareOfOwnerShipDenominatorErrorState = useState<boolean>(false);
  const parcelShareOfOwnerShipDenominatorIsCorrectState = useState<boolean>(false);

  //TODO: make contained in Area 3 buttons default to button 1 for first area value goes from 1 to 3

  return (
    <Card title="Flurstücke hinzufügen">
      <div className="p-3 space-y-2 flex flex-col">
        <div className="space-x-2 flex">
          <Input errorState={corridorErrorState} isCorrectState={corridorIsCorrectState} title={"Flur"} valueState={corrridorState} allowedCharsRegExp={/[^0-9]/g} />
          <div className="flex flex-col">
            <Input
              errorState={parcelCounterErrorState}
              isCorrectState={parcelCounterIsCorrectState}
              title="Flurstück Zähler"
              valueState={parcelCounterState}
              allowedCharsRegExp={/[^0-9]/g}
            />
            <Input
              errorState={parcelDenominatorErrorState}
              isCorrectState={parcelDenominatorIsCorrectState}
              title="Flurstück Nenner"
              valueState={parcelDenominatorState}
              allowedCharsRegExp={/[^0-9]/g}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ParcelsMask;
