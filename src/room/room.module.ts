import {DatabaseModule} from "../database/database.module";
import {Module} from "@nestjs/common";
import {roomProviders} from "./room.providers";
import {RoomService} from "./room.service";
import {RoomController} from "./room.controller";
import {RiotModule} from "../riot/riot.module";
import {gameProviders} from "../game/game.providers";
import {Participant} from "../participants/participant.entity";
import {participantProviders} from "../participants/participant.providers";

@Module({
    imports: [
        DatabaseModule,
        RiotModule
    ],
    providers: [
        ...roomProviders,
        ...gameProviders,
        ...participantProviders,
        RoomService
    ],
    controllers: [RoomController]
})
export class RoomModule {}