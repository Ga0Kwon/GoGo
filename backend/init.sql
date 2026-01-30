
-- 처음 프로젝트 실행할때 세팅하는 DB작업 
-- 프로덕트를 소개하는 페이지의 데이터를 저장하는 테이블

DROP TABLE IF EXISTS PRODUCTS;
CREATE TABLE IF NOT EXISTS PRODUCTS(
    pId INTEGER PRIMARY KEY AUTOINCREMENT,
    pTitle TEXT,
    pIntroduce TEXT,
    pRegDate TEXT DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO PRODUCTS (pTitle, pIntroduce) VALUES
('곳곳', '카드 결제 내역을 기반으로 방문지를 자동으로 지도에 기록해주는 서비스'),
('부동산 서비스 비교', '직방과 다방 - 주요 부동산 서비스의 기능을 비교 분석한 프로젝트'),
('호갱노노 벤치마킹', '호갱노노 서비스의 주요 기능을 벤치마킹한 프로젝트');

-- 프로덕트 정보를 나열해서 소개하는 글 
CREATE TABLE IF NOT EXISTS PRODUCTS_DETAIL(
    pdId INTEGER PRIMARY KEY AUTOINCREMENT,
    pId INTEGER, -- 프로덕트 외래키
    pdContents TEXT,
    pdOdr TEXT
);

-- 사용자 이벤트 저장하는 테이블
CREATE TABLE IF NOT EXISTS USER_EVENTS(
    ueEventName TEXT,
    ueClientId TEXT, -- 로그인 정보가 없을 예정이여서 브라우저 고유 UUID를 생성해서 넣을 예정
    uePageLocation TEXT,
    uePageTitle TEXT,
    ueBrower TEXT,
    ueOs TEXT,
    usDeviceCategory TEXT,
    ueParams TEXT, -- GA4 이벤트 파라미터 기반이라서 json.parse로 꺼내 쓸 예정
    ueEventTime TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 프로덕트 첨부파일 저장하는 테이블
CREATE TABLE IF NOT EXISTS PRODUCT_ATTCHS(
    aId INTEGER PRIMARY KEY AUTOINCREMENT,
    pdId INTEGER, -- 프로덕트 정보 입력시 첨부파일 저장
    aPath TEXT, -- 첨부파일 경로
    aType TEXT -- 첨부파일 확장자
);

DROP TABLE IF EXISTS PAYLIST;
-- 결제한 이력(장소)를 저장하는 테이블
CREATE TABLE IF NOT EXISTS PAYLIST(
    pyId INTEGER PRIMARY KEY AUTOINCREMENT,
    storeName TEXT,
    cId TEXT,
    detailAddress TEXT,
    latitude REAL,
    longitude REAL,
    score INTEGER DEFAULT 0,
    regDate TEXT DEFAULT CURRENT_TIMESTAMP,
    comments TEXT, 
    price INTEGER DEFAULT 0,
    regYN TEXT DEFAULT 'N'
);

INSERT INTO PAYLIST ( storeName, cId, detailAddress, latitude, longitude, score, comments, price, regYN) 
VALUES
('성수 커피랩', 'CE7', '서울 성동구 성수이로 22길 37', 37.544574,  127.055948,  4, '분위기 좋고 조용함', 5500, 'Y'),
('왕십리 파스타하우스', 'FD6', '서울 성동구 왕십리로 410', 37.561934, 127.037033, 5, '양 많고 가성비 좋음', 13000, 'Y'),
('서울숲 베이커리', 'CE7','서울 성동구 서울숲길 45', 37.544920, 127.037687, 3, '빵은 무난, 커피는 아쉬움', 4800, 'Y'),
('카페 마트리', 'CE7','서울 성동구 성수동1가 668-27', 37.547395535930214, 127.04290845695763, 4, '딸기 디저트 맛있음', 15600, 'Y'),
('성수 피자집', 'FD6','서울 성동구 성수일로8길 20', 37.544167, 127.056111, 5, '도우가 쫄깃하고 토핑이 풍부함', 15000, 'Y'),
('전자방', 'FD6','서울 성동구 성수동2가 299-157', 37.5483236456871, 127.053720541592, null, '', 12000, 'N'),
('성수일미락', 'FD6','서울 성동구 상원6나길 22-20', 37.5476379688892, 127.04964170764333, null, '', 56000, 'N'),
('고니스', 'FD6','서울 성동구 성수동1가 668-105', 37.5464053050174, 127.042999548709, null, '', 24800, 'N'),
('엘로코 성수', 'FD6','서울 성동구 성수동2가 250-1', 37.5400951573186, 127.062209949699, null, '', 86000, 'N');

-- 결제한 이력(장소)의 카테고리를 저장하는 테이블
DROP TABLE IF EXISTS PAYLIST_CATEGORIES;
CREATE TABLE IF NOT EXISTS PAYLIST_CATEGORIES(
    cId TEXT PRIMARY KEY ,
    cName TEXT
);
INSERT INTO PAYLIST_CATEGORIES (cId, cName) VALUES
('MT1', '대형마트'),
('CS2', '편의점'),
('PS3', '어린이집, 유치원'),
('SC4', '학교'),
('AC5', '학원'),
('PK6', '주차장'),
('OL7', '주유소, 충전소'),
('SW8', '지하철역'),
('BK9', '은행'),
('CT1', '문화시설'),
('AG2', '중개업소'),
('PO3', '공공기관'),
('AT4', '관광명소'),
('AD5', '숙박'),
('FD6', '음식점'),
('CE7', '카페'),
('HP8', '병원'),
('PM9', '약국');

-- 서비스 만족도 조사를 저장하는 테이블
DROP TABLE IF EXISTS SERVICE_SURVEY;
CREATE TABLE IF NOT EXISTS SERVICE_SURVEY (
  ssId INTEGER PRIMARY KEY AUTOINCREMENT,
  deviceId TEXT,   -- 로그인 없으니 필수
  answer TEXT, 
  regDate TEXT DEFAULT CURRENT_TIMESTAMP
);