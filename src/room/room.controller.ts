import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RiotService} from "../riot/riot.service";
import {RoomService} from "./room.service";
import {Room} from "./room.entity";

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post()
    public async create(@Body() body: any) {
        const room: Room = new Room(
            body["summonerName"],
            body["puuid"],
            body["summonerId"],
            body["password"]
        )
        const entryCode: string = await this.roomService.create(room)

        // Todo: ResponseDTO
        return {
            code: 201,
            message: "Room created",
            data: {
                summonerId: room["hostPuuid"],
                puuid: room["hostPuuid"],
                summonerName: room["hostName"],
                entryCode: entryCode
            }
        }
    }
}
