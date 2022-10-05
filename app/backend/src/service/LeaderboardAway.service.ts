import TeamsService from './Team.service';
import MatchService from './Match.service';
import TeamsModel from '../database/models/Team';
import MatchModel from '../database/models/Match';
import { ILeaderboard } from './interfaces';

class LeaderboardAway {
  static async getAllTeams() {
    const teams = TeamsService.findAll();
    return teams;
  }

  static async getTeamMatches(teamId: number) {
    const matches = await MatchService.findAll();
    const teamMatches = matches.data
      .filter((match) => (match.awayTeam === teamId && !match.inProgress));
    return teamMatches;
  }

  static getFavorGoals(matches: MatchModel[], teamId: number): number {
    const goalsFavorAway = matches
      .filter((match) => match.awayTeam === teamId)
      .map((awayMatch) => awayMatch.awayTeamGoals)
      .reduce((favorAwayGoals, cur) => favorAwayGoals + cur);
    return goalsFavorAway;
  }

  static getOwnGoals(matches: MatchModel[], teamId: number): number {
    const goalsOwnAway = matches
      .filter((match) => match.awayTeam === teamId)
      .map((awayMatch) => awayMatch.homeTeamGoals)
      .reduce((ownGoalsAway, cur) => ownGoalsAway + cur);
    return goalsOwnAway;
  }

  static getTotalGoals(matches: MatchModel[], teamId: number) {
    const goalsFavor = LeaderboardAway.getFavorGoals(matches, teamId);
    const goalsOwn = LeaderboardAway.getOwnGoals(matches, teamId);
    return { goalsFavor, goalsOwn };
  }

  static getTotalVictories(matches: MatchModel[], teamId: number): number {
    const victoriesAway = matches
      .filter((match) => match.awayTeam === teamId)
      .filter((awayMatch) => awayMatch.awayTeamGoals > awayMatch.homeTeamGoals);
    return victoriesAway.length;
  }

  static getTotalLosses(matches:MatchModel[], teamId: number): number {
    const lossesAway = matches
      .filter((match) => match.awayTeam === teamId)
      .filter((awayMatch) => awayMatch.awayTeamGoals < awayMatch.homeTeamGoals);
    return lossesAway.length;
  }

  static getTotalDraws(matches:MatchModel[]) {
    const totalDraws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    return totalDraws.length;
  }

  static getGamesStatistic(matches:MatchModel[], teamId: number) {
    const totalVictories = LeaderboardAway.getTotalVictories(matches, teamId);
    const totalLosses = LeaderboardAway.getTotalLosses(matches, teamId);
    const totalDraws = LeaderboardAway.getTotalDraws(matches);
    return { totalVictories, totalDraws, totalLosses };
  }

  static getTotalPoints(victories: number, draws: number): number {
    return (victories * 3) + draws;
  }

  static getEfficiency(points: number, games: number): string {
    const efficiency = (points / (games * 3)) * 100;
    return efficiency.toFixed(2);
  }

  static async getTeamStatus(team: TeamsModel): Promise<ILeaderboard> {
    const allTeamMatches = await LeaderboardAway.getTeamMatches(team.id);
    const totalGames = allTeamMatches.length;
    const { goalsFavor, goalsOwn } = LeaderboardAway.getTotalGoals(allTeamMatches, team.id);
    const { totalVictories,
      totalDraws, totalLosses } = LeaderboardAway.getGamesStatistic(allTeamMatches, team.id);
    const totalPoints = LeaderboardAway.getTotalPoints(totalVictories, totalDraws);
    const efficiency = LeaderboardAway.getEfficiency(totalPoints, totalGames);
    return { name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency,
    };
  }

  static async getLeaderboardAway() {
    const allTeams = await LeaderboardAway.getAllTeams();
    const leaderboard = await Promise.all(allTeams.data
      .map(async (team: TeamsModel) => LeaderboardAway.getTeamStatus(team)));
      leaderboard.sort((a, b) => {
        if (b.totalPoints > a.totalPoints) return 1;
        if (b.totalPoints < a.totalPoints) return -1;
        if (b.totalVictories > a.totalVictories) return 1;
        if (b.totalVictories < a.totalVictories) return -1;
        if (b.goalsBalance > a.goalsBalance) return 1;
        if (b.goalsBalance < a.goalsBalance) return -1;
        if (b.goalsFavor > a.goalsFavor) return 1;
        if (b.goalsFavor < a.goalsFavor) return -1;
        return 0;
      });
    return { code: 200, data: leaderboard };
  }
}

export default LeaderboardAway;
