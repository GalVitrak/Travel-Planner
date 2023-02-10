import { createStore } from "redux";
import DestinationModel from "../Models/DestinationModel";

export class DestinationsState {
  public destinations: DestinationModel[] = [];
}

export enum DestinationsActionType {
  FetchDestinations = "FetchDestinations",
  AddDestination = "AddDestination",
  UpdateDestination = "UpdateDestination",
  DeleteDestination = "DeleteDestination",
  EmptyStore = "EmptyStore",
}

export interface DestinationAction {
  type: DestinationsActionType;
  payload?: any;
}

export function destinationReducer(
  currentState = new DestinationsState(),
  action: DestinationAction
): DestinationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case DestinationsActionType.FetchDestinations:
      newState.destinations = action.payload;
      break;

    case DestinationsActionType.AddDestination:
      newState.destinations.push(action.payload);
      break;

    case DestinationsActionType.UpdateDestination:
      const indexToUpdate = newState.destinations.findIndex(
        (d) => d.destinationId === action.payload.destinationId
      );
      if (indexToUpdate >= 0) {
        newState.destinations[indexToUpdate] = action.payload;
      }
      break;

    case DestinationsActionType.DeleteDestination:
      const indexToDelete = newState.destinations.findIndex(
        (d) => d.destinationId === action.payload
      );
      if (indexToDelete) {
        newState.destinations.splice(indexToDelete, 1);
      }
      break;

    case DestinationsActionType.EmptyStore:
      newState.destinations = [];
      break;
  }

  return newState;
}

export const destinationStore = createStore(destinationReducer);
