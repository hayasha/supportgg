import {Body, Controller, Patch} from '@nestjs/common';
import {ParticipantsService} from "./participants.service";

@Controller('participants')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {}

    @Patch(':participantId/spell')
    public async spell(@Body() body: any) {
        const { participantId, spellNumber, spellTime } = body
        return await this.participantsService.spell(participantId, spellNumber, spellTime)
    }

    @Patch(':participantId/ionianBoots')
    public async boots(@Body() body: any) {
        const { participantId, ionianBoots } = body
        return await this.participantsService.boots(participantId, ionianBoots)
    }
}
