export class Summoner {
    private puuid: string;

    private name: string;

    private iconId: number;

    private summonerLevel: number;

    constructor(puuid: string, name: string, iconId: number, summonerLevel: number) {
        this.puuid = puuid;
        this.name = name;
        this.iconId = iconId;
        this.summonerLevel = summonerLevel;
    }
}