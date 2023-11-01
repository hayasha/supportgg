import {Inject, Injectable} from "@nestjs/common";
import {Room} from "./room.entity";
import {QueryRunner, Repository} from "typeorm";
import {RiotService} from "../riot/riot.service";
import {Game} from "../game/game.entity";
import {Participant} from "../participants/participant.entity";
import {firstValueFrom} from "rxjs";

@Injectable()
export class RoomService {
    constructor(
       @Inject('ROOM_REPOSITORY')
       private roomRepository: Repository<Room>,
       @Inject('GAME_REPOSITORY')
       private gameRepository: Repository<Game>,
       @Inject('PARTICIPANT_REPOSITORY')
       private participantRepository: Repository<Participant>,
       private riotService: RiotService
    ) {}

    async create(room: Room): Promise<string> {
        await this.roomRepository.save(room)
        return room.entryCode
    }

    async gameOn(entryCode: string) {
        const room: Room|null = await this.roomRepository.findOne({
            where: { entryCode },
            relations: {
                games: true
            }
        })
        if (!room) {
            throw new Error("No room found for the entry code");
        }

        const hostId: string = room.hostId
        const currentGame = await firstValueFrom(this.riotService.findCurrentGame(hostId))
        console.log(currentGame.participants[0].perks)
        // Delete Previous Games
        for (const game of room.games) {
            if (game.gameRiotId != currentGame.gameId && !game.isDeleted) {
                game.isDeleted = true
                await this.gameRepository.save(game)
            }
        }

        const queryRunner: QueryRunner = this.roomRepository.manager.connection.createQueryRunner()
        await queryRunner.startTransaction()
        try {
            const isGameExist
                = await this.gameRepository.findOneBy({ gameRiotId: currentGame.gameId, roomId: room.id })

            if (!isGameExist) {
                // Link current game to the room
                const game: Game = new Game(room.id, currentGame.gameId)
                await this.gameRepository.save(game)

                // Link participants to the current game
                for (const participant of currentGame["participants"]) {
                    const player: Participant = new Participant(
                        game.id,
                        participant.summonerId,
                        participant.summonerName,
                        participant.puuid,
                        participant.championId,
                        participant.profileIconId,
                        participant.teamId,
                        participant.spell1Id,
                        participant.spell2Id,
                        participant.perks.perkIds
                    )
                    await this.participantRepository.save(player)
                }
            }

            await queryRunner.commitTransaction()
        }
        catch (error) {
            await queryRunner.rollbackTransaction()
        }
        finally {
            await queryRunner.release()
        }

        return await this.gameRepository.findOne({
            where: { roomId: room.id, isDeleted: false },
            relations: { participants: true }
        })
    }
}