const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(express.json());
const port = 1125;

app.use(morgan('dev'));

// CORS 설정
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: '1234',
  // database: 'popsopt1'
  password: 'asdf123 ',
  database: 'popsopt'
});  

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB 제한
});

app.use(express.json());

// 1. 팝업 추가 (POST)
app.post('/popspot', upload.single('image'), (req, res) => {
  const { title, description, address, startDate, endDate, startTime, endTime, publicUrl } = req.body;
  const imagePath = req.file ? req.file.path : null;

  const query = 'INSERT INTO popups (title, description, address, startDate, endDate, startTime, endTime, publicUrl, imagePath, views, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW())';
  db.query(query, [title, description, address, startDate, endDate, startTime, endTime, publicUrl, imagePath], (err, result) => {
    if (err) {
      console.error('팝업 추가 오류:', err);
      res.status(500).json({ error: '서버 오류' });
    } else {
      res.status(200).json({ message: '팝업 추가 성공', id: result.insertId });
    }
  });
});

// 2. 팝업 목록 가져오기 (GET) - 정렬, 필터링, 페이징 기능 추가
app.get('/popspot', (req, res) => {
  const { sort, filter, page = 1 } = req.query;
  const itemsPerPage = 6;
  let query = 'SELECT * FROM popups';
  let countQuery = 'SELECT COUNT(*) as total FROM popups';
  let whereClause = '';
  const currentDate = new Date().toISOString().split('T')[0];

  // 2-1. 필터링 조건 추가
  if (filter === 'upcoming') {
    whereClause = ` WHERE startDate > '${currentDate}'`;
  } else if (filter === 'ongoing') {
    whereClause = ` WHERE startDate <= '${currentDate}' AND endDate >= '${currentDate}'`;
  } else if (filter === 'ended') {
    whereClause = ` WHERE endDate < '${currentDate}'`;
  }

  query += whereClause;
  countQuery += whereClause;

  // 2-2. 정렬 조건 추가
  if (sort === 'latest') {
    query += ' ORDER BY createdAt DESC';
  } else if (sort === 'endingSoon') {
    query += ' ORDER BY endDate DESC';
  } else if (sort === 'popular') {
    query += ' ORDER BY views DESC';
  }

  // 2-3. 페이징 처리
  const offset = (page - 1) * itemsPerPage;
  query += ` LIMIT ${itemsPerPage} OFFSET ${offset}`;

  db.query(countQuery, (countErr, countResults) => {
    if (countErr) {
      console.error('팝업 개수 조회 오류:', countErr);
      res.status(500).json({ error: '서버 오류' });
    } else {
      const totalItems = countResults[0].total;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      db.query(query, (err, results) => {
        if (err) {
          console.error('팝업 목록 조회 오류:', err);
          res.status(500).json({ error: '서버 오류' });
        } else {
          res.status(200).json({
            popups: results,
            currentPage: parseInt(page),
            totalPages: totalPages,
            totalItems: totalItems
          });
        }
      });
    }
  });
});

// 3. 팝업 수정 (PUT)
app.put('/popspot/:popupId', upload.single('image'), (req, res) => {
  const popupId = req.params.popupId;
  const { title, description, address, startDate, endDate, startTime, endTime, publicUrl } = req.body;
  const imagePath = req.file ? req.file.path : null;

  let query = 'UPDATE popups SET title = ?, description = ?, address = ?, startDate = ?, endDate = ?, startTime = ?, endTime = ?, publicUrl = ?';
  let params = [title, description, address, startDate, endDate, startTime, endTime, publicUrl];

  if (imagePath) {
    query += ', imagePath = ?';
    params.push(imagePath);
  }

  query += ' WHERE id = ?';
  params.push(popupId);

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('팝업 수정 오류:', err);
      res.status(500).json({ error: '서버 오류' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: '팝업 ID를 찾을 수 없음' });
    } else {
      res.status(200).json({ message: '팝업 수정 성공' });
    }
  });
});

// 4. 팝업 삭제 (DELETE)
app.delete('/popspot/:popupId', (req, res) => {
  const popupId = req.params.popupId;

  const query = 'DELETE FROM popups WHERE id = ?';
  db.query(query, [popupId], (err, result) => {
    if (err) {
      console.error('팝업 삭제 오류:', err);
      res.status(500).json({ error: '서버 오류' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: '팝업 ID를 찾을 수 없음' });
    } else {
      res.status(200).json({ message: '팝업 삭제 성공' });
    }
  });
});

// 5. 조회수 증가 함수
const incrementViews = (popupId) => {
  const query = 'UPDATE popups SET views = views + 1 WHERE id = ?';
  db.query(query, [popupId], (err) => {
    if (err) {
      console.error('조회수 증가 오류:', err);
    }
  });
};

// 6. 팝업 상세보기 API
app.get('/popspot/:popupId', (req, res) => {
  const popupId = req.params.popupId;
  const query = 'SELECT * FROM popups WHERE id = ?';
  db.query(query, [popupId], (err, results) => {
    if (err) {
      console.error('팝업 상세 조회 오류:', err);
      res.status(500).json({ error: '서버 오류' });
    } else if (results.length === 0) {
      res.status(404).json({ error: '팝업을 찾을 수 없음' });
    } else {
      incrementViews(popupId);
      res.status(200).json(results[0]);
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});