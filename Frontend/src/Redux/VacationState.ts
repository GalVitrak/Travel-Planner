import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationsState {
  public vacations: VacationModel[] = [];
}

export enum VacationActionType {
  FetchVacations = "FetchVacations",
  AddVacation = "AddVacation",
  UpdateVacation = "UpdateVacation",
  UpdateFollowers = "UpdateFollowers",
  DeleteVacation = "DeleteVacation",
  EmptyStore = "EmptyStore",
}

export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

export function vacationReducer(
  currentState = new VacationsState(),
  action: VacationAction
): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.FetchVacations:
      newState.vacations = action.payload;
      break;

    case VacationActionType.AddVacation:
      newState.vacations.push(action.payload);
      break;

    case VacationActionType.UpdateVacation:
      const indexToUpdate = newState.vacations.findIndex(
        (d) => d.destinationId === action.payload.destinationId
      );
      if (indexToUpdate >= 0) {
        newState.vacations[indexToUpdate] = action.payload;
      }
      break;

    case VacationActionType.UpdateFollowers:
      const index = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      if (index >= 0) {
        newState.vacations[index].isFollowing = action.payload.isFollowing;
        newState.vacations[index].followersCount =
          action.payload.followersCount;
      }
      break;

    case VacationActionType.DeleteVacation:
      const indexToDelete = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload
      );
      if (indexToDelete) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;

    case VacationActionType.EmptyStore:
      newState.vacations = [];
      break;
  }

  return newState;
}

export const vacationStore = createStore(vacationReducer);
