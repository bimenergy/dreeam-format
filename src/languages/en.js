/* eslint-disable quotes, quote-props */
export default {
  doc: {
    building: `The building is a central entity in the DREEAM format and follows several 
      descriptions from open formats, such as CityGML, IFC, gbXML.
      The attributes object is used as the most simple bearer of information of a building, and is complemented
      with geometric descriptions both from CityGML (simpler geometry) and gbXML (detailed geometry)`,
    storeyHeightsAboveGround: `List order for
      storeyHeightsAboveground: first floor, second floor,...`,
    storeyHeightsBelowground: `List order for storeyHeightsBelowground: first floor below
      ground, second floor below ground,... `,
    buildingType: `Classification of building according with their usage and form
      (e.g. single-family house, multi-family house, office building, industrial building).
      The enumeration (citygml: code list) will be specific for DREEAM and the allowed values will be added as we go`,
    constructionWeight: `Classification of building according with their construction structure
      - veryLight
      - light
      - medium
      - heavy`,
    energyPerformanceCertification: `Energy Efficiency Rating according with a given certification or label
      (e.g. PassivHaus, LEED Platinium, KfW Effizienzhaus 100).`,
    volume: `Total volume delimited by the external building dimension`,
    isLandMarked: `Landmark / heritage status of the building`,
    referencePoint: `Geographical location of the building`,
    refurbishmentMeasure: `Reference designation of the degree of refurbishment.
      This reference may be European (from the Tabula project) or local (used for the Energy Action Plan of a city)`,
    floorArea: `Floor area considered for the normalization of the standard energy demands`,
    heightAboveGround: `Building height above general ground. level. This elevation lies anywhere between between the lowest
      and the highest ground points of the construction`,
  },
};
