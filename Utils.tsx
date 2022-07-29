import { ZipApiResponse } from "./types/global";

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
