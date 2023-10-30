import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import {ConfigModule} from "@nestjs/config";
import {DataSource} from "typeorm";
import { ParticipantsModule } from './participants/participants.module';
import { GameModule } from './game/game.module';
import {RoomModule} from "./room/room.module";
import {DatabaseModule} from "./database/database.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        DatabaseModule,
        UsersModule,
        RoomModule,
        ParticipantsModule,
        GameModule
    ],
    controllers: []
})
export class AppModule {
    constructor() {}
}
