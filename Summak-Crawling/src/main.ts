import readline from 'readline'
import productsScrapper from './scripts/puppeteer/getProducts/index.js'
import setProductDetail from './scripts/puppeteer/setProductsDetail/index.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function main() {
  try {
    console.info('Enter a Scrap URL : ')
    rl.on('line', async (line: string) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('개발 모드에서 스크래핑 시작')
      }
      if (process.env.NODE_ENV === 'production') {
        console.log('배포 모드에서 스크래핑 시작')
      }
      const list = await productsScrapper(line)
      await setProductDetail(list)
      rl.close()
    })
    rl.on('close', () => {
      console.log('스크래핑 종료')
      process.exit(0)
    })
  } catch (err) {
    console.error(err)
    process.exit()
  }
}
main()
