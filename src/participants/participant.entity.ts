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

    @Column()
    championId: number

    @Column()
    iconId: number

    @Column({ default: false })
    ionianBoots: boolean

    @Column()
    spell1: number

    @Column()
    spell2: number

    @Column("simple-array")
    perks: number[]

    @Column({ nullable: true })
    time1: number

    @Column({ nullable: true })
    time2: number

    @ManyToOne(() => Game, game => game.participants)
    game: Game

    constructor(
        gameId: number,
        summonerId: string,
        summonerName: string,
        summonerPuuid: string,
        championId: number,
        iconId: number,
        teamId: string,
        spell1: number,
        spell2: number,
        perks: number[]
    ) {
        this.gameId = gameId
        this.summonerId = summonerId
        this.summonerName = summonerName
        this.summonerPuuid = summonerPuuid
        this.championId = championId
        this.iconId = iconId
        this.teamId = teamId
        this.spell1 = spell1
        this.spell2 = spell2
        this.perks = perks
    }
}