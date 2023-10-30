import {DatabaseModule} from "../database/database.module";
import {Module} from "@nestjs/common";
import {roomProviders} from "./room.providers";
import {RoomService} from "./room.service";
import {RoomController} from "./room.controller";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...roomProviders,
        RoomService
    ],
    controllers: [RoomController]
})
export class RoomModule {}