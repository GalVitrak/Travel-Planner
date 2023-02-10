import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import { authStore } from "../../../../Redux/AuthState";
import destinationService from "../../../../Services/DestinationService";
import notifyService from "../../../../Services/NotifyService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";
import useVerifyTokenExpiry from "../../../../Utils/useVerifyTokenExpiry";
import Spinner from "../../../HomeArea/Spinner/Spinner";
import "./UpdateDestination.css";

function UpdateDestination(): JSX.Element {
  useVerifyTokenExpiry();
  useVerifyAdmin();

  const params = useParams();

  const { register, handleSubmit, formState } = useForm<DestinationModel>();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<DestinationModel>();

  useEffect(() => {
    if (
      authStore.getState().token &&
      authStore.getState().user.role !== "Admin"
    ) {
      notifyService.error("You're not an admin!");
      navigate("/destinations");
    }
    const id = +params.destinationId;
    destinationService
      .getOneDestination(id)
      .then((destination) => setDestination(destination))
      .catch((err) => notifyService.error(err));
  }, []);

  async function send(destinationToUpdate: DestinationModel) {
    try {
      destinationToUpdate.destinationId = destination.destinationId;
      destinationToUpdate.imageName = destination.imageName;
      await destinationService.updateDestination(destinationToUpdate);
      notifyService.success("Destination has been Updated!");
      navigate("/destinations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="UpdateDestination Box">
      {!destination ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={handleSubmit(send)}>
            <h2>Add Destination</h2>

            <label>Destination's Name: </label>
            <input
              type="text"
              defaultValue={destination.destinationName}
              {...register("destinationName", DestinationModel.nameValidation)}
            />
            <span className="Error">
              {formState.errors.destinationName?.message}
            </span>

            <label>Destination's Description: </label>
            <textarea
              defaultValue={destination.description}
              {...register(
                "description",
                DestinationModel.descriptionValidation
              )}
            />
            <span className="Error">
              {formState.errors.description?.message}
            </span>

            <label>Image: </label>
            <input type="file" accept="image/*" {...register("image")} />

            <button>Update Destination</button>
          </form>
        </>
      )}
    </div>
  );
}

export default UpdateDestination;
