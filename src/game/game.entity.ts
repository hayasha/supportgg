import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Participant} from "../participants/participant.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roomId: number

    // @Column()
    // participants: Participant[]

    @Column()
    isDeleted: boolean
}