// ==========================================================================
// AURA STUDIO - Product Data & Store Configuration
// ==========================================================================

const STORE_CONFIG = {
  name: "AURA STUDIO",
  slogan: "MINIMAL ELEGANCE & CONTEMPORARY ARCHIVE",
  freeShippingThreshold: 50000,
  defaultShippingFee: 3000,
  coupons: {
    "AURA10": { type: "percent", value: 10, name: "신규회원 10% 웰컴 쿠폰" },
    "WELCOME5000": { type: "fixed", value: 5000, name: "첫 구매 5,000원 할인 쿠폰" },
    "SPRING2026": { type: "percent", value: 15, name: "시즌 스페셜 15% 쿠폰" }
  }
};

const PRODUCTS = [
  // --- OUTERWEAR ---
  {
    id: 1,
    name: "미니멀 캐시미어 블렌드 싱글 코트",
    engName: "Minimal Cashmere Single Coat",
    category: "outer",
    categoryName: "아우터",
    price: 289000,
    originalPrice: 340000,
    discountRate: 15,
    isNew: true,
    isBest: true,
    rating: 4.9,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Oatmeal Beige", code: "#dfd6c8" },
      { name: "Deep Charcoal", code: "#363636" },
      { name: "Classic Black", code: "#1a1a1a" }
    ],
    sizes: ["S", "M", "L"],
    summary: "최고급 호주산 울 80%와 몽골리안 캐시미어 20% 블렌딩으로 극상의 부드러움과 우아한 실루엣을 선사합니다.",
    details: [
      "자연스럽게 떨어지는 드롭 숄더 라인의 세미 오버핏 실루엣",
      "자체 개발한 천연 소뿔 단추 각인 디테일",
      "고밀도 정전기 방지 벰버그 안감 적용",
      "드라이클리닝 권장 (울 마크 인증)"
    ],
    stock: 7
  },
  {
    id: 2,
    name: "클래식 릴랙스드 트렌치 코트",
    engName: "Relaxed Double Trench Coat",
    category: "outer",
    categoryName: "아우터",
    price: 219000,
    originalPrice: 249000,
    discountRate: 12,
    isNew: false,
    isBest: true,
    rating: 4.8,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Sand Khaki", code: "#c5b79d" },
      { name: "Midnight Navy", code: "#1e2838" }
    ],
    sizes: ["S", "M", "L"],
    summary: "방수/방풍 가공된 탄탄한 코튼 개버딘 소재로 간절기 데일리 룩의 완벽한 밸런스를 잡아줍니다.",
    details: [
      "생활 방수 기능이 적용된 프리미엄 트윌 코튼 100%",
      "벨티드 허리 밴드로 다양한 스타일링 연출 가능",
      "탈부착 가능한 넥 비조 디테일"
    ],
    stock: 12
  },
  {
    id: 3,
    name: "헤비 게이지 집업 울 가디건",
    engName: "Heavy Gauge Zip-up Wool Cardigan",
    category: "outer",
    categoryName: "아우터",
    price: 158000,
    originalPrice: 175000,
    discountRate: 10,
    isNew: true,
    isBest: false,
    rating: 4.7,
    reviewCount: 64,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Ecru Ivory", code: "#f5f3ec" },
      { name: "Olive Green", code: "#5d6756" },
      { name: "Charcoal Melange", code: "#444444" }
    ],
    sizes: ["M", "L", "XL"],
    summary: "도톰한 5게이지 립조직으로 가을부터 초겨울까지 단독 및 아우터형 이너로 손쉽게 매치할 수 있습니다.",
    details: [
      "부드러운 메리노울 100% 립 조직 니트",
      "2-Way YKK 니켈 지퍼 적용으로 실루엣 조절 가능",
      "밑단과 소매의 탄탄한 스판사 마감"
    ],
    stock: 15
  },
  {
    id: 4,
    name: "소프트 스웨이드 오버 셔켓",
    engName: "Soft Suede Over Shirt Jacket",
    category: "outer",
    categoryName: "아우터",
    price: 168000,
    originalPrice: 198000,
    discountRate: 15,
    isNew: false,
    isBest: false,
    rating: 4.8,
    reviewCount: 41,
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Caramel Brown", code: "#8d5836" },
      { name: "Muted Taupe", code: "#9e9185" }
    ],
    sizes: ["M", "L"],
    summary: "유연하고 벨벳 같은 터치감의 비건 스웨이드로 가볍고 감각적인 레이어링을 완성합니다.",
    details: [
      "친환경 에코 스웨이드 100%",
      "체스트 플랩 포켓 및 사이드 히든 웰트 포켓",
      "여유 있는 실루엣으로 이너 두께에 구애받지 않음"
    ],
    stock: 9
  },

  // --- TOPS ---
  {
    id: 5,
    name: "엑스트라 파인 메리노울 터틀넥",
    engName: "Extra Fine Merino Wool Turtleneck",
    category: "tops",
    categoryName: "상의",
    price: 89000,
    originalPrice: 99000,
    discountRate: 10,
    isNew: true,
    isBest: true,
    rating: 4.9,
    reviewCount: 231,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Pure Ivory", code: "#fcfbfa" },
      { name: "Camel", code: "#a67b5b" },
      { name: "Pitch Black", code: "#141414" }
    ],
    sizes: ["S", "M", "L"],
    summary: "극세 19.5마이크론의 최고급 메리노울사로 피부 자극 없이 부드럽게 감싸주는 데일리 터틀넥입니다.",
    details: [
      "홀가먼트 무봉제 편직으로 솔기 없이 편안한 착용감",
      "목 답답함이 없는 텐션 조절 골지 넥라인",
      "세탁 후에도 변형이 적은 안티필링 가공"
    ],
    stock: 25
  },
  {
    id: 6,
    name: "오가닉 옥스포드 오버핏 셔츠",
    engName: "Organic Oxford Relaxed Shirt",
    category: "tops",
    categoryName: "상의",
    price: 79000,
    originalPrice: 89000,
    discountRate: 11,
    isNew: false,
    isBest: true,
    rating: 4.8,
    reviewCount: 180,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Sky Blue", code: "#c2d7eb" },
      { name: "Clean White", code: "#ffffff" },
      { name: "Fine Stripe", code: "#8aa2b8" }
    ],
    sizes: ["S", "M", "L", "XL"],
    summary: "GOTS 인증 100% 오가닉 코튼 옥스포드 조직으로 제작되어 계절에 구애받지 않고 착용 가능합니다.",
    details: [
      "고밀도 40수 2합 탄탄한 옥스포드 패브릭",
      "바이오 워싱을 거쳐 자연스러운 구김과 부드러운 촉감",
      "정교한 스티치 간격과 자개 단추"
    ],
    stock: 18
  },
  {
    id: 7,
    name: "미니멀 하프집업 코튼 스웨트셔츠",
    engName: "Minimal Half-Zip Cotton Sweatshirt",
    category: "tops",
    categoryName: "상의",
    price: 94000,
    originalPrice: 110000,
    discountRate: 14,
    isNew: true,
    isBest: false,
    rating: 4.7,
    reviewCount: 77,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Melange Grey", code: "#b5b5b5" },
      { name: "Forest Green", code: "#2e4738" },
      { name: "Charcoal", code: "#3a3a3a" }
    ],
    sizes: ["M", "L", "XL"],
    summary: "헤비웨이트 프렌치 테리 원단으로 각 잡힌 실루엣과 고급스러운 실버 하프집업 포인트.",
    details: [
      "780g 고중량 코튼 100% 쭈리 원단",
      "텐타 덤블 가공으로 세탁 후 수축률 1% 미만 최소화",
      "고급 니켈 슬라이더 지퍼 채택"
    ],
    stock: 11
  },
  {
    id: 8,
    name: "실키 텐셀 밴드칼라 셔츠",
    engName: "Silky Tencel Band Collar Shirt",
    category: "tops",
    categoryName: "상의",
    price: 84000,
    originalPrice: 94000,
    discountRate: 10,
    isNew: false,
    isBest: false,
    rating: 4.6,
    reviewCount: 52,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Warm Beige", code: "#d9cdb8" },
      { name: "Sage Mist", code: "#a9b5a0" }
    ],
    sizes: ["S", "M", "L"],
    summary: "유칼립투스 나무 추출물 텐셀과 코튼의 조화로 찰랑이는 실루엣과 통기성을 자랑합니다.",
    details: [
      "텐셀 65%, 코튼 35% 드레이프 블렌드",
      "정갈한 밴드 칼라 디자인으로 모던한 인상",
      "히든 플래킷(숨김 단추) 디테일"
    ],
    stock: 14
  },

  // --- BOTTOMS ---
  {
    id: 9,
    name: "와이드 핏 투턱 울 슬랙스",
    engName: "Wide Two-Tuck Wool Slacks",
    category: "bottoms",
    categoryName: "하의",
    price: 129000,
    originalPrice: 149000,
    discountRate: 13,
    isNew: true,
    isBest: true,
    rating: 4.9,
    reviewCount: 312,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Charcoal Grey", code: "#3a3d40" },
      { name: "Black", code: "#181818" },
      { name: "Mocha Brown", code: "#59483b" }
    ],
    sizes: ["S (28-29)", "M (30-31)", "L (32-33)"],
    summary: "깊은 투턱 플리츠 디테일이 걸을 때마다 매력적인 드레이프감을 연출하는 베스트셀러 슬랙스입니다.",
    details: [
      "울 50%, 폴리 45%, 스판 5% 구김 방지 스트레치 소재",
      "허리 내부 실리콘 밴드로 셔츠 흘러내림 방지",
      "자연스럽게 신발 위를 덮는 감각적인 풀렝스 기장"
    ],
    stock: 20
  },
  {
    id: 10,
    name: "스트레이트 로우 데님 진",
    engName: "Straight Raw Selvedge Denim",
    category: "bottoms",
    categoryName: "하의",
    price: 119000,
    originalPrice: 139000,
    discountRate: 14,
    isNew: false,
    isBest: true,
    rating: 4.8,
    reviewCount: 154,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Deep Indigo", code: "#1c2a43" },
      { name: "Washed Black", code: "#2e2e2e" }
    ],
    sizes: ["28", "30", "32", "34"],
    summary: "13.5oz 전통 셀비지 방식의 탄탄한 생지 데님으로 착용할수록 체형에 맞추어 페이딩되는 멋을 가집니다.",
    details: [
      "오리지널 100% 코튼 셀비지 라인 롤업 포인트",
      "빈티지 브라스 리벳 및 버튼 플라이 마감",
      "체인스티치 밑단 봉제로 높은 내구성"
    ],
    stock: 16
  },
  {
    id: 11,
    name: "릴랙스드 코튼 이지 카고 팬츠",
    engName: "Relaxed Cotton Easy Cargo Pants",
    category: "bottoms",
    categoryName: "하의",
    price: 98000,
    originalPrice: 115000,
    discountRate: 15,
    isNew: true,
    isBest: false,
    rating: 4.7,
    reviewCount: 88,
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Dusty Khaki", code: "#8c8774" },
      { name: "Washed Charcoal", code: "#424242" }
    ],
    sizes: ["M (29-31)", "L (32-34)"],
    summary: "허리 밴딩과 드로우스트링으로 편안하면서도 입체 플리츠 카고 포켓으로 트렌디한 무드를 줍니다.",
    details: [
      "탄탄한 고밀도 코튼 립스탑 조직",
      "밑단 스트링 조절로 조거 팬츠 스타일 투웨이 연출",
      "편안한 허리 전체 밴딩 디테일"
    ],
    stock: 10
  },

  // --- BAGS & SHOES ---
  {
    id: 12,
    name: "아틀리에 베지터블 레더 토트백",
    engName: "Atelier Vegetable Leather Tote",
    category: "bags",
    categoryName: "가방/슈즈",
    price: 248000,
    originalPrice: 280000,
    discountRate: 11,
    isNew: true,
    isBest: true,
    rating: 5.0,
    reviewCount: 93,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Natural Cognac", code: "#7b4b2a" },
      { name: "Obsidian Black", code: "#1a1a1a" }
    ],
    sizes: ["One Size (15인치 랩탑 수납)"],
    summary: "이탈리아산 천연 베지터블 태닝 풀그레인 소가죽으로 에이징될수록 기품 있는 윤광이 살아납니다.",
    details: [
      "이탈리아 바달라시 카를로 사 베지터블 가죽 100%",
      "내부 맥북 16인치 보호 슬리브 및 지퍼 포켓",
      "마그네틱 히든 클로저 & 황동 하드웨어"
    ],
    stock: 5
  },
  {
    id: 13,
    name: "미니멀 슬릭 레더 크로스바디",
    engName: "Minimal Sleek Leather Crossbody",
    category: "bags",
    categoryName: "가방/슈즈",
    price: 159000,
    originalPrice: 179000,
    discountRate: 11,
    isNew: false,
    isBest: true,
    rating: 4.9,
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Noir Black", code: "#181818" },
      { name: "Olive Moss", code: "#4c5344" }
    ],
    sizes: ["One Size (컴팩트 데일리)"],
    summary: "간결한 곡선 쉐입과 슬림한 가죽 스트랩으로 일상 속 스마트폰과 지갑, 소지품을 우아하게 보관합니다.",
    details: [
      "스크래치에 강한 프리미엄 세미글로스 카프스킨",
      "길이 조절 가능한 히든 핀 버클 스트랩",
      "스웨이드 안감과 카드 슬롯 내장"
    ],
    stock: 8
  },
  {
    id: 14,
    name: "클래식 페니 로퍼 & 비브람 솔",
    engName: "Classic Vibram Sole Penny Loafer",
    category: "bags",
    categoryName: "가방/슈즈",
    price: 215000,
    originalPrice: 245000,
    discountRate: 12,
    isNew: true,
    isBest: false,
    rating: 4.8,
    reviewCount: 79,
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Polished Black", code: "#121212" },
      { name: "Deep Burgundy", code: "#4c1a24" }
    ],
    sizes: ["245", "250", "255", "260", "265", "270", "275", "280"],
    summary: "이탈리아 비브람(Vibram)사의 경량 아웃솔을 적용하여 전통 로퍼의 드레시함에 스니커즈급 편안함을 더했습니다.",
    details: [
      "부드러운 최상급 복스 카프스킨 외피",
      "오랜 보행에도 피로를 덜어주는 메모리폼 쿠셔닝 인솔",
      "접지력과 내마모성이 뛰어난 비브람 모어플렉스 솔"
    ],
    stock: 12
  },

  // --- LIFESTYLE OBJECTS ---
  {
    id: 15,
    name: "핸드크래프트 세라믹 인센스 홀더 & 트레이",
    engName: "Handcrafted Ceramic Incense Tray",
    category: "lifestyle",
    categoryName: "라이프 오브제",
    price: 46000,
    originalPrice: 52000,
    discountRate: 11,
    isNew: true,
    isBest: true,
    rating: 4.9,
    reviewCount: 205,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Stone White", code: "#eae6df" },
      { name: "Charcoal Clay", code: "#4f4e4a" }
    ],
    sizes: ["단일 규격 (22 x 8 cm)"],
    summary: "도예 작가의 손길로 빚어낸 매트한 질감의 세라믹 트레이로 공간에 고요한 휴식을 선사합니다.",
    details: [
      "1250도 고온 소성으로 단단하고 위생적인 백자토/청자토",
      "선향 및 죽향 모두 거치 가능한 황동 홀더 기본 포함",
      "인센스 스틱 재가 밖으로 흐르지 않는 넉넉한 와이드 트레이"
    ],
    stock: 22
  },
  {
    id: 16,
    name: "포레스트 우디 센티드 캔들 (280g)",
    engName: "Deep Forest Woody Soy Candle",
    category: "lifestyle",
    categoryName: "라이프 오브제",
    price: 39000,
    originalPrice: 45000,
    discountRate: 13,
    isNew: false,
    isBest: true,
    rating: 4.9,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Amber Glass", code: "#916027" }
    ],
    sizes: ["280g (약 55시간 연소)"],
    summary: "편백나무와 시더우드, 흙내음이 어우러진 묵직하고 차분한 시그니처 우디 향 소이캔들.",
    details: [
      "100% 천연 미국산 소이왁스와 프리미엄 에센셜 오일 블렌딩",
      "타닥타닥 타는 소리가 매력적인 친환경 우드윅(나무 심지)",
      "유해 물질 불검출 안전 인증 완료"
    ],
    stock: 30
  },
  {
    id: 17,
    name: "미니멀 아치형 브라스 데스크 램프",
    engName: "Minimalist Brass Arc Desk Lamp",
    category: "lifestyle",
    categoryName: "라이프 오브제",
    price: 135000,
    originalPrice: 159000,
    discountRate: 15,
    isNew: true,
    isBest: false,
    rating: 4.8,
    reviewCount: 45,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Brushed Brass", code: "#c9a45c" },
      { name: "Matte Black", code: "#2b2b2b" }
    ],
    sizes: ["높이 38cm x 베이스 14cm"],
    summary: "정제된 기하학적 형태와 은은한 간접 조명으로 서재와 침실에 포근한 분위기를 연출합니다.",
    details: [
      "황동 헤어라인 피니시 본체 & 알루미늄 갓",
      "3단계 터치 디밍 (취침등 / 독서등 / 업무등 조절 가능)",
      "눈 피로를 줄여주는 플리커 프리 warm LED 내장 (3000K)"
    ],
    stock: 9
  },
  {
    id: 18,
    name: "오가닉 워시드 린넨 베딩 세트 (Q)",
    engName: "Organic Washed Linen Bedding Set",
    category: "lifestyle",
    categoryName: "라이프 오브제",
    price: 189000,
    originalPrice: 220000,
    discountRate: 14,
    isNew: false,
    isBest: true,
    rating: 4.9,
    reviewCount: 119,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Oatmeal Flax", code: "#d8cfbf" },
      { name: "Muted Olive", code: "#6c7263" },
      { name: "Cloud White", code: "#f5f5f5" }
    ],
    sizes: ["Queen (이불커버 200x230 + 베개커버 2EA)"],
    summary: "프랑스 노르망디산 최고급 린넨을 스톤워싱하여 사계절 내내 쾌적하고 포근한 수면을 돕습니다.",
    details: [
      "100% 프렌치 린넨 원사",
      "통기성과 흡습성이 뛰어나 사계절 쾌적한 온도 유지",
      "세탁할수록 더욱 부드러워지는 프리미엄 가공"
    ],
    stock: 6
  }
];

// Lookbook / Editorial Stories
const EDITORIALS = [
  {
    id: 1,
    tag: "EDITORIAL 01",
    title: "Silence & Form : 비움에서 시작되는 일상의 미학",
    desc: "불필요한 디테일을 덜어내고 소재 본연의 감촉과 실루엣에 집중한 2026 아카이브 컬렉션.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    tag: "EDITORIAL 02",
    title: "The Art of Slow Living : 공간과 사람을 잇는 오브제",
    desc: "자연의 질감을 닮은 세라믹과 은은한 향기로 일상에 깊은 쉼을 전하는 홈 라이프스타일 큐레이션.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    tag: "EDITORIAL 03",
    title: "Time-Honored Craft : 시간이 빚어내는 가치",
    desc: "숙련된 가죽 장인의 섬세한 손길로 완성되어 손때가 묻을수록 아름다워지는 레더 시리즈.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
  }
];

// Customer Reviews
const REVIEWS = [
  {
    id: 1,
    author: "김*진 님",
    product: "미니멀 캐시미어 블렌드 싱글 코트",
    rating: 5,
    date: "2026.09.28",
    content: "원단 촉감이 백화점 고가 브랜드 못지않게 정말 부드럽고 가볍습니다. 어깨 라인이 자연스럽게 떨어져서 핏이 너무 예뻐요!",
    photo: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    author: "이*원 님",
    product: "아틀리에 베지터블 레더 토트백",
    rating: 5,
    date: "2026.09.25",
    content: "맥북 16인치도 거뜬히 들어가고 가죽 퀄리티가 환상적입니다. 가죽 고유의 향도 좋고 매일 들고 출근하고 있어요.",
    photo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    author: "박*서 님",
    product: "와이드 핏 투턱 울 슬랙스",
    rating: 5,
    date: "2026.09.22",
    content: "찰랑거리는 원단 드레이프가 완벽합니다. 주름도 잘 안 생기고 핏이 다리를 훨씬 길어보이게 만들어주네요. 다른 색상도 재구매 예정!",
    photo: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    author: "최*우 님",
    product: "포레스트 우디 센티드 캔들",
    rating: 5,
    date: "2026.09.18",
    content: "퇴근하고 불 켜두면 방 안 가득 숲속에 온 듯한 차분한 우디향이 퍼져서 힐링됩니다. 패키지도 모던하고 선물용으로도 최고예요.",
    photo: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=300&q=80"
  }
];
