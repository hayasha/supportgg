export class Summoner {
    private puuid: string;

    private summonerId: string;

    private name: string;

    private iconId: number;

    private summonerLevel: number;

    constructor(puuid: string, summonerId: string, name: string, iconId: number, summonerLevel: number) {
        this.puuid = puuid;
        this.summonerId = summonerId
        this.name = name;
        this.iconId = iconId;
        this.summonerLevel = summonerLevel;
    }
}