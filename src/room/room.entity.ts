import {Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "../game/game.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    hostName: string

    @Column()
    hostPuuid: string

    @Column()
    hostId: string

    @Column({ unique: true })
    @Generated("uuid")
    entryCode: string

    @Column()
    password: string

    @Column({ default: false })
    isDeleted: boolean

    @OneToMany(() => Game, game => game.room)
    games: Game[]

    constructor(hostName: string, hostPuuid: string, hostId: string, password: string) {
        this.hostName = hostName
        this.hostPuuid = hostPuuid
        this.hostId = hostId
        this.password = password
    }
}