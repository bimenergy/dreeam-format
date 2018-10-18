/* eslint-disable quotes, quote-props */
export default {
  doc: {
    root: `The root entity describes the stock repository itself, which could be thought of as one or several databases.
      The format will emerge slowly towards maturity and changes will be inevitable. The formats that are followed are primarily:
      CityGML and the Energy ADE for overall structure and lower level of detailed data. A good graphical overview can be found at
      https://github.com/cstb/citygml-energy/blob/master/doc/UML-Diagrams_Energy-ADE.pdf. gbXML and IFC are used at higher level of
      detail to improve compatibility with the BIM domain. The DREEAM format is highly opinionated and primarily used as an
      unambiguous representation of data to be used internally at application level, yet enable import and export of open standard
      formats which often fail to be suitable for application development due to high flexibility and complexity. Links to documentations
      of gbXML: http://www.gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html and IFC: http://www.buildingsmart-tech.org/ifc/IFC4/final/html/
      (and version 2x3: http://www.buildingsmart-tech.org/ifc/IFC2x3/TC1/html/index.htm)`,
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
