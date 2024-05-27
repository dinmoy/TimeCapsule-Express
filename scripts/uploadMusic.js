const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const Music = require('../models/music')(sequelize);

// 디렉토리 경로 설정 (절대 경로로 변환)
const imgDir = path.resolve(__dirname, '..', 'img');
const musicDir = path.resolve(__dirname, '..', 'music');

// 이미지 파일과 음악 파일 읽기
const imgFiles = fs.readdirSync(imgDir);
const musicFiles = fs.readdirSync(musicDir);

// 파일 이름에서 확장자를 제거하는 함수
const removeExtension = (filename) => {
    return filename.replace(/\.[^/.]+$/, "");
};

// 파일 이름에서 가수와 제목을 분리하는 함수 ("artist-title" 형식 가정)
const extractArtistAndTitle = (filename) => {
    const [artist, ...titleParts] = filename.split('-');
    const title = titleParts.join('-').trim();
    return { artist: artist.trim(), title: title.trim() };
};

// 파일을 데이터베이스에 저장
async function uploadFiles() {
    try {
        await sequelize.sync();  // 테이블 생성 (필요 시)

        for (let i = 0; i < musicFiles.length; i++) {
            const musicFile = musicFiles[i];
            const { artist, title } = extractArtistAndTitle(removeExtension(musicFile));
            const imgFile = imgFiles.find(file => {
                const { artist: imgArtist, title: imgTitle } = extractArtistAndTitle(removeExtension(file));
                return imgArtist === artist && imgTitle === title;
            });

            if (imgFile) {
                // 절대 경로 대신 상대 경로를 저장
                const musicPath = `/music/${musicFile}`;
                const imgPath = `/img/${imgFile}`;

                // 데이터베이스에 동일한 제목과 가수가 있는 음악이 이미 있는지 확인
                const existingMusic = await Music.findOne({ where: { title, artist } });

                if (!existingMusic) {
                    await Music.create({
                        title,
                        artist,
                        music_img_path: imgPath, // 상대 경로로 저장
                        music_file: musicPath // 상대 경로로 저장
                    });

                    console.log(`업로드 : ${title}-${artist}`);
                } else {
                    console.log(`이미 존재 : ${title}-${artist}`);
                }
            } else {
                console.log(`매칭 이미지 찾기 불가: ${title}-${artist}`);
            }
        }

        console.log('모든 파일 업로드 성공');
    } catch (error) {
        console.error('업로드 실패:', error);
    }
}

module.exports = uploadFiles;
