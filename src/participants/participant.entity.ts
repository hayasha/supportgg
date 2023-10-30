import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "../game/game.entity";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gameId: number

    @Column()
    summonerId: string

    @Column()
    summonerPuuid: string

    @Column()
    summonerName: string

    @Column()
    teamId: string

    @Column({ default: false })
    ionianBoots: boolean

    @Column({ nullable: true })
    spell1: number

    @Column({ nullable: true })
    spell2: number

    @ManyToOne(() => Game, game => game.participants)
    game: Game

    constructor(gameId: number, summonerId: string, summonerName: string, summonerPuuid: string, teamId: string) {
        this.gameId = gameId
        this.summonerId = summonerId
        this.summonerName = summonerName
        this.summonerPuuid = summonerPuuid
        this.teamId = teamId
    }
}