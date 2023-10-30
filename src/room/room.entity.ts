import {Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

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

    @Column()
    @Generated("uuid")
    entryCode: string

    @Column()
    password: string

    @Column({ default: false })
    isDeleted: boolean

    constructor(hostName: string, hostPuuid: string, hostId: string, password: string) {
        this.hostName = hostName
        this.hostPuuid = hostPuuid
        this.hostId = hostId
        this.password = password
    }
}