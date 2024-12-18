-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS popsopt;

-- 생성한 데이터베이스 사용
USE popsopt;

-- popups 테이블 생성
CREATE TABLE IF NOT EXISTS popups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    publicUrl VARCHAR(2083),
    imagePath VARCHAR(255),
    views INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO popups (title, description, address, startDate, endDate, startTime, endTime, publicUrl, views, createdAt)
VALUES 
('서울 팝업 아트 갤러리', '현대 아트 작품 전시회', '서울시 강남구 청담동 123', '2024-01-15', '2024-02-15', '10:00', '20:00', 'https://artgallery.com', 150, '2023-12-01 09:00:00'),

('제주 커피 팝업 스토어', '제주도 로컬 커피 체험', '제주시 애월읍 456', '2024-02-01', '2024-02-28', '11:00', '21:00', 'https://jejucoffee.com', 80, '2023-12-05 14:30:00'),

('부산 푸드 트럭 페스티벌', '다양한 푸드트럭 모음', '부산시 해운대구 789', '2024-03-10', '2024-03-20', '12:00', '22:00', 'https://busanfoodfest.com', 220, '2023-12-10 11:15:00'),

('대구 빈티지 의류 팝업', '레트로 스타일 의류 판매', '대구시 중구 동성로 101', '2024-04-05', '2024-04-25', '11:30', '19:30', 'https://vintagepopup.com', 95, '2023-12-15 16:45:00'),

('인천 해변 영화제', '야외 영화 상영회', '인천시 중구 월미도 해변공원', '2024-05-20', '2024-05-30', '19:00', '23:00', 'https://incheonfilmfest.com', 180, '2023-12-20 10:00:00'),

('서울 미래기술 엑스포', '최신 기술 트렌드 전시회', '서울시 강남구 삼성동 COEX', '2025-01-10', '2025-01-20', '09:00', '18:00', 'https://seoultechexpo.com', 50, '2024-11-15 10:00:00'),

('겨울 핫초코 페스티벌', '다양한 핫초코 맛보기', '서울시 종로구 광화문광장', '2024-12-01', '2024-12-31', '11:00', '20:00', 'https://winterhotchoco.com', 120, '2024-11-20 14:30:00'),

('가을 단풍 사진전', '전국 단풍 명소 사진 전시', '부산시 해운대구 문화센터', '2024-10-15', '2024-11-15', '10:00', '19:00', 'https://autumnphotoexhibit.com', 200, '2024-09-01 09:00:00'),

('서울 패션 위크 팝업', '최신 패션 트렌드 전시', '서울시 강남구 압구정로 123', '2024-03-15', '2024-03-21', '10:00', '20:00', 'https://seoulfashionweek.com', 732, '2024-01-10 09:00:00'),

('부산 해변 책방', '바다를 보며 책 읽기', '부산시 해운대구 해운대해변로 52', '2024-07-01', '2024-08-31', '09:00', '22:00', 'https://busanbeachbooks.com', 1205, '2024-05-15 14:30:00'),

('제주 로컬 푸드 마켓', '제주 특산물 직거래', '제주시 노형동 123-45', '2024-04-10', '2024-04-20', '11:00', '19:00', 'https://jejulocalfood.com', 543, '2024-03-01 10:00:00'),

('대구 아트 페어', '지역 예술가 작품 전시', '대구시 중구 달구벌대로 2222', '2024-09-05', '2024-09-15', '10:30', '18:30', 'https://daeguartfair.com', 890, '2024-07-20 11:45:00'),

('인천 세계 음식 축제', '다양한 나라의 음식 체험', '인천시 중구 월미로 131', '2024-06-20', '2024-06-30', '12:00', '21:00', 'https://incheonworldfood.com', 1567, '2024-05-01 08:30:00'),

('광주 디지털 아트 전시', '첨단 기술과 예술의 만남', '광주시 동구 예술길 31-15', '2024-11-10', '2024-11-20', '10:00', '19:00', 'https://gwangjudigitalart.com', 678, '2024-09-25 13:20:00'),

('대전 과학 체험관', '미래 과학 기술 체험', '대전시 유성구 대학로 99', '2024-08-01', '2024-08-31', '09:30', '17:30', 'https://daejeonscience.com', 2103, '2024-06-15 09:45:00'),

('울산 조선 문화 축제', '조선 시대 문화 체험', '울산시 중구 문화의거리 34', '2024-10-05', '2024-10-15', '11:00', '20:00', 'https://ulsanculture.com', 456, '2024-08-20 16:00:00'),

('강원 겨울 스포츠 엑스포', '동계 스포츠 용품 전시', '강원도 평창군 대관령면 올림픽로 123','2024-12-10','2024-12-20','09:00','18:00','https://gangwonwintersports.com' ,1890,'2024-10-01 11:30:00'),

('경주 전통 공예 마켓','한국 전통 공예품 판매','경북 경주시 황성동 123 -45','2024 -05 -15','2024 -05 -25','10 :00','19 :00','https://gyeongjucrafts.com' ,789,'2024 -04 -01 14 :15 :00');