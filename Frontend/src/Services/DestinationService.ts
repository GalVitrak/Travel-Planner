import axios from "axios";
import DestinationModel from "../Models/DestinationModel";
import {
  DestinationsActionType,
  destinationStore,
} from "../Redux/DestinationState";
import appConfig from "../Utils/appConfig";

class DestinationService {
  public async getAllDestinations(): Promise<DestinationModel[]> {
    let destinations = destinationStore.getState().destinations;
    if (destinations.length === 0) {
      const response = await axios.get<DestinationModel[]>(
        appConfig.destinationsUrl
      );
      destinations = response.data;
      destinationStore.dispatch({
        type: DestinationsActionType.FetchDestinations,
        payload: destinations,
      });
    }
    return destinations;
  }

  public async getOneDestination(id: number) {
    let destinations = destinationStore.getState().destinations;
    let destination = destinations.find((d) => d.destinationId === id);
    if (!destination) {
      const response = await axios.get<DestinationModel>(
        appConfig.destinationsUrl + id
      );

      destination = response.data;
    }
    return destination;
  }

  public async addDestination(destination: DestinationModel): Promise<void> {
    const myFormData = new FormData();
    myFormData.append("destinationName", destination.destinationName);
    myFormData.append("description", destination.description);
    myFormData.append("image", destination.image[0]);

    const response = await axios.post<DestinationModel>(
      appConfig.destinationsUrl,
      myFormData
    );
    const addedDestination = response.data;
    destinationStore.dispatch({
      type: DestinationsActionType.AddDestination,
      payload: addedDestination,
    });
  }

  public async updateDestination(destination: DestinationModel): Promise<void> {
    const myFormData = new FormData();
    myFormData.append("destinationId", destination.destinationId.toString());
    myFormData.append("destinationName", destination.destinationName);
    myFormData.append("description", destination.description);
    myFormData.append("imageName", destination.imageName);
    if (destination.image) {
      myFormData.append("image", destination.image[0]);
    }
    const response = await axios.put<DestinationModel>(
      appConfig.destinationsUrl,
      myFormData
    );
    const updatedDestination = response.data;
    destinationStore.dispatch({
      type: DestinationsActionType.UpdateDestination,
      payload: updatedDestination,
    });
  }

  public async deleteDestination(id: number): Promise<void> {
    await axios.delete<void>(appConfig.destinationsUrl + id);
    destinationStore.dispatch({
      type: DestinationsActionType.DeleteDestination,
      payload: id,
    });
  }
}

const destinationService = new DestinationService();

export default destinationService;
