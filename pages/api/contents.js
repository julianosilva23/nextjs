// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../credentials/SiteDevJuliano-2324139317b0.json';

export default async (req, res) => {

  const contents = getContents();

  res.statusCode(200).json({
    contents
  })
}

export async function getContents() {
  const doc = new GoogleSpreadsheet('1yJEufrubZpYI6VH2LufjNJYWK2OtBXH3J14B9iRIyjY');

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();

  const contents = rows.map(({ title, content }) => {
    return {
      title, content
    }
  })

  return contents;
}