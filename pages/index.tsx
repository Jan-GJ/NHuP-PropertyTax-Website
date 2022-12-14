import { useRecoilValue } from "recoil";
import type { NextPage } from "next";
import { writeFile } from "xlsx";
import { useState } from "react";
import Head from "next/head";

import { EconomicEntities, Property } from "../types/property";

import { propertyState } from "../Atoms";

import { getfilledPreRegistrationWorkbook, getPreRegistrationWorkbook } from "../Utils";

import TypeOfEconomicPropertyMask from "../components/cards/TypeOfEconomicEntityMask";
import PropertyDetailsMask from "../components/cards/PropertyDetailsMask";
import AreaOfTheLandMask from "../components/cards/AreaOfTheLandMask";
import ParcelsMask from "../components/cards/ParcelsMask";
import Summary from "../components/cards/Summary";

import ParcelElement from "../components/ui/ParcelElement";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";

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
      <div className="p-2">
        <Header />
        <div className="px-2 flex-col space-y-1">
          <div className="flex space-x-1">
            <TypeOfEconomicPropertyMask />
            {property.economicEntityType !== EconomicEntities.none ? <PropertyDetailsMask /> : null}
            <div className="flex flex-col space-y-1">
              {property.economicEntityType !== EconomicEntities.none ? <AreaOfTheLandMask /> : null}
              {property.economicEntityType !== EconomicEntities.none ? <ParcelsMask /> : null}
            </div>
          </div>
          {property.parcels ? (
            property.parcels.length > 0 ? (
              <div className="bg-slate-300 rounded p-2 border-t-[5px] border-slate-600">
                <h1 className="font-medium pb-2">{"Flurst??cke:"}</h1>
                <div className="p-2 overflow-y-auto max-h-[400px]">
                  <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                      <tr>
                        <th>{"Gemeinde"}</th>
                        <th>{"Gemarkung"}</th>
                        <th>{"Flur"}</th>
                        <th>{"Grundbuchblatt"}</th>
                        <th>
                          <p>
                            {"Fl??che in m"}
                            <sup>{"2"}</sup>
                          </p>
                        </th>
                        <th>{"Flurst??ck Z??hler"}</th>
                        <th>{"Flurst??ck Nenner"}</th>
                        <th>{"Zur W.E. geh. Anteil: Z??hler"}</th>
                        <th>{"Zur W.E. geh. Anteil: Nenner"}</th>
                        <th>{"Enthalten in welcher Fl??che"}</th>
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
          {/*   <div className="flex justify-center">
            <Summary />
          </div> */}
          {property.economicEntityType !== EconomicEntities.none ? (
            <div className="py-2">
              {/* Download filled preRegistrationForm button */}
              <Button
                onClick={() => {
                  setPreRegistrationFormLoading(true);
                  getPreRegistrationWorkbook(property.federalStateUid, (preRegistrationWorkbook: any) => {
                    if (preRegistrationWorkbook) {
                      const filledPreRegistrationWorkbook = getfilledPreRegistrationWorkbook(preRegistrationWorkbook, property);
                      writeFile(filledPreRegistrationWorkbook, `Ausgef??llter Vorerfassungsbogen f??r die Wirtschaftliche Einheit ${property.name}.xlsx`);
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
