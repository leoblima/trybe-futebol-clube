import TeamsService from './Team.service';
import MatchService from './Match.service';
import TeamsModel from '../database/models/Team';
import MatchModel from '../database/models/Match';
import { ILeaderboard } from './interfaces';

class LeaderboardHome {
  static async getAllTeams() {
    const teams = TeamsService.findAll();
    return teams;
  }

  static async getTeamMatches(teamId: number) {
    const matches = await MatchService.findAll();
    const teamMatches = matches.data
      .filter((match) => (match.homeTeam === teamId && !match.inProgress));
    return teamMatches;
  }

  static getFavorGoals(matches: MatchModel[], teamId: number): number {
    const goalsFavorHome = matches
      .filter((match) => match.homeTeam === teamId)
      .map((homeMatch) => homeMatch.homeTeamGoals)
      .reduce((favorHomeGoals, cur) => favorHomeGoals + cur);
    return goalsFavorHome;
  }

  static getOwnGoals(matches: MatchModel[], teamId: number): number {
    const goalsOwnHome = matches
      .filter((match) => match.homeTeam === teamId)
      .map((homeMatch) => homeMatch.awayTeamGoals)
      .reduce((ownGoalsHome, cur) => ownGoalsHome + cur);
    return goalsOwnHome;
  }

  static getTotalGoals(matches: MatchModel[], teamId: number) {
    const goalsFavor = LeaderboardHome.getFavorGoals(matches, teamId);
    const goalsOwn = LeaderboardHome.getOwnGoals(matches, teamId);
    return { goalsFavor, goalsOwn };
  }

  static getTotalVictories(matches: MatchModel[], teamId: number): number {
    const victoriesHome = matches
      .filter((match) => match.homeTeam === teamId)
      .filter((homeMatch) => homeMatch.homeTeamGoals > homeMatch.awayTeamGoals);
    return victoriesHome.length;
  }

  static getTotalLosses(matches:MatchModel[], teamId: number): number {
    const lossesHome = matches
      .filter((match) => match.homeTeam === teamId)
      .filter((homeMatch) => homeMatch.homeTeamGoals < homeMatch.awayTeamGoals);
    return lossesHome.length;
  }

  static getTotalDraws(matches:MatchModel[]) {
    const totalDraws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    return totalDraws.length;
  }

  static getGamesStatistic(matches:MatchModel[], teamId: number) {
    const totalVictories = LeaderboardHome.getTotalVictories(matches, teamId);
    const totalLosses = LeaderboardHome.getTotalLosses(matches, teamId);
    const totalDraws = LeaderboardHome.getTotalDraws(matches);
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
    const allTeamMatches = await LeaderboardHome.getTeamMatches(team.id);
    const totalGames = allTeamMatches.length;
    const { goalsFavor, goalsOwn } = LeaderboardHome.getTotalGoals(allTeamMatches, team.id);
    const { totalVictories,
      totalDraws, totalLosses } = LeaderboardHome.getGamesStatistic(allTeamMatches, team.id);
    const totalPoints = LeaderboardHome.getTotalPoints(totalVictories, totalDraws);
    const efficiency = LeaderboardHome.getEfficiency(totalPoints, totalGames);
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

  static async getLeaderboardHome() {
    const allTeams = await LeaderboardHome.getAllTeams();
    const leaderboard = await Promise.all(allTeams.data
      .map(async (team: TeamsModel) => LeaderboardHome.getTeamStatus(team)));
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    return { code: 200, data: leaderboard };
  }
}

export default LeaderboardHome;
