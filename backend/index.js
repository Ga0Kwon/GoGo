import dotenv from "dotenv";
dotenv.config(); // ⬅️ 최상단

import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


const app = express()
app.use(cors())
app.use(express.json())

let db

async function initDB() {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}

app.get('/api/selectProducts', async (req, res) => {
  const rows = await db.all('SELECT * FROM PRODUCTS')
  res.json(rows)
})

app.get('/api/selectPayLocations', async (req, res) => {
  const rows = await db.all('SELECT * FROM PAYLIST INNER JOIN PAYLIST_CATEGORIES ON PAYLIST.cId = PAYLIST_CATEGORIES.cId WHERE regYN="Y"')
  res.json(rows)
})

app.get('/api/selectNoRegisterList', async (req, res) => {
  const rows = await db.all('SELECT * FROM PAYLIST INNER JOIN PAYLIST_CATEGORIES ON PAYLIST.cId = PAYLIST_CATEGORIES.cId WHERE regYN="N"')
  res.json(rows)
})

app.get('/api/selectProjects', async (req, res) => {
  const rows = await db.all('SELECT * FROM PROJECTS')
  res.json(rows)
})

app.post('/api/updateStarScore', async (req, res) => {
  const { pyId, score, comments } = req.body;

  console.log("별점 등록 요청 데이터:", req.body);

  const result = await db.run(
    'UPDATE PAYLIST SET score = ?, comments = ?, regYN = "Y" WHERE pyId = ?',
    [score, comments, pyId]
  );

  res.json({ success: true, changes: result.changes });
});

app.get("/api/searchKakaoApi", async (req, res) => {
  const query = req.query.query;

  console.log("Kakao API 검색어:", query);

  const result = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_KEY}`,
        KA: "sdk/1.0 os/nodejs lang/js origin/localhost"
      },
    }
  );

  const data = await result.json();
  res.json(data);
});

app.post("/api/insertNearKakaoApi", async (req, res) => {
  try {
    const { query, category_group_code, x, y, radius = 5000, size = 3, sort = "distance" } = req.body;

    const params = new URLSearchParams({
      query,
      x,      // 경도
      y,      // 위도
      radius,
      size,
      sort,
      category_group_code,
    });

    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?${params.toString()}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_KEY}`,
        },
      }
    );

    const kakaoData = await response.json();
    const docs = kakaoData.documents || [];

    let insertedCount = 0;

    for (const place of docs) {
      // 가격 랜덤 (8,000 ~ 80,000 / 100원 단위)
      const price =
        Math.floor((Math.random() * (80000 - 8000)) / 100) * 100 + 8000;

      //이미 등록한 가게의 경우 등록 안함
      const sql = `
        INSERT INTO PAYLIST
          (storeName, cId, detailAddress, latitude, longitude, regDate, price, regYN)
        SELECT
          ?, ?, ?, ?, ?, datetime('now'), ?, 'N'
        WHERE NOT EXISTS (
          SELECT 1
          FROM PAYLIST
          WHERE storeName = ?
            AND latitude = ?
            AND longitude = ?
            AND regYN = 'N'
        );
      `;

      const params = [
        place.place_name,
        place.category_group_code,
        place.address_name,
        place.y, 
        place.x, 
        price,
        place.place_name,
        place.y,
        place.x,
      ];

      const result = await db.run(sql, params);

      if (result.changes > 0) insertedCount++;
    }

    res.json({
      success: true,
      total: docs.length,
      inserted: insertedCount,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kakao API error" });
  }
});

//설문 노출 여부 체크
app.post("/api/checkSurvey", async (req, res) => {
  const { deviceId } = req.body;

  if (!deviceId) {
    return res.status(400).json({ message: "deviceId is required" });
  }

  const row = await db.get(
    "SELECT COUNT(*) AS cnt FROM SERVICE_SURVEY WHERE deviceId = ?",
    [deviceId]
  );

  const exists = row?.cnt > 0 ? 1 : 0;

  res.json({ success: true, exists: exists });

});

//설문 저장
app.post("/api/saveSurvey", async (req, res) => {
  const { deviceId, answer } = req.body;

  
  if (!deviceId || !answer) {
    return res.status(400).json({ message: "deviceId and answer are required" });
  }

  const result = await db.run(
    'INSERT INTO SERVICE_SURVEY (deviceId, answer) VALUES (?, ?)',
    [deviceId, answer]
  );
  
  res.json({ success: true, changes: result.changes, result : result });

});


app.listen(3001, async () => {
  await initDB()
  console.log('Backend running on http://localhost:3001')
})
