import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {map} from "rxjs";
import {Summoner} from "./Entities/Summoner";

@Injectable()
export class RiotService {
    private readonly logger = new Logger(RiotService.name)

    private riotApiKey: string = <string> this.configService.get<string>('RIOT_API_KEY')
    private summonerBynameUrl: string = <string> this.configService.get<string>('SUMMONER_BYNAME_URL')

    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    public findSummonerByName(name: string) {
        this.logger.log('testing logging ...')
        return this.get(this.summonerBynameUrl + name)
            .pipe(map(summonerV4 => new Summoner(
                summonerV4["puuid"],
                summonerV4["name"],
                summonerV4["profileIconId"],
                summonerV4["summonerLevel"]
            )))
    }

    private get(url: string) {
        const config: object = {
            headers: { "X-Riot-Token": this.riotApiKey }
        }

        return this.httpService.get(url, config)
            .pipe(map(response => response.data))
    }
}
