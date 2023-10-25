import {Controller, Get, Param} from '@nestjs/common';
import {RiotService} from "../riot/riot.service";

@Controller('users')
export class UsersController {
    constructor(private readonly riotService: RiotService) {}

    @Get(':name')
    findById(@Param('name') name: string): any {
        return this.riotService.findSummonerByName(name)
    }
}
