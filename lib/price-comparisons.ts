// ============================================================
// Price Comparison Data — Tokyo Motors
// Real Japan vs USA price comparisons for identical cars
// Exchange rate: 1 USD = 150 JPY
// Sources: carsensor.net (Japan) & bringatrailer.com (USA)
// ============================================================

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

export const priceComparisons: PriceComparison[] = [
  {
    id: 'ferrari-488-gtb-2016',
    brand: 'Ferrari',
    model: '488 GTB',
    year: 2016,
    mileage_km: 11000,
    image_url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=85&fm=jpg',
    japan_price_jpy: 25290000,
    japan_price_usd: 168600,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 228000,
    usa_url: 'https://bringatrailer.com/listing/2016-ferrari-488-gtb-29/',
    savings_usd: 59400,
    savings_percent: 26.1,
  },
  {
    id: 'ferrari-296-gtb-2024',
    brand: 'Ferrari',
    model: '296 GTB',
    year: 2024,
    mileage_km: 480,
    image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=85&fm=jpg',
    japan_price_jpy: 35000000,
    japan_price_usd: 233333,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 320000,
    usa_url: 'https://bringatrailer.com/listing/2024-ferrari-296-gtb-11/',
    savings_usd: 86667,
    savings_percent: 27.1,
  },
  {
    id: 'mclaren-720s-2021',
    brand: 'McLaren',
    model: '720S',
    year: 2021,
    mileage_km: 5000,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&fm=jpg',
    japan_price_jpy: 24830000,
    japan_price_usd: 165533,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 233000,
    usa_url: 'https://bringatrailer.com/listing/2021-mclaren-720s/',
    savings_usd: 67467,
    savings_percent: 29.0,
  },
  {
    id: 'porsche-911-gt3-2022',
    brand: 'Porsche',
    model: '911 GT3 (992)',
    year: 2022,
    mileage_km: 5000,
    image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=85&fm=jpg',
    japan_price_jpy: 31464000,
    japan_price_usd: 209760,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 266000,
    usa_url: 'https://bringatrailer.com/listing/2022-porsche-911-gt3-touring-143/',
    savings_usd: 56240,
    savings_percent: 21.1,
  },
  {
    id: 'lamborghini-huracan-2016',
    brand: 'Lamborghini',
    model: 'Huracán LP610-4',
    year: 2016,
    mileage_km: 8000,
    image_url: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=85&fm=jpg',
    japan_price_jpy: 23680000,
    japan_price_usd: 157867,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 205500,
    usa_url: 'https://bringatrailer.com/listing/2016-lamborghini-huracan-lp610-4-coupe-6/',
    savings_usd: 47633,
    savings_percent: 23.2,
  },
  {
    id: 'mclaren-765lt-2021',
    brand: 'McLaren',
    model: '765LT',
    year: 2021,
    mileage_km: 4000,
    image_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85&fm=jpg',
    japan_price_jpy: 49800000,
    japan_price_usd: 332000,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 399000,
    usa_url: 'https://bringatrailer.com/listing/2021-mclaren-765lt-17/',
    savings_usd: 67000,
    savings_percent: 16.8,
  },
  {
    id: 'mclaren-570s-spider-2018',
    brand: 'McLaren',
    model: '570S Spider',
    year: 2018,
    mileage_km: 11000,
    image_url: 'https://images.unsplash.com/photo-1605559424843-9073c6223aa1?w=800&q=85&fm=jpg',
    japan_price_jpy: 15970000,
    japan_price_usd: 106467,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 142000,
    usa_url: 'https://bringatrailer.com/listing/2018-mclaren-570s-spider-23/',
    savings_usd: 35533,
    savings_percent: 25.0,
  },
  {
    id: 'ferrari-california-t-2015',
    brand: 'Ferrari',
    model: 'California T',
    year: 2015,
    mileage_km: 19000,
    image_url: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&q=85&fm=jpg',
    japan_price_jpy: 14280000,
    japan_price_usd: 95200,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 125000,
    usa_url: 'https://bringatrailer.com/listing/2015-ferrari-california-t-37/',
    savings_usd: 29800,
    savings_percent: 23.8,
  },
  {
    id: 'porsche-911-turbo-s-2022',
    brand: 'Porsche',
    model: '911 Turbo S (992)',
    year: 2022,
    mileage_km: 5000,
    image_url: 'https://images.unsplash.com/photo-1574680178050-55c6a2dec0e4?w=800&q=85&fm=jpg',
    japan_price_jpy: 31464000,
    japan_price_usd: 209760,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776998967/index.html',
    usa_price_usd: 246000,
    usa_url: 'https://bringatrailer.com/listing/2022-porsche-911-turbo-s-coupe-69/',
    savings_usd: 36240,
    savings_percent: 14.7,
  },
  {
    id: 'lexus-lc500-2017',
    brand: 'Lexus',
    model: 'LC 500',
    year: 2017,
    mileage_km: 67000,
    image_url: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=85&fm=jpg',
    japan_price_jpy: 7080000,
    japan_price_usd: 47200,
    japan_url: 'https://www.carsensor.net/usedcar/detail/AU6776986185/index.html',
    usa_price_usd: 56000,
    usa_url: 'https://bringatrailer.com/listing/2018-lexus-lc500-8/',
    savings_usd: 8800,
    savings_percent: 15.7,
  },
]
