import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import { propertyState } from "../../Atoms";
import { EconomicEntities, Property, federalStates } from "../../types/property";
import { getZipInfo } from "../../Utils";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../layout/Card";

const TypeOfEconomicPropertyMask = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

  const zipIsCorrectState = useState<boolean>(false);
  const [zipIsCorrect, setZipIsCorrect] = zipIsCorrectState;
  const zipErrorState = useState<string>("");
  const [zipError, setZipError] = zipErrorState;
  const zipState = useState<string>("");
  const [zip, setZip] = zipState;
  const [zipLoading, setZipLoading] = useState<boolean>(false);

  const federalStateTextState = useState<string>("");
  const [federalStateText, setFederalStateText] = federalStateTextState;
  const federalStateIsCorrectState = useState<boolean>(false);
  const [federalStateIsCorrect, setFederalStateIsCorrect] = federalStateIsCorrectState;
  const federalStateErrorState = useState<string>("");
  const [federalState, setFederalState] = useState<number>(-1);

  const communityIsCorrectState = useState<boolean>(false);
  const [communityIsCorrect, setCommunityIsCorrect] = communityIsCorrectState;
  const communityState = useState<string>("");
  const [community, setCommunity] = communityState;
  const communityErrorState = useState<string>("");

  const cityState = useState<string>("");
  const [city, setCity] = cityState;
  const cityIsCorrectState = useState<boolean>(false);
  const [cityIsCorrect, setCityIsCorrect] = cityIsCorrectState;
  const cityErrorState = useState<string>("");

  const houseNumberState = useState<string>("");
  const [houseNumber, setHouseNumber] = houseNumberState;
  const houseNumberErrorState = useState<string>("");
  const houseNumberIsCorrectState = useState<boolean>(false);

  const streetState = useState<string>("");
  const [street, setStreet] = streetState;
  const streetErrorState = useState<string>("");
  const streetIsCorrectState = useState<boolean>(false);

  const nameState = useState<string>("");
  const [name, setName] = nameState;
  const nameErrorState = useState<string>("");
  const nameIsCorrectState = useState<boolean>(false);

  const referenceState = useState<string>("");
  const [reference, setReference] = referenceState;
  const referenceErrorState = useState<string>("");
  const referenceIsCorrectState = useState<boolean>(false);

  const [canSelectTypeOfEconomicEntity, setCanSelectTypeOfEconomicEntity] = useState<boolean>(false);
  const [typeOfEconomicEntity, setTypeOfEconomicEntity] = useState<EconomicEntities>(EconomicEntities.none);

  const debouncedUpdateZipInfo = useCallback(
    debounce((zip) => {
      getZipInfo(zip, (zipInfo: any) => {
        setZipLoading(false);
        if (zipInfo) {
          if (federalStateText.length === 0) {
            setFederalStateText(zipInfo.state);
            setFederalStateIsCorrect(true);
          }
          if (city.length === 0) {
            setCity(zipInfo.city);
          }
          setZipIsCorrect(true);
        } else {
          setZipError(`Die PLZ ${zip} existiert nicht.`);
        }
      });
    }, 500),
    [setZipLoading, setFederalStateText, setFederalStateIsCorrect, setCity, setZipIsCorrect, setZipError]
  );

  useEffect(() => {
    if (zip.length > 0) {
      setZipLoading(true);
      debouncedUpdateZipInfo(zip);
    }
  }, [zip, setZipLoading, debouncedUpdateZipInfo]);

  useEffect(() => {
    const index = federalStates.indexOf(federalStateText);
    setFederalState(index);
  }, [federalStateText]);

  useEffect(() => {
    if (federalState !== -1 && name.length > 0) {
      setCanSelectTypeOfEconomicEntity(true);
    } else {
      setCanSelectTypeOfEconomicEntity(false);
      setTypeOfEconomicEntity(EconomicEntities.none);
    }
  }, [name, federalState]);

  useEffect(() => {
    setName(
      `${street.length > 0 && houseNumber.length > 0 ? street + " " : street}${houseNumber}${
        (street.length > 0 || houseNumber.length > 0) && (zip.length > 0 || city.length > 0) ? "," : ""
      }${zip.length > 0 ? zip + " " : ""}${city}`
    );
  }, [city, zip, street, houseNumber, setName]);

  useEffect(() => {
    setProperty({
      name: name,
      economicEntityType: typeOfEconomicEntity,
      federalStateUid: federalState,
      zip: zip,
      street: street,
      houseNumber: houseNumber,
      city: city,
      community: community,
      reference: reference,
    });
  }, [setProperty, name, typeOfEconomicEntity, federalState, zip, street, houseNumber, city, community, reference]);

  return (
    <Card title="Informationen zur Wirtschaftlichen Einheit">
      <div className="p-3 space-y-2 flex flex-col">
        <div className="flex space-x-1">
          <Input
            errorState={federalStateErrorState}
            isCorrectState={federalStateIsCorrectState}
            title="Bundesland"
            placeholder="Nordrhein-Westfalen"
            valueState={federalStateTextState}
            allowedEndResults={federalStates}
            suggestions={federalStates}
            required
            allowedCharsRegExp={/[^A-Za-zäöü-]/g}
          />
          <Input
            errorState={referenceErrorState}
            isCorrectState={referenceIsCorrectState}
            title="Aktenzeichen / EW-AZ"
            maxLength={30}
            placeholder="19912312340010001"
            allowedCharsRegExp={/[^0-9]/g}
            valueState={referenceState}
          />
        </div>
        <div className="flex space-x-1 ">
          <Input
            title="Gemeinde / Kreis"
            placeholder="Lüdenscheid, Stadt"
            valueState={communityState}
            allowedCharsRegExp={/[^A-Za-zäöü -,]/g}
            isCorrectState={communityIsCorrectState}
            errorState={communityErrorState}
          />
        </div>
        <div className="flex space-x-1">
          <Input
            placeholder="Parkstraße"
            errorState={streetErrorState}
            isCorrectState={streetIsCorrectState}
            title="Straße"
            maxLength={25}
            valueState={streetState}
            allowedCharsRegExp={/[^A-Za-zäöü -]/g}
          />
          <Input
            placeholder="2"
            errorState={houseNumberErrorState}
            isCorrectState={houseNumberIsCorrectState}
            title="Hausnummer"
            maxLength={14}
            valueState={houseNumberState}
            allowedCharsRegExp={/[^0-9/-A-Za-z]/g}
          />
        </div>
        <div className="flex space-x-1">
          <Input
            isCorrectState={zipIsCorrectState}
            errorState={zipErrorState}
            loading={zipLoading}
            valueState={zipState}
            allowedCharsRegExp={/[^0-9.]/g}
            title="PLZ"
            placeholder="58509"
            maxLength={5}
          />
          <Input
            title="Ort"
            maxLength={25}
            placeholder="Lüdenscheid"
            isCorrectState={cityIsCorrectState}
            errorState={cityErrorState}
            valueState={cityState}
            allowedCharsRegExp={/[^A-Za-z./-üäö]/g}
          />
        </div>

        <div className="flex space-x-1">
          <Input
            width="min-w-[404px]"
            errorState={nameErrorState}
            isCorrectState={nameIsCorrectState}
            valueState={nameState}
            title="Bezeichnung"
            placeholder="Parkstraße 2,58509 Lüdenscheid"
            required
          />
        </div>
        {canSelectTypeOfEconomicEntity ? (
          <div className="flex soace-x-1 flex-col max-w-[404px] space-y-1">
            <h1>{"Wirtschaftliche Einheit: "}</h1>
            {/* TypeofEconomicEntity Buttons */}
            <Button
              name={"Unbebaut"}
              disabled={typeOfEconomicEntity === EconomicEntities.undeveloped}
              onClick={() => {
                setTypeOfEconomicEntity(EconomicEntities.undeveloped);
                setProperty({ ...property, economicEntityType: EconomicEntities.undeveloped });
                // reset every value for the other two types
              }}
            />

            <Button
              name={"Bebaut"}
              disabled={typeOfEconomicEntity === EconomicEntities.built}
              onClick={() => {
                setTypeOfEconomicEntity(EconomicEntities.built);
                setProperty({ ...property, economicEntityType: EconomicEntities.built });
                //TODO: reset every value for the other two types
              }}
            />
            <Button
              name={"Land und Forstwirtschaft"}
              disabled={typeOfEconomicEntity === EconomicEntities.LandAndForestry}
              onClick={() => {
                setTypeOfEconomicEntity(EconomicEntities.LandAndForestry);
                setProperty({ ...property, economicEntityType: EconomicEntities.LandAndForestry });
                //TODO: reset every value for the other two types
              }}
            />
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default TypeOfEconomicPropertyMask;
