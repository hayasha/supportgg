import { Module } from '@nestjs/common';
import {RoomsController} from "./rooms.controller";
import {RiotModule} from "../riot/riot.module";

@Module({
    imports: [
        RiotModule
    ],
    controllers: [RoomsController]
})
export class RoomsModule {}
