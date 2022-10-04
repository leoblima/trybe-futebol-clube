interface ITeam {
  teamName: string,
}

interface INewMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: ITeam,
  teamAway: ITeam,
}

export default INewMatch;
