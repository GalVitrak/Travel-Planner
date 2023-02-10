import "./Spinner.css";
import imageSource from "../../../Assets/Images/loading.gif";

function Spinner(): JSX.Element {
    return (
        // a loading "spinner" component.
        <div className="Spinner">
			<img src={imageSource} />
        </div>
    );
}

export default Spinner;
