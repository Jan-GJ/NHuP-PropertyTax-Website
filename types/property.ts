export interface DeviatingOwner {
  salutation: string;
  title: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postbox: string;
  zip: string;
  city: string;
  countryUid: number;
  vatId: number;
  taxIdentificationNumber: string;
  dateOfBirth: string;
}

export interface AreaOfTheLand {
  areaOfTheLand: number;
  areaOfTheLandValue: number;
}

export interface UnbuiltRealEstateExemption {
  unbuiltRealEstateExemptionDescription: string;
  taxFreeArea: number;
  unbuiltRealEstateTaxExemption: number;
}

export interface UseOfDefinablePart {
  spatiallyDefinableExemptionPartDescription: string;
  spatiallyDefinableExemptionArea: number;
  spatiallyDefinableTaxExemptionPart: number;
}

export interface TaxBreakCondition {
  spatiallyDefinableExemptionPartDescription: string;
  spatiallyDefinableExemptionArea: number;
  spatiallyDefinableTaxExemptionPart: number;
}

export interface Benefit {
  taxExemption: number;
  perks: number;
  nonSeparablePartRealEstate: number;
  expirationFirstGrantPeriod: string;
  expirationLastGrantPeriod: string;
  expectedExemptPurposes: string;
  taxPrivilegedPurposes: number;
  unbuiltRealEstateExemptions: UnbuiltRealEstateExemption[];
  useOfDefinableParts: UseOfDefinablePart[];
  taxBreakConditions: TaxBreakCondition[];
}

export interface ParcelData {
  counter: number;
  denominator: number;
}

export interface ShareOfOwnership {
  counter: number;
  denominator: number;
}

export interface Parcel {
  community?: string;
  parcel?: string;
  landRegisterSheet?: number;
  corridor?: number;
  parcelData: ParcelData;
  areaOfTheLand?: number;
  shareOfOwnership?: ShareOfOwnership;
  containedInArea?: number;
}

export interface Ownership {
  salutation: number;
  name: string;
  street: string;
  houseNumber: string;
  zip: string;
  postbox: string;
  city: string;
  countryUid: number;
}

export interface AreaOfTheLand2 {
  counter: number;
  denominator: number;
}

export interface Representative {
  salutation: number;
  title: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  zip: string;
  postbox: string;
  city: string;
  countryUid: number;
  phone: string;
}

export interface Owner {
  salutation: number;
  title: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  zip: string;
  postbox: string;
  city: string;
  countryUid: number;
  phone: string;
  financeAgency: string;
  taxNumber: string;
  taxIdentificationNumber: string;
  areaOfTheLand: AreaOfTheLand2;
  representative: Representative;
}

export interface Benefit2 {
  benefitDescription: string;
  benefitLivingSpaceArea: number;
  benefitUsableSpaceArea: number;
  benefit: number;
}

export interface Exemption {
  exemptionDescription: string;
  exemptionLivingSpaceArea: number;
  exemptionUsableSpaceArea: number;
  exemption: number;
}

export interface BuildingPart {
  livingSpaceDescription: string;
  livingSpaceArea: number;
  usableSpaceArea: number;
  areaOfTheLandCivilDefense: number;
  benefits: Benefit2[];
  exemptions: Exemption[];
}

export interface Exemption2 {
  location: string;
  exemption: number;
  taxFreeArea: number;
}

export interface Benefit3 {
  location: string;
  benefit: number;
  discountedArea: number;
}

export interface Garages {
  amountGarages: number;
  exemptions: Exemption2[];
  benefits: Benefit3[];
}

export interface Exemption3 {
  location: string;
  exemption: number;
  taxFreeArea: number;
}

export interface Benefit4 {
  location: string;
  benefit: number;
  discountedArea: number;
}

export interface ApartmentsBelow60 {
  counter: number;
  totalLivingSpace: number;
  exemptions: Exemption3[];
  benefits: Benefit4[];
}

export interface Exemption4 {
  location: string;
  exemption: number;
  taxFreeArea: number;
}

export interface Benefit5 {
  location: string;
  benefit: number;
  discountedArea: number;
}

export interface ApartmentsBetween60100 {
  counter: number;
  totalLivingSpace: number;
  exemptions: Exemption4[];
  benefits: Benefit5[];
}

export interface Exemption5 {
  location: string;
  exemption: number;
  taxFreeArea: number;
}

export interface Benefit6 {
  location: string;
  benefit: number;
  discountedArea: number;
}

export interface ApartmentsAbove100 {
  counter: number;
  totalLivingSpace: number;
  exemptions: Exemption5[];
  benefits: Benefit6[];
}

export interface Exemption6 {
  location: string;
  exemption: number;
  taxFreeArea: number;
}

export interface Benefit7 {
  location: string;
  benefit: number;
  discountedArea: number;
}

export interface ApartmentsOther {
  counter: number;
  totalLivingSpace: number;
  exemptions: Exemption6[];
  benefits: Benefit7[];
}

export interface UsableSpace {
  usageType: string;
  totalSpace: number;
  exemption: number;
  taxFreeArea: number;
  benefit: number;
  discountedArea: number;
}

export interface Residential {
  yearOfConstruction: number;
  coreRenovationYear: number;
  demolitionObligationYear: number;
  dateApplicationForNewRegistration: string;
  garages: Garages;
  apartmentsBelow60: ApartmentsBelow60;
  apartmentsBetween60100: ApartmentsBetween60100;
  apartmentsAbove100: ApartmentsAbove100;
  apartmentsOther: ApartmentsOther;
  usableSpaces: UsableSpace[];
}

export interface Exemption7 {
  location: string;
  exemption: number;
  taxFreeArea: number;
}

export interface Benefit8 {
  location: string;
  benefit: number;
  discountedArea: number;
}

export interface NonResidential {
  locationPlanNumber: number;
  buildingType: string;
  yearOfConstruction: number;
  coreRenovationYear: number;
  demolitionObligationYear: number;
  areaOfTheLand: number;
  areaOfTheLandCivilDefense: number;
  exemptions: Exemption7[];
  benefits: Benefit8[];
}

export interface Leaseholder {
  firstName: string;
  name: string;
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  postbox: string;
  countryUid: number;
  salutation: number;
  title: string;
  phone: string;
}

export interface Exemption8 {
  totalExemption: number;
  exemptionNonDelimitablePart: number;
}

export interface UsageType {
  usageType: number;
  areaOfTheLand: number;
  yieldMeasurementNumber: number;
  areaOfFarmBuildings: number;
  flowRate: number;
  exemption: number;
  exemptionArea: number;
}

export interface PropertyParcel {
  district: string;
  districtNumber: number;
  corridor: number;
  counter: number;
  denominator: string;
  areaOfTheLand: number;
  usageTypes: UsageType[];
}

export interface Municipality {
  federalStateUid: number;
  community: string;
  propertyParcels: PropertyParcel[];
}

export interface Parcel2 {
  municipality: Municipality;
}

export interface ParcelsLandAndForestry {
  exemption: Exemption8;
  parcels: Parcel2[];
}

export interface DamAnimal {
  below1Year: number;
  above1Year: number;
}

export interface LayingHens {
  layingHensIncludeBreeding: number;
  purchasedLayingHens: number;
}

export interface Horses {
  below3YearsOrSmallHorses: number;
  horses: number;
}

export interface Beef {
  below1Year: number;
  Oneto2Year: number;
  above2Year: number;
}

export interface Sheep {
  below1Year: number;
  above1Year: number;
}

export interface Ostriches {
  above14Months: number;
  below14Months: number;
}

export interface YoungChickensForFattening {
  below6Passes: number;
  above6Passes: number;
}

export interface FatteningDucks {
  count: number;
  raisingPhase: number;
  fatteningPhase: number;
}

export interface Turkeys {
  selfRaised: number;
  bought: number;
  youngTurkeys: number;
}

export interface Pigs {
  lightPiglets: number;
  piglets: number;
  heavyPiglets: number;
  runner: number;
  heavyRunner: number;
  fatteningPigs: number;
  youngBreedingPigs: number;
}

export interface BoughtPigs {
  lightPiglets: number;
  piglets: number;
  heavyPiglets: number;
  runner: number;
  heavyRunner: number;
}

export interface Livestock {
  ownedSpace: number;
  minusLeasedAreas: number;
  plusLeasedAreas: number;
  selfCultivatedAreas: number;
  alpacas: number;
  damAnimal: DamAnimal;
  layingHens: LayingHens;
  poultry: number;
  breedingRabbits: number;
  llamas: number;
  horses: Horses;
  beef: Beef;
  fatteningAnimalsLessThan1Year: number;
  cows: number;
  breedingBulls: number;
  sheep: Sheep;
  breedingPigs: number;
  ostriches: Ostriches;
  youngChickensForFattening: YoungChickensForFattening;
  pullets: number;
  fatteningDucks: FatteningDucks;
  turkeys: Turkeys;
  fattenedGeese: number;
  mastRabbit: number;
  beefCattle: number;
  pigs: Pigs;
  goats: number;
  boughtPigs: BoughtPigs;
}

export type complexityOfDeclaration = "SIMPLE" | "MEDIUM" | "COMPLEX";

export type ownershipStructure = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type propertyType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type developmentState = 1 | 2;

export enum EconomicEntities {
  undeveloped = 1,
  built = 2,
  LandAndForestry = 3,
  none = -1,
}

export interface Property {
  name: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
  city?: string;
  federalStateUid: number;
  community?: string;
  reference?: string;
  exemptionOrBenefitAvailable?: boolean;
  complexityOfDeclaration?: complexityOfDeclaration | null;
  extraDetails?: string;
  internalNote?: string;
  deviatingOwner?: DeviatingOwner;
  ownershipStructure?: ownershipStructure;
  propertyType?: propertyType;
  developmentState?: developmentState | null;
  multiCommunities?: boolean;
  economicEntityType: EconomicEntities;
  leasehold?: boolean;
  buildingsOnThirdPartyOwners?: boolean;
  propertyResidentialPurposes?: boolean;
  buildingOnForeignGround?: boolean;
  registrationLandRegistry?: string;
  totalPropertyPart?: number | null;
  areaOfTheLand?: AreaOfTheLand[];
  liftingRate?: number;
  benefit?: Benefit;
  parcels?: Parcel[];
  ownership?: Ownership;
  owners?: Owner[];
  buildingParts?: BuildingPart[];
  residentials?: Residential[];
  nonResidentials?: NonResidential[];
  leaseholder?: Leaseholder;
  parcelsLandAndForestry?: ParcelsLandAndForestry;
  livestock?: Livestock;
}
