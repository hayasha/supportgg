import {Body, Controller, Post, Request} from '@nestjs/common';
import {RiotService} from "../riot/riot.service";

@Controller('rooms')
export class RoomsController {
    constructor(private readonly riotService: RiotService) {}

    /*
    *   Todo: ADD VALIDATOR & DELETE any-type
    */
    @Post()
    public createNewRoom(@Body() body: any) {
        console.log(body)
    }
}
