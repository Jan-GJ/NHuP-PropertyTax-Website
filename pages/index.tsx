import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Undeveloped from "../components/Undeveloped";
import Button from "../components/Button";
import Built from "../components/Built";
import Input from "../components/Input";
import { federalStates, ZipApiResponse } from "../types/global";
import { EconomicEntities, Property } from "../types/property";
import { propertyState } from "../Atoms";
import { read, writeFile, utils } from "xlsx";

const Home: NextPage = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

  const plzIsCorrectState = useState<boolean>(false);
  const [plzIsCorrect, setPlzIsCorrect] = plzIsCorrectState;
  const plzErrorState = useState<string>("");
  const [plzError, setPlzError] = plzErrorState;
  const plzState = useState<string>("");
  const [plz, setPlz] = plzState;
  const [plzLoading, setPlzLoading] = useState<boolean>(false);

  const federalStateTextState = useState<string>("");
  const [federalStateText, setFederalStateText] = federalStateTextState;
  const federalIsCorrectState = useState<boolean>(false);
  const [federalIsCorrect, setFederalIsCorrect] = federalIsCorrectState;
  const federalErrorState = useState<string>("");

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
  const [nameIsCorrect, setNameIsCorrect] = nameIsCorrectState;
  const [nameError, setNameError] = nameErrorState;

  const referenceState = useState<string>("");
  const [reference, setReference] = referenceState;

  const referenceErrorState = useState<string>("");
  const referenceIsCorrectState = useState<boolean>(false);

  const [typeOfEconomicEntity, setTypeOfEconomicEntity] = useState<EconomicEntities>(EconomicEntities.none);

  const [canSelectTypeOfEconomicEntity, setCanSelectTypeOfEconomicEntity] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);

  useEffect(() => {
    setProperty({
      name: name,
      economicEntityType: typeOfEconomicEntity,
      federalStateUid: federalState,
      zip: plz,
      street: street,
      houseNumber: houseNumber,
      city: city,
      community: city,
      reference: reference,
    });
  }, [name, typeOfEconomicEntity, federalState, plz, street, houseNumber, city, setProperty, reference]);

  useEffect(() => {
    const index = federalStates.indexOf(federalStateText);
    setFederalState(index);
  }, [federalStateText]);

  useEffect(() => {
    setName(
      `${street.length > 0 && houseNumber.length > 0 ? street + " " : street}${houseNumber}${
        (street.length > 0 || houseNumber.length > 0) && (plz.length > 0 || city.length > 0) ? "," : ""
      }${plz.length > 0 ? plz + " " : ""}${city}`
    );
  }, [city, plz, street, houseNumber, setName]);

  useEffect(() => {
    if (plz.length == 5) {
      const xhr = new XMLHttpRequest();
      setPlzLoading(true);
      xhr.open("GET", `https://api.zippopotam.us/de/${plz}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          setPlzLoading(false);
          const rawResponseObject = JSON.parse(xhr.responseText);
          if (rawResponseObject.country) {
            const response: ZipApiResponse = {
              city: rawResponseObject.places[0]["place name"],
              state: rawResponseObject.places[0].state,
              zip: rawResponseObject["post code"],
            };
            if (federalStateText.length === 0) {
              setFederalStateText(response.state);
              setFederalIsCorrect(true);
            }
            if (city.length === 0) {
              setCity(response.city);
              setCityIsCorrect(true);
            }
            setPlzIsCorrect(true);
          } else {
            setPlzError(`Die PLZ ${plz} existiert nicht.`);
          }
        }
      };
      xhr.send();
    }
  }, [plz, setPlzLoading, setPlzError, setPlzIsCorrect, setCityIsCorrect, setCommunityIsCorrect, setFederalIsCorrect, setCommunity, setFederalStateText, setCity]);

  useEffect(() => {
    if (federalState !== -1 && name.length > 0) {
      setCanSelectTypeOfEconomicEntity(true);
    } else {
      setCanSelectTypeOfEconomicEntity(false);
    }
  }, [name, federalState]);
  return (
    <div>
      <Head>
        <title>Grundsteuer - NAUSTH HUNECKE</title>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen space-y-2 p-2 ">
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <div
              onClick={() => {
                window.open("https://nhup.de/", "_blank");
              }}
              className="p-2 cursor-pointer"
            >
              <Image alt="nh-logo-bannner" src="/nh-logo-banner.svg" height={64} width={230} />
            </div>
            <div
              onClick={() => {
                window.open("https://grundsteuer-digital.de/", "_blank");
              }}
              className="p-2 cursor-pointer"
            >
              <Image alt="gd-logo-banner" src="/gd-logo-banner.svg" height={64} width={230} />
            </div>
          </div>
        </div>
        <div className="flex-col space-y-4 justify-center items-center flex">
          <div className="flex-row">
            <div className="flex space-x-1">
              <Input
                errorState={federalErrorState}
                isCorrectState={federalIsCorrectState}
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
            <div className="flex space-x-1">
              <Input
                placeholder="Parkstraße"
                errorState={streetErrorState}
                isCorrectState={streetIsCorrectState}
                title="Straße"
                maxLength={25}
                valueState={streetState}
                allowedCharsRegExp={/[^A-Za-zäöü-]/g}
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
                isCorrectState={plzIsCorrectState}
                errorState={plzErrorState}
                loading={plzLoading}
                valueState={plzState}
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
              <Input
                title="Gemeinde / Kreis"
                placeholder="Lüdenscheid, Stadt"
                valueState={communityState}
                allowedCharsRegExp={/[^A-Za-zäöü-]/g}
                isCorrectState={communityIsCorrectState}
                errorState={communityErrorState}
              />
            </div>
            <div className="flex space-x-1 justify-center">
              <Input
                width="min-w-[400px]"
                errorState={nameErrorState}
                isCorrectState={nameIsCorrectState}
                valueState={nameState}
                title="Bezeichnung"
                placeholder="Parkstraße 2,58509 Lüdenscheid"
                required
              />
            </div>
          </div>
          {canSelectTypeOfEconomicEntity ? (
            <div className="flex space-x-1">
              <Button
                name={"Unbebaut"}
                disabled={typeOfEconomicEntity === EconomicEntities.undeveloped}
                onClick={() => {
                  setTypeOfEconomicEntity(EconomicEntities.undeveloped);
                  setProperty({ ...property, economicEntityType: EconomicEntities.undeveloped });
                  //TODO: reset every value for the other two types
                }}
              />
              <Button
                name={"Land und Forstwirtschaft"}
                disabled /* ={typeOfEconomicEntity === EconomicEntities.LandAndForestry} */
                onClick={() => {
                  setTypeOfEconomicEntity(EconomicEntities.LandAndForestry);
                  setProperty({ ...property, economicEntityType: EconomicEntities.LandAndForestry });
                  //TODO: reset every value for the other two types
                }}
              />
              <Button
                name={"Bebaut"}
                disabled /* ={typeOfEconomicEntity === EconomicEntities.built} */
                onClick={() => {
                  setTypeOfEconomicEntity(EconomicEntities.built);
                  setProperty({ ...property, economicEntityType: EconomicEntities.built });
                  //TODO: reset every value for the other two types
                }}
              />
            </div>
          ) : null}
          <>
            {typeOfEconomicEntity === EconomicEntities.undeveloped ? (
              <Undeveloped />
            ) : typeOfEconomicEntity === EconomicEntities.built ? (
              <div>
                <Built />
              </div>
            ) : typeOfEconomicEntity === EconomicEntities.LandAndForestry ? (
              <div>
                <h1>{"l und f"}</h1>
              </div>
            ) : null}
          </>
          {property.economicEntityType !== EconomicEntities.none ? (
            <div className="space-y-1 flex flex-col">
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  if (event.target.files) {
                    setSelectedFile(event.target.files[0] ?? "");
                    setIsFilePicked(true);
                  }
                }}
              />
              <Button
                onClick={async () => {
                  if (selectedFile) {
                    const data = await selectedFile.arrayBuffer();
                    const preRegistrationWorkbook = read(data);

                    const economicEntitySheet = preRegistrationWorkbook.Sheets["Wirtschaftliche Einheit"];

                    utils.sheet_add_aoa(economicEntitySheet, [[property.reference]], { origin: "B7" });
                    utils.sheet_add_aoa(
                      economicEntitySheet,
                      [
                        [
                          property.economicEntityType === EconomicEntities.LandAndForestry
                            ? "3 [Betrieb der Land- und Forstwirtschaft]"
                            : property.economicEntityType === EconomicEntities.built
                            ? "2 [bebautes Grundstück]"
                            : "1 [unbebautes Grundstück]",
                        ],
                      ],
                      { origin: "D7" }
                    );
                    utils.sheet_add_aoa(economicEntitySheet, [[federalStates[property.federalStateUid]]], { origin: "E7" });
                    utils.sheet_add_aoa(economicEntitySheet, [[property.city]], { origin: "F7" });
                    utils.sheet_add_aoa(economicEntitySheet, [[property.zip]], { origin: "G7" });
                    utils.sheet_add_aoa(economicEntitySheet, [[property.street]], { origin: "H7" });
                    utils.sheet_add_aoa(economicEntitySheet, [[property.houseNumber]], { origin: "I7" });

                    const filledPreRegistrationWorkbook = utils.book_new();
                    utils.book_append_sheet(filledPreRegistrationWorkbook, economicEntitySheet, "Wirtschaftliche Einheit");
                    const exportData = writeFile(filledPreRegistrationWorkbook, "out.xlsx");
                  }
                }}
                name="Vorerfassungsbogen herunterladen"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;