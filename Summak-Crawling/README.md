# ToyProject Ninteno Scripts

Summtendo(가명) ToyProject 개발 단계에서 필요한 Scripts를 모아놓은 저장소 입니다.

환경 변수를 확인 후 실행 해주세요.

**(주의)** 문구가 있는 스크립트를 실행하면 서버에 영향을 미칩니다.

> 근데 다시 추가하면 되니까 마음 편하게 쓰세요!

## Product Scrapper

nintendo site의 products을 스크래핑하고 추가한다.

### 제품 추가 (주의)

30초 간격으로 product 정보가 **서버에 저장된다.**

중복된 데이터가 삽입될 수 있음

```bash
npm run scrape

> Enter a Scrap URL :
 https://store.nintendo.co.kr/games/best-sellers
```

### 제품 추가 테스트 (권장)

30초 간격으로 product 정보가 **콘솔에 출력된다.**

테스트용 스크립트로 **얼마든지 사용해도 됨**

```bash
npm run scrape:test

> Enter a Scrap URL :
 https://store.nintendo.co.kr/games/best-sellers
```

## Product 관련 Scripts

### findAll

products를 반환

```bash
npm run findAll
```

### getProduct

product의 상세 정보를 반환

```bash
npm run getProduct

> Enter a product id :
asda12k3lasf
```

### <p style="color : red">deleteAll (주의)</p>

실행 후 10초 뒤 모든 products를 삭제한다.

사용하기전 주의가 필요

```bash
npm run deleteAll
```
