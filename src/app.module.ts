import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql.sqlpub.com',
      port: 3306,
      username: 'admin_ygxb',
      password: 'YfQfBJerCJKAoGui',
      database: 'db_admin_nestjs',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoreModule,
    AuthModule,
    CatsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
