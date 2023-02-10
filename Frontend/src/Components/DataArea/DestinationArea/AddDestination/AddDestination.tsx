import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import { authStore } from "../../../../Redux/AuthState";
import destinationService from "../../../../Services/DestinationService";
import notifyService from "../../../../Services/NotifyService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";
import useVerifyTokenExpiry from "../../../../Utils/useVerifyTokenExpiry";
import "./AddDestination.css";

function AddDestination(): JSX.Element {
  useVerifyTokenExpiry();
  useVerifyAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authStore.getState().token &&
      authStore.getState().user.role !== "Admin"
    ) {
      notifyService.error("You're not an admin!");
      navigate("/destinations");
    }
  }, []);

  const { register, handleSubmit, formState } = useForm<DestinationModel>();

  async function send(destination: DestinationModel) {
    try {
      await destinationService.addDestination(destination);
      notifyService.success("Destination has been Added!");
      navigate("/destinations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }
  return (
    <div className="AddDestination Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Add Destination</h2>

        <label>Destination's Name: </label>
        <input
          type="text"
          {...register("destinationName", DestinationModel.nameValidation)}
        />
        <span className="Error">
          {formState.errors.destinationName?.message}
        </span>

        <label>Destination's Description: </label>
        <textarea
          {...register("description", DestinationModel.descriptionValidation)}
        />
        <span className="Error">{formState.errors.description?.message}</span>

        <label>Image: </label>
        <input
          type="file"
          accept="image/*"
          {...register("image", DestinationModel.imageValidation)}
        />
        <span className="Error">{formState.errors.image?.message}</span>

        <button>Add Destination</button>
      </form>
    </div>
  );
}

export default AddDestination;
