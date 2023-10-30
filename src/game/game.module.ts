import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {gameProviders} from "./game.providers";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...gameProviders
    ]
})
export class GameModule {}
