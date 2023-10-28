import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import {ConfigModule} from "@nestjs/config";
import { RiotModule } from './riot/riot.module';
import {HttpModule} from "@nestjs/axios";
import { RoomsController } from './rooms/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UsersModule,
        RoomsModule,
    ],
    controllers: []
})
export class AppModule {}
