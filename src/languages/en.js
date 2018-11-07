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
      with geometric descriptions both from GeoJSON (simpler geometry) and gbXML (detailed geometry). Note that the building
      needs to be a valid GeoJSON Feature which means that at least one geographic coordinate must be defined (Point). Normally though
      a polygon is used representing the building footprint`,
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
    refurbishmentMeasure: `Reference designation of the degree of refurbishment.
      This reference may be European (from the Tabula project) or local (used for the Energy Action Plan of a city)`,
    floorArea: `Floor area considered for the normalization of the standard energy demands`,
    planarGeometry: `List of points defining a loop. There are no repeated points in the list. All data are global,
      with the assumption that positive Z is up, and if CADModelAzimuth is undefined or zero,
      positive X is East and positive Y is North. If CADModelAzimuth is defined it is the angle of positive Y to North,
      positive X is the vectorial product of Y and Z. If geometry is to be precise, use Longitude,
      Latitude and Elevation in the Location element to define the origin. Otherwise the origin is an arbitrary point.
      Use PlanarGeometry to define a three dimensional polygon that lies on a plane, and has no self-intersection.`,
    properties: `This list of properties should be sufficient to generate a full building parametrically. As soon as the
      set of properties is NOT enough to describe details, or the defaults needs to be overridden, complementary data is used
      in the building such as spaces and surfaces. Currently this is a gross list from the CityGML standard (building attributes),
      and the documentation forms a net list through further description of the properties below.
      This means some of the properties in the list could possible be removed,
      as well as a there could be a need for more properties.`,
    thermalZone: `A thermal zone is a zone of a building which serves as unit for the building heating and cooling simulation. For the simulation, a thermal zone is considered as isothermal.
      It is a semantic object, which may be or not related to a geometric entity`,
  },
};