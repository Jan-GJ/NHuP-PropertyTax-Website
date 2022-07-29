import { read, writeFile, utils } from "xlsx";
import { useState } from "react";
import { useRecoilState } from "recoil";
import type { NextPage } from "next";
import Button from "../components/ui/Button";
import Head from "next/head";
import { EconomicEntities, Property, federalStates } from "../types/property";
import { propertyState } from "../Atoms";
import Header from "../components/ui/Header";
import TypeOfEconomicPropertyMask from "../components/cards/TypeOfEconomicEntityMask";
import Summary from "../components/cards/Summary";

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
                  const bundesmodellURL = "https://hilfe.grundsteuer-digital.de/wp-content/uploads/2022/05/Vorerfassungsbogen-Bundesmodell-2.5-1.xlsx";
                  var req = new XMLHttpRequest();
                  req.open("GET", bundesmodellURL, true);
                  req.responseType = "arraybuffer";

                  req.onload = function (e) {
                    /* parse the data when it is received */
                    var data = new Uint8Array(req.response);
                    var preRegistrationWorkbook = read(data, { type: "array" });
                    /* DO SOMETHING WITH workbook HERE */

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
                    setPreRegistrationFormLoading(false);
                  };
                  req.send();
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
