import {Inject, Injectable} from "@nestjs/common";
import {Room} from "./room.entity";
import {Repository} from "typeorm";

@Injectable()
export class RoomService {
    constructor(
       @Inject('ROOM_REPOSITORY')
       private roomRepository: Repository<Room>
    ) {}

    async create(room: Room): Promise<string> {
        await this.roomRepository.save(room)
        return room.entryCode
    }
}