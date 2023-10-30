import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gameId: number

    @Column()
    summonerId: string

    @Column()
    ionianBoots: boolean

    @Column()
    spell1: number

    @Column()
    spell2: number
}