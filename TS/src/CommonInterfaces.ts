export enum StatsType {
    CommitActivity = "0",
    Others = "1",
    Help = "--help",
    Quit = "q"
}

export interface CommandInterface {
    statsType: StatsType;
    owner: string;
    repo: string;
}

export enum Commands {
    Help = StatsType.Help,
    Quit = StatsType.Quit,
    Error = 1
}