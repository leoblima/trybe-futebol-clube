import TeamsService from './Team.service';
import MatchService from './Match.service';
import TeamsModel from '../database/models/Team';
import MatchModel from '../database/models/Match';
import { ILeaderboard } from './interfaces';

class Leaderboard {
  static async getAllTeams() {
    const teams = TeamsService.findAll();
    return teams;
  }

  static async getTeamMatches(teamId: number) {
    const matches = await MatchService.findAll();
    const teamMatches = matches.data
      .filter((match) => (
        match.homeTeam === teamId
        || match.awayTeam === teamId)
        && !match.inProgress);
    return teamMatches;
  }

  static getFavorGoals(matches: MatchModel[], teamId: number): number {
    const goalsFavorHome = matches
      .filter((match) => match.homeTeam === teamId)
      .map((homeMatch) => homeMatch.homeTeamGoals)
      .reduce((favorHomeGoals, cur) => favorHomeGoals + cur);
    const goalsFavorAway = matches
      .filter((match) => match.awayTeam === teamId)
      .map((awayMatch) => awayMatch.awayTeamGoals)
      .reduce((favorAwayGoals, cur) => favorAwayGoals + cur);
    return goalsFavorAway + goalsFavorHome;
  }

  static getOwnGoals(matches: MatchModel[], teamId: number): number {
    const goalsOwnHome = matches
      .filter((match) => match.homeTeam === teamId)
      .map((homeMatch) => homeMatch.awayTeamGoals)
      .reduce((ownGoalsHome, cur) => ownGoalsHome + cur);
    const goalsOwnAway = matches
      .filter((match) => match.awayTeam === teamId)
      .map((awayMatch) => awayMatch.homeTeamGoals)
      .reduce((ownGoalsAway, cur) => ownGoalsAway + cur);
    return goalsOwnAway + goalsOwnHome;
  }

  static getTotalGoals(matches: MatchModel[], teamId: number) {
    const goalsFavor = Leaderboard.getFavorGoals(matches, teamId);
    const goalsOwn = Leaderboard.getOwnGoals(matches, teamId);
    return { goalsFavor, goalsOwn };
  }

  static getTotalVictories(matches: MatchModel[], teamId: number): number {
    const victoriesHome = matches
      .filter((match) => match.homeTeam === teamId)
      .filter((homeMatch) => homeMatch.homeTeamGoals > homeMatch.awayTeamGoals);
    const victoriesAway = matches
      .filter((match) => match.awayTeam === teamId)
      .filter((awayMatch) => awayMatch.awayTeamGoals > awayMatch.homeTeamGoals);
    return victoriesHome.length + victoriesAway.length;
  }

  static getTotalLosses(matches:MatchModel[], teamId: number): number {
    const lossesHome = matches
      .filter((match) => match.homeTeam === teamId)
      .filter((homeMatch) => homeMatch.homeTeamGoals < homeMatch.awayTeamGoals);
    const lossesAway = matches
      .filter((match) => match.awayTeam === teamId)
      .filter((awayMatch) => awayMatch.awayTeamGoals < awayMatch.homeTeamGoals);
    return lossesHome.length + lossesAway.length;
  }

  static getTotalDraws(matches:MatchModel[]) {
    const totalDraws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    return totalDraws.length;
  }

  static getGamesStatistic(matches:MatchModel[], teamId: number) {
    const totalVictories = Leaderboard.getTotalVictories(matches, teamId);
    const totalLosses = Leaderboard.getTotalLosses(matches, teamId);
    const totalDraws = Leaderboard.getTotalDraws(matches);
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
    const allTeamMatches = await Leaderboard.getTeamMatches(team.id);
    const totalGames = allTeamMatches.length;
    const { goalsFavor, goalsOwn } = Leaderboard.getTotalGoals(allTeamMatches, team.id);
    const { totalVictories,
      totalDraws, totalLosses } = Leaderboard.getGamesStatistic(allTeamMatches, team.id);
    const totalPoints = Leaderboard.getTotalPoints(totalVictories, totalDraws);
    const efficiency = Leaderboard.getEfficiency(totalPoints, totalGames);
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

  static async getLeaderboard() {
    const allTeams = await Leaderboard.getAllTeams();
    const leaderboard = await Promise.all(allTeams.data
      .map(async (team: TeamsModel) => Leaderboard.getTeamStatus(team)));
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

export default Leaderboard;
