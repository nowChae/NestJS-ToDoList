import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres', // 데이터베이스 종류 (예: postgres, mysql, ...)
  host: process.env.DB_HOST, // 데이터베이스 호스트 주소
  port: Number.parseInt(process.env.DB_PORT, 10), // 데이터베이스 포트 번호
  username: process.env.DB_USERNAME, // 데이터베이스 사용자 이름
  password: process.env.DB_PASSWORD, // 데이터베이스 암호
  database: process.env.DB_DATABASE, // 연결할 데이터베이스 이름
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티 파일 위치
  synchronize: true, // 애플리케이션 실행 시 데이터베이스 스키마 자동 동기화 여부
};
