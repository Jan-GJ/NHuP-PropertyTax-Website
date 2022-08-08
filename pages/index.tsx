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
import ParcelElement from "../components/ui/ParcelElement";

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
            {/*  <Summary /> */}
          </div>
          {/* Download filled preRegistrationForm button */}
          {property.parcels ? (
            property.parcels.length > 0 ? (
              <div className="">
                <h1 className="font-medium">{"Flurstücke:"}</h1>
                <div className="p-2 overflow-y-auto max-h-[400px]">
                  <table className="min-w-full shadow-md rounded">
                    <thead>
                      <tr>
                        <th>{"Gemeinde / Kreis"}</th>
                        <th>{"Gemarkung"}</th>
                        <th>{"Flur"}</th>
                        <th>{"Grundbuchblatt"}</th>
                        <th>
                          <p>
                            {"Fläche in m"}
                            <sup>{"2"}</sup>
                          </p>
                        </th>
                        <th>{"Flurstück Zähler"}</th>
                        <th>{"Flurstück Nenner"}</th>
                        <th>{"Zur W.E. geh. Anteil: Zähler"}</th>
                        <th>{"Zur W.E. geh. Anteil: Nenner"}</th>
                        <th>{"Enthalten in welcher Fläche"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {property.parcels.map((parcel, index) => (
                        <ParcelElement key={index} parcel={parcel} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null
          ) : null}
          {property.economicEntityType !== EconomicEntities.none ? (
            <div className="pb-2">
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
