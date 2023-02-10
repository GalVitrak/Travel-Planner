import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import VacationModel from "../../../../Models/VacationModel";
import { authStore } from "../../../../Redux/AuthState";
import destinationService from "../../../../Services/DestinationService";
import notifyService from "../../../../Services/NotifyService";
import vacationService from "../../../../Services/VacationService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";
import useVerifyTokenExpiry from "../../../../Utils/useVerifyTokenExpiry";
import Spinner from "../../../HomeArea/Spinner/Spinner";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {
  useVerifyTokenExpiry();
  useVerifyAdmin();

  const navigate = useNavigate();
  // getting time offset (for local time).
  const tzOffset = new Date().getTimezoneOffset() * 60000;
  // getting local time and setting it as default start date.
  const localISOTime = new Date(Date.now() - tzOffset)
    .toISOString()
    .slice(0, -1);
  const [startDate, setStartDate] = useState<string>(localISOTime.slice(0, 16));
  const [endDate, setEndDate] = useState<string>();
  const params = useParams();
  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  const [vacation, setVacation] = useState<VacationModel>();

  useEffect(() => {
    const id = +params.vacationId;
    vacationService
      .getOneVacation(id)
      .then((vacation) => setVacation(vacation))
      .catch((err) => notifyService.error(err));

    destinationService
      .getAllDestinations()
      .then((destinations) => setDestinations(destinations))
      .catch((err) => notifyService.error(err));

    if (vacation) {
      setEndDate(createNewDate(vacation.endDate));
    }
  }, []);

  const { register, handleSubmit, formState } = useForm<VacationModel>();

  function handleDateChange(args: any) {
    setStartDate(args);
    if (args > endDate) {
      setEndDate(args);
    }
  }

  async function send(vacationToUpdate: VacationModel) {
    try {
      vacationToUpdate.vacationId = vacation.vacationId;
      if (!vacationToUpdate.destinationId) {
        vacationToUpdate.destinationId = vacation.destinationId;
      }
      await vacationService.updateVacation(vacationToUpdate);
      notifyService.success("Vacation has been Updated!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  // a function to create a new date from vacation's date to put into datetime-local input
  function createNewDate(stringDate: string) {
    const wholeDateArr = stringDate.split(" ");
    const stringDateArr = wholeDateArr[0].split("-");
    const newDate = new Date(
      `${stringDateArr[2]}-${stringDateArr[1]}-${stringDateArr[0]}T${wholeDateArr[1]}`
    );
    const localDate = new Date(newDate.getTime() - tzOffset)
      .toISOString()
      .slice(0, -1);
    return localDate;
  }

  return (
    <div className="UpdateVacation Box">
      {!vacation ? (
        <Spinner />
      ) : (
        <>
          <h2>Update Vacation</h2>

          <form onSubmit={handleSubmit(send)}>
            <label>Destination:</label>
            <select
              defaultValue={vacation.destinationId}
              {...register(
                "destinationId",
                VacationModel.destinationValidation
              )}
            >
              {destinations.map((d) => (
                <option key={d.destinationId} value={d.destinationId}>
                  {d.destinationName}
                </option>
              ))}
            </select>
            <span className="Error">
              {formState.errors.destinationId?.message}
            </span>

            <br />
            <label>Start Date:</label>
            <input
              type="datetime-local"
              {...register("startDate")}
              defaultValue={createNewDate(vacation.startDate)}
              onChange={(e) => {
                handleDateChange(e.target.value);
              }}
              min={localISOTime.slice(0, 16)}
            />
            <span className="Error">{formState.errors.startDate?.message}</span>

            <label>End Date:</label>
            <input
              type="datetime-local"
              {...register("endDate")}
              defaultValue={createNewDate(vacation.endDate)}
              value={endDate}
              min={startDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
            <span className="Error">{formState.errors.endDate?.message}</span>

            <label>Price:</label>
            <input
              type="number"
              defaultValue={vacation.price}
              {...register("price", VacationModel.priceValidation)}
            />
            <span className="Error">{formState.errors.price?.message}</span>

            <button>Update</button>
          </form>
        </>
      )}
    </div>
  );
}

export default UpdateVacation;
