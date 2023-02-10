import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import VacationModel from "../../../../Models/VacationModel";
import destinationService from "../../../../Services/DestinationService";
import notifyService from "../../../../Services/NotifyService";
import vacationService from "../../../../Services/VacationService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";
import useVerifyTokenExpiry from "../../../../Utils/useVerifyTokenExpiry";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
  useVerifyTokenExpiry();
  useVerifyAdmin();

  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  // getting time offset (for local time).
  const tzOffset = new Date().getTimezoneOffset() * 60000;
  // getting local time and setting it as default start and end dates.
  const localISOTime = new Date(Date.now() - tzOffset)
    .toISOString()
    .slice(0, -1);
  const [startDate, setStartDate] = useState<string>(localISOTime.slice(0, 16));
  const [endDate, setEndDate] = useState<string>(localISOTime.slice(0, 16));

  useEffect(() => {
    // getting all destination to set as options in Select.
    destinationService
      .getAllDestinations()
      .then((destinations) => setDestinations(destinations))
      .catch((err) => notifyService.error(err));
  }, []);

  const { register, handleSubmit, formState } = useForm<VacationModel>();

  // function to set the dates on input change.
  function handleDateChange(date: any) {
    setStartDate(date);
    if (date > endDate) {
      setEndDate(date);
    }
  }

  //function to send added vacation to service and add it in server side.
  async function send(vacation: VacationModel) {
    try {
      await vacationService.addVacation(vacation);
      notifyService.success("Vacation has been Added!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }
  return (
    <div className="AddVacation Box">
      <h2>Add Vacation</h2>

      <form onSubmit={handleSubmit(send)}>
        <label>Destination:</label>
        <select
          defaultValue=""
          {...register("destinationId", VacationModel.destinationValidation)}
        >
          <option disabled value="">
            Select Destination
          </option>
          {destinations.map((d) => (
            <option key={d.destinationId} value={d.destinationId}>
              {d.destinationName}
            </option>
          ))}
        </select>
        <span className="Error">{formState.errors.destinationId?.message}</span>

        <br />
        <label>Start Date:</label>
        <input
          type="datetime-local"
          {...register("startDate")}
          defaultValue={localISOTime.slice(0, 16)}
          onChange={(e) => {
            handleDateChange(e.target.value);
          }}
          min={localISOTime.slice(0, 16)} // blocking past dates.
        />
        <span className="Error">{formState.errors.startDate?.message}</span>

        <label>End Date:</label>
        <input
          type="datetime-local"
          {...register("endDate")}
          defaultValue={startDate}
          value={endDate}
          min={startDate} // blocking dates before chosen start date.
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
        <span className="Error">{formState.errors.endDate?.message}</span>

        <label>Price:</label>
        <input
          type="number"
          {...register("price", VacationModel.priceValidation)}
        />
        <span className="Error">{formState.errors.price?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddVacation;
