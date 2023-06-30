// * 선택된 tr의 row를 순화하면서 값을 가져옵니다. (antd에서 제공하는 form에 맞게 가져오기 때문에 하드코딩 해야 합니다.)
export function getRowProductValues(rowEl: HTMLTableRowElement) {
  const productList = Array.from(rowEl.querySelectorAll('td')).map(
    (tdEl, i) => {
      switch (i) {
        case 0:
          // id
          return tdEl.querySelector('div')?.textContent?.trim()
        case 1:
          // title
          return tdEl.querySelector('input')?.value.trim()
        case 2:
          // description
          return tdEl.querySelector('textarea')?.value.trim()
        case 3:
          // price
          return Number(
            tdEl
              .querySelector('input')
              ?.value.trim()
              .replace(/[^0-9.-]+/g, '')
          )
        case 4:
          // tags
          return tdEl
            .querySelector('input')
            ?.value.split(',')
            .map((tag) => tag.trim())
        default:
          return ''
      }
    }
  )
  return {
    id: productList[0],
    title: productList[1],
    description: productList[2],
    price: productList[3],
    tags: productList[4],
  } as RowProductValues
}

type RowProductValues = {
  id: string
  title: string
  description: string
  price: number
  tags: string[]
}
