import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {participantProviders} from "./participant.providers";
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...participantProviders,
        ParticipantsService
    ],
    controllers: [ParticipantsController]
})
export class ParticipantsModule {}
