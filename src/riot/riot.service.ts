import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {catchError, map} from "rxjs";
import {Summoner} from "./Entities/Summoner";
import {AxiosError} from "axios";

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

// {
//     "gameId": 6772489847,
//     "mapId": 11,
//     "gameMode": "CLASSIC",
//     "gameType": "MATCHED_GAME",
//     "gameQueueConfigId": 420,
//     "participants": [
//         {
//             "puuid": "NusKIJsEtbuRtnB5UwlxmTQZo4urh8BPzGqx3T9MOQqzCnJGeVyC3kUFzZAi-wABSIPtC0uxIdbIlQ",
//             "teamId": 100,
//             "spell1Id": 12,
//             "spell2Id": 4,
//             "championId": 54,
//             "profileIconId": 5639,
//             "summonerName": "태 구 야",
//             "bot": false,
//             "summonerId": "fmP6jKy3CaBbxKBZCmuz0NZAGcIIn-vv-6M_wjnJcB9CcFk",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8229,
//                     8226,
//                     8210,
//                     8237,
//                     8444,
//                     8451,
//                     5008,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8200,
//                 "perkSubStyle": 8400
//             }
//         },
//         {
//             "puuid": "TUuv5Hqm47blkNnWnC40lGpZ9hFdIWjGkoGOSPwJlHgvETx2gkGajVjUV4Am_GxL5VWGCl9v27TapA",
//             "teamId": 100,
//             "spell1Id": 14,
//             "spell2Id": 4,
//             "championId": 111,
//             "profileIconId": 5451,
//             "summonerName": " 뷰리뷰이",
//             "bot": false,
//             "summonerId": "jB9zpdErqtfQ9DBYHM6KH7k66ry3QnO-s-EjCTVBDPDQe0E61N3GADGjNg",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8351,
//                     8306,
//                     8316,
//                     8347,
//                     8473,
//                     8242,
//                     5005,
//                     5002,
//                     5003
//                 ],
//                 "perkStyle": 8300,
//                 "perkSubStyle": 8400
//             }
//         },
//         {
//             "puuid": "i-6t6PTjoZ5VMVtRtu59bnjA5Y0yHFzniPrTzkvEEjumYh0t_oQ7m0Kw1GSSZjayFbxuFgVKvdeanQ",
//             "teamId": 100,
//             "spell1Id": 12,
//             "spell2Id": 4,
//             "championId": 127,
//             "profileIconId": 7,
//             "summonerName": "nalamango",
//             "bot": false,
//             "summonerId": "JPZ4gKudMjXZ7v8ReOOLp5M9qzhtLTO-uadMUkVjsblIcw5UUweuGNqa_A",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8229,
//                     8226,
//                     8210,
//                     8237,
//                     8345,
//                     8347,
//                     5005,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8200,
//                 "perkSubStyle": 8300
//             }
//         },
//         {
//             "puuid": "jWl38pnmrgGzFy99YWph0MY9X9Bpy_kPrQsxsynytqnNWGXb4vVa3sb7k1GACcUcHEfbPejLn9RpDg",
//             "teamId": 100,
//             "spell1Id": 11,
//             "spell2Id": 4,
//             "championId": 64,
//             "profileIconId": 6315,
//             "summonerName": "Gen G Gidaekern",
//             "bot": false,
//             "summonerId": "7jVfKpm_7IkgpNHPYhSbtIEEbZTVFwal44DedtBd_QXL7G9j48nMGuOD2g",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8010,
//                     9111,
//                     9105,
//                     8014,
//                     8304,
//                     8347,
//                     5005,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8000,
//                 "perkSubStyle": 8300
//             }
//         },
//         {
//             "puuid": "Y3zBg39ipbIBGNkoxC2tW_A0istY6wVmg1sLGN90s92wRz_of0UkZjA08lN8__-92VE9bHhoSUsJEw",
//             "teamId": 100,
//             "spell1Id": 6,
//             "spell2Id": 4,
//             "championId": 895,
//             "profileIconId": 5530,
//             "summonerName": "독행협",
//             "bot": false,
//             "summonerId": "A8tb0PR9knnCa1ZeakiFl8nZetRWF5cFEkiBPcNK3eZ7eybVES98dX-fsw",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8010,
//                     9111,
//                     9103,
//                     8299,
//                     8347,
//                     8304,
//                     5005,
//                     5008,
//                     5003
//                 ],
//                 "perkStyle": 8000,
//                 "perkSubStyle": 8300
//             }
//         },
//         {
//             "puuid": "T9dwXJwS9-7hy8v4ZRt0IaSw4n379nxvR5_HC8Xk9I8xmiX3IIzLAGGDE8vv35G9x48L6RpmZ4XZFg",
//             "teamId": 200,
//             "spell1Id": 14,
//             "spell2Id": 4,
//             "championId": 89,
//             "profileIconId": 5922,
//             "summonerName": "peng mum",
//             "bot": false,
//             "summonerId": "aEdYO3B1Ga62yB6Nubnml53dbti8w3GGVf9fFcGfKRqxlebdA9uQPBVF_w",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8351,
//                     8306,
//                     8316,
//                     8347,
//                     8463,
//                     8473,
//                     5005,
//                     5002,
//                     5001
//                 ],
//                 "perkStyle": 8300,
//                 "perkSubStyle": 8400
//             }
//         },
//         {
//             "puuid": "AW2vkdL5D0inctVYp3qT-4240wg55XxD3Csvhv6OFt_MCE6mRa0upqnMslJtUtoNVJHAEI_04pkoCg",
//             "teamId": 200,
//             "spell1Id": 1,
//             "spell2Id": 4,
//             "championId": 126,
//             "profileIconId": 3584,
//             "summonerName": "huyu93",
//             "bot": false,
//             "summonerId": "VBj_B4-LJLBhvwCTSE5v1R0_wMcC04kZT36Kl4EmU23CeyA",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8369,
//                     8304,
//                     8345,
//                     8347,
//                     8233,
//                     8236,
//                     5008,
//                     5008,
//                     5003
//                 ],
//                 "perkStyle": 8300,
//                 "perkSubStyle": 8200
//             }
//         },
//         {
//             "puuid": "xLPIOSj727n0vUhOZJ48edy_dpOD2pzXMJVPnGsM8Z_qebo8cq5TtOq2huGWQdj0E6Udq-vBIZ7pwA",
//             "teamId": 200,
//             "spell1Id": 4,
//             "spell2Id": 12,
//             "championId": 80,
//             "profileIconId": 939,
//             "summonerName": "eeeLeee",
//             "bot": false,
//             "summonerId": "OnhNGodAxolY6kRfhwIHkFeBkG9h8HlBvR7AKLBKlvFb1mQ",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8010,
//                     8009,
//                     9104,
//                     8014,
//                     8444,
//                     8242,
//                     5008,
//                     5008,
//                     5003
//                 ],
//                 "perkStyle": 8000,
//                 "perkSubStyle": 8400
//             }
//         },
//         {
//             "puuid": "McusvPKVIG2xW-qTqZyma23pEafkw7vC65vMQk407J4dsIfQwQ3gdPTVIUASxaB2xL0vODm4L6cLrw",
//             "teamId": 200,
//             "spell1Id": 11,
//             "spell2Id": 4,
//             "championId": 79,
//             "profileIconId": 5799,
//             "summonerName": "Love Melon 1",
//             "bot": false,
//             "summonerId": "RY7mvn0iINd5kCn_myST38eSqygV1ruz3hnHb9N8-BJtealJu6piLtWP8w",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8369,
//                     8304,
//                     8321,
//                     8347,
//                     8210,
//                     8232,
//                     5005,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8300,
//                 "perkSubStyle": 8200
//             }
//         },
//         {
//             "puuid": "devslYQ8ynxp9xNozvl3pN0cQ54acOKfdrnZW-VvVb7luWSPsqnVIyhRxFJ1Z0T51qYyLintdAlIWA",
//             "teamId": 200,
//             "spell1Id": 12,
//             "spell2Id": 4,
//             "championId": 115,
//             "profileIconId": 5371,
//             "summonerName": "문영화",
//             "bot": false,
//             "summonerId": "GSJaeTeLejprnkmK8DIBxsQosEqJWsYtd1ndypd1LDky1mg",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8229,
//                     8226,
//                     8210,
//                     8237,
//                     8304,
//                     8345,
//                     5008,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8200,
//                 "perkSubStyle": 8300
//             }
//         }
//     ],
//     "observers": {
//         "encryptionKey": "1Oo2rZCtM1WzSEGnhnhPcckcIIG/jm0E"
//     },
//     "platformId": "KR",
//     "bannedChampions": [
//         {
//             "championId": 887,
//             "teamId": 100,
//             "pickTurn": 1
//         },
//         {
//             "championId": 104,
//             "teamId": 100,
//             "pickTurn": 2
//         },
//         {
//             "championId": 517,
//             "teamId": 100,
//             "pickTurn": 3
//         },
//         {
//             "championId": 61,
//             "teamId": 100,
//             "pickTurn": 4
//         },
//         {
//             "championId": 429,
//             "teamId": 100,
//             "pickTurn": 5
//         },
//         {
//             "championId": 76,
//             "teamId": 200,
//             "pickTurn": 6
//         },
//         {
//             "championId": 897,
//             "teamId": 200,
//             "pickTurn": 7
//         },
//         {
//             "championId": 119,
//             "teamId": 200,
//             "pickTurn": 8
//         },
//         {
//             "championId": 517,
//             "teamId": 200,
//             "pickTurn": 9
//         },
//         {
//             "championId": 238,
//             "teamId": 200,
//             "pickTurn": 10
//         }
//     ],
//     "gameStartTime": 1698545046696,
//     "gameLength": 851
// }



    private get(url: string) {
        const config: object = {
            headers: { "X-Riot-Token": this.riotApiKey }
        }

        return this.httpService.get(url, config)
            .pipe(map(response => response.data))
    }
}
