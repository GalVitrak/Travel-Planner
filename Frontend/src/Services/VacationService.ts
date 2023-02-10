import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { authStore } from "../Redux/AuthState";
import { VacationActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/appConfig";

class VacationService {
  public async getAllVacations(
    filter?: string,
    destinationId?: number
  ): Promise<VacationModel[]> {
    let vacations: VacationModel[] = [];
    let response: any;
    vacationStore.dispatch({
      type: VacationActionType.EmptyStore,
    });

    if (!authStore.getState().token) {
      const response = await axios.get<VacationModel[]>(
        appConfig.followerFilterUrl + filter + "/"
      );
      vacations = response.data;
      vacationStore.dispatch({
        type: VacationActionType.FetchVacations,
        payload: vacations,
      });
      return vacations;
    }
    if (destinationId) {
      response = await axios.get<VacationModel[]>(
        appConfig.followerFilterUrl +
          filter +
          "/" +
          authStore.getState().user.userId +
          "/destination/" +
          destinationId
      );
      vacations = response.data;
      vacationStore.dispatch({
        type: VacationActionType.FetchVacations,
        payload: vacations,
      });
      return vacations;
    }
    response = await axios.get<VacationModel[]>(
      appConfig.followerFilterUrl +
        filter +
        "/" +
        authStore.getState().user.userId
    );
    vacations = response.data;
    vacationStore.dispatch({
      type: VacationActionType.FetchVacations,
      payload: vacations,
    });
    return vacations;
  }

  public async getVacationsFollowerCount(): Promise<VacationModel[]> {
    const response = await axios.get<VacationModel[]>(
      appConfig.vacationFollowersCountUrl
    );
    const vacations = response.data;
    return vacations;
  }

  public async getDestinationFollowerCount(): Promise<VacationModel[]> {
    const response = await axios.get<VacationModel[]>(
      appConfig.destinationFollowersCountUrl
    );
    const vacations = response.data;
    return vacations;
  }

  public async getAllFollowedVacations(
    filter: string
  ): Promise<VacationModel[]> {
    if (!authStore.getState().token) {
      return;
    }
    vacationStore.dispatch({
      type: VacationActionType.EmptyStore,
    });
    const response = await axios.get<VacationModel[]>(
      appConfig.followerFilterUrl +
        filter +
        "/" +
        authStore.getState().user.userId
    );
    const vacations = response.data;
    const followedVacations: VacationModel[] = [];
    vacations.map((v) => {
      if (v.isFollowing === 1) {
        followedVacations.push(v);
      }
    });
    vacationStore.dispatch({
      type: VacationActionType.FetchVacations,
      payload: followedVacations,
    });
    return followedVacations;
  }

  public async getOneVacation(id: number): Promise<VacationModel> {
    let vacations = vacationStore.getState().vacations;
    let vacation = vacations.find((v) => v.vacationId === id);

    if (!vacation) {
      const response = await axios.get<VacationModel>(
        appConfig.vacationsUrl + id
      );
      vacation = response.data;
    }
    return vacation;
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    const myFormData = new FormData();
    myFormData.append("destinationId", vacation.destinationId.toString());
    myFormData.append("startDate", vacation.startDate);
    myFormData.append("endDate", vacation.endDate);
    myFormData.append("price", vacation.price.toString());

    const response = await axios.post<VacationModel>(
      appConfig.vacationsUrl,
      myFormData
    );
    const addedVacation = response.data;
    vacationStore.dispatch({
      type: VacationActionType.AddVacation,
      payload: addedVacation,
    });
  }

  public async deleteVacation(id: number): Promise<void> {
    await axios.delete<void>(appConfig.vacationsUrl + id);
    vacationStore.dispatch({
      type: VacationActionType.DeleteVacation,
      payload: id,
    });
  }

  public async updateVacation(vacation: VacationModel): Promise<void> {
    const response = await axios.put<VacationModel>(
      appConfig.vacationsUrl,
      vacation
    );
    const updatedVacation = response.data;
    vacationStore.dispatch({
      type: VacationActionType.UpdateVacation,
      payload: vacation,
    });
  }

  public async updateVacationFollower(
    id: number,
    isFollowing: number,
    followersCount: number
  ): Promise<void> {
    const follower = {
      vacationId: id,
      userId: authStore.getState().user.userId,
    };
    const data = { data: follower };
    if (isFollowing === 0) {
      await axios.delete<void>(appConfig.followerUrl, data);
    } else {
      await axios.post<void>(appConfig.followerUrl, follower);
    }
    vacationStore.dispatch({
      type: VacationActionType.UpdateFollowers,
      payload: {
        vacationId: id,
        isFollowing: isFollowing,
        followersCount: followersCount,
      },
    });
  }
}

const vacationService = new VacationService();

export default vacationService;
