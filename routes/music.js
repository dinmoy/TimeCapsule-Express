const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Music } = require('../models');

// 모든 음악을 불러오는 엔드포인트
router.get('/', async (req, res) => {
    try {
        const musicList = await Music.findAll();
        res.json(musicList);
    } catch (error) {
        res.status(500).json({ message: '음악 불러오기 실패', error: error.message });
    }
});

// 음악 제목 또는 가수 이름으로 검색하는 엔드포인트
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const musicList = await Music.findAll({ 
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${query}%`
                        }
                    },
                    {
                        artist: {
                            [Op.like]: `%${query}%`
                        }
                    }
                ]
            } 
        });
        if (musicList.length === 0) {
            res.status(404).json({ message: '음악을 찾을 수 없음' });
            return;
        }
        res.json(musicList);
    } catch (error) {
        res.status(500).json({ message: '음악 검색 실패', error: error.message });
    }
});

module.exports = router;
