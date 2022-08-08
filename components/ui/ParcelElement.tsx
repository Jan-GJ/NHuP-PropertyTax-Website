import { useRecoilState } from "recoil";
import { propertyState } from "../../Atoms";
import { Parcel, Property } from "../../types/property";
import Button from "./Button";

const ParcelElement = ({ parcel }: { parcel: Parcel }) => {
  const [property, setProperty] = useRecoilState<Property>(propertyState);
  let indexToRemove = -1;
  if (property.parcels) {
    indexToRemove = property.parcels.indexOf(parcel);
  }

  return (
    <tr>
      <td className="p-4 text-center">{parcel.community}</td>
      <td className="p-4 text-center">{parcel.parcel}</td>
      <td className="p-4 text-center">{parcel.corridor}</td>
      <td className="p-4 text-center">{parcel.landRegisterSheet}</td>
      <td className="p-4 text-center">{parcel.areaOfTheLand}</td>
      <td className="p-4 text-center">{parcel.parcelData.counter}</td>
      <td className="p-4 text-center">{parcel.parcelData.denominator}</td>
      <td className="p-4 text-center">{parcel.shareOfOwnership?.counter}</td>
      <td className="p-4 text-center">{parcel.shareOfOwnership?.denominator}</td>
      <td className="p-4 text-center">{parcel.containedInArea}</td>
      <td className="py-4 px-1">
        <Button
          name="Duplizieren"
          onClick={() => {
            const oldParcels = property.parcels ? property.parcels : ([] as Parcel[]);
            const newParcels = [...oldParcels, parcel];
            setProperty({ ...property, parcels: newParcels });
          }}
        />
      </td>
      <td className="py-4 px-1">
        <Button
          onClick={() => {
            if (indexToRemove !== -1) {
              const oldParcels = property.parcels ? property.parcels : ([] as Parcel[]);
              const newParcels = oldParcels.filter((value, index) => index !== indexToRemove);
              setProperty({ ...property, parcels: newParcels });
            }
          }}
          name="Löschen"
        />
      </td>
    </tr>
  );
};

export default ParcelElement;
