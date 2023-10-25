import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import {ConfigModule} from "@nestjs/config";
import { RiotModule } from './riot/riot.module';
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UsersModule,
    ]
})
export class AppModule {}
