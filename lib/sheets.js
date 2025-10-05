import { google } from 'googleapis'

export async function getProducts() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({
      auth,
      version: 'v4',
    })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A2:Z', // از ردیف دوم شروع کن که سرستون‌ها خوانده نشود
    })

    const rows = response.data.values

    if (rows && rows.length) {
      return rows.map(row => ({
        id: row[0],
        name: row[1],
        size: row[2],
        price: row[3],
        inStock: row[4],
        unit: row[5],
        description: row[6],
      }))
    }
  } catch (err) {
    console.error('Error fetching sheet data:', err)
  }

  return []
}
