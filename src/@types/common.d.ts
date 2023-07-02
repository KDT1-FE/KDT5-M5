interface Category {
  /** 분류 번호 */
  category_no: number;
  /** 추천상품 분류 등록 여부
T : 추천상품 등록
F : 추천상품 등록안함
DEFAULT F */
  recommend: string;
  /** 신상품 분류 등록 여부
T : 신상품 등록
F : 신상품 등록안함
DEFAULT F */
  new: string;
}
interface Option {
  /** 옵션명 */
  name: string;
  /** 옵션값 */
  value: string[];
}
interface PointAmout {
  /** 적립금 결제방법
naverpay : 네이버페이
smilepay : 스마일페이
kakaopay : 카카오페이
payco : 페이코
paynow : 페이나우
kpay : 케이페이
icash : 가상계좌 결제
deposit : 예치금 결제
tcash : 실시간 계좌이체
cell : 휴대폰 결제
card : 카드 결제
mileage : 적립금 결제
cash : 무통장 입금 */
  payment_method: string;
  /** 적립율 */
  points_rate: string;
  /** 결제방법별 적립금 단위
P : 퍼센트 단위
W : 원단위 */
  points_unit_by_payment: string;
}
interface RelationalProduct {
  /** 상품번호 */
  product_no: number;
  /** 관련상품 상호등록 여부
T : 상호등록
F : 일방등록 */
  interrelated: string;
}
interface ShoppingRate {
  /** 배송비 구간 시작 기준 */
  shipping_rates_min: string;
  /** 배송비 구간 종료 기준 */
  shipping_rates_max: string;
  /** 배송비 */
  shipping_fee: string;
}

interface ProductInfo {
  /** 상품번호

상품의 고유한 일련 번호. 해당 쇼핑몰 내에서 상품 번호는 중복되지 않음. */
  product_no?: number;
  /** 진열상태

T : 진열함
F : 진열안함

DEFAULT F */
  display?: string;
  /** 판매상태

T : 판매함
F : 판매안함

DEFAULT F */
  selling?: string;
  /** 상품 상태

N : 신상품
B : 반품상품
R : 재고상품
U : 중고상품
E : 전시상품
F : 리퍼상품
S : 스크래치 상품

DEFAULT N */
  product_condition?: string;
  /** 중고상품 사용 개월

상품 상태(product_condition)가 중고 상품일 경우 중고 상품의 사용 개월 수 */
  product_used_month?: number;
  /** 추가 분류 번호

분류 번호를 사용하여 진열을 원하는 카테고리에 상품 등록 */
  add_category_no?: Category[];
  category?: Category[];
  /** 상품코드

시스템이 상품에 부여한 코드. 해당 쇼핑몰 내에서 상품코드는 중복되지 않음. */
  product_code?: string;
  /** 자체상품 코드

사용자가 상품에 부여 가능한 코드. 재고 관리등의 이유로 자체적으로 상품을 관리 하고 있는 경우 사용함. */
  custom_product_code?: string;
  /** 상품명 */
  product_name: string;
  /** 영문 상품명 */
  eng_product_name?: string;
  /** 공급사 상품명 */
  supply_product_name?: string;
  /** 상품명(관리용) */
  internal_product_name?: string;
  /** 모델명 */
  model_name?: string;
  /** 상품 판매가

필수 입력 */
  price: string;
  /** 상품 소비자가 */
  retail_price: string;
  /** 상품 공급가

상품의 원가. 공급가에 마진율을 더하여 판매가를 계산할 수 있음. API에서는 공급가는 참조 목적으로만 사용한다. */
  supply_price: string;
  /** 옵션 사용여부

T : 옵션사용함
F : 옵션 사용안함

DEFAULT F */
  has_option?: string;
  /** 옵션 */
  options?: Option[];
  /** 네이버페이 사용여부

EC 베트남, 필리핀 버전에서는 사용할 수 없음.

T : 사용함
F : 사용안함 */
  use_naverpay?: string | null;
  /** 네이버페이 판매타입

EC 베트남, 필리핀 버전에서는 사용할 수 없음.

C : 네이버페이 + 쇼핑몰 동시판매 상품
O : 네이버페이 전용상품 */
  naverpay_type?: string | null;
  /** 카카오페이 사용여부

EC 베트남, 필리핀 버전에서는 사용할 수 없음.

T : 사용함
F : 사용안함 */
  use_kakaopay?: string | null;
  /** 이미지 업로드 타입

이미지 업로드시 이미지 업로드 타입.
"대표이미지 등록"시 상세이미지를 리사이징하여 목록이미지, 작은목록이미지, 축소이미지에 업로드
"개별이미지 등록"시 상세이미지, 목록이미지, 작은목록이미지, 축소이미지를 각각 따로 업로드

※ EC Global은 FTP를 지원하지 않으므로 C는 사용할 수 없음

A : 대표이미지등록
B : 개별이미지등록
C : 웹FTP 등록

DEFAULT A */
  image_upload_type?: string;
  /** 상세이미지 */
  detail_image?: string;
  /** 작은목록이미지

최근 본 상품 영역에 표시되는 상품의 목록 이미지. */
  tiny_image?: string;
  /** 제조사 코드

DEFAULT M0000000 */
  manufacturer_code?: string;
  /** 공급사 코드

DEFAULT S0000000 */
  supplier_code?: string;
  /** 브랜드 코드

DEFAULT B0000000 */
  brand_code?: string;
  /** 트렌드 코드

DEFAULT T0000000 */
  trend_code?: string;
  /** 상품 중량 */
  product_weight?: string;
  /** 유효기간 */
  expiration_date?: {
    start_date: string;
    end_date: string;
  };
  /** 아이콘 */
  icon?: string[];
  /** 판매가 대체문구 */
  price_content?: string;
  /** 구매제한 개별 설정여부

T : 사용함
F : 사용안함

DEFAULT F */
  buy_limit_by_product?: string;
  /** 구매제한

N : 회원만 구매하며
구매버튼 감추기
M : 회원만 구매하며
구매버튼 보이기
F : 구매제한 안함
O : 지정된 회원만 구매하며 구매버튼 감추기
D : 지정된 회원만 구매하며 구매버튼 보이기

DEFAULT F */
  buy_limit_type?: string;
  /** 구매가능 회원 등급 */
  buy_group_list?: number[];
  /** 구매가능 회원아이디 */
  buy_member_id_list?: string[];
  /** 재구매 제한

T : 재구매 불가
F : 제한안함

DEFAULT F */
  repurchase_restriction?: string;
  /** 단독구매 제한

T : 단독구매 불가
F : 제한안함

DEFAULT F */
  single_purchase_restriction?: string;
  /** 구매단위 타입

해당 상품의 구매 단위를 1개 이상으로 설정한 경우 해당 구매 단위를 품목 단위로 할 것인지, 상품 단위로 할 것인지에 대한 설정

P : 상품 기준
O : 품목 기준

DEFAULT O */
  buy_unit_type?: string;
  /** 구매단위

DEFAULT 1 */
  buy_unit?: number;
  /** 주문수량 제한 기준

해당 상품의 주문 수량 제한시 제한 기준을 품목 단위로 할 것인지, 상품 단위로 할 것인지에 대한 설정

P : 상품 기준
O : 품목 기준

DEFAULT O */
  order_quantity_limit_type?: string;
  /** 최소 주문수량

주문 가능한 최소한의 주문 수량. 주문 수량 미만으로 구매 할 수 없음.

DEFAULT 1 */
  minimum_quantity?: number;
  /** 최대 주문수량

주문 가능한 최대한의 주문 수량. 주문 수량을 초과하여 구매 할 수 없음.

최대 주문수량을 "제한없음"으로 입력하려면 0을 입력

DEFAULT 0 */
  maximum_quantity?: number;
  /** 적립금 개별설정 사용여부

F : 기본설정 사용
T : 개별설정

DEFAULT F */
  points_by_product?: string;
  /** 결제방식별 적립금 설정 여부

B : 기본 적립금설정 사용
C : 결제방식에 따른 적립 */
  points_setting_by_payment?: string;
  /** 적립금 설정 정보 */
  points_amount?: PointAmout[];
  /** 회원등급 추가 적립 제외

T : 회원등급 추가 적립 제외 설정함
F : 회원등급 추가 적립 제외 설정안함

DEFAULT F */
  except_member_points?: string;
  /** 상품 부피 정보 */
  product_volume?: {
    /** 상품부피 사용여부 */
    use_product_volume: string;
    /** 가로 */
    product_width: number;
    /** 세로 */
    product_height: number;
    /** 높이 */
    product_length: number;
  };
  /** 상품상세설명 */
  description?: string;
  /** 모바일 상품 상세설명

입력시 모바일 쇼핑몰에서 상품상세설명 대신 모바일 상품 상세 설명을 대신 표시함. */
  mobile_description?: string;
  /** 상품상세설명 번역정보 */
  translated_description?: string;
  /** 상품 검색어 */
  product_tag?: string[];
  /** 상품요약설명 */
  summary_description?: string;
  /** 상품 간략 설명 */
  simple_description?: string;
  /** 상품결제안내 */
  payment_info?: string;
  /** 상품배송안내 */
  shipping_info?: string;
  /** 교환/반품안내 */
  exchange_info?: string;
  /** 서비스문의/안내 */
  service_info?: string;
  /** HS코드

배송정보(shipping_scope)가 C(해외배송)일 경우 필수 입력
shipping_calculation이 A(자동계산)일 경우 필수 입력 아님 */
  hscode?: string;
  /** 국가별 HS 코드 */
  country_hscode?: {
    JPN: string;
    CHN: string;
  };
  /** 관련상품

해당 상품과 비슷한 상품 혹은 대체 가능한 상품. 관련 상품 등록시 해당 상품의 상세페이지 하단에 노출된다. */
  relational_product?: RelationalProduct[];
  /** 배송정보

국내에만 배송이 가능한 상품인지 해외에도 배송이 가능한 상품인지 표시. [쇼핑몰 설정 > 배송 설정 > '배송 정책 설정 > 배송비 설정 > 개별배송비 설정'] 에서 상품별 개별배송료 설정이 사용안함인 경우 설정 불가.

※ 쇼핑몰이 EC Global 쇼핑몰일 경우 "C"를 필수로 입력해야한다.

EC 베트남, 필리핀 버전에서는 사용할 수 없음.

A : 국내배송
C : 해외배송
B : 국내/해외배송 */
  shipping_scope?: string;
  /** 개별배송여부

T : 개별배송
F : 기본배송

DEFAULT F */
  shipping_fee_by_product?: string;
  /** 배송방법

01 : 택배
02 : 빠른등기
03 : 일반등기
04 : 직접배송
05 : 퀵배송
06 : 기타
07 : 화물배송
08 : 매장직접수령
09 : 배송필요 없음 */
  shipping_method?: string;
  /** 배송기간 */
  shipping_period?: {
    minimum: number;
    maximum: number;
  };
  /** 배송지역 */
  shipping_area?: string;
  /** 배송비 타입

개별배송비를 사용할 경우 상품의 배송비 타입.

T : 배송비 무료
R : 고정배송비 사용
M : 구매 금액에 따른 부과
D : 구매 금액별 차등 배송료 사용
W : 상품 무게별 차등 배송료 사용
C : 상품 수량별 차등 배송료 사용
N : 상품 수량에 비례하여 배송료 부과 */
  shipping_fee_type?: string;
  /** 해외통관코드

배송정보(shipping_scope)가 C(해외배송)일 경우 필수 입력
shipping_calculation이 A(자동계산)일 경우 필수 입력 아님 */
  clearance_category_code?: string;
  /** 배송비 금액

개별배송비를 사용할 경우 상품의 개별 배송비.

shipping_fee_type이 R, N일 경우 배열 안에 shipping_fee를 정의하여 배송비를 설정할 수 있다.

shipping_fee_type이 M, D, W, C일 경우 배열 안에 다음과 같이 정의하여 배송비 구간을 설정할 수 있다.
shipping_rates_min : 배송비 구간 시작 기준
shipping_rates_max : 배송비 구간 종료 기준
shipping_fee : 배송비 */
  shipping_rates?: ShoppingRate[];
  /** 상품소재

상품의 소재. 복합 소재일 경우 상품의 소재와 함유랑을 함께 입력해야함. (예 : 면 80%, 레이온 20%) */
  product_material?: string;
  /** 영문 상품 소재

상품의 소재의 영어 표기. 해외 배송사를 이용할 경우 의류의 소재를 통관시 요구하는 경우가 있음. */
  english_product_material?: string;
  /** 옷감

상품이 의류인 경우, 옷감. 일본 택배사를 이용할 경우, 택배사에 따라 의류 통관시 옷감 정보를 입력 받는 경우가 있음.

woven : 직물(woven)
knit : 편물(knit) */
  cloth_fabric?: string;
  /** 자체분류 */
  classification_code?: string;
  /** 판매가 추가금액

판매가 계산시 상품의 원가와 마진율에 더하여 추가로 계산되는 금액. API에서 해당 금액은 참고 목적으로만 사용된다. */
  additional_price?: string;
  /** 마진률

상품의 원가에 더하여 판매가 계산을 위한 마진율. Api에서는 해당 값은 참고용으로만 사용된다. */
  margin_rate?: string;
  /** 과세 구분

해당 상품의 과세 정보.

해당 상품의 부가세 포함 유형.
과세상품 = 세금이 부과된 상품.
면세상품 = 세금이 면제되는 상품. 가공되지 않은 농/수/축산물, 연탄, 도서류, 보험, 여성용품 등의 상품이 이에 해당하며, 과세사업자로 등록해야 함
영세상품 = 부가세가 0%로 적용되는 수출용 외화 획득 상품

A : 과세상품
B : 면세 상품
C : 영세상품 */
  tax_type?: string;
  /** 과세율 */
  tax_rate?: number;
  /** 배송비 선결제 설정

EC 베트남, 필리핀 버전에서는 사용할 수 없음.

C : 착불
P : 선결제
B : 선결제/착불 */
  prepaid_shipping_fee?: string;
  /** 원산지 국내/국외/기타

F : 국내
T : 국외
E : 기타 */
  origin_classification?: string;
  /** 원산지 번호

원산지 번호를 Retrieve a list of origins API를 통해 원산지를 조회하여 입력
origin_classification이 F(국내)인 경우, 해외 여부(foreign)가 "F"인 원산지만 입력 가능함.
origin_classification이 T(해외)인 경우, 해외 여부(foreign)가 "T"인 원산지만 입력 가능함. */
  origin_place_no?: number;
  /** 원산지 국가코드

원산지 국가를 두자리 국가코드로 입력

원산지를 국가 단위로만 입력하는 경우 원산지 번호(origin_place_no)와 원산지 구분(origin_classification) 대신 사용 가능하다. */
  made_in_code?: string;
  /** 추가이미지

상품 상세 화면 하단에 표시되는 상품의 추가 이미지. 축소 이미지와 비슷한 위치에 표시되며 PC 쇼핑몰에서는 마우스 오버시, 모바일 쇼핑몰에서는 이미지 스와이프(Swipe)시 추가 이미지를 확인할 수 있다.

추가이미지는 최대 20개까지 등록 가능하다. */
  additional_image?: string[];
  /** 표시제한 범위

A : 모두에게 표시
M : 회원에게만 표시

DEFAULT A */
  exposure_limit_type?: string;
  /** 표시대상 회원 등급 */
  exposure_group_list?: number[];
}

interface Product {
  shop_no: number;
  request: ProductInfo;
}
