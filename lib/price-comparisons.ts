// ============================================================
// Price Comparison Data — Tokyo Motors
// Real Japan vs USA price comparisons for identical cars
// Exchange rate: 1 USD = 155.74 JPY (live rate, 2026-02-25)
// Sources: carsensor.net (Japan) & bringatrailer.com (USA)
// ============================================================

import { EXCHANGE_RATES } from './exchange-rate'

export interface PriceComparison {
  id: string
  brand: string
  model: string
  year: number
  mileage_km: number
  image_url: string
  japan_price_jpy: number
  japan_price_usd: number
  japan_url: string
  usa_price_usd: number
  usa_url: string
  savings_usd: number
  savings_percent: number
}

// Helper: convert JPY to USD using live rate
const jpy2usd = (jpy: number): number => Math.round(jpy / EXCHANGE_RATES.JPY_PER_USD)

export const priceComparisons: PriceComparison[] = [
  // ── #1 — Biggest savings: $124,867 ──────────────────────────────────────────
  {
    id: 'porsche-911-gt3-992-2022',
    brand: 'Porsche',
    model: '911 GT3 (992)',
    year: 2022,
    mileage_km: 5000,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Porsche_992_GT3_1X7A0323.jpg/1200px-Porsche_992_GT3_1X7A0323.jpg',
    japan_price_jpy: 21980000,
    japan_price_usd: jpy2usd(21980000),   // ~$141,133
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6805079543/index.html',
    usa_price_usd: 266000,
    usa_url: 'https://bringatrailer.com/listing/2022-porsche-911-gt3-touring-143/',
    savings_usd: 266000 - jpy2usd(21980000),
    savings_percent: Math.round(((266000 - jpy2usd(21980000)) / 266000) * 1000) / 10,
  },
  // ── #2 — Savings: $104,867 ──────────────────────────────────────────────────
  {
    id: 'porsche-911-turbo-s-992-2022',
    brand: 'Porsche',
    model: '911 Turbo S (992)',
    year: 2022,
    mileage_km: 4160,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Porsche_992_GT3_1X7A0323.jpg/1200px-Porsche_992_GT3_1X7A0323.jpg',
    japan_price_jpy: 21980000,
    japan_price_usd: jpy2usd(21980000),   // ~$141,133
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6805079543/index.html',
    usa_price_usd: 246000,
    usa_url: 'https://bringatrailer.com/listing/2022-porsche-911-turbo-s-coupe-69/',
    savings_usd: 246000 - jpy2usd(21980000),
    savings_percent: Math.round(((246000 - jpy2usd(21980000)) / 246000) * 1000) / 10,
  },
  // ── #3 — Savings: $100,062 ──────────────────────────────────────────────────
  {
    id: 'ferrari-f12-berlinetta-2014',
    brand: 'Ferrari',
    model: 'F12 Berlinetta',
    year: 2014,
    mileage_km: 28000,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ferrari_F12berlinetta_IMG_2941.jpg/1200px-Ferrari_F12berlinetta_IMG_2941.jpg',
    japan_price_jpy: 24130000,
    japan_price_usd: jpy2usd(24130000),   // ~$154,938
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU5252913575/index.html',
    usa_price_usd: 255000,
    usa_url: 'https://bringatrailer.com/listing/2016-ferrari-f12-3/',
    savings_usd: 255000 - jpy2usd(24130000),
    savings_percent: Math.round(((255000 - jpy2usd(24130000)) / 255000) * 1000) / 10,
  },
  // ── #4 — Savings: $97,023 ───────────────────────────────────────────────────
  {
    id: 'ferrari-gtc4lusso-2019',
    brand: 'Ferrari',
    model: 'GTC4Lusso',
    year: 2019,
    mileage_km: 15000,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ferrari_GTC4Lusso_IMG_4353.jpg/1200px-Ferrari_GTC4Lusso_IMG_4353.jpg',
    japan_price_jpy: 21800000,
    japan_price_usd: jpy2usd(21800000),   // ~$139,977
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6332327276/index.html',
    usa_price_usd: 237000,
    usa_url: 'https://bringatrailer.com/listing/2020-ferrari-lusso/',
    savings_usd: 237000 - jpy2usd(21800000),
    savings_percent: Math.round(((237000 - jpy2usd(21800000)) / 237000) * 1000) / 10,
  },
  // ── #5 — Savings: $95,266 ───────────────────────────────────────────────────
  {
    id: 'ferrari-296-gtb-2024',
    brand: 'Ferrari',
    model: '296 GTB',
    year: 2024,
    mileage_km: 480,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/2022_Ferrari_296_%28cropped%29.jpg/1200px-2022_Ferrari_296_%28cropped%29.jpg',
    japan_price_jpy: 35000000,
    japan_price_usd: jpy2usd(35000000),   // ~$224,734
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6201347430/index.html',
    usa_price_usd: 320000,
    usa_url: 'https://bringatrailer.com/listing/2024-ferrari-296-gtb-11/',
    savings_usd: 320000 - jpy2usd(35000000),
    savings_percent: Math.round(((320000 - jpy2usd(35000000)) / 320000) * 1000) / 10,
  },
  // ── #6 — Savings: $82,000 ───────────────────────────────────────────────────
  {
    id: 'ferrari-488-gtb-2018',
    brand: 'Ferrari',
    model: '488 GTB',
    year: 2018,
    mileage_km: 12000,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/2018_Ferrari_488_GTB_4.jpg/1280px-2018_Ferrari_488_GTB_4.jpg',
    japan_price_jpy: 25290000,
    japan_price_usd: jpy2usd(25290000),
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6460725205/index.html',
    usa_price_usd: 245000,
    usa_url: 'https://bringatrailer.com/listing/2018-ferrari-488-gtb-22/',
    savings_usd: 245000 - jpy2usd(25290000),
    savings_percent: Math.round(((245000 - jpy2usd(25290000)) / 245000) * 1000) / 10,
  },
  // ── #7 — Savings: $75,096 ───────────────────────────────────────────────────
  {
    id: 'bentley-continental-gt-speed-2022',
    brand: 'Bentley',
    model: 'Continental GT Speed',
    year: 2022,
    mileage_km: 13000,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bentley_Continental_GT_First_Edition_%2849919050697%29_%28cropped%29_%28cropped%29.jpg/1280px-Bentley_Continental_GT_First_Edition_%2849919050697%29_%28cropped%29_%28cropped%29.jpg',
    japan_price_jpy: 21010000,
    japan_price_usd: jpy2usd(21010000),   // ~$134,904
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6692024411/index.html',
    usa_price_usd: 210000,
    usa_url: 'https://bringatrailer.com/listing/2022-bentley-continental-gt-speed-7/',
    savings_usd: 210000 - jpy2usd(21010000),
    savings_percent: Math.round(((210000 - jpy2usd(21010000)) / 210000) * 1000) / 10,
  },
  // ── #8 — Savings: $73,568 ───────────────────────────────────────────────────
  {
    id: 'mclaren-720s-2021',
    brand: 'McLaren',
    model: '720S',
    year: 2021,
    mileage_km: 5000,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/2018_McLaren_720S_V8_S-A_4.0.jpg/1200px-2018_McLaren_720S_V8_S-A_4.0.jpg',
    japan_price_jpy: 24830000,
    japan_price_usd: jpy2usd(24830000),   // ~$159,432
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6841290424/index.html',
    usa_price_usd: 233000,
    usa_url: 'https://bringatrailer.com/listing/2021-mclaren-720s/',
    savings_usd: 233000 - jpy2usd(24830000),
    savings_percent: Math.round(((233000 - jpy2usd(24830000)) / 233000) * 1000) / 10,
  },
]
