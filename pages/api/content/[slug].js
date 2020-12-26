// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../../credentials/SiteDevJuliano-2324139317b0.json';

export default async function handler(req, res) {
    const {
      query: { slug },
    } = req

    const doc = new GoogleSpreadsheet('1yJEufrubZpYI6VH2LufjNJYWK2OtBXH3J14B9iRIyjY');

    await doc.useServiceAccountAuth({
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();

    const contentObject = rows.find(content => content.slug === slug);


    if (!contentObject) {
        return {
          notFound: true,
        }
    }

    const { title, content, link } = contentObject;
  
    return res.json({
        content: { title, content, link, slug }
    })
}