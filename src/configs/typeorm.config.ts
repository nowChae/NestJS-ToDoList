import { TypeOrmModuleOptions } from "@nestjs/typeorm";

 export const typeORMConfig : TypeOrmModuleOptions = {
   type: 'postgres', // 데이터베이스 종류 (예: postgres, mysql, ...)
   host: 'localhost', // 데이터베이스 호스트 주소
   port: 5432, // 데이터베이스 포트 번호
   username: 'postgres', // 데이터베이스 사용자 이름
   password: 'postgres', // 데이터베이스 암호
   database: 'todo-app', // 연결할 데이터베이스 이름
   entities: [__dirname+ '/../**/*.entity.{js,ts}'], // 엔티티 파일 위치
   synchronize: true // 애플리케이션 실행 시 데이터베이스 스키마 자동 동기화 여부
 }
 