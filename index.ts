import axios from 'axios'
async function main(): Promise<void> {
  const resultRecordCount = 1000

  process.stdout.write('[')

  let resultOffset, more
  for (
    resultOffset = 0, more = true;
    more;
    resultOffset += resultRecordCount
  ) {
    process.stderr.write(
      `fetching results ${resultOffset}-${
        resultOffset + resultRecordCount - 1
      }\n`,
    )
    const response = await getResults({
      resultOffset,
      resultRecordCount,
    })
    process.stdout.write(JSON.stringify(response))
    more = response.exceededTransferLimit
    if (more) process.stdout.write(',')
  }

  process.stdout.write(']')
}

type getResultsProps = {
  resultOffset: number
  resultRecordCount: number
}
async function getResults({
  resultOffset,
  resultRecordCount,
}: getResultsProps) {
  const response = await axios.get(
    `https://gis.mytoddcounty.com/toddcounty/rest/services/PublicViewerServer/MapServer/8/query`,
    {
      params: new URLSearchParams({
        f: 'json',
        where: `LOWER(PROPNAME) LIKE '%'`,
        returnGeometry: true,
        spatialRel: 'esriSpatialRelIntersects',
        outFields: [
          'OBJECTID',
          'Shape_Length',
          'Shape_Area',
          'acres',
          'par_id',
          'FIRST_Deed',
          'PARCEL',
          'TAXNUM',
          'TAXNAME',
          'OWADR1',
          'OWADR2',
          'OWADR3',
          'TAXPAYCITY',
          'TXPAYSTATE',
          'zipcode',
          'OWNERNUM',
          'OWNNAM',
          'OWNNAM2',
          'OWNERADD1',
          'OWNERADD2',
          'OWNERCITY',
          'OWNERSTATE',
          'OWNERZIP',
          'PROPUNIT',
          'bldgnum',
          'AD911RD',
          'AD911DIR',
          'AD911ZIP',
          'BLOCK',
          'LOT',
          'PLATNUM',
          'PLDESC',
          'PLSSEC',
          'PLSTWP',
          'PLSRNG',
          'LEGAL1',
          'LEGAL2',
          'LEGAL3',
          'LEGAL4',
          'LEGAL5',
          'LEGAL6',
          'LEGAL7',
          'LEGAL8',
          'LEGAL9',
          'LEGAL10',
          'DACRE',
          'TILLACRE',
          'TPASM1',
          'TPHST1',
          'AVSITE',
          'AVHOUS',
          'AVBLDG',
          'AVLAND',
          'AVTMKT',
          'DNRBAYID',
          'DNRLAKEID',
          'Tax_Link',
          'sqfeet',
          'PROPNAME',
          'PHYSADD',
          'PO_LOC',
          'Tax_Assess',
          'DocInfo',
        ].join(','),
        orderByFields: 'PROPNAME ASC',
        outSR: 102100,
        resultOffset,
        resultRecordCount,
      } as Record<string, any>),
    },
  )

  return response.data
}

main()
