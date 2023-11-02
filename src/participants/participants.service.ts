import {Inject, Injectable} from '@nestjs/common';
import {Participant} from "./participant.entity";
import {Repository} from "typeorm";

@Injectable()
export class ParticipantsService {
    constructor(
        @Inject('PARTICIPANT_REPOSITORY')
        private participantRepository: Repository<Participant>
    ) {}

    async boots(participantId: number, ionianBoots: boolean) {
        const player = await this.participantRepository.findOneBy({ id: participantId })
        if (!player) {
            throw new Error("player " + participantId + " not found")
        }

        player.ionianBoots = ionianBoots
        return await this.participantRepository.save(player)
    }

    async spell(participantId: number, spellNumber: number, spellTime: number) {
        const player = await this.participantRepository.findOneBy({ id: participantId })
        if (!player) {
            throw new Error("player " + participantId + " not found")
        }

        if (spellNumber == 1) {
            player.time1 = spellTime
        }
        if (spellNumber == 2) {
            player.time2 = spellTime
        }

        return await this.participantRepository.save(player)
    }
}
