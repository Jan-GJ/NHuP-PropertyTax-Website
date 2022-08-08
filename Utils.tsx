import { read, utils, WorkBook } from "xlsx";
import { preRegistrationWorkbooks, ZipApiResponse } from "./types/global";
import { EconomicEntities, federalStates, Property } from "./types/property";

export const getZipInfo = (zip: string, callback: Function) => {
  const getRequest = new XMLHttpRequest();
  getRequest.open("GET", `https://api.zippopotam.us/de/${zip}`);
  getRequest.onreadystatechange = () => {
    if (getRequest.readyState === 4) {
      let zipInfo = JSON.parse(getRequest.responseText);
      if (zipInfo.country) {
        zipInfo = {
          city: zipInfo.places[0]["place name"],
          state: zipInfo.places[0].state,
          zip: zipInfo["post code"],
        } as ZipApiResponse;
        callback(zipInfo);
      } else {
        callback(false);
      }
    }
  };
  getRequest.send();
};

export const getPreRegistrationWorkbook = (federalStateUid: number, callback: Function) => {
  const preRegistrationWorkbook = preRegistrationWorkbooks.find((preRegistrationWorkbook) => preRegistrationWorkbook.name === federalStates[federalStateUid])
    ? preRegistrationWorkbooks.find((preRegistrationWorkbook) => preRegistrationWorkbook.name === federalStates[federalStateUid])
    : preRegistrationWorkbooks[0];
  if (preRegistrationWorkbook) {
    var getRequest = new XMLHttpRequest();
    getRequest.open("GET", preRegistrationWorkbook.url, true);
    getRequest.responseType = "arraybuffer";
    getRequest.onload = function (e) {
      const data = new Uint8Array(getRequest.response);
      const preRegistrationWorkbook = read(data, { type: "array" });
      callback(preRegistrationWorkbook);
    };
    getRequest.send();
  } else {
    callback(false);
  }
};

export const getfilledPreRegistrationWorkbook = (workbook: WorkBook, property: Property) => {
  console.log(property);
  const economicEntitySheet = workbook.Sheets["Wirtschaftliche Einheit"];
  const areaOfTheLandSheet = workbook.Sheets["Grundstück"];
  const parcelsSheet = workbook.Sheets["Gemarkung und Flurstück"];

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
  utils.sheet_add_aoa(economicEntitySheet, [[property.ownershipStructure === 0 ? "0 [Alleineigentum einer natürlichen Person]" : "Not finished"]], { origin: "K7" });

  utils.sheet_add_aoa(areaOfTheLandSheet, [[property.propertyType ? property.propertyType /*  TODO: add other like above */ : "0 [unbebautes Grundstück]"]], {
    origin: "B7",
  });
  if (property.areaOfTheLand) {
    utils.sheet_add_aoa(areaOfTheLandSheet, [[property.areaOfTheLand[0].areaOfTheLand]], {
      origin: "C7",
    });
    utils.sheet_add_aoa(areaOfTheLandSheet, [[property.areaOfTheLand[0].areaOfTheLandValue]], {
      origin: "D7",
    });

    utils.sheet_add_aoa(areaOfTheLandSheet, [[property.areaOfTheLand[1].areaOfTheLand]], {
      origin: "E7",
    });
    utils.sheet_add_aoa(areaOfTheLandSheet, [[property.areaOfTheLand[1].areaOfTheLandValue]], {
      origin: "F7",
    });

    /*    utils.sheet_add_aoa(areaOfTheLandSheet, [[property.areaOfTheLand[0].areaOfTheLand]], {
      origin: "C7",
    });
    utils.sheet_add_aoa(areaOfTheLandSheet, [[property.areaOfTheLand[0].areaOfTheLandValue]], {
      origin: "D7",
    }); */
  }
  if (property.parcels) {
    property.parcels.forEach((parcel, index) => {
      utils.sheet_add_aoa(parcelsSheet, [[parcel.containedInArea]], { origin: `B${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.community]], { origin: `C${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.parcel]], { origin: `D${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.shareOfOwnership]], { origin: `E${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.corridor]], { origin: `F${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.parcelData.counter]], { origin: `G${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.parcelData.denominator]], { origin: `H${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.shareOfOwnership?.counter]], { origin: `I${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.shareOfOwnership?.denominator]], { origin: `J${index + 7}` });
      utils.sheet_add_aoa(parcelsSheet, [[parcel.areaOfTheLand]], { origin: `K${index + 7}` });
    });
  }

  const filledWorkbook = utils.book_new();

  utils.book_append_sheet(filledWorkbook, economicEntitySheet, "Wirtschaftliche Einheit");
  utils.book_append_sheet(filledWorkbook, areaOfTheLandSheet, "Grundstück");
  utils.book_append_sheet(filledWorkbook, parcelsSheet, "Gemarkung und Flurstück");

  return filledWorkbook;
};
