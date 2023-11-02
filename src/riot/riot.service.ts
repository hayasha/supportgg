import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {catchError, map} from "rxjs";
import {Summoner} from "./Entities/Summoner";
import {AxiosError} from "axios";
import {Game} from "../game/game.entity";

@Injectable()
export class RiotService {
    private readonly logger = new Logger(RiotService.name)

    private riotApiKey: string = <string> this.configService.get<string>('RIOT_API_KEY')
    private summonerBynameUrl: string = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
    private spectatorUrl: string = "https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"

    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    public findSummonerByName(name: string) {
        return this.get(this.summonerBynameUrl + name)
            .pipe(map(summonerV4 => new Summoner(
                summonerV4["puuid"],
                summonerV4["id"],
                summonerV4["name"],
                summonerV4["profileIconId"],
                summonerV4["summonerLevel"]
            )))
    }

    public findCurrentGame(summonerId: string) {
        return this.get(this.spectatorUrl + summonerId)
            .pipe(catchError((error: AxiosError) => {
                this.logger.error("Game not found for summonerId: " + summonerId)
                throw error
            }))
    }

    private get(url: string) {
        const config: object = {
            headers: { "X-Riot-Token": this.riotApiKey }
        }

        return this.httpService.get(url, config)
            .pipe(map(response => response.data))
    }
}
