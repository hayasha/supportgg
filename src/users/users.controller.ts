import {Controller, Get, Param} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    findById(@Param('id') id: string): string {
        return `this is a sample user testing ` + id
    }
}
