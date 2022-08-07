import { useRecoilValue } from "recoil";
import type { NextPage } from "next";
import { writeFile } from "xlsx";
import { useState } from "react";
import Head from "next/head";

import { EconomicEntities, Property } from "../types/property";

import { propertyState } from "../Atoms";

import { getfilledPreRegistrationWorkbook, getPreRegistrationWorkbook } from "../Utils";
import TypeOfEconomicPropertyMask from "../components/cards/TypeOfEconomicEntityMask";
import ParcelsMask from "../components/cards/ParcelsMask";
import Summary from "../components/cards/Summary";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import PropertyDetailsMask from "../components/cards/PropertyDetailsMask";
import AreaOfTheLandMask from "../components/cards/AreaOfTheLandMask";

//TODO: add maxLength from api website to each input

const Home: NextPage = () => {
  const property = useRecoilValue<Property>(propertyState);
  const [preRegistrationFormLoading, setPreRegistrationFormLoading] = useState<boolean>(false);
  return (
    <div>
      <Head>
        <title>{"Grundsteuer - NAUSTH HUNECKE"}</title>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <div className="px-2 flex-col">
          <div className="flex space-x-2">
            <TypeOfEconomicPropertyMask />
            {property.economicEntityType !== EconomicEntities.none ? <PropertyDetailsMask /> : null}
            {property.economicEntityType !== EconomicEntities.none ? <AreaOfTheLandMask /> : null}
            {property.economicEntityType !== EconomicEntities.none ? <ParcelsMask /> : null}
            <Summary />
          </div>
          {/* Download filled preRegistrationForm button */}
          {property.economicEntityType !== EconomicEntities.none ? (
            <Button
              onClick={() => {
                setPreRegistrationFormLoading(true);
                getPreRegistrationWorkbook(property.federalStateUid, (preRegistrationWorkbook: any) => {
                  if (preRegistrationWorkbook) {
                    const filledPreRegistrationWorkbook = getfilledPreRegistrationWorkbook(preRegistrationWorkbook, property);
                    writeFile(filledPreRegistrationWorkbook, `Ausgefüllter Vorerfassungsbogen für die Wirtschaftliche Einheit ${property.name}.xlsx`);
                    setPreRegistrationFormLoading(false);
                  } else {
                    setPreRegistrationFormLoading(false);
                  }
                });
              }}
              name="Vorerfassungsbogen herunterladen"
              loading={preRegistrationFormLoading}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
