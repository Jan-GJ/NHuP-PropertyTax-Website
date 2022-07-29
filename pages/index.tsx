import { writeFile, utils, WorkBook } from "xlsx";
import { useRecoilState } from "recoil";
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";

import { EconomicEntities, Property, federalStates } from "../types/property";

import { propertyState } from "../Atoms";

import TypeOfEconomicPropertyMask from "../components/cards/TypeOfEconomicEntityMask";
import Summary from "../components/cards/Summary";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import { getfilledPreRegistrationWorkbook, getPreRegistrationWorkbook } from "../Utils";

const Home: NextPage = () => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);

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
        {/* Create Entity/Property */}
        <div className="px-2">
          <div className="flex space-x-2">
            <TypeOfEconomicPropertyMask />
            <Summary />
          </div>
          {property.economicEntityType !== EconomicEntities.none ? (
            <div className="flex justify-end">
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
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
