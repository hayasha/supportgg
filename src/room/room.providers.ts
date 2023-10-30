import {Room} from "./room.entity";
import {DataSource} from "typeorm";

export const roomProviders = [
    {
        provide: 'ROOM_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
        inject: ['DATA_SOURCE']
    }
]