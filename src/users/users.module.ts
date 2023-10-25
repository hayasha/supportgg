import { Module } from '@nestjs/common';
import {UsersController} from "./users.controller";
import {RiotModule} from "../riot/riot.module";

@Module({
    imports: [
        RiotModule
    ],
    controllers: [UsersController]
})
export class UsersModule {}
