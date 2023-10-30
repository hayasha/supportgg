import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {participantProviders} from "./participant.providers";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...participantProviders
    ]
})
export class ParticipantsModule {}
