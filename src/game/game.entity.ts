import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Participant} from "../participants/participant.entity";
import {Room} from "../room/room.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roomId: number

    @Column()
    gameRiotId: string

    @Column({ default: false })
    isDeleted: boolean

    @ManyToOne(() => Room, room => room.games)
    room: Room;

    @OneToMany(() => Participant, participant => participant.game)
    participants: Participant[]

    constructor(roomId: number, gameRiotId: string) {
        this.roomId = roomId
        this.gameRiotId = gameRiotId
    }
}